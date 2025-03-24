import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStorage } from '@/app/stores/auth.store';

export function AuthGuard() {
 const token = useAuthStorage((state) => state.token);

 if (!token) {
  return <Navigate to="/login" replace />;
 }

 return <Outlet />;
}
