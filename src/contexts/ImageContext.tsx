import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import { getPlantImage } from '@/services/plantImageService';

interface ImageState {
  images: { [key: string]: string };
  loadingImages: { [key: string]: boolean };
  errors: { [key: string]: string };
}

interface ImageContextType {
  images: { [key: string]: string };
  loadingImages: { [key: string]: boolean };
  errors: { [key: string]: string };
  loadImage: (plantName: string, existingImage?: string) => Promise<void>;
  loadImages: (plants: Array<{ plant: string; image?: string }>) => Promise<void>;
  clearImages: () => void;
}

type ImageAction =
  | { type: 'SET_LOADING'; plantName: string; loading: boolean }
  | { type: 'SET_IMAGE'; plantName: string; imageUrl: string }
  | { type: 'SET_ERROR'; plantName: string; error: string }
  | { type: 'CLEAR_IMAGES' }
  | { type: 'BATCH_LOADING'; plantNames: string[]; loading: boolean };

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const imageReducer = (state: ImageState, action: ImageAction): ImageState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loadingImages: {
          ...state.loadingImages,
          [action.plantName]: action.loading
        }
      };
    
    case 'SET_IMAGE':
      return {
        ...state,
        images: {
          ...state.images,
          [action.plantName]: action.imageUrl
        },
        loadingImages: {
          ...state.loadingImages,
          [action.plantName]: false
        },
        errors: {
          ...state.errors,
          [action.plantName]: undefined as any
        }
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        loadingImages: {
          ...state.loadingImages,
          [action.plantName]: false
        },
        errors: {
          ...state.errors,
          [action.plantName]: action.error
        }
      };
    
    case 'CLEAR_IMAGES':
      return {
        images: {},
        loadingImages: {},
        errors: {}
      };
    
    case 'BATCH_LOADING':
      const newLoadingImages = { ...state.loadingImages };
      action.plantNames.forEach(plantName => {
        newLoadingImages[plantName] = action.loading;
      });
      return {
        ...state,
        loadingImages: newLoadingImages
      };
    
    default:
      return state;
  }
};

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, {
    images: {},
    loadingImages: {},
    errors: {}
  });

  // Track ongoing requests to prevent duplicate API calls
  const ongoingRequests = useRef<Set<string>>(new Set());

  const loadImage = useCallback(async (plantName: string, existingImage?: string) => {
    // If image already exists, use it immediately
    if (existingImage && existingImage.trim() !== '') {
      dispatch({ type: 'SET_IMAGE', plantName, imageUrl: existingImage });
      return;
    }

    // If already loading or loaded, don't make duplicate requests
    if (ongoingRequests.current.has(plantName) || state.images[plantName]) {
      return;
    }

    // If already has an error, don't retry automatically
    if (state.errors[plantName]) {
      return;
    }

    ongoingRequests.current.add(plantName);
    dispatch({ type: 'SET_LOADING', plantName, loading: true });

    try {
      const result = await getPlantImage(plantName);
      console.log('ImageContext - Result for', plantName, ':', result);
      if (result.imageUrl) {
        dispatch({ type: 'SET_IMAGE', plantName, imageUrl: result.imageUrl });
        console.log('ImageContext - Image set for', plantName);
      } else {
        dispatch({ type: 'SET_ERROR', plantName, error: result.error || 'No image found' });
        console.log('ImageContext - Error for', plantName, result.error);
      }
    } catch (error) {
      console.log('ImageContext - Exception for', plantName, error);
      dispatch({ 
        type: 'SET_ERROR', 
        plantName, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      // Clear loading state
      dispatch({ type: 'SET_LOADING', plantName, loading: false });
      ongoingRequests.current.delete(plantName);
      console.log('ImageContext - Loading cleared for', plantName);
    }
  }, [state.images, state.errors]);

  const loadImages = useCallback(async (plants: Array<{ plant: string; image?: string }>) => {
    if (plants.length === 0) return;

    // Set all as loading first
    const plantNames = plants.map(p => p.plant);
    dispatch({ type: 'BATCH_LOADING', plantNames, loading: true });

    // Process images in batches to avoid overwhelming the API
    const batchSize = 3;
    for (let i = 0; i < plants.length; i += batchSize) {
      const batch = plants.slice(i, i + batchSize);
      
      // Process batch in parallel
      const batchPromises = batch.map(plant => 
        loadImage(plant.plant, plant.image)
      );
      
      await Promise.all(batchPromises);
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < plants.length) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }, [loadImage]);

  const clearImages = useCallback(() => {
    dispatch({ type: 'CLEAR_IMAGES' });
    ongoingRequests.current.clear();
  }, []);

  const value: ImageContextType = {
    images: state.images,
    loadingImages: state.loadingImages,
    errors: state.errors,
    loadImage,
    loadImages,
    clearImages
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};
