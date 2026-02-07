export const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            Hooks sourced from{" "}
            <a
              href="https://github.com/hesreallyhim/awesome-claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400 transition-colors"
            >
              awesome-claude-code
            </a>
          </p>
          <a
            href="https://docs.claude.ai/docs/hooks"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400 transition-colors"
          >
            Learn about Claude Code hooks
          </a>
        </div>
      </div>
    </footer>
  );
};
