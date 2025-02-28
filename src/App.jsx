import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importez QueryClient et QueryClientProvider
import Routers from './Route';
import ChartistProvider from './_helper/Chartist/ChartistProvider';
import ChartjsProvider from './_helper/Chartjs/ChartProvider';
import GoogleChartProvider from './_helper/GoogleChart/GoogleChartProvider';
import ChatProvider from './_helper/Chat/ChatProvider';
import TableProvider from './_helper/Table/TableProvider';
import SearchResultProvider from './_helper/SearchResult/SearchResult';
import CartProvider from './_helper/Ecommerce/Cart/CardProvider';
import FilterProvider from './_helper/Ecommerce/Filter/FilterProvider';
import WishListProvider from './_helper/Ecommerce/Wishlist/WishlistProvider';
import JobSearchProvider from './_helper/JobSearch/JobSearchProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Configuration d'axios
axios.defaults.baseURL = "http://localhost:3001/api";  // URL de votre backend
axios.defaults.headers.post['Content-Type'] = 'application/json';  // Spécifie le type de contenu pour les requêtes POST
axios.defaults.headers.post['Accept'] = 'application/json';  // Accepte la réponse JSON
axios.defaults.withCredentials = true;  // Permet d'envoyer les cookies avec les requêtes (utile pour la gestion de session)

// Créez une instance de QueryClient
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    let timeoutId;

    // Fonction pour réinitialiser le minuteur d'inactivité
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, 1000 * 60 * 10); // Déconnecte après 10 minutes d'inactivité
    };

    // Fonction de déconnexion
    const logout = () => {
      localStorage.removeItem('auth_token');  // Supprime le token du localStorage
      window.location.href = `${process.env.PUBLIC_URL}/login`;  // Redirige vers la page de login
    };

    // Écoute les événements de l'utilisateur pour réinitialiser le minuteur
    const handleUserActivity = () => {
      resetTimer();
    };

    // Écouteurs d'événements pour la souris, le clavier et le tactile
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('touchstart', handleUserActivity);

    // Démarre le minuteur
    resetTimer();

    // Nettoyage des écouteurs d'événements à la destruction du composant
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('touchstart', handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);  // Le tableau vide signifie que cet effet se lance seulement une fois après le montage du composant

  return (
    <QueryClientProvider client={queryClient}> {/* Enveloppez votre application avec QueryClientProvider */}
      <div className='App'>
        <CustomizerProvider>
          <JobSearchProvider>
            <WishListProvider>
              <FilterProvider>
                <CartProvider>
                  <SearchResultProvider>
                    <TableProvider>
                      <ChatProvider>
                        <GoogleChartProvider>
                          <ChartjsProvider>
                            <ChartistProvider>
                              <AnimationThemeProvider>
                                <Routers />  {/* Routeur principal */}
                              </AnimationThemeProvider>
                            </ChartistProvider>
                          </ChartjsProvider>
                        </GoogleChartProvider>
                      </ChatProvider>
                    </TableProvider>
                  </SearchResultProvider>
                </CartProvider>
              </FilterProvider>
            </WishListProvider>
          </JobSearchProvider>
        </CustomizerProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;