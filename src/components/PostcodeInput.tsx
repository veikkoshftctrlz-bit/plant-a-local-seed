import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, ChevronDown } from "lucide-react";
interface PostcodeInputProps {
  onPostcodeSubmit: (postcode: string) => void;
}
const PostcodeInput = ({
  onPostcodeSubmit
}: PostcodeInputProps) => {
  const [postcode, setPostcode] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredStates, setFilteredStates] = useState<string[]>([]);

  const validStates = [
    "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen",
    "Niedersachsen", "Mecklenburg-Vorpommern", "Nordrhein-Westfalen", "Rheinland-Pfalz",
    "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
    "Burgenland", "Kärnten", "Niederösterreich", "Oberösterreich", "Salzburg",
    "Steiermark", "Tirol", "Vorarlberg", "Wien"
  ];

  const handleInputChange = (value: string) => {
    setPostcode(value);
    if (value.length > 0) {
      const filtered = validStates.filter(state => 
        state.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleStateSelect = (state: string) => {
    setPostcode(state);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim() && validStates.includes(postcode)) {
      onPostcodeSubmit(postcode.trim());
    }
  };
  return <div className="w-full max-w-md mx-auto relative">
      {/* Checkerboard top border */}
      <div className="h-6 w-full mb-4" style={{
        backgroundImage: `
          conic-gradient(from 90deg at 50% 50%, 
            white 0deg 90deg, 
            transparent 90deg 180deg, 
            white 180deg 270deg, 
            transparent 270deg 360deg
          )
        `,
        backgroundSize: '16px 16px'
      }}></div>
      
      <Card className="bg-[#0015ff] border-8 border-blue-600 shadow-none relative overflow-hidden" style={{
        borderStyle: 'solid',
        borderImageSource: 'repeating-linear-gradient(90deg, #2563eb 0px, #2563eb 8px, transparent 8px, transparent 16px)',
        borderImageSlice: '8 fill'
      }}>
        {/* Inner container with earth texture */}
        <div className="bg-[#0015ff] border-4 border-blue-600 m-2">
          <CardContent className="p-6 relative z-10 font-digital bg-[#0015ff]">
        
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white font-digital tracking-wider mb-2 animate-pulse">FLORA.GUARD</h2>
          <div className="text-white/80 font-mono-digital text-sm">&gt;&gt;&gt; SYSTEM INITIALISED</div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="BUNDESLAND" 
              value={postcode} 
              onChange={e => handleInputChange(e.target.value)}
              onFocus={() => postcode.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              required 
              className="pr-12 h-14 text-center text-lg font-mono-digital bg-black border-2 border-white text-white placeholder:text-white/60 focus:shadow-[0_0_20px] focus:shadow-white/50 transition-all duration-300 rounded-none" 
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white animate-pulse" />
            
            {/* Dropdown with valid states */}
            {showDropdown && filteredStates.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-black max-h-48 overflow-y-auto z-50">
                {filteredStates.map((state, index) => (
                  <div
                    key={index}
                    onClick={() => handleStateSelect(state)}
                    className="p-3 text-black hover:bg-yellow-300 cursor-pointer font-digital text-sm border-b border-gray-200 last:border-b-0"
                  >
                    {state}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Button type="submit" disabled={!postcode.trim() || !validStates.includes(postcode)} className="w-full h-14 bg-black border-2 border-white text-white font-digital text-xl hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px] shadow-white/30 hover:shadow-[2px_2px_0px_0px] hover:shadow-white/50 active:translate-x-1 active:translate-y-1 font-bold">
            [EXECUTE_SCAN]
          </Button>
        </form>
          </CardContent>
        </div>
      </Card>
    </div>;
};
export default PostcodeInput;