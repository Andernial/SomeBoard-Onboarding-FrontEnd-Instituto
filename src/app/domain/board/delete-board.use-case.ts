import {
 BoardsDocument,
 DeleteBoardDocument,
 DeleteBoardMutation,
 DeleteBoardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface deleteBoardProps {
 onCompleted?: (data: DeleteBoardMutation) => void;
 onError?: (error: ApolloError) => void;
 limit: number;
 offset: number;
}

export function useDeleteBoard({ onCompleted, onError, limit, offset }: deleteBoardProps) {
 const [deleteBoardMutation, { loading, error }] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
  DeleteBoardDocument,
  {
   onCompleted,
   onError,
   refetchQueries: [
    {
      query: BoardsDocument,
      variables: { boardsPageInput: { offset, limit } },
    },
  ],
  },
 );

 return { deleteBoardMutation, loading, error };
}
