import ConnectWallet from "@/components/wallet";
import GuestbookForm from "@/components/guestbook-form";
import MessagesList from "@/components/messages-list";
import { BookIcon } from "@/lib/icons";

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
        <GuestbookForm />
        <MessagesList />
      </main>
    </div>
  );
}
