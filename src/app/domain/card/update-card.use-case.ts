import {
 UpdateCardDocument,
 UpdateCardMutation,
 UpdateCardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface UseUpdateCardProps {
 onCompleted?: (data: UpdateCardMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useUpdateCard({ onCompleted, onError }: UseUpdateCardProps) {
 const [updateCardMutation, { loading, error }] = useMutation<UpdateCardMutation, UpdateCardMutationVariables>(
  UpdateCardDocument,
  {
   onCompleted,
   onError,
  },
 );

 return { updateCardMutation, loading, error };
}
