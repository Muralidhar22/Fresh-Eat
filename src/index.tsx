import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { TimerProvider } from './contexts/timer.context';
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products.context';
import { ToastContainer } from "react-toastify";
import { FilterProvider } from 'contexts/filter.context';
import { WishlistProvider } from 'contexts/wishlist.context';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <ProductProvider>
          <UserProvider>
            <WishlistProvider>
              <ToastContainer />
              <TimerProvider >
                <App />
              </TimerProvider>
            </WishlistProvider>
          </UserProvider>
        </ProductProvider>
      </FilterProvider>
    </BrowserRouter>
  </React.StrictMode>
);
