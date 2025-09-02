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
import { AdvancedFilter } from "@/components/filters/AdvancedFilter";
import { FilterSelection } from "@/types/filters";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selection, setSelection] = useState<FilterSelection>({ malls: [], floors: [], places: [] });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
<img
  src="/img/Versão Principal - Logo - Principal.png"
  alt="Sá Cavalcante"
  className="w-48 h-48 rounded-lg object-contain"
/>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sá Cavalcante</h1>
                <p className="text-sm text-muted-foreground">Smart Infrastructure Monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="status-operational">
                <div className="status-indicator operational mr-2" />
                Sistemas Online
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
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
              Equipamentos
            </TabsTrigger>
            <TabsTrigger value="energy" className="gap-2">
              <Zap className="w-4 h-4" />
              Energia
            </TabsTrigger>            
            <TabsTrigger value="water" className="gap-2">
              <Droplets className="w-4 h-4" />
              Água
            </TabsTrigger>
            <TabsTrigger value="environmental" className="gap-2">
              <Thermometer className="w-4 h-4" />
              Temperatura
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Monitoramento de Equipamentos</h2>
                <p className="text-muted-foreground">Status em tempo real da infraestrutura crítica</p>
              </div>
              <AdvancedFilter selection={selection} onChange={setSelection} />
            </div>
            <MonitoringGrid />
          </TabsContent>

          <TabsContent value="water" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Gestão de Sistemas de Água</h2>
                <p className="text-muted-foreground">Níveis de tanques, monitoramento de fluxo e hidrômetros</p>    
              </div>
              <AdvancedFilter selection={selection} onChange={setSelection} />   
            </div>
            <WaterSystem />
          </TabsContent>

          <TabsContent value="energy" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Gestão de Energia</h2>
                <p className="text-muted-foreground">Monitoramento de consumo e métricas de eficiência</p>
              </div>
              <AdvancedFilter selection={selection} onChange={setSelection} />
            </div>

            <EnergyConsumption />
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Monitoramento de Ambientes</h2>
                <p className="text-muted-foreground">Sensores de Temperatura</p>
              </div>
              <AdvancedFilter selection={selection} onChange={setSelection} />
            </div>

            <OperationalMetrics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;