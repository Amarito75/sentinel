import PageContainer from "@/components/layout/page-container";
import TradingViewWidget from "@/components/charts/tradingview-widget";

export default function DashboardPage() {
  return (
    <div className="h-full">
      <TradingViewWidget symbol={"btc"} />
    </div>
  );
}
