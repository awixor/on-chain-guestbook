"use client";

import { useEffect, useState } from "react";
import CharacterCounter from "@/components/character-counter";
import Button from "@/components/button";
import { useWriteGuestbookPostMessage } from "@/lib/generated";
import { useWaitForTransactionReceipt } from "wagmi";
import EstimatedFees from "./estimated-fees";
import Modal from "./modal";
import TransactionDetails from "./transaction-details";
import { parseEmojis } from "@/lib/utils";
import { STORAGE_KEYS } from "@/lib/constants";

export default function GuestbookForm() {
  const [message, setMessage] = useState("");
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedHash = localStorage.getItem(STORAGE_KEYS.PENDING_TX);

    if (savedHash && savedHash.startsWith("0x")) {
      const timeoutId = setTimeout(() => {
        setHash(savedHash as `0x${string}`);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const {
    mutateAsync,
    isPending: isWriting,
    error: writeError,
    reset: resetWrite,
  } = useWriteGuestbookPostMessage();

  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      localStorage.removeItem(STORAGE_KEYS.PENDING_TX);
      const timeoutId = setTimeout(() => {
        setMessage("");
        setIsModalOpen(true);
        resetWrite();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isConfirmed, resetWrite]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isWriting || isConfirming) return;

    try {
      const txHash = await mutateAsync({
        args: [message.trim()],
      });
      setHash(txHash);
      localStorage.setItem(STORAGE_KEYS.PENDING_TX, txHash);
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  const isPending = isWriting || isConfirming;
  const error = writeError || receiptError;

  useEffect(() => {
    if (error) {
      localStorage.removeItem(STORAGE_KEYS.PENDING_TX);
    }
  }, [error]);

  return (
    <div className="mb-12 w-full">
      <form
        onSubmit={handleSubmit}
        className="group relative overflow-hidden rounded-2xl p-px transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50"
      >
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-zinc-900 transition-colors dark:text-zinc-50"
              >
                Your Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  value={parseEmojis(message)}
                  onChange={(e) => setMessage(parseEmojis(e.target.value))}
                  placeholder="Leave your mark on the blockchain..."
                  rows={4}
                  maxLength={280}
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 transition-all duration-200 focus:border-zinc-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:ring-offset-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-600 dark:focus:bg-zinc-900 dark:focus:ring-zinc-700"
                />
                <CharacterCounter current={message.length} max={280} />
              </div>
            </div>

            <EstimatedFees message={message} />

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                <p className="text-xs font-medium text-red-700 dark:text-red-400 wrap-break-word">
                  {error ? error.message : "Transaction failed"}
                </p>
              </div>
            )}

            {isConfirmed && (
              <div className="flex justify-between items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                <p className="text-xs font-medium text-green-700 dark:text-green-400">
                  Message posted successfully!
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-[11px] font-bold text-green-800 transition-colors hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60"
                >
                  View Transaction Details
                </button>
              </div>
            )}

            <Button
              type="submit"
              isLoading={isPending}
              loadingText={
                isWriting
                  ? "Waiting for wallet..."
                  : isConfirming
                  ? "Confirming transaction..."
                  : "Posting..."
              }
              disabled={!message.trim() || isPending}
            >
              {isConfirmed ? "Post Another Message" : "Post Message"}
            </Button>
          </div>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Transaction Details"
      >
        {receipt && <TransactionDetails receipt={receipt} />}
      </Modal>
    </div>
  );
}
