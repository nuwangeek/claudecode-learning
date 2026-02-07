import { Hook } from "./types";

export const matchesSearch = (hook: Hook, searchQuery: string): boolean => {
  if (!searchQuery.trim()) {
    return true;
  }

  const query = searchQuery.toLowerCase();
  const searchableText = [
    hook.name,
    hook.description,
    hook.author,
    hook.language,
    ...hook.tags,
  ].join(" ").toLowerCase();

  return searchableText.includes(query);
};
