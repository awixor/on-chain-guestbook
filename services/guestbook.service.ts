import { GraphQLClient } from "graphql-request";
import type {
  GetAllMessagesQueryVariables,
  GetUserMessagesQueryVariables,
} from "@/generated/graphql";
import { GET_ALL_MESSAGES, GET_USER_MESSAGES } from "@/lib/graphql/queries";

export type QueryAllMessagesArgs = {
  client: GraphQLClient;
  vars?: GetAllMessagesQueryVariables;
};

export type QueryUserMessagesArgs = {
  client: GraphQLClient;
  vars?: GetUserMessagesQueryVariables;
};

export async function queryAllMessages({
  client,
  vars = {
    first: 10,
    skip: 0,
  },
}: QueryAllMessagesArgs) {
  const data = await client.request(GET_ALL_MESSAGES, vars);

  return data.newMessages || [];
}

export async function queryUserMessages({
  client,
  vars,
}: QueryUserMessagesArgs) {
  const formattedVars = {
    ...vars,
    userId: vars?.userId?.toLowerCase(),
  };

  const data = await client.request(GET_USER_MESSAGES, formattedVars);
  return data.newMessages || [];
}
