import React from 'react';

export default function Sparkline({ data }: { data: number[] }) {
  const width = 64;
  const height = 20;
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(' ');

  // Area fill path
  const areaPoints = [
    `0,${height}`,
    ...data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    }),
    `${width},${height}`,
  ].join(' ');

  return (
    <svg width={width} height={height} className="inline-block align-middle">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#spark-fill)" points={areaPoints} />
      <polyline fill="none" stroke="#38bdf8" strokeWidth="1.5" points={points} />
    </svg>
  );
}