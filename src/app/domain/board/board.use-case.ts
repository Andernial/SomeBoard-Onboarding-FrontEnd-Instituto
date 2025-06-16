import { BoardDocument, BoardQuery, BoardQueryVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useQuery } from '@apollo/client';
import { useCardStorage } from '@/app/stores/kanbam/card.store';

interface UseBoardProps {
 variables: BoardQueryVariables;
 onCompleted?: (data: BoardQuery) => void;
 onError?: (error: ApolloError) => void;
}

export function useBoard({ onCompleted, onError, variables }: UseBoardProps) {
 const { setCards } = useCardStorage();
 const { data, loading, error, refetch } = useQuery<BoardQuery, BoardQueryVariables>(BoardDocument, {
  onCompleted: (data) => {
   setCards(data.board.cards);
   onCompleted?.(data);
  },
  onError,
  variables,
  fetchPolicy: 'network-only',
  nextFetchPolicy: 'cache-first',
 });

 return { data, loading, error, refetch };
}
