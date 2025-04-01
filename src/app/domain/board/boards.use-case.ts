import { BoardsDocument, BoardsQuery, BoardsQueryVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useQuery } from '@apollo/client';

interface UseBoardProps {
 variables: BoardsQueryVariables;
 onCompleted?: (data: BoardsQuery) => void;
 onError?: (error: ApolloError) => void;
}

export function useBoards({ onCompleted, onError, variables }: UseBoardProps) {
 const { data, loading, error, refetch } = useQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, {
  onCompleted,
  onError,
  variables,
  fetchPolicy: 'network-only',
  nextFetchPolicy: 'cache-first',
 });

 return { data, loading, error, refetch };
}
