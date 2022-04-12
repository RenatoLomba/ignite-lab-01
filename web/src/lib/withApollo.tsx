import { FC } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export type ApolloClientContext = GetServerSidePropsContext;

export interface WithApolloProviderProps {
  apolloState?: NormalizedCacheObject;
}

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject,
) {
  const httpLink = createHttpLink({
    fetch,
    uri: 'http://localhost:3000/api',
  });

  const apolloClient = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache().restore(ssrCache ?? {}),
  });

  return apolloClient;
}

export function withApollo(Component: NextPage) {
  const Provider: FC<WithApolloProviderProps> = ({ apolloState, ...props }) => {
    return (
      <ApolloProvider client={getApolloClient(null, apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };

  return Provider;
}
