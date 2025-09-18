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
import sachsenData from "./sachsen.json";
import sachsenAnhaltData from "./sachsen-anhalt.json";
import schleswigHolsteinData from "./schleswig-holstein.json";
import thueringenData from "./thueringen.json";
import kaerntenData from "./kaernten.json";
import niederoesterreichData from "./niederoesterreich.json";
import oberoesterreichData from "./oberoesterreich.json";
import salzburgData from "./salzburg.json";
import steiermarkData from "./steiermark.json";

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
  
  // Return real data for Sachsen
  if (state.toLowerCase().includes("sachsen") || state.toLowerCase().includes("saxony")) {
    return sachsenData as ConservationData[];
  }
  
  // Return real data for Sachsen-Anhalt
  if (state.toLowerCase().includes("sachsen-anhalt") || state.toLowerCase().includes("saxony-anhalt")) {
    return sachsenAnhaltData as ConservationData[];
  }
  
  // Return real data for Schleswig-Holstein
  if (state.toLowerCase().includes("schleswig") || state.toLowerCase().includes("holstein") || state.toLowerCase().includes("schleswig-holstein")) {
    return schleswigHolsteinData as ConservationData[];
  }
  
  // Return real data for Thüringen
  if (state.toLowerCase().includes("thüringen") || state.toLowerCase().includes("thueringen") || state.toLowerCase().includes("thuringia")) {
    return thueringenData as ConservationData[];
  }
  
  // Return real data for Kärnten
  if (state.toLowerCase().includes("kärnten") || state.toLowerCase().includes("kaernten") || state.toLowerCase().includes("carinthia")) {
    return kaerntenData as ConservationData[];
  }
  
  // Return real data for Niederösterreich
  if (state.toLowerCase().includes("niederösterreich") || state.toLowerCase().includes("niederoesterreich") || state.toLowerCase().includes("lower austria")) {
    return niederoesterreichData as ConservationData[];
  }
  
  // Return real data for Oberösterreich
  if (state.toLowerCase().includes("oberösterreich") || state.toLowerCase().includes("oberoesterreich") || state.toLowerCase().includes("upper austria")) {
    return oberoesterreichData as ConservationData[];
  }
  
  // Return real data for Salzburg
  if (state.toLowerCase().includes("salzburg")) {
    return salzburgData as ConservationData[];
  }
  
  // Return real data for Steiermark
  if (state.toLowerCase().includes("steiermark") || state.toLowerCase().includes("styria")) {
    return steiermarkData as ConservationData[];
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