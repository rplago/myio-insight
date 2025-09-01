import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Gauge,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

const temperatureData = [
  { time: "00:00", zone1: 22.5, zone2: 23.1, zone3: 21.8, outdoor: 18.2 },
  { time: "03:00", zone1: 21.9, zone2: 22.6, zone3: 21.3, outdoor: 16.8 },
  { time: "06:00", zone1: 22.2, zone2: 22.9, zone3: 21.6, outdoor: 17.5 },
  { time: "09:00", zone1: 23.8, zone2: 24.2, zone3: 22.9, outdoor: 21.3 },
  { time: "12:00", zone1: 25.1, zone2: 25.8, zone3: 24.2, outdoor: 24.7 },
  { time: "15:00", zone1: 26.2, zone2: 26.9, zone3: 25.1, outdoor: 26.8 },
  { time: "18:00", zone1: 25.4, zone2: 26.1, zone3: 24.7, outdoor: 25.2 },
  { time: "21:00", zone1: 23.9, zone2: 24.5, zone3: 23.1, outdoor: 22.1 }
];

const waterSystemData = [
  { time: "06:00", tank1: 95, tank2: 87, tank3: 92, consumption: 145 },
  { time: "09:00", tank1: 89, tank2: 81, tank3: 86, consumption: 189 },
  { time: "12:00", tank1: 76, tank2: 68, tank3: 74, consumption: 234 },
  { time: "15:00", tank1: 82, tank2: 74, tank3: 79, consumption: 201 },
  { time: "18:00", tank1: 88, tank2: 79, tank3: 85, consumption: 167 },
  { time: "21:00", tank1: 91, tank2: 84, tank3: 89, consumption: 134 }
];

const environmentalData = [
  {
    zone: "3rd Floor – Food Court",
    sensorId: "TH-FC-01",
    temperature: 24.5,
    energyConsumption: 15.2,
    runtime: "12h 45m",
    status: "operational"
  },
  {
    zone: "B1 – Parking Area", 
    sensorId: "TH-PK-01",
    temperature: 22.1,
    energyConsumption: 8.7,
    runtime: "24h 00m",
    status: "operational"
  },
  {
    zone: "Ground Floor – Main Lobby",
    sensorId: "TH-LB-01",
    temperature: 25.8,
    energyConsumption: 22.4,
    runtime: "16h 30m",
    status: "operational"
  },
  {
    zone: "3rd Floor – Meeting Room",
    sensorId: "TH-MR-03",
    temperature: 28.2,
    energyConsumption: 18.9,
    runtime: "8h 15m",
    status: "warning"
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational": return CheckCircle;
    case "warning": return AlertTriangle;
    case "fault": return AlertTriangle;
    default: return Clock;
  }
};

export const OperationalMetrics = () => {
  return (
    <div className="space-y-6">
      {/* Environmental Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">22.8°C</div>
            <div className="text-xs text-muted-foreground mt-1">
              Target: 23°C ± 2°C
            </div>
            <Progress value={85} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Energy Consumption</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">156.8 kW</div>
            <div className="text-xs text-muted-foreground mt-1">
              HVAC Total
            </div>
            <Progress value={68} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Runtime Status</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">14h 25m</div>
            <div className="text-xs text-muted-foreground mt-1">
              Average Runtime
            </div>
            <Badge className="status-operational mt-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Temperature Monitoring Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="monitoring-card border-card-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Temperature Zones</CardTitle>
            <CardDescription>Real-time temperature monitoring across building zones</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="zone1" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Food Court"
                />
                <Line 
                  type="monotone" 
                  dataKey="zone2" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Retail L1"
                />
                <Line 
                  type="monotone" 
                  dataKey="zone3" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Retail L2"
                />
                <Line 
                  type="monotone" 
                  dataKey="outdoor" 
                  stroke="#6B7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Outdoor"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Environmental Sensors Status */}
      <Card className="monitoring-card border-card-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Environmental Sensors</CardTitle>
          <CardDescription>Real-time status of all environmental sensors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {environmentalData.map((env, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${env.status === 'operational' ? 'bg-status-operational' : 'bg-status-warning'}`} />
                  <div>
                    <div className="font-medium text-sm text-foreground">{env.zone}</div>
                    <div className="text-xs text-muted-foreground">{env.sensorId}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div>
                    <div className="text-xs text-muted-foreground">Temp</div>
                    <div className="text-sm font-medium text-foreground">{env.temperature}°C</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Energy</div>
                    <div className="text-sm font-medium text-foreground">{env.energyConsumption} kW</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Runtime</div>
                    <div className="text-sm font-medium text-foreground">{env.runtime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};