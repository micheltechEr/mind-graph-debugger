import { memo } from "react";
import { type AgentTool } from "../../../types/agent";

interface ToolToggleListProps {
  tools: AgentTool[];
  onToggle: (toolId: string) => void;
}

const ToolToggleList = memo(({ tools, onToggle }: ToolToggleListProps) => {
  return (
    <div className="bg-[#1e293b]/60 rounded-xl border border-white/5 p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Available Tools</h3>
      <div className="space-y-3">
        {tools.map((tool) => (
          <div key={tool.id} className="flex items-center justify-between bg-[#0f172a] p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-sm text-gray-300">{tool.name}</span>
            <button 
              onClick={() => onToggle(tool.id)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${tool.enabled ? 'bg-cyan-500' : 'bg-gray-600'}`}
              type="button"
            >
              <span className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${tool.enabled ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

ToolToggleList.displayName = "ToolToggleList";

export default ToolToggleList;