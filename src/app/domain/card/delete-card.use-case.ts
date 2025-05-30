import { DeleteCardDocument, DeleteCardMutation, DeleteCardMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, Reference, useMutation } from '@apollo/client';

interface deleteCardProps {
 onCompleted?: (data: DeleteCardMutation) => void;
 onError?: (error: ApolloError) => void;
 boardId: string;
 cardId: string;
}

export function useDeleteCard({ onCompleted, onError, boardId, cardId }: deleteCardProps) {
 const [deleteCardMutation, { loading, error }] = useMutation<DeleteCardMutation, DeleteCardMutationVariables>(
  DeleteCardDocument,
  {
   onCompleted,
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
