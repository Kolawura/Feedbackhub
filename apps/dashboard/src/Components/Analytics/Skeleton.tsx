export const Skeleton = ({ bars = 7 }: { bars?: number }) => (
  <div className="flex items-end justify-around gap-2 h-full">
    {Array.from({ length: bars }).map((_, i) => (
      <div
        key={i}
        className="flex-1 bg-[var(--bg-hover)] animate-pulse rounded-sm"
        style={{ height: `${30 + ((i * 17) % 50)}%` }}
      />
    ))}
  </div>
);
