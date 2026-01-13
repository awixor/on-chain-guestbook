import type { Connector } from "wagmi";
import ConnectorIcon from "@/components/wallet/connector-icon";

interface ConnectWalletButtonsProps {
  connectors: readonly Connector[];
  onConnect: (connector: Connector) => void;
  isPending: boolean;
}

export default function ConnectWalletButtons({
  connectors,
  onConnect,
  isPending,
}: ConnectWalletButtonsProps) {
  return (
    <div className="mb-12 flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => onConnect(connector)}
            disabled={isPending}
            className="flex items-center gap-2 rounded-lg cursor-pointer border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <ConnectorIcon icon={connector.icon} name={connector.name} />
            <span>
              {isPending ? "Connecting..." : `Connect ${connector.name}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
