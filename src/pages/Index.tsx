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
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-conservation-green/5">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <button 
              onClick={resetSearch}
              className="inline-flex items-center gap-2 text-conservation-green hover:text-conservation-green/80 transition-colors"
            >
              <Leaf className="w-5 h-5" />
              ← Search Another Location
            </button>
          </div>
          <ConservationTable postcode={postcode} data={conservationData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-conservation-green/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 justify-center">
            <Leaf className="w-8 h-8 text-conservation-green" />
            <h1 className="text-2xl font-bold text-foreground">FloraGuard</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-4xl">
            {/* Hero Text */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Plant for
                <span className="text-transparent bg-gradient-to-r from-conservation-green to-conservation-orange bg-clip-text">
                  {" "}Conservation
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Discover native plants that support endangered species in your local area. 
                Every garden can make a difference.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 my-12">
              <div className="text-center space-y-2">
                <Heart className="w-12 h-12 mx-auto text-conservation-orange" />
                <h3 className="font-semibold">Save Species</h3>
                <p className="text-sm text-muted-foreground">Support local endangered wildlife</p>
              </div>
              <div className="text-center space-y-2">
                <Sprout className="w-12 h-12 mx-auto text-conservation-green" />
                <h3 className="font-semibold">Native Plants</h3>
                <p className="text-sm text-muted-foreground">Perfectly adapted to your climate</p>
              </div>
              <div className="text-center space-y-2">
                <Leaf className="w-12 h-12 mx-auto text-conservation-green" />
                <h3 className="font-semibold">Easy to Grow</h3>
                <p className="text-sm text-muted-foreground">Low maintenance, high impact</p>
              </div>
            </div>

            {/* Postcode Input */}
            <PostcodeInput onPostcodeSubmit={handlePostcodeSubmit} />

            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-conservation-green border-t-transparent rounded-full animate-spin" />
                  <span className="text-muted-foreground">Finding conservation plants for your area...</span>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Join the conservation movement, one garden at a time.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
