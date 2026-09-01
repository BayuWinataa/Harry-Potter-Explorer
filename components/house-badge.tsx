import { HOUSE_COLORS } from '@/types/hp';

export function HouseBadge({ house }: { house?: string }) {
  const color = house ? HOUSE_COLORS[house] : null;
  if (!color) {
    return (
      <span className="text-xs text-muted-foreground">No house</span>
    );
  }
  return (
    <span
      className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: color.bg, color: color.color }}
    >
      {house}
    </span>
  );
}
