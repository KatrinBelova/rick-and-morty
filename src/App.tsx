import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'pages/Home';
import Character from 'pages/Character';
import ErrorPage from 'pages/ErrorPage';
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
