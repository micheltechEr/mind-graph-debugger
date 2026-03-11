import React from 'react';

export default function StatusBadge({ status }: { status: 'completed' | 'live' | 'error' }) {
  if (status === 'live') {
    return (
      <span className="relative flex items-center">
        <span className="animate-pulse absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 mr-2"></span>
        <span className="text-xs font-semibold text-blue-700 ml-4">Live</span>
      </span>
    );
  }
  if (status === 'completed') {
    return <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">Completed</span>;
  }
  return <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">Crashed</span>;
}
