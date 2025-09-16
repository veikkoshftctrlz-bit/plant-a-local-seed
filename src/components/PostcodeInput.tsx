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
  return <div className="w-full max-w-md mx-auto relative">
      {/* Checkerboard top border */}
      <div className="h-6 w-full mb-4" style={{
        backgroundImage: `
          conic-gradient(from 90deg at 50% 50%, 
            hsl(var(--conservation-green)) 0deg 90deg, 
            transparent 90deg 180deg, 
            hsl(var(--conservation-green)) 180deg 270deg, 
            transparent 270deg 360deg
          )
        `,
        backgroundSize: '16px 16px'
      }}></div>
      
      <Card className="bg-gradient-to-b from-gray-300 to-amber-800 border-8 border-blue-600 shadow-none relative overflow-hidden" style={{
        borderStyle: 'solid',
        borderImageSource: 'repeating-linear-gradient(90deg, #2563eb 0px, #2563eb 8px, transparent 8px, transparent 16px)',
        borderImageSlice: '8 fill'
      }}>
        {/* Inner container with earth texture */}
        <div className="bg-gradient-to-b from-amber-100 to-amber-900 border-4 border-blue-600 m-2">
          <CardContent className="p-6 relative z-10 font-digital bg-gradient-to-b from-amber-50/80 to-amber-800/80">
        
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-conservation-green font-digital tracking-wider mb-2 animate-pulse">FLORA.GUARD</h2>
          <div className="text-conservation-green/70 font-mono-digital text-sm">&gt;&gt;&gt; SYSTEM INITIALIZED</div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input type="text" placeholder="ENTER_POSTCODE.EXE" value={postcode} onChange={e => setPostcode(e.target.value)} required className="pr-12 h-14 text-center text-lg font-mono-digital bg-black border-2 border-conservation-green text-conservation-green placeholder:text-conservation-green/50 focus:shadow-[0_0_20px] focus:shadow-conservation-green/50 transition-all duration-300 rounded-none" />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-conservation-green animate-pulse" />
          </div>
          
          <Button type="submit" disabled={!postcode.trim()} className="w-full h-14 bg-black border-2 border-conservation-green text-conservation-green font-digital text-xl hover:bg-conservation-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px] shadow-conservation-green/30 hover:shadow-[2px_2px_0px_0px] hover:shadow-conservation-green/50 active:translate-x-1 active:translate-y-1 font-bold">
            [EXECUTE_SCAN]
          </Button>
        </form>
          </CardContent>
        </div>
      </Card>
    </div>;
};
export default PostcodeInput;