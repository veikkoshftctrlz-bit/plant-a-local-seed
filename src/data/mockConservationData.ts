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
import badenWuerttembergData from "./baden-wuerttemberg.json";
import hessenData from "./hessen.json";
import berlinData from "./berlin.json";
import brandenburgData from "./brandenburg.json";
import bremenData from "./bremen.json";
import hamburgData from "./hamburg.json";
import niedersachsenData from "./niedersachsen.json";
import mecklenburgVorpommernData from "./mecklenburg-vorpommern.json";
import rheinlandPfalzData from "./rheinland-pfalz.json";

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
  
  // Return real data for Baden-Württemberg
  if (state.toLowerCase().includes("baden") || state.toLowerCase().includes("württemberg") || state.toLowerCase().includes("wuerttemberg")) {
    return badenWuerttembergData as ConservationData[];
  }
  
  // Return real data for Hessen
  if (state.toLowerCase().includes("hessen") || state.toLowerCase().includes("hesse")) {
    return hessenData as ConservationData[];
  }
  
  // Return real data for Berlin
  if (state.toLowerCase().includes("berlin")) {
    return berlinData as ConservationData[];
  }
  
  // Return real data for Brandenburg
  if (state.toLowerCase().includes("brandenburg")) {
    return brandenburgData as ConservationData[];
  }
  
  // Return real data for Bremen
  if (state.toLowerCase().includes("bremen")) {
    return bremenData as ConservationData[];
  }
  
  // Return real data for Hamburg
  if (state.toLowerCase().includes("hamburg")) {
    return hamburgData as ConservationData[];
  }
  
  // Return real data for Niedersachsen
  if (state.toLowerCase().includes("niedersachsen") || state.toLowerCase().includes("lower saxony")) {
    return niedersachsenData as ConservationData[];
  }
  
  // Return real data for Mecklenburg-Vorpommern
  if (state.toLowerCase().includes("mecklenburg") || state.toLowerCase().includes("vorpommern") || state.toLowerCase().includes("mecklenburg-vorpommern")) {
    return mecklenburgVorpommernData as ConservationData[];
  }
  
  // Return real data for Rheinland-Pfalz
  if (state.toLowerCase().includes("rheinland") || state.toLowerCase().includes("pfalz") || state.toLowerCase().includes("rheinland-pfalz")) {
    return rheinlandPfalzData as ConservationData[];
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