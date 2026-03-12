// ---------------------------------------------------------
// 1. TYPESCRIPT INTERFACES
// ---------------------------------------------------------

export interface GlobalStats {
  totalCost: string;
  avgLatency: string;
  successRate: string;
}

export interface ScatterDataPoint {
  id: string;
  costUSD: number;
  latencyMs: number;
  agentName: string;
  model: "gemini-3-flash" | "gemini-3-pro";
  isError: boolean;
}

export interface HeatmapDataPoint {
  promptModule: string;   // ex: "Email Generation"
  agentType: string;      // ex: "SDR-Lead-Gen"
  errorRate: number;      // 0.0 to 1.0
}

export interface TrendDataPoint {
  timestamp: string;      // Format: "HH:mm" or ISO
  tokensFlash: number;
  tokensPro: number;
}

// ---------------------------------------------------------
// 2. MOCK DATA ARRAYS
// ---------------------------------------------------------

export const globalStats: GlobalStats = {
  totalCost: "$1,245.50",
  avgLatency: "850ms",
  successRate: "92.4%",
};

// Data for: Latency vs. Cost Chart
// Real-world use: Spotting outliers (e.g., an agent that cost $0.50 for a single run but took 10 seconds).
export const mockScatterData: ScatterDataPoint[] = [
  { id: "tr_1", costUSD: 0.02, latencyMs: 450, agentName: "SDR-Lead-Gen", model: "gemini-3-flash", isError: false },
  { id: "tr_2", costUSD: 0.05, latencyMs: 800, agentName: "Data-Extractor", model: "gemini-3-flash", isError: false },
  { id: "tr_3", costUSD: 0.45, latencyMs: 4200, agentName: "Code-Debugger", model: "gemini-3-pro", isError: false },
  { id: "tr_4", costUSD: 0.01, latencyMs: 200, agentName: "SDR-Lead-Gen", model: "gemini-3-flash", isError: false },
  { id: "tr_5", costUSD: 0.60, latencyMs: 8500, agentName: "Architecture-Planner", model: "gemini-3-pro", isError: true }, // Outlier/Error
  { id: "tr_6", costUSD: 0.03, latencyMs: 550, agentName: "Data-Extractor", model: "gemini-3-flash", isError: false },
  { id: "tr_7", costUSD: 0.35, latencyMs: 3100, agentName: "Code-Debugger", model: "gemini-3-pro", isError: false },
  { id: "tr_8", costUSD: 0.02, latencyMs: 490, agentName: "SDR-Lead-Gen", model: "gemini-3-flash", isError: true },
];

// Data for: AI Error Frequency (Heatmap)
// Real-world use: If "Intent Parsing" is failing 80% of the time across all agents, your system prompt is ruim.
export const mockHeatmapData: HeatmapDataPoint[] = [
  { promptModule: "Intent Parsing", agentType: "SDR-Lead-Gen", errorRate: 0.12 },
  { promptModule: "Email Drafting", agentType: "SDR-Lead-Gen", errorRate: 0.05 },
  { promptModule: "Tone Analysis", agentType: "SDR-Lead-Gen", errorRate: 0.02 },
  
  { promptModule: "Intent Parsing", agentType: "Support-Bot", errorRate: 0.45 }, // High error rate!
  { promptModule: "Solution Lookup", agentType: "Support-Bot", errorRate: 0.15 },
  
  { promptModule: "Code AST Parsing", agentType: "Code-Debugger", errorRate: 0.88 }, // Critical failure zone
  { promptModule: "Unit Test Gen", agentType: "Code-Debugger", errorRate: 0.22 },
];

// Data for: Token Consumption Trend (Line/Area Chart)
// Real-world use: Tracking if a loop in your code is accidentally spamming the AI API and burning money.
export const mockTrendData: TrendDataPoint[] = [
  { timestamp: "08:00", tokensFlash: 12000, tokensPro: 4000 },
  { timestamp: "09:00", tokensFlash: 15000, tokensPro: 4500 },
  { timestamp: "10:00", tokensFlash: 45000, tokensPro: 8000 }, // Spike in usage
  { timestamp: "11:00", tokensFlash: 18000, tokensPro: 5000 },
  { timestamp: "12:00", tokensFlash: 11000, tokensPro: 3000 },
  { timestamp: "13:00", tokensFlash: 13500, tokensPro: 3200 },
  { timestamp: "14:00", tokensFlash: 22000, tokensPro: 9500 },
];