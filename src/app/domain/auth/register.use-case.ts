import { CreateUserDocument, CreateUserMutation, CreateUserMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface UseCreateUserProps {
 onCompleted?: (data: CreateUserMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useCreateUser({ onCompleted, onError }: UseCreateUserProps) {
 const [createUserMutation, { loading, error }] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
  CreateUserDocument,
  {
   onCompleted,
   onError,
  },
 );

 return { createUserMutation, loading, error };
}
