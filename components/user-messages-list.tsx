"use client";

import {
  useReadGuestbookGetMessages,
  useWatchGuestbookNewMessageEvent,
} from "@/lib/generated";
import { formatTimestamp, getExplorerUrl, getMyExplorerUrl } from "@/lib/utils";
import Card from "@/components/card";
import { SpinnerIcon, MessageIcon } from "@/lib/icons";
import { useChainId } from "wagmi";
import { useGuestbookLogs } from "@/hooks/useGuestbookLogs";
import { useMemo } from "react";

interface UserMessagesListProps {
  userAddress: string;
}

export default function UserMessagesList({
  userAddress,
}: UserMessagesListProps) {
  const chainId = useChainId();
  const offset = 0;
  const limit = 100;

  const {
    data: stateMessages = [],
    isLoading: isLoadingMessages,
    refetch: refetchState,
  } = useReadGuestbookGetMessages({
    args: [BigInt(offset), BigInt(limit)],
  });

  const { data: logsData = [], refetch: refetchLogs } = useGuestbookLogs();

  useWatchGuestbookNewMessageEvent({
    onLogs() {
      refetchState();
      refetchLogs();
    },
  });

  const formattedMessages = useMemo(() => {
    const userMessages = (
      stateMessages as readonly {
        sender: string;
        message: string;
        timestamp: bigint;
      }[]
    ).filter((msg) => msg.sender.toLowerCase() === userAddress.toLowerCase());

    return userMessages.map((msg) => {
      const matchingLog = logsData.find(
        (log) =>
          log.sender.toLowerCase() === msg.sender.toLowerCase() &&
          log.message === msg.message &&
          BigInt(log.timestamp) === msg.timestamp
      );

      const hash = matchingLog?.hash;
      const explorerUrl = hash ? getExplorerUrl(hash, chainId) : "";
      const myExplorerUrl = hash ? getMyExplorerUrl(hash) : "";

      return {
        sender: msg.sender,
        timestamp: formatTimestamp(msg.timestamp),
        message: msg.message,
        explorerUrl,
        myExplorerUrl,
        hash,
      };
    });
  }, [stateMessages, logsData, chainId, userAddress]);

  if (isLoadingMessages) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 flex h-16 w-16 items-center justify-center">
          <SpinnerIcon className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading your messages from the blockchain...
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
