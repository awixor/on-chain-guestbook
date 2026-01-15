/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment MessageFields on NewMessage {\n    id\n    sender\n    message\n    timestamp\n    blockNumber\n    transactionHash\n  }\n": typeof types.MessageFieldsFragmentDoc,
    "\n  query GetAllMessages($first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n": typeof types.GetAllMessagesDocument,
    "\n  query GetUserMessages($userId: Bytes!, $first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      where: { sender: $userId }\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n": typeof types.GetUserMessagesDocument,
};
const documents: Documents = {
    "\n  fragment MessageFields on NewMessage {\n    id\n    sender\n    message\n    timestamp\n    blockNumber\n    transactionHash\n  }\n": types.MessageFieldsFragmentDoc,
    "\n  query GetAllMessages($first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n": types.GetAllMessagesDocument,
    "\n  query GetUserMessages($userId: Bytes!, $first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      where: { sender: $userId }\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n": types.GetUserMessagesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageFields on NewMessage {\n    id\n    sender\n    message\n    timestamp\n    blockNumber\n    transactionHash\n  }\n"): (typeof documents)["\n  fragment MessageFields on NewMessage {\n    id\n    sender\n    message\n    timestamp\n    blockNumber\n    transactionHash\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllMessages($first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n"): (typeof documents)["\n  query GetAllMessages($first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserMessages($userId: Bytes!, $first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      where: { sender: $userId }\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n"): (typeof documents)["\n  query GetUserMessages($userId: Bytes!, $first: Int, $skip: Int) {\n    newMessages(\n      first: $first\n      skip: $skip\n      where: { sender: $userId }\n      orderBy: timestamp\n      orderDirection: desc\n    ) {\n      ...MessageFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;