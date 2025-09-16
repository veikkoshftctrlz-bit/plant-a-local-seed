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
      <Card className="border-conservation-green/20">
        <CardHeader className="bg-gradient-to-r from-conservation-green/5 to-conservation-orange/5">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle2 className="w-6 h-6 text-conservation-green" />
            Conservation Plants for {postcode}
          </CardTitle>
          <p className="text-muted-foreground">
            Help local endangered species by planting these native plants in your area
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {data.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-conservation-green/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-5 gap-4 items-center">
                {/* Plant */}
                <div className="md:col-span-1">
                  <h3 className="font-bold text-lg text-conservation-green mb-1">
                    {item.plant}
                  </h3>
                  <p className="text-sm text-muted-foreground">Native Plant</p>
                </div>

                {/* Endangered Species */}
                <div className="md:col-span-1">
                  <p className="font-semibold text-foreground mb-1">{item.endangeredSpecies}</p>
                  <p className="text-sm text-muted-foreground">Benefiting Species</p>
                </div>

                {/* Endangerment Level */}
                <div className="md:col-span-1">
                  <Badge 
                    variant="secondary" 
                    className={`
                      ${item.endangermentLevel === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                      ${item.endangermentLevel === 'Endangered' ? 'bg-conservation-orange/10 text-conservation-orange border-conservation-orange/20' : ''}
                      ${item.endangermentLevel === 'Vulnerable' ? 'bg-accent/10 text-accent border-accent/20' : ''}
                      ${item.endangermentLevel === 'Near Threatened' ? 'bg-conservation-green/10 text-conservation-green border-conservation-green/20' : ''}
                      flex items-center gap-1
                    `}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {item.endangermentLevel}
                  </Badge>
                </div>

                {/* Ecological Benefits */}
                <div className="md:col-span-1">
                  <p className="text-sm text-foreground">{item.ecologicalBenefits}</p>
                </div>

                {/* Purchase Button */}
                <div className="md:col-span-1">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-conservation-green/30 hover:bg-conservation-green/5"
                  >
                    <a 
                      href={item.purchaseUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Buy Seeds
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              No conservation data available for this postcode yet. 
              We're working to expand our database!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConservationTable;