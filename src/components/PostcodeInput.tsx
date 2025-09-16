import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin } from "lucide-react";
interface PostcodeInputProps {
  onPostcodeSubmit: (postcode: string) => void;
}
const PostcodeInput = ({
  onPostcodeSubmit
}: PostcodeInputProps) => {
  const [postcode, setPostcode] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      onPostcodeSubmit(postcode.trim());
    }
  };
  return <Card className="w-full max-w-md mx-auto bg-black border-4 border-conservation-green shadow-[8px_8px_0px_0px] shadow-conservation-green/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)'}}></div>
      <CardContent className="p-8 relative z-10 font-digital">
        
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-conservation-green font-digital tracking-wider mb-2 animate-pulse">FLORA.GUARD</h2>
          <div className="text-conservation-green/70 font-mono-digital text-sm">&gt;&gt;&gt; SYSTEM INITIALIZED</div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="ENTER_POSTCODE.EXE" 
              value={postcode} 
              onChange={e => setPostcode(e.target.value)} 
              className="pr-12 h-14 text-center text-lg font-mono-digital bg-black border-2 border-conservation-green text-conservation-green placeholder:text-conservation-green/50 focus:shadow-[0_0_20px] focus:shadow-conservation-green/50 transition-all duration-300" 
              required 
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-conservation-green animate-pulse" />
          </div>
          
          <Button 
            type="submit" 
            disabled={!postcode.trim()} 
            className="w-full h-14 bg-black border-2 border-conservation-green text-conservation-green font-digital text-xl font-bold hover:bg-conservation-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px] shadow-conservation-green/30 hover:shadow-[2px_2px_0px_0px] hover:shadow-conservation-green/50 active:translate-x-1 active:translate-y-1"
          >
            [EXECUTE_SCAN]
          </Button>
        </form>
      </CardContent>
    </Card>;
};
export default PostcodeInput;