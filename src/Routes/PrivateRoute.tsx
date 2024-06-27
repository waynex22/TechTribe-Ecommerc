import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/localStorage/token';

const isAuthenticated = () => {
  return getToken('access_token') !== null;
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;