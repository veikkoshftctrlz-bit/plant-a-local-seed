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
  return <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/95 border-2 border-conservation-green/20 shadow-2xl">
      <CardContent className="p-8">
        
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input type="text" placeholder="Enter your postcode" value={postcode} onChange={e => setPostcode(e.target.value)} className="pr-12 h-12 text-center text-lg font-medium" required />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          
          <Button type="submit" disabled={!postcode.trim()} className="w-full h-12 text-[#47be24] text-3xl font-bold bg-transparent">
            Discover Plants
          </Button>
        </form>
      </CardContent>
    </Card>;
};
export default PostcodeInput;