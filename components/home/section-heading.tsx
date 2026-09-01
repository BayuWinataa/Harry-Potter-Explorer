export function SectionHeading({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="font-display text-2xl font-bold">{children}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
