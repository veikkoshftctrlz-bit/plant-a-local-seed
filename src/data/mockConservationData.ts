export interface ConservationData {
  plant: string;
  endangeredSpecies: string;
  endangermentLevel: "Critical" | "Endangered" | "Vulnerable" | "Near Threatened";
  ecologicalBenefits: string;
  purchaseUrl: string;
}

// Mock data - in a real app, this would come from an API based on postcode
export const getMockConservationData = (postcode: string): ConservationData[] => {
  // This would normally be an API call that returns data based on the postcode
  return [
    {
      plant: "Purple Coneflower (Echinacea)",
      endangeredSpecies: "Monarch Butterfly",
      endangermentLevel: "Endangered",
      ecologicalBenefits: "Provides nectar for butterflies and seeds for birds",
      purchaseUrl: "https://example.com/purple-coneflower-seeds"
    },
    {
      plant: "Wild Bergamot",
      endangeredSpecies: "Native Bees",
      endangermentLevel: "Vulnerable",
      ecologicalBenefits: "Long blooming period supports various bee species",
      purchaseUrl: "https://example.com/wild-bergamot-seeds"
    },
    {
      plant: "Black-Eyed Susan",
      endangeredSpecies: "American Goldfinch",
      endangermentLevel: "Near Threatened",
      ecologicalBenefits: "Seeds provide food through winter months",
      purchaseUrl: "https://example.com/black-eyed-susan-seeds"
    },
    {
      plant: "Wild Lupine",
      endangeredSpecies: "Karner Blue Butterfly",
      endangermentLevel: "Critical",
      ecologicalBenefits: "Only host plant for Karner Blue caterpillars",
      purchaseUrl: "https://example.com/wild-lupine-seeds"
    },
    {
      plant: "New England Aster",
      endangeredSpecies: "Migrating Butterflies",
      endangermentLevel: "Vulnerable",
      ecologicalBenefits: "Late season nectar for fall migrations",
      purchaseUrl: "https://example.com/new-england-aster-seeds"
    },
    {
      plant: "Cardinal Flower",
      endangeredSpecies: "Ruby-throated Hummingbird",
      endangermentLevel: "Near Threatened",
      ecologicalBenefits: "Primary nectar source for hummingbirds",
      purchaseUrl: "https://example.com/cardinal-flower-seeds"
    }
  ];
};