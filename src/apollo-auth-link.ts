import { useAuthStorage } from './app/stores/auth.store.ts';
import { setContext } from '@apollo/client/link/context';

export const authLink = setContext((_, { headers }) => {
 const { token } = useAuthStorage.getState();
 return {
  headers: {
   ...headers,
   authorization: token ?? '',
  },
 };
});
