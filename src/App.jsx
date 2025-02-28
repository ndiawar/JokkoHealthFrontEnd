import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importez QueryClient et QueryClientProvider
import Routers from './Route';
import CartProvider from './_helper/Ecommerce/Cart/CardProvider';
import FilterProvider from './_helper/Ecommerce/Filter/FilterProvider';
import WishListProvider from './_helper/Ecommerce/Wishlist/WishlistProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import axios from 'axios';
import { UserProvider } from './_helper/UserContext'; // Importez le UserProvider

// Configuration d'axios
axios.defaults.baseURL = "http://localhost:3001/api/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

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

// Créez une instance de QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Enveloppez votre application avec QueryClientProvider */}
      <div className='App'>
        <UserProvider> {/* Enveloppez l'application avec UserProvider */}
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
      </div>
    </QueryClientProvider>
  );
};

export default App;