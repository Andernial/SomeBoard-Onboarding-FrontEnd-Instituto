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
    "mutation CreateBoard($boardInput: BoardInput!) {\n  createBoard(data: $boardInput) {\n    id\n    name\n  }\n}": typeof types.CreateBoardDocument,
    "mutation CreateCard($cardData: CreateCardInput!) {\n  createCard(data: $cardData) {\n    id\n    createdAt\n    name\n    description\n    points\n    order\n    column\n  }\n}": typeof types.CreateCardDocument,
    "mutation CreateUser($UserInput: UserInput!) {\n  createUser(data: $UserInput) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}": typeof types.CreateUserDocument,
    "mutation DeleteBoard($boardId: String!) {\n  deleteBoard(boardId: $boardId) {\n    message\n  }\n}": typeof types.DeleteBoardDocument,
    "mutation Login($loginData: LoginInput!) {\n  login(data: $loginData) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}": typeof types.LoginDocument,
    "mutation UpdateBoard($updateBoardData: BoardUpdateInput!) {\n  updateBoard(data: $updateBoardData) {\n    id\n    name\n  }\n}": typeof types.UpdateBoardDocument,
    "query Board($boardId: String!) {\n  board(boardId: $boardId) {\n    id\n    name\n    cards {\n      id\n      createdAt\n      name\n      description\n      points\n      order\n      column\n    }\n  }\n}": typeof types.BoardDocument,
    "query Boards($boardsPageInput: PageInput!) {\n  boards(pageInput: $boardsPageInput) {\n    pageInfo {\n      offset\n      limit\n      hasNextPage\n      hasPreviousPage\n    }\n    nodes {\n      id\n      name\n    }\n    count\n  }\n}": typeof types.BoardsDocument,
};
const documents: Documents = {
    "mutation CreateBoard($boardInput: BoardInput!) {\n  createBoard(data: $boardInput) {\n    id\n    name\n  }\n}": types.CreateBoardDocument,
    "mutation CreateCard($cardData: CreateCardInput!) {\n  createCard(data: $cardData) {\n    id\n    createdAt\n    name\n    description\n    points\n    order\n    column\n  }\n}": types.CreateCardDocument,
    "mutation CreateUser($UserInput: UserInput!) {\n  createUser(data: $UserInput) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}": types.CreateUserDocument,
    "mutation DeleteBoard($boardId: String!) {\n  deleteBoard(boardId: $boardId) {\n    message\n  }\n}": types.DeleteBoardDocument,
    "mutation Login($loginData: LoginInput!) {\n  login(data: $loginData) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}": types.LoginDocument,
    "mutation UpdateBoard($updateBoardData: BoardUpdateInput!) {\n  updateBoard(data: $updateBoardData) {\n    id\n    name\n  }\n}": types.UpdateBoardDocument,
    "query Board($boardId: String!) {\n  board(boardId: $boardId) {\n    id\n    name\n    cards {\n      id\n      createdAt\n      name\n      description\n      points\n      order\n      column\n    }\n  }\n}": types.BoardDocument,
    "query Boards($boardsPageInput: PageInput!) {\n  boards(pageInput: $boardsPageInput) {\n    pageInfo {\n      offset\n      limit\n      hasNextPage\n      hasPreviousPage\n    }\n    nodes {\n      id\n      name\n    }\n    count\n  }\n}": types.BoardsDocument,
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
export function graphql(source: "mutation CreateBoard($boardInput: BoardInput!) {\n  createBoard(data: $boardInput) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateBoard($boardInput: BoardInput!) {\n  createBoard(data: $boardInput) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCard($cardData: CreateCardInput!) {\n  createCard(data: $cardData) {\n    id\n    createdAt\n    name\n    description\n    points\n    order\n    column\n  }\n}"): (typeof documents)["mutation CreateCard($cardData: CreateCardInput!) {\n  createCard(data: $cardData) {\n    id\n    createdAt\n    name\n    description\n    points\n    order\n    column\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($UserInput: UserInput!) {\n  createUser(data: $UserInput) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}"): (typeof documents)["mutation CreateUser($UserInput: UserInput!) {\n  createUser(data: $UserInput) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteBoard($boardId: String!) {\n  deleteBoard(boardId: $boardId) {\n    message\n  }\n}"): (typeof documents)["mutation DeleteBoard($boardId: String!) {\n  deleteBoard(boardId: $boardId) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($loginData: LoginInput!) {\n  login(data: $loginData) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}"): (typeof documents)["mutation Login($loginData: LoginInput!) {\n  login(data: $loginData) {\n    token\n    user {\n      id\n      name\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateBoard($updateBoardData: BoardUpdateInput!) {\n  updateBoard(data: $updateBoardData) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation UpdateBoard($updateBoardData: BoardUpdateInput!) {\n  updateBoard(data: $updateBoardData) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Board($boardId: String!) {\n  board(boardId: $boardId) {\n    id\n    name\n    cards {\n      id\n      createdAt\n      name\n      description\n      points\n      order\n      column\n    }\n  }\n}"): (typeof documents)["query Board($boardId: String!) {\n  board(boardId: $boardId) {\n    id\n    name\n    cards {\n      id\n      createdAt\n      name\n      description\n      points\n      order\n      column\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Boards($boardsPageInput: PageInput!) {\n  boards(pageInput: $boardsPageInput) {\n    pageInfo {\n      offset\n      limit\n      hasNextPage\n      hasPreviousPage\n    }\n    nodes {\n      id\n      name\n    }\n    count\n  }\n}"): (typeof documents)["query Boards($boardsPageInput: PageInput!) {\n  boards(pageInput: $boardsPageInput) {\n    pageInfo {\n      offset\n      limit\n      hasNextPage\n      hasPreviousPage\n    }\n    nodes {\n      id\n      name\n    }\n    count\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;