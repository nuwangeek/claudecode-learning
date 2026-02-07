# HookHub MVP Spec

## Context

HookHub is a Next.js 16 app for browsing open-source Claude Code hooks. Claude Code hooks are user-defined shell commands or LLM prompts that execute at specific lifecycle points (14 event types like `PreToolUse`, `PostToolUse`, `Stop`, etc.). A growing community of hooks exists on GitHub but there's no central place to discover them. HookHub solves this as a simple, static catalog.

The project already has a clean Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript (strict) scaffold at `hookhub/`. This spec covers the MVP: **display-only browsing with search and category filtering**.

---

## Data Model

**File: `lib/types.ts`**

```typescript
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
```

---

## Seed Data (9 real community hooks)

**File: `lib/data/hooks.ts`**

| Hook | Category | Author | Language |
|------|----------|--------|----------|
| Britfix | localization | Talieisin | Python |
| CC Notify | notifications | dazuiba | TypeScript |
| cchooks | sdk | GowayLee | Python |
| Claude Hook Comms (HCOM) | multi-agent | aannoo | TypeScript |
| Claude Hooks SDK (PHP) | sdk | beyondcode | PHP |
| claude-hooks | sdk | John Lindquist | TypeScript |
| Claudio | ux-audio | Christopher Toth | Python |
| TDD Guard | dev-workflow | Nizar Selander | TypeScript |
| TypeScript Quality Hooks | code-quality | bartolli | Bash |

Data sourced from [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code).

---

## Page Layout

```
┌──────────────────────────────────────────────┐
│  Header: "HookHub" + tagline + docs link     │
├──────────────────────────────────────────────┤
│  SearchBar: full-width text input            │
├──────────────────────────────────────────────┤
│  CategoryFilter: horizontal pill row         │
│  [All] [Code Quality] [Notifications] ...    │
├──────────────────────────────────────────────┤
│  HookGrid: responsive grid of HookCards      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ Card    │ │ Card    │ │ Card    │        │
│  └─────────┘ └─────────┘ └─────────┘       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ Card    │ │ Card    │ │ Card    │        │
│  └─────────┘ └─────────┘ └─────────┘       │
├──────────────────────────────────────────────┤
│  Footer: attribution + docs link             │
└──────────────────────────────────────────────┘
```

**Grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

---

## HookCard Design

Each card shows:
- **Name** (bold) + **language badge** (small pill, e.g. "TypeScript")
- **Category** badge
- **Description** (line-clamped to 3 lines)
- **Author** (muted text)
- **"View on GitHub"** link → external, `target="_blank"`

Styling: `rounded-xl border p-5` with `hover:shadow-lg transition-shadow`. Dark mode via `dark:` variants.

---

## Search & Filter

- **Search**: client-side, case-insensitive `includes()` against name + description + author + language + tags
- **Category filter**: single-select pill row with "All" option
- **Combined**: AND logic (must match both search AND category)
- **Empty state**: "No hooks found. Try adjusting your search or filters."
- **State**: local `useState` — no URL params for MVP

---

## Component Architecture

```
app/page.tsx (Server Component)
  ├── Header.tsx (server)
  ├── HookBrowser.tsx ("use client" — owns search + filter state)
  │     ├── SearchBar.tsx ("use client" — controlled input)
  │     ├── CategoryFilter.tsx ("use client" — pill buttons)
  │     └── HookGrid.tsx (presentational)
  │           └── HookCard.tsx (presentational)
  └── Footer.tsx (server)
```

**Key decision**: `page.tsx` stays a Server Component. It imports static hook data and passes it to `HookBrowser`, which is the single client boundary that manages all interactive state.

---

## File Structure (new files)

```
hookhub/
  lib/
    types.ts              ← TypeScript types + category metadata
    utils.ts              ← matchesSearch() helper
    data/
      hooks.ts            ← Static seed data (9 hooks)
  components/
    Header.tsx            ← Logo, tagline, docs link
    HookBrowser.tsx       ← "use client": search/filter state orchestrator
    SearchBar.tsx         ← "use client": text input with search icon
    CategoryFilter.tsx    ← "use client": horizontal pill row
    HookGrid.tsx          ← Grid wrapper, maps HookCards
    HookCard.tsx          ← Individual hook card
    Footer.tsx            ← Attribution footer
```

**Modified files:**
- `app/layout.tsx` — update metadata title/description only
- `app/page.tsx` — replace boilerplate with HookHub page

**No new npm dependencies.** Everything uses React 19 built-ins + Tailwind CSS 4.

---

## Implementation Order

1. `lib/types.ts` → `lib/utils.ts` → `lib/data/hooks.ts` (data layer, no deps)
2. `HookCard.tsx` → `Header.tsx` → `Footer.tsx` (leaf components)
3. `SearchBar.tsx` → `CategoryFilter.tsx` (interactive leaf components)
4. `HookGrid.tsx` → `HookBrowser.tsx` (composition)
5. `app/page.tsx` + `app/layout.tsx` (wire it up)

---

## Dark Mode

Follows existing system-preference approach (`prefers-color-scheme: dark`). No toggle needed.
- Cards: `bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800`
- Pills (active): `bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900`
- Input: `bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700`

---

## Accessibility

- Search input: proper `aria-label`, `placeholder`
- Category pills: `role="radiogroup"` with `aria-checked` on active pill, `tabIndex={0}`
- HookCards: semantic `<article>` element, GitHub link with descriptive `aria-label`
- External links: `rel="noopener noreferrer"` on all `target="_blank"` links

---

## Verification

1. Run `npm run build` from `hookhub/` — must pass with zero TypeScript errors
2. Run `npm run dev` — verify page renders at `http://localhost:3000`
3. Test search: type "python" → should show Britfix, cchooks, Claudio
4. Test category filter: click "SDK / Framework" → should show 3 SDK hooks
5. Test combined: select "SDK" + search "php" → should show only Claude Hooks SDK (PHP)
6. Test empty state: search "nonexistent" → should show empty message
7. Test responsive: resize browser through mobile/tablet/desktop breakpoints
8. Test dark mode: toggle system appearance → verify all components adapt
9. Run `npm run lint` — must pass with zero errors
