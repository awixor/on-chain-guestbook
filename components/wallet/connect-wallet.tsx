"use client";

import { useState, useEffect } from "react";
import { useConnection, useConnectors, useConnect, useDisconnect } from "wagmi";
import NoWalletDetected from "@/components/wallet/no-wallet-detected";
import ConnectedWalletState from "@/components/wallet/connected-wallet-state";
import ConnectWalletButtons from "@/components/wallet/connect-wallet-buttons";
import ConnectWalletSkeleton from "@/components/skeletons/connect-wallet-skeleton";

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
  const [shouldShowNoWallet, setShouldShowNoWallet] = useState(false);

  useEffect(() => {
    if (connectors.length > 0) return;

    const timer = setTimeout(() => {
      setShouldShowNoWallet(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [connectors.length]);

  const isConnected = connection.status === ConnectionStatus.Connected;
  const address = connection.address;

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

  if (connectors.length > 0) {
    return (
      <ConnectWalletButtons
        connectors={connectors}
        onConnect={(connector) => connect({ connector })}
        isPending={isPending}
      />
    );
  }

  if (shouldShowNoWallet) {
    return <NoWalletDetected />;
  }

  return <ConnectWalletSkeleton />;
}
