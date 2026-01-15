"use client";

import { useWatchGuestbookNewMessageEvent } from "@/lib/generated";
import { formatTimestamp, getExplorerUrl, getMyExplorerUrl } from "@/lib/utils";
import Card from "@/components/card";
import { MessageIcon } from "@/lib/icons";
import { sepolia } from "wagmi/chains";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryUserMessages } from "@/services/guestbook.service";
import { client } from "@/graphql/client";

interface UserMessagesListProps {
  userAddress: string;
}

export default function UserMessagesList({
  userAddress,
}: UserMessagesListProps) {
  const chainId = sepolia.id;

  const {
    data: userMessages = [],
    isLoading: isLoadingMessages,
    refetch,
  } = useQuery({
    queryKey: ["messages", "user", userAddress],
    queryFn: () => queryUserMessages({ client, vars: { userId: userAddress } }),
    enabled: !!userAddress,
  });

  // Listen for new messages to refetch the subgraph
  // useWatchGuestbookNewMessageEvent({
  //   onLogs() {
  //     // Small delay to allow subgraph to index
  //     setTimeout(() => {
  //       refetch();
  //     }, 2000);
  //   },
  // });

  const formattedMessages = useMemo(() => {
    return userMessages.map((msg) => {
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
  }, [userMessages, chainId]);

  if (isLoadingMessages) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
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
          You haven&apos;t posted any messages to the guestbook yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Your Messages
        </h2>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {formattedMessages.length}{" "}
          {formattedMessages.length === 1 ? "message" : "messages"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {formattedMessages.map((msg) => (
          <Card key={`${msg.sender}-${msg.timestamp}`} {...msg} />
        ))}
      </div>
    </div>
  );
}
