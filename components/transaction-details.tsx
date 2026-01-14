"use client";

import { truncateHash } from "@/lib/utils";
import {
  HashIcon,
  LayersIcon,
  ZapIcon,
  TerminalIcon,
  ExternalLinkIcon,
} from "@/lib/icons";
import { TransactionReceipt } from "viem";

interface TransactionDetailsProps {
  receipt: TransactionReceipt;
}

export default function TransactionDetails({
  receipt,
}: TransactionDetailsProps) {
  const details = [
    {
      label: "Transaction Hash",
      value: receipt.transactionHash,
      icon: <HashIcon className="h-4 w-4" />,
      copyable: true,
    },
    {
      label: "Block Hash",
      value: receipt.blockHash,
      icon: <LayersIcon className="h-4 w-4" />,
      copyable: true,
    },
    {
      label: "Block Number",
      value: Number(receipt.blockNumber.toString()),
      icon: <TerminalIcon className="h-4 w-4" />,
    },
    {
      label: "Gas Used",
      value: Number(receipt.gasUsed).toString(),
      icon: <ZapIcon className="h-4 w-4" />,
    },
    {
      label: "Transaction Type",
      value: receipt.type,
      icon: <TerminalIcon className="h-4 w-4" />,
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {details.map((detail) => (
          <div
            key={detail.value}
            className="group relative flex flex-col space-y-1 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {detail.icon}
              {detail.label}
            </div>
            <div className="flex items-center justify-between gap-2">
              <code className="break-all font-mono text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {detail.copyable
                  ? truncateHash(detail.value, 25, 12)
                  : detail.value}
              </code>
              {detail.copyable && (
                <button
                  onClick={() => handleCopy(detail.value)}
                  className="cursor-pointer rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-zinc-600 shadow-xs ring-1 ring-zinc-200 ring-inset transition-all hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700 dark:hover:bg-zinc-700"
                >
                  Copy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <a
        href={`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        View on Explorer
        <ExternalLinkIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
