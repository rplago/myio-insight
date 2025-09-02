import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Wind, 
  Droplets, 
  ArrowUpDown, 
  Thermometer,
  MoreVertical,
  TrendingUp,
  Activity
} from "lucide-react";

const equipmentData = [
  {
    id: "ESC-001",
    name: "Escada Rolante Sul 02",
    type: "escalator",
    status: "operational",
    consumption: 15.2,
    temperature: 28,
    efficiency: 94,
    lastMaintenance: "2024-01-15",
    operationalHours: 12847,
    icon: ArrowUpDown
  },
  {
    id: "ELV-002",
    name: "Elevdtor Social Norte 01",
    type: "elevator",
    status: "operational",
    consumption: 22.8,
    temperature: 26,
    efficiency: 89,
    lastMaintenance: "2024-01-20",
    operationalHours: 8934,
    icon: ArrowUpDown
  },
  {
    id: "CHIL-001",
    name: "Chiller 01",
    type: "chiller",
    status: "warning",
    consumption: 145.6,
    temperature: 35,
    efficiency: 78,
    lastMaintenance: "2024-01-10",
    operationalHours: 15678,
    icon: Thermometer
  },
  {
    id: "PUMP-001",
    name: "Bomba de água principal",
    type: "pump",
    status: "operational",
    consumption: 8.3,
    temperature: 24,
    efficiency: 92,
    lastMaintenance: "2024-01-25",
    operationalHours: 9876,
    icon: Droplets
  },
  {
    id: "AC-001",
    name: "HVAC Praça de Alimentação",
    type: "hvac",
    status: "operational",
    consumption: 67.4,
    temperature: 22,
    efficiency: 86,
    lastMaintenance: "2024-01-18",
    operationalHours: 11234,
    icon: Wind
  },
  {
    id: "PUMP-002",
    name: "Secondary Pump",
    type: "pump",
    status: "fault",
    consumption: 0,
    temperature: 18,
    efficiency: 0,
    lastMaintenance: "2024-01-12",
    operationalHours: 12456,
    icon: Droplets
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

const getEquipmentCardClass = (status: string) => {
  switch (status) {
    case "fault": return "monitoring-card border-card-border equipment-critical";
    case "warning": return "monitoring-card border-card-border equipment-warning";
    default: return "monitoring-card border-card-border";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "fault": return "❌";
    case "warning": return "⚠️";
    case "operational": return "✅";
    default: return "⭕";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "operational": return "Em operação";
    case "warning": return "Alerta";
    case "fault": return "Falha";
    default: return "Offline";
  }
};

export const MonitoringGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {equipmentData.map((equipment) => {
        const IconComponent = equipment.icon;
        
        return (
          <Card key={equipment.id} className={getEquipmentCardClass(equipment.status)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">{equipment.name}</CardTitle>
                  <CardDescription className="text-xs">{equipment.id}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Status and Key Metrics */}
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(equipment.status)}>
                  <span className="mr-1">{getStatusIcon(equipment.status)}</span>
                  <div className={`status-indicator ${equipment.status} mr-2`} />
                  {getStatusText(equipment.status)}
                </Badge>
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    {equipment.consumption} kW
                  </div>
                  <div className="text-xs text-muted-foreground">Atual</div>
                </div>
              </div>

              {/* Efficiency Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Eficiência</span>
                  <span className="text-foreground font-medium">{equipment.efficiency}%</span>
                </div>
                <Progress value={equipment.efficiency} className="h-2" />
              </div>

              {/* Temperature and Details */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Thermometer className="w-3 h-3" />
                    Temperatura
                  </div>
                  <div className="text-sm font-medium text-foreground">{equipment.temperature}°C</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Activity className="w-3 h-3" />
                    Tempo de operação
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {equipment.operationalHours.toLocaleString()}h
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};