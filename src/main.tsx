import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';
import App from './App.tsx';
import { errorLink } from './apollo-logout-middleware.ts';
import { authLink } from './apollo-auth-link.ts';

const httpLink = new HttpLink({
 uri: import.meta.env.VITE_API_URL,
});

const client = new ApolloClient({
 uri: import.meta.env.VITE_API_URL,
 cache: new InMemoryCache(),

 link: ApolloLink.from([errorLink, authLink, httpLink]),
});

createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <ApolloProvider client={client}>
   <App />
  </ApolloProvider>
 </StrictMode>,
);
