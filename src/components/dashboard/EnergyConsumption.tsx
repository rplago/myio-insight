import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, TrendingDown, Zap, Building, MapPin } from "lucide-react";

const hourlyData = [
  { time: "00:00", consumption: 850, demand: 780 },
  { time: "02:00", consumption: 720, demand: 680 },
  { time: "04:00", consumption: 650, demand: 620 },
  { time: "06:00", consumption: 890, demand: 850 },
  { time: "08:00", consumption: 1250, demand: 1180 },
  { time: "10:00", consumption: 1450, demand: 1380 },
  { time: "12:00", consumption: 1680, demand: 1580 },
  { time: "14:00", consumption: 1892, demand: 1750 },
  { time: "16:00", consumption: 1650, demand: 1580 },
  { time: "18:00", consumption: 1420, demand: 1350 },
  { time: "20:00", consumption: 1180, demand: 1120 },
  { time: "22:00", consumption: 980, demand: 920 }
];

const zoneData = [
  { zone: "Praça de alimentação", consumption: 245, efficiency: 85, area: 1200 },
  { zone: "L1", consumption: 189, efficiency: 92, area: 1800 },
  { zone: "L2", consumption: 156, efficiency: 88, area: 1600 },
  { zone: "Estacionamento", consumption: 98, efficiency: 78, area: 2400 },
  { zone: "Área Comum", consumption: 134, efficiency: 91, area: 800 },
  { zone: "Administração", consumption: 87, efficiency: 94, area: 600 }
];

const distributionData = [
  { name: "HVAC", value: 35, color: "#3B82F6" },
  { name: "Iluminação", value: 10, color: "#10B981" },
  { name: "Elevadores", value: 15, color: "#F59E0B" },
  { name: "Equipamentos", value: 10, color: "#EF4444" },
  { name: "Lojas", value: 25, color: "#8B5CF6" },
  { name: "Área Comum", value: 5, color: "#c5e275ff" }
];

export const EnergyConsumption = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Consumo Total</CardTitle>
            <Zap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">28.4 MWh</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="h-3 w-3 text-status-operational" />
              <p className="text-xs text-status-operational">
                -12% vs mês anterior
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pico de Demanda</CardTitle>
            <TrendingUp className="h-4 w-4 text-status-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.892 kW</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-status-warning" />
              <p className="text-xs text-status-warning">
                +5% vs ontem
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="monitoring-card border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Meta x Consumo Real</CardTitle>
            <Building className="h-4 w-4 text-status-operational" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87%</div>
            <Progress value={87} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Acima da meta de 85%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hourly Consumption Trend */}
        <Card className="monitoring-card border-card-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Consumo de 24 horas</CardTitle>
            <CardDescription>Meta x Consumo Real em tempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
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
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Actual (kW)"
                />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted (kW)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Energy Distribution */}
        <Card className="monitoring-card border-card-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribuição de Energia</CardTitle>
            <CardDescription>Detalhamento por tipo de sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Zone Consumption Table */}
      <Card className="monitoring-card border-card-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Ambientes x Performance</CardTitle>
          <CardDescription>Consumo e eficiência energética por área</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zoneData.map((zone, index) => (
              <div key={zone.zone} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{zone.zone}</div>
                    <div className="text-sm text-muted-foreground">{zone.area} m²</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{zone.consumption} kW</div>
                    <div className="text-xs text-muted-foreground">
                      {(zone.consumption / zone.area * 1000).toFixed(1)} W/m²
                    </div>
                  </div>
                  
                  <div className="text-right min-w-[80px]">
                    <div className="font-semibold text-foreground">{zone.efficiency}%</div>
                    <div className="text-xs text-muted-foreground">Eficiência</div>
                  </div>
                  
                  <Badge 
                    className={zone.efficiency >= 90 ? "status-operational" : 
                              zone.efficiency >= 80 ? "status-warning" : "status-fault"}
                  >
                    {zone.efficiency >= 90 ? "Excelente" : 
                     zone.efficiency >= 80 ? "Bom" : "Precisa de Atenção"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};