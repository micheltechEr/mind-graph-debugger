import { memo } from "react";
import { type AIModelType } from "../../../types/agent";

interface ModelSettingsProps {
  model: AIModelType;
  temperature: number;
  onModelChange: (model: AIModelType) => void;
  onTempChange: (temp: number) => void;
}

const ModelSettingsPanel = memo(({ model, temperature, onModelChange, onTempChange }: ModelSettingsProps) => {
  return (
    <div className="bg-[#1e293b]/60 rounded-xl border border-white/5 p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Model Settings</h3>
      
      <div className="space-y-4">
        {/* Engine Selector */}
        <div>
          <label className="text-xs text-gray-400 block mb-2">Engine</label>
          <select 
            className="w-full bg-[#0f172a] border border-white/10 rounded p-2 text-sm text-gray-300 outline-none focus:border-cyan-500/50"
            value={model}
            onChange={(e) => onModelChange(e.target.value as AIModelType)}
          >
            <option value="gemini-3-flash">Gemini 3 Flash (Fast & Cheap)</option>
            <option value="gemini-3-pro">Gemini 3 Pro (Complex Reasoning)</option>
          </select>
        </div>

        {/* Temperature Slider */}
        <div>
          <label className="text-xs text-gray-400 block mb-2 flex justify-between">
            <span>Temperature</span>
            <span className="text-cyan-400 font-mono">{temperature.toFixed(1)}</span>
          </label>
          <input 
            type="range" 
            min="0" max="1" step="0.1"
            value={temperature}
            onChange={(e) => onTempChange(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
          <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
            Higher values make output more random, lower values more deterministic.
          </p>
        </div>
      </div>
    </div>
  );
});

ModelSettingsPanel.displayName = "ModelSettingsPanel";

export default ModelSettingsPanel;