import { memo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {  type TrendDataPoint } from "../mocks/analyticsMockData";

interface TokenTrendChartProps {
  data: TrendDataPoint[];
}

const TokenTrendChart = memo(({ data }: TokenTrendChartProps) => {
  return (
    <div className="w-full h-full pb-4">
      {/* ResponsiveContainer adjusts to the parent div */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Subtle grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          
          <XAxis 
            dataKey="timestamp" 
            stroke="#9ca3af" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickLine={false}
          />
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          
          {/* Custom Tooltip styling to match our dark theme */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff10', borderRadius: '8px' }}
            itemStyle={{ color: '#e2e8f0' }}
          />

          {/* Flash Tokens (Cheaper) */}
          <Area 
            type="monotone" 
            dataKey="tokensFlash" 
            stroke="#38bdf8" 
            fillOpacity={0.1} 
            fill="#38bdf8" 
            name="Gemini Flash"
          />
          {/* Pro Tokens (Expensive) */}
          <Area 
            type="monotone" 
            dataKey="tokensPro" 
            stroke="#fbbf24" 
            fillOpacity={0.1} 
            fill="#fbbf24" 
            name="Gemini Pro"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

TokenTrendChart.displayName = "TokenTrendChart";

export default TokenTrendChart;