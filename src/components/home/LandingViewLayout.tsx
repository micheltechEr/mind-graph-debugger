import Header from "../Header"
import NavigateSections from "../NavigateSections"
import {
    ReactFlow,
    Background
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"
import { nodes, edges } from "../../mocks/liveDebuggerData"
import DebuggerNode from "../nodes/DebuggerNode"

const nodeTypes = {
    debugger: DebuggerNode
}

const LandingViewLayout = () => {
    return (
        <div
            className="
        relative min-h-screen text-white
        bg-[#0f172a]
        bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
        bg-[size:40px_40px]
        overflow-x-hidden
      "
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_60%)] pointer-events-none" />

            <Header />
            <NavigateSections />

            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">

                <div className="col-span-9 relative bg-[#1e293b]/60 rounded-xl border border-white/5 min-h-[600px] p-6">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        fitView
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background gap={40} size={1} color="#ffffff10" />
                    </ReactFlow>
                </div>

                {/* Right Panel */}
                <div className="col-span-3 bg-[#1e293b]/80 rounded-xl border border-white/5 p-6 space-y-6">

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Context Inspector</h3>

                        <div className="bg-[#0f172a] rounded-lg p-4 text-sm text-gray-300 border border-white/5">
                            <p className="mb-2 text-gray-400">State</p>
                            <pre className="text-xs text-green-400">
                                {`{
  tokens: 1333,
  confidence: 0.89
}`}
                            </pre>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LandingViewLayout