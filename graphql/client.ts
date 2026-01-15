import { GraphQLClient } from "graphql-request";

const getGraphQLUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/graphql`;
  }
  return "/graphql";
};

export const client = new GraphQLClient(getGraphQLUrl());
