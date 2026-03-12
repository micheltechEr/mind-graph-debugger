import { memo } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard = memo(({ title, value }: StatCardProps) => {
  return (
    <div className="bg-[#1e293b]/80 rounded-xl border border-white/5 p-4 min-w-[200px] shadow-lg">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
});

StatCard.displayName = "StatCard";

export default StatCard;