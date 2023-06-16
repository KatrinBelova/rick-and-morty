import Container from 'components/common/Container';
import { useRouteError } from 'react-router-dom';

interface Error {
  statusText: string;
  message: string;
}

const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <Container>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
};

export default ErrorPage;
