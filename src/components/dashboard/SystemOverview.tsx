import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Zap, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const SystemOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Equipment Status */}
      <Card className="monitoring-card border-card-border bg-gradient-to-br from-card to-card/80">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Equipment Status</CardTitle>
          <Building2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">24/26</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="status-indicator operational" />
            <p className="text-xs text-muted-foreground">
              92% operational
            </p>
          </div>
          <Progress value={92} className="mt-3 h-2" />
        </CardContent>
      </Card>

      {/* Energy Consumption */}
      <Card className="monitoring-card border-card-border bg-gradient-to-br from-card to-card/80">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Energy Usage</CardTitle>
          <Zap className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">1,247 kW</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="h-3 w-3 text-status-operational" />
            <p className="text-xs text-status-operational">
              -8% from yesterday
            </p>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Peak: 1,892 kW at 14:30
          </div>
        </CardContent>
      </Card>

      {/* Temperature Control */}
      <Card className="monitoring-card border-card-border bg-gradient-to-br from-card to-card/80">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Avg Temperature</CardTitle>
          <Thermometer className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">22.5°C</div>
          <div className="flex items-center gap-1 mt-2">
            <CheckCircle className="h-3 w-3 text-status-operational" />
            <p className="text-xs text-status-operational">
              Within optimal range
            </p>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Range: 20°C - 25°C
          </div>
        </CardContent>
      </Card>

      {/* Water Systems */}
      <Card className="monitoring-card border-card-border bg-gradient-to-br from-card to-card/80">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Water Systems</CardTitle>
          <Droplets className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">87%</div>
          <div className="flex items-center gap-1 mt-2">
            <AlertTriangle className="h-3 w-3 text-status-warning" />
            <p className="text-xs text-status-warning">
              Tank 2 at 68%
            </p>
          </div>
          <Progress value={87} className="mt-3 h-2" />
        </CardContent>
      </Card>
    </div>
  );
};