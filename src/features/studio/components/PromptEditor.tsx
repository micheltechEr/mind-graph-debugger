import { memo } from "react";

interface PromptEditorProps {
  value: string;
  onChange: (newPrompt: string) => void;
}

const PromptEditor = memo(({ value, onChange }: PromptEditorProps) => {
  return (
    <div className="bg-[#1e293b]/60 rounded-xl border border-white/5 p-6 h-[500px] flex flex-col">
      <label className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
        System Prompt
      </label>
      <textarea
        className="flex-1 bg-[#0f172a] border border-white/10 rounded-lg p-4 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write the core instructions for this AI..."
      />
    </div>
  );
});

PromptEditor.displayName = "PromptEditor";

export default PromptEditor;