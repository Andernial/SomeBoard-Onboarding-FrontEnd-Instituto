import { UpdateCardOrderDocument, UpdateCardOrderMutation, UpdateCardOrderMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface UseUpdateCardOrderProps {
 onCompleted?: (data: UpdateCardOrderMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useUpdateCardOrder({ onCompleted, onError }: UseUpdateCardOrderProps) {
 const [updateCardOrderMutation, { loading, error }] = useMutation<UpdateCardOrderMutation, UpdateCardOrderMutationVariables>(
  UpdateCardOrderDocument,
  {
   onCompleted,
   onError,
  },
 );

 return { updateCardOrderMutation, loading, error };
}
