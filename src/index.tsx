import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { TimerProvider } from './contexts/timer.context';
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products.context';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FilterContext, FilterProvider } from 'contexts/filter.context';
import { WishlistProvider } from 'contexts/wishlist.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FilterProvider>
      <ProductProvider>
        <UserProvider >
          <WishlistProvider>
            <ToastContainer />
            <TimerProvider >
              <App />
            </TimerProvider>
          </WishlistProvider>
        </UserProvider>
      </ProductProvider>
    </FilterProvider>
  </React.StrictMode>
);
