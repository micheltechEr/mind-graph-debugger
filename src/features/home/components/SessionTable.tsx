import React from 'react';
import StatusBadge from './StatusBadge';
import Sparkline from './Sparkline';

export type SessionRow = {
  id: string;
  agentName: string;
  status: 'completed' | 'live' | 'error';
  thoughtDepth: number[];
  action: () => void;
};

export default function SessionTable({ sessions = [] }: { sessions?: SessionRow[] }) {
  console.log('Rendering SessionTable with sessions:', sessions);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">ID/Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Agent Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Thought Depth</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, i) => (
            <tr
              key={s.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors group"
            >
              <td className="px-4 py-3 text-sm text-gray-300 font-mono">{s.id}</td>
              <td className="px-4 py-3 text-sm text-gray-200">{s.agentName}</td>
              <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
              <td className="px-4 py-3"><Sparkline data={s.thoughtDepth} /></td>
              <td className="px-4 py-3">
                <button
                  onClick={s.action}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold
                    bg-sky-500/10 text-sky-400 border border-sky-500/20
                    hover:bg-sky-500/20 hover:border-sky-400/40
                    transition-all duration-200"
                >
                  Launch Debugger
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}