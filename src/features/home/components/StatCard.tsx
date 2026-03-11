import React from 'react';

export default function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon?: React.ReactNode; color?: string }) {
  return (
    <div className={`flex flex-col items-start p-4 rounded-lg shadow bg-white border-l-4 ${color || 'border-blue-500'}`}> 
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="text-sm font-medium text-gray-500">{title}</span>
      </div>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
    </div>
  );
}
