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
  Clock
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

const sensorData = [
  { id: "TEMP-001", location: "Food Court", value: 23.5, unit: "°C", status: "operational", target: 24 },
  { id: "TEMP-002", location: "Retail Level 1", value: 22.8, unit: "°C", status: "operational", target: 23 },
  { id: "TEMP-003", location: "Parking Garage", value: 19.2, unit: "°C", status: "operational", target: 20 },
  { id: "HUM-001", location: "Food Court", value: 45, unit: "%", status: "warning", target: 50 },
  { id: "HUM-002", location: "Retail Level 1", value: 52, unit: "%", status: "operational", target: 50 },
  { id: "AIR-001", location: "Main Atrium", value: 850, unit: "ppm", status: "operational", target: 900 },
  { id: "WATER-001", location: "Tank 1", value: 91, unit: "%", status: "operational", target: 85 },
  { id: "WATER-002", location: "Tank 2", value: 68, unit: "%", status: "warning", target: 85 },
  { id: "WATER-003", location: "Tank 3", value: 89, unit: "%", status: "operational", target: 85 }
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">48%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Optimal: 45-55%
            </div>
            <Progress value={48} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Air Quality</CardTitle>
            <Wind className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Good</div>
            <div className="text-xs text-muted-foreground mt-1">
              CO₂: 850 ppm
            </div>
            <Badge className="status-operational mt-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Normal
            </Badge>
          </CardContent>
        </Card>

        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Levels</CardTitle>
            <Gauge className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">83%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Average across tanks
            </div>
            <Progress value={83} className="mt-2 h-2" />
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

        {/* Water System Monitoring */}
        <Card className="monitoring-card border-card-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Water System Status</CardTitle>
            <CardDescription>Tank levels and consumption patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={waterSystemData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="tank1" 
                  stackId="1"
                  stroke="#06B6D4" 
                  fill="#06B6D4"
                  fillOpacity={0.3}
                  name="Tank 1 (%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="tank2" 
                  stackId="2"
                  stroke="#0EA5E9" 
                  fill="#0EA5E9"
                  fillOpacity={0.3}
                  name="Tank 2 (%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="tank3" 
                  stackId="3"
                  stroke="#3B82F6" 
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  name="Tank 3 (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Status Grid */}
      <Card className="monitoring-card border-card-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sensor Network</CardTitle>
          <CardDescription>Real-time status of all environmental sensors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {sensorData.map((sensor) => {
              const StatusIcon = getStatusIcon(sensor.status);
              const variance = Math.abs(sensor.value - sensor.target);
              const isWithinRange = variance <= (sensor.target * 0.1); // 10% tolerance

              return (
                <div key={sensor.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${
                      sensor.status === 'operational' ? 'text-status-operational' :
                      sensor.status === 'warning' ? 'text-status-warning' : 'text-status-fault'
                    }`} />
                    <div>
                      <div className="font-medium text-sm text-foreground">{sensor.id}</div>
                      <div className="text-xs text-muted-foreground">{sensor.location}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {sensor.value}{sensor.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: {sensor.target}{sensor.unit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};