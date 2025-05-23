import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routers from './Route';
import CartProvider from './_helper/Ecommerce/Cart/CardProvider';
import FilterProvider from './_helper/Ecommerce/Filter/FilterProvider';
import WishListProvider from './_helper/Ecommerce/Wishlist/WishlistProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import axios from 'axios';
import { UserProvider } from './_helper/UserContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Créez une instance de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

// Configuration d'axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://jokkohealthback.onrender.com/api/";
console.log(axios.defaults.baseURL);
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

// Ajout du token d'authentification à chaque requête
axios.interceptors.request.use(
  (config) => {
    // Ne pas ajouter le token pour la route de connexion
    if (!config.url.includes('login')) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Log pour le débogage
    console.log('Requête axios:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur global pour gérer les erreurs
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Gestion des erreurs 401 ou 403
      if (error.response.status === 401 || error.response.status === 403) {
        // Suppression du token uniquement si l'utilisateur n'est pas sur la page de connexion
        if (!window.location.pathname.includes('/login')) {
          localStorage.removeItem('auth_token');
          window.location.href = `${process.env.PUBLIC_URL}/login`;
        }
      }
    }
    return Promise.reject(error);
  }
);

const App = () => {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CustomizerProvider>
            <WishListProvider>
              <FilterProvider>
                <CartProvider>
                  <AnimationThemeProvider>
                    <ToastContainer position="top-right" />
                    <Routers />
                  </AnimationThemeProvider>
                </CartProvider>
              </FilterProvider>
            </WishListProvider>
          </CustomizerProvider>
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
