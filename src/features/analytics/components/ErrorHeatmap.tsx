import { memo } from "react";
import { mockHeatmapData } from "../mocks/analyticsMockData";

// A helper function to determine the color based on the error rate
// In a real app, this might live in a utils folder.
const getHeatmapColor = (rate: number) => {
  if (rate > 0.5) return "bg-red-500";
  if (rate > 0.2) return "bg-orange-500";
  if (rate > 0.05) return "bg-yellow-500";
  return "bg-green-500/20"; // Safe zone
};

const ErrorHeatmap = memo(() => {
  // We use the mock data directly here for simplicity, 
  // but normally it would be passed as a prop just like the Line chart.
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 px-2">
        <div>Module</div>
        <div>Agent</div>
        <div className="text-right">Failure Rate</div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {mockHeatmapData.map((item, index) => (
          <div 
            key={`${item.promptModule}-${item.agentType}-${index}`}
            className="grid grid-cols-3 gap-2 items-center bg-[#0f172a]/50 p-2 rounded-md border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="text-sm truncate text-gray-300" title={item.promptModule}>
              {item.promptModule}
            </div>
            <div className="text-xs truncate text-gray-500">
              {item.agentType}
            </div>
            <div className="flex items-center justify-end gap-3">
              <span className="text-xs font-mono text-gray-400">
                {(item.errorRate * 100).toFixed(1)}%
              </span>
              {/* The colored block */}
              <div 
                className={`w-4 h-4 rounded-sm ${getHeatmapColor(item.errorRate)}`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

ErrorHeatmap.displayName = "ErrorHeatmap";

export default ErrorHeatmap;