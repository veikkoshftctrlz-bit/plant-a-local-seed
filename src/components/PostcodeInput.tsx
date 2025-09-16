import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin } from "lucide-react";

interface PostcodeInputProps {
  onPostcodeSubmit: (postcode: string) => void;
}

const PostcodeInput = ({ onPostcodeSubmit }: PostcodeInputProps) => {
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      onPostcodeSubmit(postcode.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/95 border-2 border-conservation-green/20 shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-conservation-green" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Find Local Conservation Plants
          </h2>
          <p className="text-muted-foreground">
            Enter your postcode to discover plants that help endangered species in your area
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="pr-12 h-12 text-center text-lg font-medium"
              required
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg bg-conservation-green hover:bg-conservation-green/90 text-primary-foreground"
            disabled={!postcode.trim()}
          >
            Discover Plants
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostcodeInput;