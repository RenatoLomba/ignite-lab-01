import { getSession, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

export default function App() {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello world</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
