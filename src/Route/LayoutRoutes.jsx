import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import AppLayout from '../Layout/Layout';
import ProtectedRoute from './ProtectedRoute'; // Importez le composant ProtectedRoute

const LayoutRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component, protected: isProtected }, i) => (
        <Route element={<AppLayout />} key={i}>
          {isProtected ? (
            <Route path={path} element={<ProtectedRoute component={Component} />} />
          ) : (
            <Route path={path} element={Component} />
          )}
        </Route>
      ))}
    </Routes>
  );
};

export default LayoutRoutes;