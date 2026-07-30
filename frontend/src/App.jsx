import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProfilePage,
  UserInbox,
  BestSellingPage,
  ProductsPage,
  EventsPage,
  FAQPage,
  ShopCreatePage,
} from "./Routes.js";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { getAllProducts } from "./redux/actions/product.js";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());
  }, []);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/activation/:token" element={<ActivationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/inbox" element={<UserInbox />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shop-create" element={<ShopCreatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
