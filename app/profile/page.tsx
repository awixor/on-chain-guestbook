"use client";

import { useConnection } from "wagmi";
import Link from "next/link";
import UserMessagesList from "@/components/user-messages-list";
import ConnectWallet from "@/components/wallet";
import { HomeIcon } from "@/lib/icons";

export default function ProfilePage() {
  const connection = useConnection();
  const isConnected = connection.status === "connected";
  const address = connection.address;

  if (!isConnected || !address) {
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <main className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex flex-col items-center justify-center py-16">
            <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Profile
            </h1>
            <p className="mb-8 text-center text-zinc-600 dark:text-zinc-400">
              Connect your wallet to view your messages
            </p>
            <ConnectWallet />
            <Link
              href="/"
              className="mt-8 flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              <HomeIcon className="h-4 w-4" />
              Back to Guestbook
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            <HomeIcon className="h-4 w-4" />
            Back to Guestbook
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Your Profile
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            All messages you&apos;ve posted to the blockchain
          </p>
        </div>

        <UserMessagesList userAddress={address} />
      </main>
    </div>
  );
}
