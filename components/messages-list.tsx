"use client";

import { useReadGuestbookGetMessages } from "@/lib/generated";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";
import Card from "@/components/card";
import { SpinnerIcon, MessageIcon } from "@/lib/icons";
import { useChainId } from "wagmi";

export default function MessagesList() {
  const chainId = useChainId();
  const offset = 0;
  const limit = 12;

  const { data: fetchedMessages = [], isLoading } = useReadGuestbookGetMessages(
    {
      args: [BigInt(offset), BigInt(limit)],
      // query: {
      //   refetchInterval: 10000,
      // },
    }
  );

  const formattedMessages = fetchedMessages.map((msg, index) => {
    const uniqueHash = `${msg.sender}-${msg.timestamp}-${index}`;
    const explorerUrl = getExplorerUrl(msg.sender, chainId);

    return {
      hash: uniqueHash,
      timestamp: formatTimestamp(msg.timestamp),
      message: msg.message,
      explorerUrl,
    };
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 flex h-16 w-16 items-center justify-center">
          <SpinnerIcon className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading messages from the blockchain...
        </p>
      </div>
    );
  }

  if (formattedMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <MessageIcon className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          No messages yet
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Be the first to leave a message on the blockchain!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {formattedMessages.map((msg, index) => (
        <Card key={`${msg.hash}-${index}`} {...msg} />
      ))}
    </div>
  );
}
