import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from 'pages/home-page/HomePage';
import WishlistPage from 'pages/wishlist-page/WishlistPage';
import CartPage from 'pages/cart-page/CartPage';
import ShopPage from 'pages/shop-page/ShopPage';
import PageNotFound from 'components/404.component';
import SignIn from 'pages/signin-page/SignInPage';
import SignUp from 'pages/signup-page/SignUpPage';
import ProductPage from 'pages/product-page/ProductPage.component';
import OrdersPage from 'pages/orders-page/OrdersPage';
import PaymentPage from 'pages/payment-page/PaymentPage';
import AddressPage from 'pages/address-page/Addresspage';
import OrderPage from 'pages/order-page/OrderPage';

import { useAuthContext } from 'contexts/auth.context';

function App() {
  const { signedIn } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ShopPage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/orders" element={signedIn ? <OrdersPage /> : <Navigate replace to={'/signin'} />} />
      <Route path="/orders/:orderId" element={signedIn ? <OrderPage /> : <Navigate replace to={'/signin'} />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/signin" element={signedIn ? <Navigate replace to={'/'} /> : <SignIn />} />
      <Route path="/signup" element={signedIn ? <Navigate replace to={'/'} /> : <SignUp />} />
      <Route path="/checkout" element={signedIn ? <PaymentPage /> : <SignIn />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
