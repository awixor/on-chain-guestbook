import { truncateHash, parseEmojis } from "@/lib/utils";
import type { GuestbookEntry } from "@/lib/types";
import ExternalLinkButton from "@/components/external-link-button";

export default function Card({
  sender,
  timestamp,
  message,
  explorerUrl,
  myExplorerUrl,
  hash,
}: GuestbookEntry) {
  const parsedMessage = parseEmojis(message);

  return (
    <div className="group relative h-full w-full rounded-2xl p-px transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <article className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <header className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-5 py-3 transition-colors duration-300 group-hover:bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-800/50 dark:group-hover:bg-zinc-800/70">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Author
            </span>
            <code className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {truncateHash(sender)}
            </code>
          </div>
          <div className="flex flex-col gap-0.5 text-right">
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
            &quot;{parsedMessage}&quot;
          </blockquote>
        </div>

        <footer className="flex flex-col items-center gap-2 border-t border-zinc-100 bg-zinc-50/50 p-2 transition-colors duration-300 group-hover:bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-800/50 dark:group-hover:bg-zinc-800/70">
          <ExternalLinkButton
            href={explorerUrl}
            label="View on etherscan"
            isLoading={!hash}
          />
          <ExternalLinkButton
            href={myExplorerUrl}
            label="View on my block explorer"
            isLoading={!hash}
          />
        </footer>
      </article>
    </div>
  );
}
