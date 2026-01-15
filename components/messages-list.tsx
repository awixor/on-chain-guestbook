"use client";

import { useWatchGuestbookNewMessageEvent } from "@/lib/generated";
import { formatTimestamp, getExplorerUrl, getMyExplorerUrl } from "@/lib/utils";
import MessagesListSkeleton from "@/components/skeletons/messages-list-skeleton";
import Card from "@/components/card";
import { MessageIcon } from "@/lib/icons";
import { sepolia } from "wagmi/chains";
import { useMemo } from "react";
import { useGuestbookMessages } from "@/hooks/useGuestbookMessages";

export default function MessagesList() {
  const chainId = sepolia.id;

  const {
    data: subgraphMessages = [],
    isLoading: isLoadingMessages,
    refetch,
  } = useGuestbookMessages();

  // Listen for new messages to refetch the subgraph
  useWatchGuestbookNewMessageEvent({
    onLogs() {
      // Small delay to allow subgraph to index
      setTimeout(() => {
        refetch();
      }, 2000);
    },
  });

  const formattedMessages = useMemo(() => {
    return (
      subgraphMessages as {
        transactionHash: string;
        sender: string;
        timestamp: string;
        message: string;
      }[]
    ).map((msg) => {
      const hash = msg.transactionHash;
      const explorerUrl = hash ? getExplorerUrl(hash, chainId) : "";
      const myExplorerUrl = hash ? getMyExplorerUrl(hash) : "";

      return {
        sender: msg.sender,
        timestamp: formatTimestamp(BigInt(msg.timestamp)),
        message: msg.message,
        explorerUrl,
        myExplorerUrl,
        hash,
      };
    });
  }, [subgraphMessages, chainId]);

  if (isLoadingMessages) {
    return <MessagesListSkeleton />;
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
      {formattedMessages.map((msg) => (
        <Card key={`${msg.sender}-${msg.timestamp}`} {...msg} />
      ))}
    </div>
  );
}
