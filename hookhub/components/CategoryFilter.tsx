"use client";

import { HookCategory, CATEGORY_META } from "@/lib/types";

interface CategoryFilterProps {
  selected: HookCategory | "all";
  onChange: (category: HookCategory | "all") => void;
}

export const CategoryFilter = ({ selected, onChange }: CategoryFilterProps) => {
  const categories: Array<{ value: HookCategory | "all"; label: string }> = [
    { value: "all", label: "All" },
    ...Object.entries(CATEGORY_META).map(([value, { label }]) => ({
      value: value as HookCategory,
      label,
    })),
  ];

  const handleClick = (category: HookCategory | "all") => {
    onChange(category);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    category: HookCategory | "all"
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(category);
    }
  };

  return (
    <div role="radiogroup" aria-label="Filter by category">
      <div className="flex flex-wrap gap-2">
        {categories.map(({ value, label }) => {
          const isActive = selected === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={0}
              onClick={() => handleClick(value)}
              onKeyDown={(e) => handleKeyDown(e, value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
