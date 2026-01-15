import { GraphQLClient } from "graphql-request";

import { env } from "@/env/server";

export const client = new GraphQLClient(env.ROOT_URI);
