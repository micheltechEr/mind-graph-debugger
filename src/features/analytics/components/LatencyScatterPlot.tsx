import { memo } from "react";

// You will define this interface!
interface ScatterPlotProps {
  data: any[]; 
}

const LatencyScatterPlot = memo(({ data }: ScatterPlotProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center border border-dashed border-gray-600 rounded">
      {/* When you add Recharts, it goes here. 
        For now, just proving the data arrived safely:
      */}
      <p className="text-gray-500 text-sm">
        Scatter Plot Rendered with {data.length} data points.
      </p>
    </div>
  );
});

// Setting a display name is good practice when using memo()
LatencyScatterPlot.displayName = "LatencyScatterPlot";

export default LatencyScatterPlot;