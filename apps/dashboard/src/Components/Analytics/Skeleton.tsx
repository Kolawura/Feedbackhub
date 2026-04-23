export const Skeleton = () => (
  <div className="flex items-end justify-around gap-2 h-full">
    {Array.from({ length: 7 }).map((_, i) => (
      <div
        key={i}
        className="flex-1 bg-[var(--bg-hover)] animate-pulse rounded-sm"
        style={{ height: `${30 + ((i * 17) % 50)}%` }}
      />
    ))}
  </div>
);
