import React from 'react';

export default function SidebarFilter({
  model,
  setModel,
  dateRange,
  setDateRange,
  errorType,
  setErrorType,
}: {
  model: string;
  setModel: (m: string) => void;
  dateRange: string;
  setDateRange: (d: string) => void;
  errorType: string;
  setErrorType: (e: string) => void;
}) {
  return (
    <aside className="w-64 p-6 bg-[#1e293b]/80 border-r border-white/5 flex flex-col gap-8 min-h-screen relative z-10">
      
      {/* Logo / Title */}
      <div className="mb-2">
        <span className="text-sky-400 font-bold text-lg tracking-wide">AI Ops</span>
        <p className="text-xs text-gray-500 mt-0.5">Operations Dashboard</p>
      </div>

      {/* Model */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Model
        </div>
        <div className="flex flex-col gap-3">
          {['Gemini 3 Flash', 'Gemini 3 Pro'].map(m => (
            <label key={m} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                  ${model === m
                    ? 'border-sky-400 bg-sky-400/20'
                    : 'border-white/20 group-hover:border-white/40'
                  }`}
                onClick={() => setModel(m)}
              >
                {model === m && (
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                )}
              </div>
              <input
                type="radio"
                name="model"
                value={m}
                checked={model === m}
                onChange={() => setModel(m)}
                className="hidden"
              />
              <span
                className={`text-sm transition-colors ${
                  model === m ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                }`}
              >
                {m}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Date Range */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Date Range
        </div>
        <select
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200
            focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20
            transition-all appearance-none cursor-pointer"
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
        >
          <option value="24h">Last 24h</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Error Type */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Error Type
        </div>
        <select
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200
            focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20
            transition-all appearance-none cursor-pointer"
          value={errorType}
          onChange={e => setErrorType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="hallucination">Hallucination</option>
          <option value="timeout">Timeout</option>
        </select>
      </div>
    </aside>
  );
}