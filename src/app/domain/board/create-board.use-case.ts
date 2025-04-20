import {
    BoardsDocument,
 CreateBoardDocument,
 CreateBoardMutation,
 CreateBoardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface UseBoardProps {
 onCompleted?: (data: CreateBoardMutation) => void;
 limit: number;
 onError?: (error: ApolloError) => void;
}

export function useCreateBoard({ onCompleted, onError, limit }: UseBoardProps) {
 const [createBoardMutation, { loading, error }] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
  CreateBoardDocument,
  {
   onCompleted,
   onError,
   update: (cache, result) => {
    const newBoard = result.data?.createBoard;
    if (!newBoard) {
     return;
    }

    cache.updateQuery(
     {
      query: BoardsDocument,
      variables: { boardsPageInput: { offset: 0, limit } },
     },

     (existing) => {
      if (!existing?.boards?.nodes) {
       return existing;
      }

      return {
       boards: {
        ...existing.boards,
        nodes: [newBoard, ...existing.boards.nodes].slice(0, 7),
        pageInfo: {
         ...existing.boards.pageInfo,
         hasNextPage: existing.boards.nodes.length === 7 ? true : existing.boards.pageInfo.hasNextPage,
        },
       },
      };
     },
    );
   },
  },
 );

 return { createBoardMutation, loading, error };
}
