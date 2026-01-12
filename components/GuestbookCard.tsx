import React from "react";
import { ExternalLinkIcon } from "@/lib/icons";

interface GuestbookCardProps {
  hash: string;
  timestamp: string;
  message: string;
  explorerUrl: string;
}

const GuestbookCard: React.FC<GuestbookCardProps> = ({
  hash,
  timestamp,
  message,
  explorerUrl,
}) => {
  return (
    <div className="w-full max-w-md flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Transaction Hash
          </span>
          <code className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {hash.slice(0, 6)}...{hash.slice(-4)}
          </code>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Timestamp
          </span>
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {timestamp}
          </div>
        </div>
      </div>

      <div className="px-5 py-6 flex-1">
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
          &quot;{message}&quot;
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-zinc-100 bg-zinc-50/50 p-2 dark:border-zinc-800 dark:bg-zinc-800/50">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <span>View on etherscan</span>
          <ExternalLinkIcon className="h-3 w-3" />
        </a>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <span>View on myetherscan</span>
          <ExternalLinkIcon className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default GuestbookCard;
