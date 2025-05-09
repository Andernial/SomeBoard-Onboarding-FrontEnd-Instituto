import {
 UpdateBoardDocument,
 UpdateBoardMutation,
 UpdateBoardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface updateBoardProps {
 onCompleted?: (data: UpdateBoardMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useUpdateBoard({ onCompleted, onError }: updateBoardProps) {
 const [updateBoardMutation, { loading, error }] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(
  UpdateBoardDocument,
  {
   onCompleted,
   onError,
  },
 );

 return { updateBoardMutation, loading, error };
}
