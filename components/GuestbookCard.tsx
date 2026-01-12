import { truncateHash } from "@/lib/utils";
import type { GuestbookEntry } from "@/lib/types";
import ExplorerLinkButton from "@/components/ExplorerLinkButton";

export default function GuestbookCard({
  hash,
  timestamp,
  message,
  explorerUrl,
}: GuestbookEntry) {
  return (
    <article className="flex w-full max-w-md flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Transaction Hash
          </span>
          <code className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {truncateHash(hash)}
          </code>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Timestamp
          </span>
          <time
            className="text-xs font-medium text-zinc-600 dark:text-zinc-300"
            dateTime={timestamp}
          >
            {timestamp}
          </time>
        </div>
      </header>

      <div className="flex-1 px-5 py-6">
        <blockquote className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
          &quot;{message}&quot;
        </blockquote>
      </div>

      <footer className="flex flex-col items-center gap-2 border-t border-zinc-100 bg-zinc-50/50 p-2 dark:border-zinc-800 dark:bg-zinc-800/50">
        <ExplorerLinkButton href={explorerUrl} label="View on etherscan" />
        <ExplorerLinkButton href={explorerUrl} label="View on myetherscan" />
      </footer>
    </article>
  );
}
