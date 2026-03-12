import { Handle, Position, type NodeProps } from "@xyflow/react"

// Notice we extend the type here. This is good TS practice.
type DebuggerNodeData = {
  label: string;
  description: string;
  type: "prompt" | "thinking" | "api";
};

const colorMap = {
  prompt: "border-blue-500 bg-blue-950/40 text-blue-200",
  thinking: "border-amber-500 bg-amber-950/40 text-amber-200",
  api: "border-emerald-500 bg-emerald-950/40 text-emerald-200"
};

// React flow injects 'data' and 'selected' automatically
const DebuggerNode = ({ data, selected }: NodeProps<Node<DebuggerNodeData>>) => {
  return (
    <div
      className={`
        w-64 rounded-xl border-2
        p-4 shadow-xl transition-all duration-200
        backdrop-blur-md
        ${colorMap[data.type]}
        ${selected ? 'ring-4 ring-white/20 scale-105' : 'opacity-90 hover:opacity-100'}
      `}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-gray-800 border-2 border-white" 
      />

      <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
            {data.label}
          </p>
          {/* A small pulsing dot to simulate 'activity' if it's thinking */}
          {data.type === 'thinking' && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
          )}
      </div>

      <p className="text-sm font-medium">
        {data.description}
      </p>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-gray-800 border-2 border-white" 
      />
    </div>
  )
}

export default DebuggerNode;