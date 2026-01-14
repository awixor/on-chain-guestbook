"use client";

import { useConnection, useConnectors, useConnect, useDisconnect } from "wagmi";
import NoWalletDetected from "@/components/wallet/no-wallet-detected";
import ConnectedWalletState from "@/components/wallet/connected-wallet-state";
import ConnectWalletButtons from "@/components/wallet/connect-wallet-buttons";

export enum ConnectionStatus {
  Connected = "connected",
  Disconnected = "disconnected",
  Reconnecting = "reconnecting",
  Connecting = "connecting",
}

export default function ConnectWallet() {
  const connection = useConnection();
  const connectors = useConnectors();
  const { mutate: connect, isPending } = useConnect();
  const { mutate: disconnect } = useDisconnect();

  const isConnected = connection.status === ConnectionStatus.Connected;
  const address = connection.address;

  if (connectors.length === 0) {
    return <NoWalletDetected />;
  }

  if (isConnected && address) {
    return (
      <ConnectedWalletState
        address={address}
        connectorIcon={connection.connector?.icon}
        connectorName={connection.connector?.name}
        onDisconnect={() => disconnect()}
      />
    );
  }

  return (
    <ConnectWalletButtons
      connectors={connectors}
      onConnect={(connector) => connect({ connector })}
      isPending={isPending}
    />
  );
}
