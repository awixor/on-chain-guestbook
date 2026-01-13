import { truncateHash } from "@/lib/utils";
import ConnectorIcon from "@/components/wallet/connector-icon";

interface ConnectedWalletStateProps {
  address: string;
  connectorIcon?: string;
  connectorName?: string;
  onDisconnect: () => void;
}

export default function ConnectedWalletState({
  address,
  connectorIcon,
  connectorName,
  onDisconnect,
}: ConnectedWalletStateProps) {
  return (
    <div className="mb-12 flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <ConnectorIcon
              icon={connectorIcon}
              name={connectorName}
              className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Connected
            </span>
            <code className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {truncateHash(address)}
            </code>
          </div>
        </div>
        <button
          onClick={onDisconnect}
          className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
