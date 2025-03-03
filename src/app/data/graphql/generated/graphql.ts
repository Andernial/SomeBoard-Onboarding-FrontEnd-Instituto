/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BoardInput = {
  name: Scalars['String']['input'];
};

export type BoardUpdateInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BoardWithCard = {
  __typename?: 'BoardWithCard';
  cards: Array<Card>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Card = {
  __typename?: 'Card';
  column: CardColumns;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  points?: Maybe<Scalars['Int']['output']>;
};

export enum CardColumns {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  InReview = 'IN_REVIEW',
  ToDo = 'TO_DO'
}

export type CreateCardInput = {
  boardId: Scalars['ID']['input'];
  column: CardColumns;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
};

export type ForgotPasswordInput = {
  /** User e-mail */
  email: Scalars['String']['input'];
};

/** Login response object */
export type Login = {
  __typename?: 'Login';
  /** JWT token */
  token: Scalars['String']['output'];
  /** User */
  user: User;
};

/** Infos para realizar login */
export type LoginInput = {
  /** E-mail */
  email: Scalars['String']['input'];
  /** Password */
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createCard: Card;
  /** Create user */
  createUser: Login;
  deleteBoard: Message;
  deleteCard: Scalars['String']['output'];
  /** Tries to recover user password */
  forgotPassword: Scalars['String']['output'];
  /** Authenticate as user or admin */
  login: Login;
  updateBoard: Board;
  updateCard: Card;
  updateCardOrder: Scalars['String']['output'];
};


export type MutationCreateBoardArgs = {
  data: BoardInput;
};


export type MutationCreateCardArgs = {
  data: CreateCardInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteBoardArgs = {
  boardId: Scalars['String']['input'];
};


export type MutationDeleteCardArgs = {
  cardId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateBoardArgs = {
  data: BoardUpdateInput;
};


export type MutationUpdateCardArgs = {
  data: UpdateCardInput;
};


export type MutationUpdateCardOrderArgs = {
  data: Array<UpdateCardOrderInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** Has next page */
  hasNextPage: Scalars['Boolean']['output'];
  /** Has previous page */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Max items per result */
  limit: Scalars['Int']['output'];
  /** Number of skipped elements */
  offset: Scalars['Int']['output'];
};

export type PageInput = {
  /** Max items per result */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Number of elements to skip  */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginatedBoard = {
  __typename?: 'PaginatedBoard';
  /** Total number of elements */
  count: Scalars['Int']['output'];
  /** Array of Board */
  nodes: Array<Board>;
  /** Page information */
  pageInfo: PageInfo;
};

export type PaginatedBoardClass = {
  __typename?: 'PaginatedBoardClass';
  /** Total number of elements */
  count: Scalars['Int']['output'];
  /** Array of Board */
  nodes: Array<Board>;
  /** Page information */
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  board: BoardWithCard;
  boards: PaginatedBoard;
  cards: Array<Card>;
  /** Get user by id */
  user: User;
};


export type QueryBoardArgs = {
  boardId: Scalars['String']['input'];
};


export type QueryBoardsArgs = {
  pageInput: PageInput;
};


export type QueryCardsArgs = {
  boardId: Scalars['String']['input'];
};

export type UpdateCardInput = {
  column?: InputMaybe<CardColumns>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  points?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCardOrderInput = {
  id: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  /** User email */
  email: Scalars['String']['output'];
  /** User id */
  id: Scalars['ID']['output'];
  /** User name */
  name: Scalars['String']['output'];
};

export type UserInput = {
  /** User email */
  email: Scalars['String']['input'];
  /** User name */
  name: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  loginData: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', token: string, user: { __typename?: 'User', id: string, name: string, email: string } } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;