import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from 'contexts/user.context';
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

function App() {
  const { signedIn } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ShopPage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/signin" element={signedIn ? <HomePage /> : <SignIn />} />
      <Route path="/signup" element={signedIn ? <HomePage /> : <SignUp />} />
      <Route path="/checkout" element={<PaymentPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
