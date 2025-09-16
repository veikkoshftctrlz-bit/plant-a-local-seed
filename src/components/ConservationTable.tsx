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
      <Card className="bg-white border-2 border-black relative overflow-hidden">
        <CardHeader className="relative z-10 bg-white">
          <CardTitle className="flex items-center gap-2 text-lg font-digital text-red-900">
            <CheckCircle2 className="w-4 h-4 text-red-900" />
            FLORA.DATA_{postcode}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Minimal table-like list with white rows and thin separators */}
      <div className="w-full bg-white text-black">
        {/* Header */}
        <div className="grid grid-cols-5 text-xs border-b border-black font-digital text-red-900">
          <div className="p-3">PLANT</div>
          <div className="p-3">ENDANGERED SPECIES</div>
          <div className="p-3">LEVEL</div>
          <div className="p-3">ECOLOGICAL BENEFITS</div>
          <div className="p-3 text-right">LINK</div>
        </div>

        {/* Rows */}
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center border-b border-black hover:bg-yellow-300 transition-colors"
          >
            {/* Plant */}
            <div className="p-4 font-digital text-sm text-red-900">{item.plant}</div>

            {/* Endangered Species */}
            <div className="p-4 font-digital text-sm text-red-900">{item.endangeredSpecies}</div>

            {/* Endangerment Level */}
            <div className="p-4">
              <Badge
                variant="secondary"
                className={`
                  ${item.endangermentLevel === 'Critical' ? 'bg-red-200 text-red-900 border-red-400' : ''}
                  ${item.endangermentLevel === 'Endangered' ? 'bg-orange-200 text-orange-900 border-orange-400' : ''}
                  ${item.endangermentLevel === 'Vulnerable' ? 'bg-yellow-200 text-yellow-900 border-yellow-400' : ''}
                  ${item.endangermentLevel === 'Near Threatened' ? 'bg-green-200 text-green-900 border-green-400' : ''}
                  font-digital text-[10px] border
                `}
              >
                <AlertTriangle className="w-3 h-3" />
                {item.endangermentLevel}
              </Badge>
            </div>

            {/* Ecological Benefits */}
            <div className="p-4 text-sm text-red-900">{item.ecologicalBenefits}</div>

            {/* Purchase Button */}
            <div className="p-4 flex justify-end">
              <Button asChild variant="outline" className="border border-black text-red-900 bg-white hover:bg-red-900 hover:text-white font-digital text-xs">
                <a href={item.purchaseUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  OPEN
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>
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