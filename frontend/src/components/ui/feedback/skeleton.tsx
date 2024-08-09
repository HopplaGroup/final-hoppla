import { cn } from "@/lib/utils/cn";

export function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={cn("animate-pulse bg-foreground/20 rounded", { className })}
    />
  );
}
