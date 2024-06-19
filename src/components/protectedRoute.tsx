import React from 'react';
import { Navigate } from 'react-router-dom';
import useLoginStore from '../zustandstore/loginApiStore';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
