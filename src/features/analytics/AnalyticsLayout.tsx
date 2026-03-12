import { useState, useMemo } from "react";
import Header from "../../components/Header";
import NavigateSections from "../../components/NavigateSections";
// Import your mock data here
import { mockScatterData, mockTrendData, globalStats } from "./mocks/analyticsMockData";

// Placeholders for your actual chart components
import StatCard from "./components/StatCard";
import LatencyScatterPlot from "./components/LatencyScatterPlot";
import ErrorHeatmap from "./components/ErrorHeatmap";
import TokenTrendChart from "./components/TokenTrendChart";

const AnalyticsLayout = () => {
  // Global filter state
  const [dateRange, setDateRange] = useState("7d");
  const [modelType, setModelType] = useState("all");

  // MEMORY LEAK & PERFORMANCE CHECK:
  // If you need to filter the mock data based on the state above, DO IT HERE inside a useMemo.
  // Never pass `.filter()` directly into a child component's props, or it will re-render infinitely.
  const filteredScatterData = useMemo(() => {
    // Example: return mockScatterData.filter(d => d.model === modelType);
    return mockScatterData; 
  }, [modelType]);

  return (
    <div className="relative min-h-screen text-white bg-[#0f172a] overflow-x-hidden">
      <Header />
      <NavigateSections />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        
        {/* Top Bar: Filters & Global Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <StatCard title="Total Cost" value={globalStats.totalCost} />
            <StatCard title="Avg. Response" value={globalStats.avgLatency} />
          </div>
          
          <div className="flex gap-4 bg-[#1e293b]/60 p-2 rounded-lg border border-white/5">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-sm text-gray-300 outline-none"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Chart Grid: The Heavy Lifters */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Chart: Scatter Plot (Spans 7 columns) */}
          <div className="col-span-7 bg-[#1e293b]/60 rounded-xl border border-white/5 p-6 h-[400px]">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Latency vs. Cost</h3>
            {/* The chart component receives the memoized data */}
            <LatencyScatterPlot data={filteredScatterData} />
          </div>

          {/* Right Chart: Heatmap (Spans 5 columns) */}
          <div className="col-span-5 bg-[#1e293b]/60 rounded-xl border border-white/5 p-6 h-[400px]">
            <h3 className="text-lg font-semibold mb-4 text-amber-400">AI Error Frequency</h3>
            <ErrorHeatmap />
          </div>

          {/* Bottom Chart: Full Width Trend Line */}
          <div className="col-span-12 bg-[#1e293b]/60 rounded-xl border border-white/5 p-6 h-[350px]">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Token Consumption Trend</h3>
            <TokenTrendChart data={mockTrendData} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsLayout;