import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ConservationData } from "@/data/mockConservationData";

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
        <div className="grid grid-cols-6 text-xs border-b border-black font-digital text-red-900">
          <div className="p-3">IMAGE</div>
          <div className="p-3">PLANT</div>
          <div className="p-3">DEPENDENT SPECIES</div>
          <div className="p-3">STATUS</div>
          <div className="p-3">DESCRIPTION</div>
          <div className="p-3 text-right">LINK</div>
        </div>

        {/* Rows */}
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center border-b border-black hover:bg-yellow-300 transition-colors"
          >
            {/* Image */}
            <div className="p-4 text-center">
              {item.image ? (
                <img src={item.image} alt={item.plant} className="w-12 h-12 object-cover mx-auto border border-black" />
              ) : (
                <div className="w-12 h-12 bg-gray-200 border border-black mx-auto flex items-center justify-center text-xs text-gray-500">
                  IMG
                </div>
              )}
            </div>

            {/* Plant */}
            <div className="p-4 font-digital text-sm text-red-900">{item.plant}</div>

            {/* Dependent Species */}
            <div className="p-4 font-digital text-sm text-red-900">{item.dependent_species}</div>

            {/* Status */}
            <div className="p-4">
              <Badge
                variant="secondary"
                className={`
                  ${item.status.includes('CR') ? 'bg-red-200 text-red-900 border-red-400' : ''}
                  ${item.status.includes('EN') ? 'bg-orange-200 text-orange-900 border-orange-400' : ''}
                  ${item.status.includes('VU') ? 'bg-yellow-200 text-yellow-900 border-yellow-400' : ''}
                  ${item.status.includes('NT') ? 'bg-green-200 text-green-900 border-green-400' : ''}
                  font-digital text-[10px] border
                `}
              >
                <AlertTriangle className="w-3 h-3" />
                {item.status}
              </Badge>
            </div>

            {/* Description */}
            <div className="p-4 text-sm text-red-900">{item.description}</div>

            {/* Purchase Button */}
            <div className="p-4 flex justify-end">
              <Button asChild variant="outline" className="border border-black text-red-900 bg-white hover:bg-red-900 hover:text-white font-digital text-xs">
                <a href={item.seed_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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