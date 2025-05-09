import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import LoginPage from './app/modules/auth/login-page/login.page';
import ErrorPage from './app/modules/auth/error.page';
import './index.css';
import { HomePage } from './app/modules/home/home.page';
import { RegisterPage } from './app/modules/auth/register-page/register.page';
import { AuthGuard } from './app/guards/auth-guard';
import { LoggedLayout } from './app/modules/layout/logged.layout';
import { BoardPage } from './app/modules/board/board.page';
import { KanbanPage } from './app/modules/kanban/kanban.page';
import { Toaster } from '@components/ui/toaster';

function App() {
 return (
  <>
   <BrowserRouter>
    <Routes>
     <Route path={AuthRoutes.LOGIN} element={<LoginPage />} />
     <Route path={AuthRoutes.REGISTER} element={<RegisterPage />} />

     <Route element={<AuthGuard />}>
      <Route path={AuthRoutes.HOME} element={<LoggedLayout />}>
       <Route index element={<HomePage />} />
       <Route path={AuthRoutes.BOARD} element={<BoardPage />} />
       <Route path={AuthRoutes.KANBAN} element={<KanbanPage />} />
      </Route>
     </Route>

     <Route path="*" element={<ErrorPage />} />
    </Routes>
   </BrowserRouter>

   <Toaster />
  </>
 );
}

export default App;
