import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'routes/Home';
import Character from 'routes/Character';
import ErrorPage from 'routes/ErrorPage';
import SearchBar from 'components/SearchBar';
import Container from 'components/common/Container';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/character/:id',
    element: <Character />,
  },
]);

function App() {
  return (
    <div className="App">
      <Container>
        <header>
          <SearchBar />
        </header>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
