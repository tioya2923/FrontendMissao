import { Navigate } from 'react-router-dom';
import { useLojaAuth } from '../../context/useLojaAuth';

export default function LojaProtectedRoute({ children }) {
  const { isAuthenticated } = useLojaAuth();
  if (!isAuthenticated) return <Navigate to="/loja/login" replace />;
  return children;
}
