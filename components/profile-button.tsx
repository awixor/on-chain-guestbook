"use client";

import { useConnection } from "wagmi";
import { ConnectionStatus } from "@/components/wallet/connect-wallet";
import Link from "next/link";
import { UserIcon } from "@/lib/icons";

const ProfileButton = () => {
  const connection = useConnection();
  const isConnected = connection.status === ConnectionStatus.Connected;

  if (isConnected)
    return (
      <div className="absolute right-6 top-6">
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <UserIcon className="h-4 w-4" />
          Profile
        </Link>
      </div>
    );
  return null;
};

export default ProfileButton;
