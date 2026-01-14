/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePublicClient, useChainId } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { guestbookAbi, guestbookAddress } from "@/lib/generated";
import { RawLogMessage } from "@/lib/types";

const fromBlock = BigInt(10035081);
const eventName = "NewMessage";

export function useGuestbookLogs() {
  const publicClient = usePublicClient();
  const chainId = useChainId();

  return useQuery<RawLogMessage[]>({
    queryKey: ["guestbook-messages", chainId],
    queryFn: async () => {
      if (!publicClient || !chainId) return [];

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
