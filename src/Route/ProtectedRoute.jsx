import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = !!Cookies.get('jwt'); // Vérifie si le cookie JWT existe

  return isAuthenticated ? <Component /> : <Navigate to={`${process.env.PUBLIC_URL}/login`} />;
};

export default ProtectedRoute;