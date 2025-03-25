import { CreateUserDocument, CreateUserMutation, CreateUserMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';
import { useUserStorage } from '@/app/stores/user.store';
import { useAuthStorage } from '@/app/stores/auth.store';

interface UseCreateUserProps {
 onCompleted?: (data: CreateUserMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useCreateUser({ onCompleted, onError }: UseCreateUserProps) {
 const { addUser } = useUserStorage();
 const { addToken } = useAuthStorage();
 const [createUserMutation, { loading, error }] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
  CreateUserDocument,
  {
   onCompleted: (data) => {
    const user = data.createUser.user;
    addUser({ name: user.name, id: user.id });
    addToken(data.createUser.token);

    if (onCompleted) {
     onCompleted;
    }
   },
   onError,
  },
 );

 return { createUserMutation, loading, error };
}
