import { Hook } from "@/lib/types";

interface HookCardProps {
  hook: Hook;
}

export const HookCard = ({ hook }: HookCardProps) => {
  return (
    <article className="rounded-xl border border-zinc-200 p-5 bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          {hook.name}
        </h3>
        <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {hook.language}
        </span>
      </div>

      <div className="mb-3">
        <span className="inline-block rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
          {hook.category}
        </span>
      </div>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
        {hook.description}
      </p>

      <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-500">
        by {hook.author}
      </div>

      <a
        href={hook.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${hook.name} on GitHub`}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400 transition-colors"
      >
        View on GitHub
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </article>
  );
};
