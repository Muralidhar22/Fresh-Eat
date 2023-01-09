import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/homepage/HomePage';
import WishlistPage from './pages/wishlist/WishlistPage';
import CartPage from './pages/cartpage/CartPage';
import ShopPage from './pages/shoppage/ShopPage';
import PageNotFound from './components/404.component';
import SignIn from './components/signin-form/SignIn.component';
import SignUp from './components/signup-form/SignUp.component';
import Faq from './components/faq/Faq.component';
import Feedback from './pages/feedback/Feedback.component';
import ProductPage from './pages/product-page/ProductPage.component';
import OrdersPage from 'pages/orderspage/OrdersPage';
import PaymentPage from 'pages/payment/PaymentPage';
import AddressPage from 'pages/address-page/Addresspage';
import OrderPage from 'pages/order-page/OrderPage';

import { useAuthContext } from 'contexts/auth.context';

function App() {
  const { signedIn } = useAuthContext()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ShopPage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:orderId" element={signedIn ? <OrderPage /> : <Navigate replace to={"/signin"} />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/signin" element={signedIn ? <Navigate replace to={"/"} /> : <SignIn />} />
      <Route path="/signup" element={signedIn ? <Navigate replace to={"/"} /> : <SignUp />} />
      <Route path="/checkout" element={signedIn ? <PaymentPage /> : <Navigate replace to={"/signin"} />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
