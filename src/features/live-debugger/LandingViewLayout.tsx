import { useState, useCallback, useEffect } from "react"
import Header from "../../components/Header"
import NavigateSections from "../../components/NavigateSections"
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
   type Node,
   type Edge
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"
import DebuggerNode from "./components/DebuggerNode"

// Define the node structure so TypeScript helps us
interface AIContextData {
    tokens: number;
    confidence: number;
    memoryKeys?: string[];
}

interface NodeData {
    label: string;
    description: string;
    type: "prompt" | "thinking" | "api";
    context?: AIContextData; // The hidden data for the sidebar
}

const nodeTypes = {
    debugger: DebuggerNode
}

// Initial mock data to start the graph
const initialNodes: Node<NodeData>[] = [
    {
        id: "1",
        type: "debugger",
        position: { x: 250, y: 100 },
        data: { 
            label: "USER PROMPT", 
            description: "Draft email to client", 
            type: "prompt",
            context: { tokens: 45, confidence: 1.0 } 
        }
    }
];

const LandingViewLayout = () => {
    // 1. React Flow State Hooks
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // 2. Sidebar State
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(initialNodes[0].data);
    const [isStreaming, setIsStreaming] = useState(false);

    // 3. Performance: useCallback prevents function recreation on every render
    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        setSelectedNode(node.data as NodeData);
    }, []);

    // 4. MEMORY LEAK PREVENTION (The "Real World" Challenge)
    useEffect(() => {
        if (!isStreaming) return;

        // We simulate an AI sending a new "Thought" every 3 seconds
        const streamInterval = setInterval(() => {
            console.log("Fetching new AI node...");
            // In a real app, you would append new nodes from WebSockets here
        }, 3000);

        // THE FIX: If you navigate away from this page while isStreaming is true,
        // this interval keeps running in the background forever (Memory Leak!).
        // The return function guarantees React kills the interval on unmount.
        return () => {
            clearInterval(streamInterval);
            console.log("Stream cleaned up. No memory leaks here.");
        };
    }, [isStreaming]);

    return (
        <div className="relative min-h-screen text-white bg-[#0f172a] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] overflow-x-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_60%)] pointer-events-none" />

            <Header />
            <NavigateSections />

            {/* Quick Control Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-4 flex justify-end">
                <button 
                    onClick={() => setIsStreaming(!isStreaming)}
                    className={`px-4 py-2 rounded-md text-sm font-bold ${isStreaming ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-green-500/20 text-green-400 border border-green-500/50'}`}
                >
                    {isStreaming ? "Stop Stream" : "Start Live Stream"}
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-12 gap-6">
                
                {/* Left Panel: The Canvas */}
                <div className="col-span-9 relative bg-[#1e293b]/60 rounded-xl border border-white/5 min-h-[600px] p-2">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background gap={40} size={1} color="#ffffff10" />
                    </ReactFlow>
                </div>

                {/* Right Panel: Context Inspector */}
                <div className="col-span-3 bg-[#1e293b]/80 rounded-xl border border-white/5 p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-cyan-400">Context Inspector</h3>
                        
                        {selectedNode ? (
                            <div className="bg-[#0f172a] rounded-lg p-4 text-sm text-gray-300 border border-white/5 shadow-inner">
                                <p className="mb-2 text-gray-400 text-xs uppercase tracking-widest">{selectedNode.label}</p>
                                <pre className="text-xs text-green-400 overflow-x-auto">
                                    {JSON.stringify(selectedNode.context, null, 2)}
                                </pre>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm text-center py-10">
                                Select a node to inspect state.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LandingViewLayout;