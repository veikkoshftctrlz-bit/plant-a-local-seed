import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import { ConservationData } from "@/data/mockConservationData";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { getPlantImage, PlantImageResult } from "../services/plantImageService";

interface AnimatedFolderBrowserProps {
  postcode: string;
  data: ConservationData[];
}

// Function to get consistent color for each plant
const getPlantColor = (plantName: string): string => {
  const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5'];
  
  const hash = plantName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

export default function AnimatedFolderBrowser({ postcode, data }: AnimatedFolderBrowserProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [plantImages, setPlantImages] = useState<{ [key: string]: PlantImageResult }>({});
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  // Sort plants alphabetically by name
  const sortedPlants = [...data].sort((a, b) => {
    const nameA = a.plant.split('(')[0].trim().toLowerCase();
    const nameB = b.plant.split('(')[0].trim().toLowerCase();
    return nameA.localeCompare(nameB);
  });

  // Load plant images
  useEffect(() => {
    const loadPlantImages = async () => {
      const plantNames = sortedPlants.map(item => item.plant);
      
      for (const plantName of plantNames) {
        if (!plantImages[plantName]) {
          setLoadingImages(prev => ({ ...prev, [plantName]: true }));
          
          try {
            const result = await getPlantImage(plantName);
            setPlantImages(prev => ({ ...prev, [plantName]: result }));
          } catch (error) {
            console.error('Error loading image for', plantName, error);
          } finally {
            setLoadingImages(prev => ({ ...prev, [plantName]: false }));
          }
        }
      }
    };

    if (sortedPlants.length > 0) {
      loadPlantImages();
    }
  }, [sortedPlants.length]);

  // Fifth iteration - working wheel scrolling with scrollIntoView centering
  const containerRef = useRef<HTMLDivElement>(null);
  const folderRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Wheel accumulator for sensitivity control
  const wheelAccumulatorRef = useRef(0);
  
  const handleWheel = useCallback((e: WheelEvent) => {
    const delta = e.deltaY;
    const isAtTop = selectedIndex === 0;
    const isAtBottom = selectedIndex === sortedPlants.length - 1;
    
    // Accumulate wheel movement for sensitivity control
    wheelAccumulatorRef.current += delta;
    const WHEEL_THRESHOLD = 20; // Adjust this for sensitivity
    
    if (wheelAccumulatorRef.current > WHEEL_THRESHOLD && !isAtBottom) {
      // Scroll down - next folder
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, sortedPlants.length - 1));
      wheelAccumulatorRef.current = 0; // Reset accumulator
    } else if (wheelAccumulatorRef.current < -WHEEL_THRESHOLD && !isAtTop) {
      // Scroll up - previous folder
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
      wheelAccumulatorRef.current = 0; // Reset accumulator
    }
    // If we can't scroll through folders, allow normal page scrolling
  }, [selectedIndex, sortedPlants.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Auto-scroll to keep selected folder centered
  useEffect(() => {
    const selectedFolder = folderRefs.current[selectedIndex];
    if (selectedFolder) {
      // Use a small delay to ensure the DOM is updated
      setTimeout(() => {
        selectedFolder.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }, 50);
    }
  }, [selectedIndex]);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto">
      {/* Add hover styles for buy button */}
      <style>{buyButtonHover}</style>
      
      {/* Animated Folder Stack */}
      <div style={container}>
        {/* Fade effect at top */}
        <div style={fadeTop}></div>
        
        <div 
          style={{
            ...scrollableArea,
            maxHeight: '85vh',
            overflowY: 'auto',
            paddingBottom: `${sortedPlants.length * 50}px`
          }}
          className="hide-scrollbar"
        >
          {sortedPlants.map((item, index) => {
            const plantName = item.plant.split('(')[0].trim();
            const isSelected = selectedIndex === index;
            const shouldSlideDown = selectedIndex !== null && selectedIndex < index;
            
            return (
              <FolderCard 
                key={index}
                ref={(el) => (folderRefs.current[index] = el)}
                plantName={plantName}
                index={index}
                isVisible={true}
                selectedIndex={selectedIndex}
                item={item}
                plantImages={plantImages}
                loadingImages={loadingImages}
                isSelected={isSelected}
                shouldSlideDown={shouldSlideDown}
              />
            );
          })}
        </div>
        
        {/* Fade effect at bottom */}
        <div style={fadeBottom}></div>
      </div>

      {data.length === 0 && (
        <div className="bg-black border-2 border-conservation-green/50 p-8 text-center">
          <p className="text-conservation-green/70 font-mono-digital">
            &gt;&gt;&gt; NO_FILES_AVAILABLE_FOR_POSTCODE<br/>
            &gt;&gt;&gt; EXPANDING_DATABASE...
          </p>
        </div>
      )}
    </div>
  );
}

interface FolderCardProps {
  plantName: string;
  index: number;
  isVisible: boolean;
  selectedIndex: number;
  item: ConservationData;
  plantImages: { [key: string]: PlantImageResult };
  loadingImages: { [key: string]: boolean };
  isSelected: boolean;
  shouldSlideDown: boolean;
}

const FolderCard = forwardRef<HTMLDivElement, FolderCardProps>(({ plantName, index, isVisible, selectedIndex, item, plantImages, loadingImages, isSelected, shouldSlideDown }, ref) => {

  return (
        <div
          ref={ref}
          className={`folder-container-${index}`}
          style={{
            ...folderContainer,
            opacity: 1,
            transform: isSelected
              ? 'translateY(0px) rotate(0deg) scale(1.05)'
              : shouldSlideDown 
                ? 'translateY(200px) rotate(0deg)' 
                : 'translateY(0px) rotate(0deg)',
            transition: 'transform 0.15s ease-out, scale 0.1s ease-out',
            zIndex: isSelected ? 2000 : 1000 + index,
          }}
        >
      <div 
        style={{
          ...folder,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out',
          boxShadow: isSelected 
            ? "0 15px 30px rgba(0,0,0,0.3), 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)"
            : "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
        }}
        className="folder"
      >
        {/* Folder Tab */}
        <div style={{
          ...folderTab,
          right: index % 2 === 0 ? 20 : 'auto',
          left: index % 2 === 1 ? 20 : 'auto',
        }}>
          <div style={folderTabText}>
            {plantName.length > 20 ? plantName.substring(0, 20) + '...' : plantName}
          </div>
        </div>
        
        {/* Folder Body */}
        <div style={folderBody}>
          <div style={folderContent}>
            <div style={textContent}>
              <div style={categorySection}>
                <div style={categoryHeader}>PLANT</div>
                <div style={categoryInfo}>{item.plant}</div>
              </div>
              
              <div style={categorySection}>
                <div style={categoryHeader}>DEPENDENT SPECIES</div>
                <div style={categoryInfo}>{item.dependent_species}</div>
              </div>
              
              <div style={categorySection}>
                <div style={categoryHeader}>STATUS</div>
                <div style={statusContainer}>
                  <div style={{
                    ...statusBadge,
                    backgroundColor: item.status.includes('CR') ? '#fecaca' : 
                                   item.status.includes('EN') ? '#fed7aa' : 
                                   item.status.includes('VU') ? '#fef08a' : 
                                   item.status.includes('NT') ? '#bbf7d0' : '#f3f4f6',
                    color: item.status.includes('CR') ? '#991b1b' : 
                           item.status.includes('EN') ? '#9a3412' : 
                           item.status.includes('VU') ? '#a16207' : 
                           item.status.includes('NT') ? '#166534' : '#374151',
                    borderColor: item.status.includes('CR') ? '#f87171' : 
                                item.status.includes('EN') ? '#fb923c' : 
                                item.status.includes('VU') ? '#facc15' : 
                                item.status.includes('NT') ? '#4ade80' : '#d1d5db'
                  }}>
                    <AlertTriangle className="w-3 h-3" style={{ marginRight: '4px' }} />
                    {item.status}
                  </div>
                </div>
              </div>
              
                      <div style={categorySection}>
                        <div style={categoryHeader}>DESCRIPTION</div>
                        <div style={categoryInfo}>{item.description}</div>
                      </div>
                    </div>
            
            <div style={imageContent}>
              {/* Real plant image with loading state */}
              {loadingImages[item.plant] ? (
                <div style={imagePlaceholder}>
                  <div style={loadingSpinner}></div>
                </div>
              ) : plantImages[item.plant]?.imageUrl ? (
                <img
                  src={plantImages[item.plant].imageUrl!}
                  alt={plantName}
                  style={plantImage}
                  onError={(e) => {
                    // Fallback to colored square if image fails to load
                    const target = e.target as HTMLImageElement;
                    const fallbackDiv = document.createElement('div');
                    fallbackDiv.style.cssText = `
                      width: 120px;
                      height: 120px;
                      background-color: ${getPlantColor(item.plant)};
                      border: 2px solid #000;
                      border-radius: 8px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 18px;
                      font-weight: bold;
                      color: white;
                      text-align: center;
                    `;
                    fallbackDiv.textContent = item.plant.split(' ')[0].substring(0, 3).toUpperCase();
                    target.parentNode?.replaceChild(fallbackDiv, target);
                  }}
                />
              ) : (
                <div style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: getPlantColor(item.plant),
                  border: "2px solid #000",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center"
                }}>
                  {item.plant.split(' ')[0].substring(0, 3).toUpperCase()}
                </div>
              )}
              
              {/* Buy button under the image */}
              <div style={buyButtonContainer}>
                {item.seed_link && item.seed_link.trim() !== '' ? (
                  <a 
                    href={item.seed_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={buyButton}
                    title={`Buy ${item.plant} seeds`}
                    onClick={(e) => {
                      if (!item.seed_link || item.seed_link.trim() === '') {
                        e.preventDefault();
                        alert('No seed link available for this plant');
                      }
                    }}
                  >
                    BUY
                  </a>
                ) : (
                  <button 
                    style={{...buyButton, backgroundColor: '#666', cursor: 'not-allowed'}}
                    disabled
                    title="No seed link available"
                  >
                    NO LINK
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

FolderCard.displayName = 'FolderCard';



/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    margin: "0 auto",
    maxWidth: 600,
    paddingTop: "5vh",
    paddingBottom: "50vh",
    width: "100%",
    position: "relative",
    zIndex: 10,
}

const scrollableArea: React.CSSProperties = {
  maxHeight: "none",
  overflowY: "visible",
  padding: "20px 20px 120px 20px",
  position: "relative",
  marginBottom: "40px",
}

const fadeTop: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "40px",
  background: "transparent",
  zIndex: 100,
  pointerEvents: "none",
  borderRadius: "0 0 8px 8px",
}

const fadeBottom: React.CSSProperties = {
  position: "absolute",
  bottom: "40px",
  left: 0,
  right: 0,
  height: "40px",
  background: "transparent",
  zIndex: 100,
  pointerEvents: "none",
  borderRadius: "8px 8px 0 0",
}

const folderContainer: React.CSSProperties = {
  overflow: "visible",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 40,
  marginBottom: -420,
  marginTop: 20,
}


const folder: React.CSSProperties = {
  width: 800,
  height: 400,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: 8,
  background: "#f5f5f5",
  border: "2px solid #000",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "center center",
  position: "relative",
}

const folderTab: React.CSSProperties = {
  position: "absolute",
  top: -15,
  right: 20,
  background: "#fbbf24", // Yellow color
  border: "2px solid #000",
  borderRadius: "6px 6px 0 0",
  padding: "8px 16px",
  minWidth: "140px",
  maxWidth: "220px",
  textAlign: "center",
  zIndex: 15,
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
}

const folderTabText: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#000",
  fontFamily: "monospace",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}

const folderBody: React.CSSProperties = {
  width: "100%",
  height: "100%",
  background: "#ffffff", // White
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  marginTop: "8px",
}

const folderContent: React.CSSProperties = {
  width: "100%",
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "flex-start",
  gap: "20px",
}

const textContent: React.CSSProperties = {
  flex: 1,
  textAlign: "left",
}

const imageContent: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    width: "140px",
    height: "100%",
}

const plantImage: React.CSSProperties = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "8px",
  border: "2px solid #000",
}

const imagePlaceholder: React.CSSProperties = {
  width: "120px",
  height: "120px",
  backgroundColor: "#f0f0f0",
  border: "2px solid #000",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const placeholderText: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#666",
  fontFamily: "monospace",
}

const categorySection: React.CSSProperties = {
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}

const categoryHeader: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#000",
  fontFamily: "monospace",
  marginBottom: "4px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}

const categoryInfo: React.CSSProperties = {
  fontSize: "16px",
  color: "#333",
  lineHeight: "1.4",
  fontFamily: "monospace",
}

const statusContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  color: "#333",
  fontFamily: "monospace",
}

const statusText: React.CSSProperties = {
  fontSize: "16px",
  color: "#333",
  fontFamily: "monospace",
}

const loadingSpinner: React.CSSProperties = {
    width: "24px",
    height: "24px",
    border: "2px solid #f3f3f3",
    borderTop: "2px solid #333",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
}

const buyButtonContainer: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
}

const buyButton: React.CSSProperties = {
    display: "inline-block",
    padding: "8px 16px",
    backgroundColor: "#000",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    border: "2px solid #000",
    fontFamily: "monospace",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
    cursor: "pointer",
}

// Add hover effect via CSS-in-JS
const buyButtonHover = `
  a:hover {
    background-color: #fff !important;
    color: #000 !important;
    border-color: #000 !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const statusBadge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 8px",
  borderRadius: "4px",
  border: "1px solid",
  fontSize: "12px",
  fontWeight: "bold",
  fontFamily: "monospace",
}
