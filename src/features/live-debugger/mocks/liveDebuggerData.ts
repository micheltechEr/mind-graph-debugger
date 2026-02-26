import type { Node, Edge } from "@xyflow/react"

export const nodes: Node[] = [
  {
    id: "1",
    type: "debugger",
    position: { x: 0, y: 0 },
    data: {
      label: "User Prompt",
      description: "Draft email to client",
      type: "prompt",
      style: { stroke: "#72a1cf", strokeWidth: 1.5 }
    }
  },
  {
    id: "2",
    position: { x: 300, y: 150 },
    type: "debugger",
    data: {
      label: "Thinking",
      description: "Analysing request...",
      type: "thinking"
    }
  },
  {
    id: "3",
    type: "debugger",
    position: { x: 650, y: 300 },
    data: {
      label: "API Call",
      description: "Fetching CRM Data",
      type: "api"
    }
  }
]

export const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true }
]