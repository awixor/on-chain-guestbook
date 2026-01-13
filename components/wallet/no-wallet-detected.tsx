import { WalletIcon } from "@/lib/icons";

export default function NoWalletDetected() {
  return (
    <div className="mb-12 flex flex-col items-center gap-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <WalletIcon className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            No Wallet Detected
          </h3>
          <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            Please install a Web3 wallet extension like MetaMask, Coinbase
            Wallet, or WalletConnect to connect and sign the guestbook.
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <a
            href="https://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Get MetaMask →
          </a>
          <span className="text-zinc-300 dark:text-zinc-600">•</span>
          <a
            href="https://www.coinbase.com/wallet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Get Coinbase Wallet →
          </a>
        </div>
      </div>
    </div>
  );
}
