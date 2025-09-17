export interface ConservationData {
  image: string;
  plant: string;
  dependent_species: string;
  status: string;
  description: string;
  seed_link: string;
}

import nordrheinWestfalenData from "./nordrhein-westfalen.json";
import bayernData from "./bayern.json";

// Return real data for specific states, mock data for others
export const getMockConservationData = (state: string): ConservationData[] => {
  // Return real data for Nordrhein-Westfalen
  if (state.toLowerCase().includes("nordrhein") || state.toLowerCase().includes("westfalen")) {
    return nordrheinWestfalenData as ConservationData[];
  }
  
  // Return real data for Bayern
  if (state.toLowerCase().includes("bayern") || state.toLowerCase().includes("bavaria")) {
    return bayernData as ConservationData[];
  }
  
  // Mock data for other states
  return [
    {
      image: "",
      plant: "Sample Plant 1",
      dependent_species: "Sample Species 1",
      status: "VU (Vulnerable)",
      description: "Sample description for other states",
      seed_link: "https://example.com/sample1"
    },
    {
      image: "",
      plant: "Sample Plant 2", 
      dependent_species: "Sample Species 2",
      status: "EN (Endangered)",
      description: "Sample description for other states",
      seed_link: "https://example.com/sample2"
    }
  ];
};