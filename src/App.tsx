import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AuthRoutes } from './app/modules/auth/auth.rotes';
import LoginPage from './app/modules/auth/login.page';
import ErrorPage from './app/modules/auth/error.page';
import './index.css';
import HomePage from './app/modules/home/home.page';
import RegisterPage from './app/modules/auth/register.page';
import { AuthGuard } from './app/guards/auth-guard';

const router = createBrowserRouter([
 {
  path: AuthRoutes.LOGIN,
  element: <LoginPage />,
  errorElement: <ErrorPage />,
 },
 {
  path: AuthRoutes.REGISTER,
  element: <RegisterPage />,
 },
 {
  element: <AuthGuard />,
  children: [{ path: AuthRoutes.HOME, element: <HomePage /> }],
 },
]);

function App() {
 return <RouterProvider router={router} />;
}

export default App;
