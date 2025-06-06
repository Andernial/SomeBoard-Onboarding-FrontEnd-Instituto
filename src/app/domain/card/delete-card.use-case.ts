import { DeleteCardDocument, DeleteCardMutation, DeleteCardMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, Reference, useMutation } from '@apollo/client';
import { useCardStorage } from '@/app/stores/kanbam/card.store';

interface deleteCardProps {
 onCompleted?: (data: DeleteCardMutation) => void;
 onError?: (error: ApolloError) => void;
 boardId: string;
 cardId: string;
}

export function useDeleteCard({ onCompleted, onError, boardId, cardId }: deleteCardProps) {
 const {removeCard} = useCardStorage()
 const [deleteCardMutation, { loading, error }] = useMutation<DeleteCardMutation, DeleteCardMutationVariables>(
  DeleteCardDocument,
  {
   onCompleted: (data) => {
    removeCard(cardId)
    onCompleted?.(data)
   },
   onError,
   update: (cache) => {
    cache.modify({
     id: cache.identify({ __typename: 'BoardWithCard', id: boardId }),
     fields: {
      cards(existingCardRefs: ReadonlyArray<Reference>, { readField }) {
       return existingCardRefs.filter((card) => readField('id', card) !== cardId);
      },
     },
    });
   },
  },
 );

 return { deleteCardMutation, loading, error };
}
