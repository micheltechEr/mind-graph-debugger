import React, { useMemo, useState, useCallback } from 'react';
import { aiSessions } from './mocks/aiSessions';
import type { AISession } from './mocks/aiSessions';
import StatCard from './components/StatCard';
import SidebarFilter from './components/SidebarFilter';
import SessionTable, { type SessionRow } from './components/SessionTable';
import Header from '../../components/Header';

const DEFAULT_MODEL = 'Gemini 3 Flash';
const DEFAULT_DATE = '24h';
const DEFAULT_ERROR = 'all';

function getFilteredSessions(sessions: AISession[], model: string, dateRange: string, errorType: string) {
  let filtered = sessions;
  if (model) {
  const baseModel = model.split(' ')[0];
  filtered = filtered.filter(s => s.agentName.includes(baseModel));
}
  if (errorType === 'hallucination') filtered = filtered.filter(s => s.status === 'error');
  if (errorType === 'timeout') filtered = filtered.filter(s => s.latency > 2500);
  return filtered;
}

export default function HomePage() {
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [dateRange, setDateRange] = useState(DEFAULT_DATE);
  const [errorType, setErrorType] = useState(DEFAULT_ERROR);

  const filteredSessions = useMemo(
    () => getFilteredSessions(aiSessions, model, dateRange, errorType),
    [model, dateRange, errorType]
  );

  const totalTokenBurn = useMemo(
    () => filteredSessions.reduce((acc, s) => acc + s.tokenCount, 0),
    [filteredSessions]
  );
  const avgLatency = useMemo(
    () =>
      filteredSessions.length
        ? Math.round(filteredSessions.reduce((acc, s) => acc + s.latency, 0) / filteredSessions.length)
        : 0,
    [filteredSessions]
  );
  const successRate = useMemo(
    () =>
      filteredSessions.length
        ? Math.round(
            (filteredSessions.filter(s => s.status === 'completed').length / filteredSessions.length) * 100
          )
        : 0,
    [filteredSessions]
  );

  const getRandomDepth = () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 10) + 1);

  const handleLaunchDebugger = useCallback((id: string) => {
    window.location.href = `/live-debugger?session=${id}`;
  }, []);

  const sessionRows: SessionRow[] = useMemo(
    () =>
      filteredSessions.map(s => ({
        id: s.id,
        agentName: s.agentName,
        status: s.status,
        thoughtDepth: getRandomDepth(),
        action: () => handleLaunchDebugger(s.id),
      })),
    [filteredSessions, handleLaunchDebugger]
  );

  console.log('Filtered Sessions:', sessionRows);
  return (
    <div
      className="
        relative flex min-h-screen text-white
        bg-[#0f172a]
        bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
        bg-[size:40px_40px]
        overflow-x-hidden
      "
    >
      {/* Radial glow — same as LandingView */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_60%)] pointer-events-none" />

      {/* Sidebar */}
      <SidebarFilter
        model={model}
        setModel={setModel}
        dateRange={dateRange}
        setDateRange={setDateRange}
        errorType={errorType}
        setErrorType={setErrorType}
      />

      {/* Main content */}
      <main className="relative flex-1 p-8">
        <Header />
        <h1 className="text-3xl font-bold mb-8 text-white">AI Operations</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Token Burn"
            value={totalTokenBurn.toLocaleString()}
            color="border-indigo-500"
          />
          <StatCard title="Avg. Latency" value={avgLatency + ' ms'} color="border-blue-500" />
          <StatCard title="Success Rate" value={successRate + '%'} color="border-green-500" />
        </div>

        {/* Session Table */}
        <div className="bg-[#1e293b]/80 rounded-xl border border-white/5 p-6">
          <SessionTable sessions={sessionRows} />
        </div>
      </main>
    </div>
  );
}