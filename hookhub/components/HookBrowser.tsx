"use client";

import { useState, useMemo } from "react";
import { Hook, HookCategory } from "@/lib/types";
import { matchesSearch } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { HookGrid } from "./HookGrid";

interface HookBrowserProps {
  hooks: Hook[];
}

export const HookBrowser = ({ hooks }: HookBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<HookCategory | "all">("all");

  const filteredHooks = useMemo(() => {
    return hooks.filter((hook) => {
      const matchesCategory =
        selectedCategory === "all" || hook.category === selectedCategory;
      const matchesSearchQuery = matchesSearch(hook, searchQuery);
      return matchesCategory && matchesSearchQuery;
    });
  }, [hooks, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      <HookGrid hooks={filteredHooks} />
    </div>
  );
};
