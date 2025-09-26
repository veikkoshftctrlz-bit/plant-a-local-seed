import { useState, useEffect, useRef } from "react";
import PostcodeInput from "@/components/PostcodeInput";
import AnimatedFolderBrowser from "@/components/AnimatedFolderBrowser";
import { getMockConservationData, type ConservationData } from "@/data/mockConservationData";
import backgroundVideo from "@/assets/background-video.mp4";
import resultsPageVideo from "@/assets/result_page_red.mp4";

const Index = () => {
  const [postcode, setPostcode] = useState<string>("");
  const [conservationData, setConservationData] = useState<ConservationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      <div className="min-h-screen relative overflow-hidden">
        {/* Video Background for Results Page - result_page_red.mp4 */}
        <video
          key="results-page-video"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            objectFit: 'cover',
            backgroundColor: '#000',
            pointerEvents: 'none'
          }}
        >
          <source src={resultsPageVideo} type="video/mp4" />
        </video>

        {/* Content */}
        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <header className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground font-digital">SEEDLE</h1>
              </div>
              <button
                onClick={resetSearch}
                className="bg-white border-2 border-[#0015ff] text-[#0015ff] font-digital px-6 py-3 hover:bg-[#0015ff] hover:text-white transition-all duration-300"
              >
                [{postcode}]
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {/* Use AnimatedFolderBrowser for all states */}
            <AnimatedFolderBrowser postcode={postcode} data={conservationData} />
          </main>

          {/* Footer */}
          <footer className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-white/20 mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-digital">SEEDLE</h3>
                  <p className="text-white/70 text-sm">
                    Conservation data platform for local plant species and biodiversity tracking.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-white/70 hover:text-white transition-colors">Instagram</a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Contact</h4>
                  <div className="space-y-2 text-sm text-white/70">
                    <p>Email: info@otherlife.com</p>
                    <p>Address: Berlin, Germany</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-[#0015ff] z-0" />
      
      
      {/* Video Background - First Page */}
      <video
        key="first-page-video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          objectFit: 'cover',
          backgroundColor: '#000'
        }}
        onError={(e) => console.error('Video error:', e)}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>


      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-4xl">
            {/* Hero Text */}
            <div className="space-y-4">
            </div>

            {/* Benefits */}
            <div></div>

            {/* Postcode Input */}
            <PostcodeInput onPostcodeSubmit={handlePostcodeSubmit} />

            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Index;