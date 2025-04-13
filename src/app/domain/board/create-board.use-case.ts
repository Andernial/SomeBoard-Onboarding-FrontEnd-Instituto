import {
 CreateBoardDocument,
 CreateBoardMutation,
 CreateBoardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloCache, ApolloError, FetchResult, useMutation } from '@apollo/client';

interface UseBoardProps {
 onCompleted?: (data: CreateBoardMutation) => void;
 update(cache: ApolloCache<any>, result: FetchResult<CreateBoardMutation>): void
 onError?: (error: ApolloError) => void;
}

export function useCreateBoard({ onCompleted, onError,update }: UseBoardProps) {
 const [createBoardMutation, { loading, error }] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
  CreateBoardDocument,
  {
   onCompleted,
   onError,
   update
  }
 );

 return { createBoardMutation, loading, error };
}
