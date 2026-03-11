// Mock de 50 sessões de IA
// src/features/home/mocks/aiSessions.ts

export type AISession = {
  id: string;
  status: 'completed' | 'live' | 'error';
  tokenCount: number;
  latency: number;
  agentName: string;
};

const agentNames = [
  'SDR-Gemini',
  'Code-Optimizer',
  'Research-Assistant',
  'Data-Analyzer',
  'Prompt-Engineer',
  'Vision-Expert',
  'LangChain-Bot',
  'Copilot-Plus',
  'QA-Inspector',
  'Auto-Writer',
];

function getRandomStatus(): 'completed' | 'live' | 'error' {
  const r = Math.random();
  if (r < 0.8) return 'completed';
  if (r < 0.9) return 'live';
  return 'error';
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const aiSessions: AISession[] = Array.from({ length: 50 }, (_, i) => ({
  id: `session-${i + 1}`,
  status: getRandomStatus(),
  tokenCount: getRandomInt(500, 5000),
  latency: getRandomInt(200, 3000),
  agentName: agentNames[getRandomInt(0, agentNames.length - 1)],
}));
