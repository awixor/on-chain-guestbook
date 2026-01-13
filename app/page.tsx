import ConnectWallet from "@/components/wallet";
import Card from "@/components/card";
import { BookIcon } from "@/lib/icons";
import type { GuestbookEntry } from "@/lib/types";

const SAMPLE_MESSAGES: GuestbookEntry[] = [
  {
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: "Jan 12, 2026 10:30 AM",
    message: "Just signed the guestbook! This is awesome.",
    explorerUrl: "https://etherscan.io/tx/0x12345",
  },
  {
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    timestamp: "Jan 12, 2026 11:15 AM",
    message: "Hello from the blockchain world 🚀",
    explorerUrl: "https://etherscan.io/tx/0xabcde",
  },
  {
    hash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    timestamp: "Jan 12, 2026 12:05 PM",
    message: "Decentralized greetings to everyone here.",
    explorerUrl: "https://etherscan.io/tx/0x98765",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-20">
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
            <BookIcon className="h-8 w-8" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            On-Chain Guestbook
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            A permanent record of your visits, stored forever on the blockchain.
            Connect your wallet and leave a message.
          </p>
        </header>
        <ConnectWallet />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_MESSAGES.map((msg, index) => (
            <Card key={`${msg.hash}-${index}`} {...msg} />
          ))}
        </div>
      </main>
    </div>
  );
}
