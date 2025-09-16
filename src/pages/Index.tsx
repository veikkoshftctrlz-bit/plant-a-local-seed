import { useState } from "react";
import PostcodeInput from "@/components/PostcodeInput";
import ConservationTable from "@/components/ConservationTable";
import { getMockConservationData, type ConservationData } from "@/data/mockConservationData";
import heroImage from "@/assets/conservation-hero.jpg";
import { Leaf, Heart, Sprout } from "lucide-react";
const Index = () => {
  const [postcode, setPostcode] = useState<string>("");
  const [conservationData, setConservationData] = useState<ConservationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handlePostcodeSubmit = async (submittedPostcode: string) => {
    setIsLoading(true);
    setPostcode(submittedPostcode);

    // Simulate API call delay
    setTimeout(() => {
      const data = getMockConservationData(submittedPostcode);
      setConservationData(data);
      setIsLoading(false);
    }, 1000);
  };
  const resetSearch = () => {
    setPostcode("");
    setConservationData([]);
  };
  if (postcode && !isLoading) {
    return <div className="min-h-screen relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-conservation-green/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <header className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground font-digital">OtherLife</h1>
              </div>
              <button 
                onClick={resetSearch} 
                className="bg-black border-2 border-[#0015ff] text-[#0015ff] font-digital px-6 py-3 hover:bg-[#0015ff] hover:text-black transition-all duration-300"
              >
                [NEW_SEARCH]
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <ConservationTable postcode={postcode} data={conservationData} />
          </main>
        </div>
      </div>;
  }
  return <div className="min-h-screen relative overflow-hidden">
      {/* Solid Blue Background (no white box/overlay) */}
      <div className="absolute inset-0 bg-[#0015ff]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 justify-center">
            <Leaf className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">OtherLife</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 bg-[#0015ff]">
          <div className="text-center space-y-8 max-w-4xl">
            {/* Hero Text */}
            <div className="space-y-4">
              
              
            </div>

            {/* Benefits */}
            

            {/* Postcode Input */}
            <PostcodeInput onPostcodeSubmit={handlePostcodeSubmit} />

            {isLoading && <div className="text-center py-8">
                <div className="inline-flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-conservation-green border-t-transparent rounded-full animate-spin" />
                  <span className="text-muted-foreground">Finding conservation plants for your area...</span>
                </div>
              </div>}
          </div>
        </main>

        {/* Footer */}
        
      </div>
    </div>;
};
export default Index;