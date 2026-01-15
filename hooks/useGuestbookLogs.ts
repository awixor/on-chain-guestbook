/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { guestbookAbi, guestbookAddress } from "@/lib/generated";
import { RawLogMessage } from "@/lib/types";

import { sepolia } from "wagmi/chains";

const fromBlock = BigInt(10035081);
const eventName = "NewMessage";

export function useGuestbookLogs() {
  const publicClient = usePublicClient({ chainId: sepolia.id });
  const chainId = sepolia.id;

  return useQuery<RawLogMessage[]>({
    queryKey: ["guestbook-messages", chainId],
    queryFn: async () => {
      if (!publicClient) return [];

      const address =
        guestbookAddress[chainId as keyof typeof guestbookAddress];

      const logs = await publicClient.getLogs({
        address,
        event: guestbookAbi.find(
          (x) => x.type === "event" && x.name === eventName
        ),
        fromBlock,
      });

      return (
        logs?.map((log: any) => ({
          sender: log.args.sender,
          message: log.args.message,
          timestamp: Number(log.args.timestamp),
          hash: log.transactionHash,
        })) || []
      );
    },
    enabled: !!publicClient && !!chainId,
  });
}
