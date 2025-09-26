// Plant Image Service - Fetches plant images from free sources
// Uses Wikimedia Commons and fallback images (no API keys required)

interface PlantImageResult {
  imageUrl: string | null;
  source: string;
  error?: string;
}

interface PlantImageCache {
  [key: string]: PlantImageResult;
}

// Singleton cache to avoid repeated requests across all components
class ImageCache {
  private static instance: ImageCache;
  private cache: PlantImageCache = {};

  private constructor() {}

  static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache();
    }
    return ImageCache.instance;
  }

  get(key: string): PlantImageResult | undefined {
    return this.cache[key];
  }

  set(key: string, value: PlantImageResult): void {
    this.cache[key] = value;
  }

  clear(): void {
    this.cache = {};
  }

  has(key: string): boolean {
    return key in this.cache;
  }
}

const imageCache = ImageCache.getInstance();

// Wikimedia Commons - Free and reliable, no API key needed
async function fetchFromWikimedia(plantName: string): Promise<PlantImageResult> {
  try {
    // Extract scientific name from plant string (e.g., "Primula veris (Cowslip)" -> "Primula veris")
    const scientificName = plantName.split('(')[0].trim();
    
    // Try multiple search strategies for better results
    const searchQueries = [
      `${scientificName} plant flower`, // Most specific
      `${scientificName} botanical`,    // Botanical photos
      `${scientificName} nature`,       // Nature photos
      scientificName                    // Just the scientific name
    ];
    
    for (const searchQuery of searchQueries) {
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(searchQuery)}&srnamespace=6&srlimit=3&origin=*`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data.query?.search && data.query.search.length > 0) {
        // Look for the best quality image
        for (const result of data.query.search) {
          const fileName = result.title;
          // Filter for high-quality botanical images
          if (fileName.toLowerCase().includes('flower') || 
              fileName.toLowerCase().includes('plant') || 
              fileName.toLowerCase().includes('botanical') ||
              fileName.toLowerCase().includes('nature')) {
            const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=300`;
            return { imageUrl, source: 'Wikimedia Commons' };
          }
        }
        
        // If no specific botanical image found, use the first result
        const fileName = data.query.search[0].title;
        const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=300`;
        return { imageUrl, source: 'Wikimedia Commons' };
      }
    }
    
    return { imageUrl: null, source: 'Wikimedia Commons', error: 'No images found' };
  } catch (error) {
    return { imageUrl: null, source: 'Wikimedia Commons', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Fallback images - Using placeholder.com for reliable loading
function getFallbackImage(plantName: string): string {
  // Use plant name to consistently pick the same color
  const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5'];
  
  const hash = plantName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const color = colors[Math.abs(hash) % colors.length];
  const text = plantName.split(' ')[0].substring(0, 3).toUpperCase();
  
  // Create a simple colored square as data URI
  const svg = `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="${color}"/>
      <text x="150" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">${text}</text>
    </svg>
  `;
  
  // Use encodeURIComponent instead of btoa for better compatibility
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Try to get a more specific botanical image using PlantNet-style approach
async function fetchFromPlantNet(plantName: string): Promise<PlantImageResult> {
  try {
    // Extract scientific name and try to find specific plant images
    const scientificName = plantName.split('(')[0].trim();
    
    // Use a more targeted search for botanical images
    const searchQuery = encodeURIComponent(`${scientificName} species botanical`);
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchQuery}&srnamespace=6&srlimit=5&origin=*`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.query?.search && data.query.search.length > 0) {
      // Look for the most botanical/scientific image
      for (const result of data.query.search) {
        const fileName = result.title;
        const lowerFileName = fileName.toLowerCase();
        
        // Prefer images that look more scientific/botanical
        if (lowerFileName.includes('species') || 
            lowerFileName.includes('botanical') || 
            lowerFileName.includes('herbarium') ||
            lowerFileName.includes('flora') ||
            lowerFileName.includes('plantae')) {
          const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=300`;
          return { imageUrl, source: 'PlantNet-style' };
        }
      }
      
      // If no specific botanical image, use the first result
      const fileName = data.query.search[0].title;
      const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=300`;
      return { imageUrl, source: 'PlantNet-style' };
    }
    
    return { imageUrl: null, source: 'PlantNet-style', error: 'No images found' };
  } catch (error) {
    return { imageUrl: null, source: 'PlantNet-style', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Main function to get plant image
export async function getPlantImage(plantName: string): Promise<PlantImageResult> {
  // Check cache first
  if (imageCache.has(plantName)) {
    return imageCache.get(plantName)!;
  }
  
  try {
    // Try to get real plant image from Wikimedia Commons
    const wikimediaResult = await fetchFromWikimedia(plantName);
    if (wikimediaResult.imageUrl) {
      const result = { ...wikimediaResult, source: 'Wikimedia Commons' };
      imageCache.set(plantName, result);
      return result;
    }
  } catch (error) {
    console.log('Wikimedia failed for', plantName, error);
  }
  
  // If Wikimedia fails, use fallback
  const fallbackResult: PlantImageResult = {
    imageUrl: getFallbackImage(plantName),
    source: 'Fallback',
  };
  
  imageCache.set(plantName, fallbackResult);
  return fallbackResult;
}

// Batch function to get images for multiple plants
export async function getPlantImages(plantNames: string[]): Promise<{ [key: string]: PlantImageResult }> {
  const results: { [key: string]: PlantImageResult } = {};
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 2;
  for (let i = 0; i < plantNames.length; i += batchSize) {
    const batch = plantNames.slice(i, i + batchSize);
    const batchPromises = batch.map(async (name) => {
      const result = await getPlantImage(name);
      results[name] = result;
    });
    
    await Promise.all(batchPromises);
    
    // Add delay between batches to respect rate limits
    if (i + batchSize < plantNames.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return results;
}

// Function to preload images for better UX
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}