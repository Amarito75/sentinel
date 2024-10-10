import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { PieGraph } from "@/components/charts/pie-graph";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import PageContainer from "@/components/layout/page-container";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BorderBeam } from "../effects/border-beam";

export default function PreviewDashboard() {
  return (
    <PageContainer scrollable={false}>
      <div className="relative space-y-2 border bg-muted/20 border-border rounded-lg p-4 drop-shadow-sm w-full">
        <BorderBeam size={250} duration={12} delay={9} />
        <div className="col-span-4">
          <BarGraph />
        </div>
      </div>
    </PageContainer>
  );
}
