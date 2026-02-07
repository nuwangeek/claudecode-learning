import { Hook } from "@/lib/types";
import { HookCard } from "./HookCard";

interface HookGridProps {
  hooks: Hook[];
}

export const HookGrid = ({ hooks }: HookGridProps) => {
  if (hooks.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-center text-lg text-zinc-600 dark:text-zinc-400">
          No hooks found. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hooks.map((hook) => (
        <HookCard key={hook.id} hook={hook} />
      ))}
    </div>
  );
};
