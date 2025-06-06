import { UpdateCardDocument, UpdateCardMutation, UpdateCardMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';
import { useCardStorage } from '@/app/stores/kanbam/card.store';

interface UseUpdateCardProps {
 onCompleted?: (data: UpdateCardMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useUpdateCard({ onCompleted, onError }: UseUpdateCardProps) {
 const { updateCard } = useCardStorage();
 const [updateCardMutation, { loading, error }] = useMutation<UpdateCardMutation, UpdateCardMutationVariables>(
  UpdateCardDocument,
  {
   onCompleted: (data) => {
    updateCard(data.updateCard);
    onCompleted?.(data);
   },
   onError,
  },
 );

 return { updateCardMutation, loading, error };
}
