"use client";

import { useWatchGuestbookNewMessageEvent } from "@/lib/generated";
import { formatTimestamp, getExplorerUrl, getMyExplorerUrl } from "@/lib/utils";
import Card from "@/components/card";
import { MessageIcon, SpinnerIcon } from "@/lib/icons";
import { sepolia } from "wagmi/chains";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { useMemo } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { queryUserMessages } from "@/services/guestbook.service";
import { client } from "@/graphql/client";
import { MessageFieldsFragment } from "@/generated/graphql";

interface UserMessagesListProps {
  userAddress: string;
}

export default function UserMessagesList({
  userAddress,
}: UserMessagesListProps) {
  const chainId = sepolia.id;
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", "user", userAddress],
    queryFn: ({ pageParam }) =>
      queryUserMessages({
        client,
        vars: { userId: userAddress, first: 6, skip: pageParam },
      }),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: MessageFieldsFragment[],
      allPages: MessageFieldsFragment[][]
    ) => {
      if (!lastPage || lastPage.length < 6) return undefined;
      return allPages.length * 6;
    },
    enabled: !!userAddress,
  });

  useWatchGuestbookNewMessageEvent({
    onLogs() {
      queryClient.invalidateQueries({
        queryKey: ["messages", "user", userAddress],
      });
    },
  });

  const formattedMessages = useMemo(() => {
    if (!data) return [];
    const allMessages = data.pages.flat();
    return allMessages.map((msg: MessageFieldsFragment) => {
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
  }, [data, chainId]);

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
          <Card key={`${msg.sender}-${msg.timestamp}-${msg.hash}`} {...msg} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center gap-2">
                <SpinnerIcon className="h-4 w-4" />
                <span>Loading...</span>
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
