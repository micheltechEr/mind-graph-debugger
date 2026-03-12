// types/agent.ts
export type AIModelType = "gemini-3-flash" | "gemini-3-pro";

export interface AgentTool {
  id: string;
  name: string;
  enabled: boolean;
}

export interface AgentConfiguration {
  id: string;
  name: string;
  systemPrompt: string;
  model: AIModelType;
  temperature: number;
  tools: AgentTool[];
}