import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ConservationData {
  plant: string;
  endangeredSpecies: string;
  endangermentLevel: "Critical" | "Endangered" | "Vulnerable" | "Near Threatened";
  ecologicalBenefits: string;
  purchaseUrl: string;
}

interface ConservationTableProps {
  postcode: string;
  data: ConservationData[];
}

const endangermentColors = {
  "Critical": "destructive",
  "Endangered": "conservation-orange",
  "Vulnerable": "accent",
  "Near Threatened": "conservation-green"
};

const ConservationTable = ({ postcode, data }: ConservationTableProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card className="bg-black border-4 border-conservation-green shadow-[8px_8px_0px_0px] shadow-conservation-green/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)'
        }}></div>
        <CardHeader className="relative z-10 bg-gradient-to-r from-conservation-green/20 to-conservation-orange/20">
          <CardTitle className="flex items-center gap-2 text-2xl font-digital text-conservation-green">
            <CheckCircle2 className="w-6 h-6 text-conservation-green animate-pulse" />
            FLORA.DATA_{postcode}
          </CardTitle>
          <p className="text-conservation-green/70 font-mono-digital text-sm">
            &gt;&gt;&gt; SPECIES_CONSERVATION_PROTOCOL.ACTIVE
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {data.map((item, index) => (
          <Card key={index} className="bg-black border-2 border-conservation-green/50 shadow-[4px_4px_0px_0px] shadow-conservation-green/30 hover:shadow-[6px_6px_0px_0px] hover:shadow-conservation-green/50 transition-all relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0, 255, 0, 0.1) 4px, rgba(0, 255, 0, 0.1) 8px)'
            }}></div>
            <CardContent className="p-6 relative z-10">
              <div className="grid md:grid-cols-5 gap-4 items-center">
                {/* Plant */}
                <div className="md:col-span-1">
                  <h3 className="font-bold text-lg text-conservation-green mb-1 font-digital">
                    {item.plant.toUpperCase()}
                  </h3>
                  <p className="text-sm text-conservation-green/60 font-mono-digital">[PLANT_TYPE]</p>
                </div>

                {/* Endangered Species */}
                <div className="md:col-span-1">
                  <p className="font-semibold text-conservation-green mb-1 font-digital">{item.endangeredSpecies.toUpperCase()}</p>
                  <p className="text-sm text-conservation-green/60 font-mono-digital">[TARGET_SPECIES]</p>
                </div>

                {/* Endangerment Level */}
                <div className="md:col-span-1">
                  <Badge 
                    variant="secondary" 
                    className={`
                      ${item.endangermentLevel === 'Critical' ? 'bg-red-900/20 text-red-400 border-red-400/30' : ''}
                      ${item.endangermentLevel === 'Endangered' ? 'bg-orange-900/20 text-orange-400 border-orange-400/30' : ''}
                      ${item.endangermentLevel === 'Vulnerable' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-400/30' : ''}
                      ${item.endangermentLevel === 'Near Threatened' ? 'bg-conservation-green/20 text-conservation-green border-conservation-green/30' : ''}
                      flex items-center gap-1 font-digital text-xs
                    `}
                  >
                    <AlertTriangle className="w-3 h-3 animate-pulse" />
                    {item.endangermentLevel.toUpperCase()}
                  </Badge>
                </div>

                {/* Ecological Benefits */}
                <div className="md:col-span-1">
                  <p className="text-sm text-conservation-green/80 font-mono-digital">{item.ecologicalBenefits}</p>
                </div>

                {/* Purchase Button */}
                <div className="md:col-span-1">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full bg-black border-2 border-conservation-green text-conservation-green font-digital text-xs hover:bg-conservation-green hover:text-black transition-all duration-300 shadow-[2px_2px_0px_0px] shadow-conservation-green/30 hover:shadow-[1px_1px_0px_0px] hover:shadow-conservation-green/50 active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <a 
                      href={item.purchaseUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      [BUY_SEEDS]
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <Card className="bg-black border-2 border-conservation-green/50 shadow-[4px_4px_0px_0px] shadow-conservation-green/30">
          <CardContent className="p-8 text-center relative">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0, 255, 0, 0.1) 4px, rgba(0, 255, 0, 0.1) 8px)'
            }}></div>
            <p className="text-conservation-green/70 font-mono-digital relative z-10">
              &gt;&gt;&gt; NO_DATA_AVAILABLE_FOR_POSTCODE<br/>
              &gt;&gt;&gt; EXPANDING_DATABASE...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConservationTable;