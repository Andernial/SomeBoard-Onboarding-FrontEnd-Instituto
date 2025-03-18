import { LoginDocument, LoginMutation, LoginMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';
import { useUserStorage } from '@/app/stores/user.store';
import { useAuthStorage } from '@/app/stores/auth.store';

interface UseLoginProps {
 onCompleted?: (data: LoginMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useLogin({ onCompleted, onError }: UseLoginProps) {
 const { addUser } = useUserStorage();
 const { addToken } = useAuthStorage();
 const [loginMutation, { loading, error }] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
  onCompleted: (data) => {
   const user = data.login.user;

   addUser({ name: user.name, id: user.id });
   addToken(data.login.token);

   if (onCompleted) {
    onCompleted(data);
   }
  },
  onError,
 });

 return { loginMutation, loading, error };
}
