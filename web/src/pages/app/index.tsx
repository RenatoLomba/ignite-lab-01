import { GetServerSideProps, NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';

import { withApollo } from '../../lib/withApollo';
import {
  GetProductsQuery,
  useGetProductsQuery,
  useMeQuery,
} from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from '../../graphql/generated/page';

interface AppProps {
  data: GetProductsQuery;
}

const App: NextPage<AppProps> = ({ data: productsQuery }) => {
  const { user } = useUser();
  // const { data } = useGetProductsQuery();
  const { data: meQuery } = useMeQuery();

  return (
    <div className="text-violet-500">
      <h1>Hello world</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
      <pre>{JSON.stringify(meQuery, null, 2)}</pre>
      {/* <pre>{JSON.stringify(error, null, 2)}</pre> */}
    </div>
  );
};

const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return getServerPageGetProducts(null, ctx);

    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(App));
export { getServerSideProps };
