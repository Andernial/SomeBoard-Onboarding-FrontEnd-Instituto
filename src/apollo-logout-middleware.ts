import { onError } from '@apollo/client/link/error';
import { GraphQLFormattedError } from 'graphql';
import { useAuthStorage } from './app/stores/auth.store';
import { useUserStorage } from './app/stores/user.store';

interface ApiGraphqlError extends GraphQLFormattedError {
 code?: number;
 name?: string;
}

export const errorLink = onError(({ graphQLErrors }) => {
 const { token, removeToken } = useAuthStorage.getState();
 const { removeUser } = useUserStorage.getState();

 if (graphQLErrors) {
  graphQLErrors.forEach((error: ApiGraphqlError) => {
   if (error.code === 401 && token) {
    removeToken();
    removeUser();
   }
  });
 }
});
