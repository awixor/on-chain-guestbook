import Link from "next/link";
import ConnectWallet from "@/components/wallet";
import { HomeIcon } from "@/lib/icons";

export default function PleaseConnectWallet() {
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
