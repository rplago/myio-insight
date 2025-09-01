import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  TrendingUp,
  AlertTriangle,
  Gauge
} from "lucide-react";

const waterSystemData = [
  {
    id: "TANK-001",
    name: "Cisterna Principal",
    type: "water_tank",
    level: 85,
    capacity: 10000,
    height: 340,
    maxHeight: 400,
    status: "operational",
    flow: 12.5,
    lastMaintenance: "2024-01-20"
  },
  {
    id: "TANK-002", 
    name: "Caixa d'água Superior",
    type: "water_tank",
    level: 45,
    capacity: 5000,
    height: 180,
    maxHeight: 400,
    status: "warning",
    flow: 8.2,
    lastMaintenance: "2024-01-15"
  },
  {
    id: "HYD-001",
    name: "Hidrômetro Entrada",
    type: "hydrometr",
    flow: 25.8,
    totalFlow: 158420,
    status: "operational",
    pressure: 2.8
  },
  {
    id: "HYD-002",
    name: "Hidrômetro Subsolo",
    type: "hydrometr", 
    flow: 18.3,
    totalFlow: 95630,
    status: "operational",
    pressure: 2.1
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational": return "status-operational";
    case "warning": return "status-warning";
    case "fault": return "status-fault";
    default: return "status-offline";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "operational": return "Normal";
    case "warning": return "Atenção";
    case "fault": return "Falha";
    default: return "Offline";
  }
};

const getTankLevelStatus = (level: number) => {
  if (level < 20) return "fault";
  if (level < 50) return "warning";
  return "operational";
};

export const WaterSystem = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Droplets className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Sistema Hídrico</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {waterSystemData.map((item) => (
          <Card key={item.id} className="monitoring-card border-card-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    {item.type === "water_tank" ? (
                      <Droplets className="w-4 h-4 text-secondary-foreground" />
                    ) : (
                      <Gauge className="w-4 h-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                    <CardDescription className="text-xs">{item.id}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(item.type === "water_tank" ? getTankLevelStatus(item.level!) : item.status)}>
                  {getStatusText(item.type === "water_tank" ? getTankLevelStatus(item.level!) : item.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {item.type === "water_tank" ? (
                <>
                  {/* Tank Level Visualization */}
                  <div className="relative">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Nível</span>
                      <span className="text-foreground font-medium">{item.level}%</span>
                    </div>
                    
                    {/* Tank Visual */}
                    <div className="relative w-full h-20 bg-muted rounded-lg border-2 border-border overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-300"
                        style={{ height: `${item.level}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-foreground bg-background/80 px-2 py-1 rounded">
                          {item.height}cm
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0cm</span>
                      <span>{item.maxHeight}cm</span>
                    </div>
                  </div>

                  {/* Flow Rate */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      Vazão
                    </div>
                    <div className="text-sm font-medium text-foreground">{item.flow} L/min</div>
                  </div>
                </>
              ) : (
                <>
                  {/* Hydrometr Data */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Vazão Atual</div>
                      <div className="text-lg font-semibold text-foreground">{item.flow} L/min</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Pressão</div>
                      <div className="text-sm font-medium text-foreground">{item.pressure} bar</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">Total Acumulado</div>
                    <div className="text-sm font-medium text-foreground">
                      {item.totalFlow?.toLocaleString()} L
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};