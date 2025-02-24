import React from 'react';
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

const App = () => (
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
                            <Routers />
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
);

export default App;
