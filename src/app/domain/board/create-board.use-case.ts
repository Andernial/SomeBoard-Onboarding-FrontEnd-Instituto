import {
 CreateBoardDocument,
 CreateBoardMutation,
 CreateBoardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface UseBoardProps {
 onCompleted?: (data: CreateBoardMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useCreateBoard({ onCompleted, onError }: UseBoardProps) {
 const [createBoardMutation, { loading, error }] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
  CreateBoardDocument,
  {
   onCompleted,
   onError,
  },
 );

 return { createBoardMutation, loading, error };
}
