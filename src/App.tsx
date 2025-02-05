import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from './app/modules/auth/auth.rotes';
import LoginPage from './app/modules/auth/login.page';
import ErrorPage from './app/modules/auth/error.page';
import './index.css';

const router = createBrowserRouter([
    {
        path: AuthRoutes.LOGIN,
        element:<LoginPage />,
        errorElement: <ErrorPage />
    }
])

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App
