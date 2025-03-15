import { onError } from '@apollo/client/link/error';
import { GraphQLFormattedError } from 'graphql';
import { useAuthStorage } from './app/stores/auth.store';

interface ApiGraphqlError extends GraphQLFormattedError {
 code?: number;
 name?: string;
}

export const errorLink = onError(({ graphQLErrors }) => {
 const { token, removeToken } = useAuthStorage.getState();

 if (graphQLErrors) {
  graphQLErrors.forEach((error: ApiGraphqlError) => {
   if (error.code === 401 && token) {
    removeToken();
   }
  });
 }
});
