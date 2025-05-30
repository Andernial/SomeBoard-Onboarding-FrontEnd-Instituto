import {
 BoardDocument,
 CreateCardDocument,
 CreateCardMutation,
 CreateCardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface UseCreateCardProps {
 onCompleted?: (data: CreateCardMutation) => void;
 boardId: string;
 onError?: (error: ApolloError) => void;
}

export function useCreateCard({ onCompleted, onError, boardId }: UseCreateCardProps) {
 const [createCardMutation, { loading, error }] = useMutation<CreateCardMutation, CreateCardMutationVariables>(
  CreateCardDocument,
  {
   onCompleted,
   onError,
   update: (cache, result) => {
    const newCard = result.data?.createCard;
    if (!newCard) {
     return;
    }

    cache.updateQuery(
     {
      query: BoardDocument,
      variables: { boardId },
     },

     (existing) => {
      if (!existing?.board.cards) {
       return existing;
      }

      return {
       board: { ...existing.board, cards: [...existing.board.cards, newCard] },
      };
     },
    );
   },
  },
 );

 return { createCardMutation, loading, error };
}
