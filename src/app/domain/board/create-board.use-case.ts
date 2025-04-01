import {
 CreateBoardDocument,
 CreateBoardMutation,
 CreateBoardMutationVariables,
} from '@data/graphql/generated/graphql';
import { ApolloError, gql, useMutation } from '@apollo/client';

interface UseBoardProps {
 onCompleted?: (data: CreateBoardMutation) => void;
 update?: (data: CreateBoardMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useCreateBoard({ onCompleted, onError }: UseBoardProps) {
 const [createBoardMutation, { loading, error }] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
  CreateBoardDocument,
  {
   onCompleted,
   onError,
   update(cache, { data }) {
    cache.modify({
     fields: {
      boards(existingBoards = {}) {
       const newBoardRef = cache.writeFragment({
        data: data?.createBoard,
        fragment: gql`
         fragment newBoard on Board {
          id
          name
         }
        `,
       });
       return {
        ...existingBoards,
        nodes: [newBoardRef, ...(existingBoards.nodes || [])].slice(0, 7),
       };
      },
     },
    });
   },
  },
 );

 return { createBoardMutation, loading, error };
}
