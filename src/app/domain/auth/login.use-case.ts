import { LoginDocument, LoginMutation, LoginMutationVariables } from '@data/graphql/generated/graphql';
import { ApolloError, useMutation } from '@apollo/client';

interface UseLoginProps {
 onCompleted?: (data: LoginMutation) => void;
 onError?: (error: ApolloError) => void;
}

export function useLogin({ onCompleted, onError }: UseLoginProps) {
 const [loginMutation, { loading, error }] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
  onCompleted,
  onError,
 });

 const login = (variables: LoginMutationVariables) => {
  return loginMutation({ variables });
 };

 return { login, loading, error };
}
