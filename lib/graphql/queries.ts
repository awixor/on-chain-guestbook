export const GET_ALL_MESSAGES = `
  query GetAllMessages {
    newMessages(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      sender
      message
      timestamp
      transactionHash
    }
  }
`;

export const GET_USER_MESSAGES = `
  query GetUserMessages($sender: Bytes!) {
    newMessages(
      first: 100
      orderBy: timestamp
      orderDirection: desc
      where: { sender: $sender }
    ) {
      id
      sender
      message
      timestamp
      transactionHash
    }
  }
`;
