import { useQuery } from "@tanstack/react-query";
import { GET_USER_MESSAGES } from "@/lib/graphql/queries";

const SUBGRAPH_URL =
  "https://api.studio.thegraph.com/query/1723085/guestbook-sepolia/version/latest";

export function useUserGuestbookMessages(sender?: string) {
  return useQuery({
    queryKey: ["subgraph-user-messages", sender],
    queryFn: async () => {
      const response = await fetch(SUBGRAPH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_USER_MESSAGES,
          variables: {
            sender: sender?.toLowerCase(),
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.newMessages;
    },
    enabled: !!sender,
  });
}
