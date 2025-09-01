import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitoringGrid } from "@/components/dashboard/MonitoringGrid";
import { OperationalMetrics } from "@/components/dashboard/OperationalMetrics";
import { EnergyConsumption } from "@/components/dashboard/EnergyConsumption";
import { SystemOverview } from "@/components/dashboard/SystemOverview";
import { WaterSystem } from "@/components/dashboard/WaterSystem";
import { Building2, Zap, Thermometer, Droplets, Filter, Download } from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MYIO Platform</h1>
                <p className="text-sm text-muted-foreground">Smart Infrastructure Monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="status-operational">
                <div className="status-indicator operational mr-2" />
                Systems Online
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* System Overview Cards */}
        <SystemOverview />

        {/* Tabbed Dashboard Content */}
        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[520px]">
            <TabsTrigger value="monitoring" className="gap-2">
              <Building2 className="w-4 h-4" />
              Equipment
            </TabsTrigger>
            <TabsTrigger value="water" className="gap-2">
              <Droplets className="w-4 h-4" />
              Water
            </TabsTrigger>
            <TabsTrigger value="energy" className="gap-2">
              <Zap className="w-4 h-4" />
              Energy
            </TabsTrigger>
            <TabsTrigger value="environmental" className="gap-2">
              <Thermometer className="w-4 h-4" />
              Environment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Equipment Monitoring</h2>
                <p className="text-muted-foreground">Real-time status of critical infrastructure</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
            <MonitoringGrid />
          </TabsContent>

          <TabsContent value="water" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Water System Management</h2>
              <p className="text-muted-foreground">Tank levels, flow monitoring and hydrometers</p>
            </div>
            <WaterSystem />
          </TabsContent>

          <TabsContent value="energy" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Energy Management</h2>
              <p className="text-muted-foreground">Consumption tracking and efficiency metrics</p>
            </div>
            <EnergyConsumption />
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Environmental Monitoring</h2>
              <p className="text-muted-foreground">Temperature sensors</p>
            </div>
            <OperationalMetrics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;