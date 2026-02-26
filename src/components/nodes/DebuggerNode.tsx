import {Handle, Position} from "@xyflow/react"

interface DebuggerNodeProps {
  data: {
    label: string
    description: string
    type: "prompt" | "thinking" | "api"
  }
}

const colorMap = {
prompt: "border-blue-400 bg-[#0f172a]/80",
thinking: "border-yellow-400 bg-[#0f172a]/80",
api: "border-green-400 bg-[#0f172a]/80"
}

const DebuggerNode = ({ data }: DebuggerNodeProps) => {
  return (
    <div
      className={`
        debugger-node
        w-64 rounded-xl border
        p-4 shadow-lg
        backdrop-blur-md
        ${colorMap[data.type]}
      `}
    >
      <Handle type="target" position={Position.Top} />

      <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
        {data.label}
      </p>

      <p className="text-sm font-semibold text-white">
        {data.description}
      </p>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default DebuggerNode