export type HookCategory =
  | "code-quality"
  | "notifications"
  | "sdk"
  | "multi-agent"
  | "localization"
  | "dev-workflow"
  | "ux-audio";

export interface Hook {
  id: string;            // slug, e.g. "tdd-guard"
  name: string;          // display name
  description: string;   // 1-2 sentence summary
  author: string;        // GitHub username or name
  repoUrl: string;       // full GitHub URL
  category: HookCategory;
  language: string;      // "TypeScript", "Python", "PHP", "Bash"
  tags: string[];        // freeform for search
}

export const CATEGORY_META: Record<HookCategory, { label: string }> = {
  "code-quality":  { label: "Code Quality" },
  "notifications": { label: "Notifications" },
  "sdk":           { label: "SDK / Framework" },
  "multi-agent":   { label: "Multi-Agent" },
  "localization":  { label: "Localization" },
  "dev-workflow":  { label: "Dev Workflow" },
  "ux-audio":      { label: "UX & Audio" },
};
