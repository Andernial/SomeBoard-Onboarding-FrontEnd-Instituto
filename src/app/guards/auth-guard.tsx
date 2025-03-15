import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; 
import { useAuthStorage } from '@/app/stores/auth.store';

export function AuthGuard() {
 const token = useAuthStorage((state) => state.token);
 const navigate = useNavigate();

 useEffect(() => {
  if (!token) {
   navigate('/login');
  }
 }, [token, navigate]);

 if (!token) {
  return null;
 }

 return <Outlet />;
}
