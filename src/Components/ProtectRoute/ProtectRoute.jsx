import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
