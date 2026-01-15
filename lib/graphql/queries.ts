import { graphql } from "@/generated/gql";

export const MESSAGE_FIELDS = graphql(`
  fragment MessageFields on NewMessage {
    id
    sender
    message
    timestamp
    blockNumber
    transactionHash
  }
`);

export const GET_ALL_MESSAGES = graphql(`
  query GetAllMessages($first: Int, $skip: Int) {
    newMessages(
      first: $first
      skip: $skip
      orderBy: timestamp
      orderDirection: desc
    ) {
      ...MessageFields
    }
  }
`);

export const GET_USER_MESSAGES = graphql(`
  query GetUserMessages($userId: Bytes!, $first: Int, $skip: Int) {
    newMessages(
      first: $first
      skip: $skip
      where: { sender: $userId }
      orderBy: timestamp
      orderDirection: desc
    ) {
      ...MessageFields
    }
  }
`);
