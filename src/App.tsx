import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './routes/homepage/HomePage';
import WishlistPage from './routes/wishlist/WishlistPage';
import CartPage from './routes/cartpage/CartPage';
import ShopPage from './routes/shoppage/ShopPage';
import PageNotFound from './components/404.component';
import Nav from './components/nav/Nav.component';
import SignIn from './components/signin-form/SignIn.component';
import SignUp from './components/signup-form/SignUp.component';
import Faq from './components/faq/Faq.component';
import Feedback from './routes/feedback/Feedback.component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="orders" element />
          <Route path="address" element />
          <Route path="faq" element={<Faq />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
