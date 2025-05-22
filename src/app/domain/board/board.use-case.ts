import { BoardDocument, BoardQuery, BoardQueryVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useQuery } from '@apollo/client';

interface UseBoardProps {
 variables: BoardQueryVariables;
 onCompleted?: (data: BoardQuery) => void;
 onError?: (error: ApolloError) => void;
}

export function useBoard({ onCompleted, onError, variables }: UseBoardProps) {
 const { data, loading, error, refetch } = useQuery<BoardQuery, BoardQueryVariables>(BoardDocument, {
  onCompleted,
  onError,
  variables,
  fetchPolicy: 'network-only',
  nextFetchPolicy: 'cache-first',
 });

 return { data, loading, error, refetch };
}
