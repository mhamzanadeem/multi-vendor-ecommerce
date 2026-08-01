import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { loadUser, loadSeller } from "./redux/actions/user.js";
import { getAllProducts } from "./redux/actions/product.js";
import { pingKeepAliveTargets } from "./utils/keepAlive.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage";
import ShopLoginPage from "./pages/Shop/ShopLoginPage";
import CheckoutPage from "./pages/Shop/CheckoutPage";
import PaymentPage from "./pages/Shop/PaymentPage";
import OrderSuccessPage from "./pages/Shop/OrderSuccessPage";
import ShopAllOrders from "./pages/Shop/ShopAllOrders";
import ShopAllProducts from "./pages/Shop/ShopAllProducts";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct";
import ShopAllEvents from "./pages/Shop/ShopAllEvents";
import ShopCreateEvents from "./pages/Shop/ShopCreateEvents";
import ShopWithDrawMoneyPage from "./pages/Shop/ShopWithDrawMoneyPage";
import ShopInboxPage from "./pages/Shop/ShopInboxPage";
import ShopAllCoupons from "./pages/Shop/ShopAllCoupons";
import ShopAllRefunds from "./pages/Shop/ShopAllRefunds";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage";
import ShopOrderDetails from "./pages/Shop/ShopOrderDetails";
import OrderDetailsPage from "./pages/Shop/OrderDetailsPage";
import TrackOrderPage from "./pages/Shop/TrackOrderPage";
import ShopHomePage from "./pages/Shop/ShopHomePage";
import ShopPreviewPage from "./pages/Shop/ShopPreviewPage";
import SellerActivationPage from "./pages/Shop/SellerActivationPage";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    const TEN_MINUTES = 10 * 60 * 1000;

    const pingNow = () => {
      void pingKeepAliveTargets();
    };

    pingNow();
    const intervalId = window.setInterval(pingNow, TEN_MINUTES);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer position="top-center" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/activation/:token" element={<ActivationPage />} />
          <Route
            path="/seller/activation/:token"
            element={<SellerActivationPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/inbox" element={<UserInbox />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />
          <Route path="/user/order/:id" element={<OrderDetailsPage />} />
          <Route path="/user/track/order/:id" element={<TrackOrderPage />} />
          <Route path="/shop/:id" element={<ShopHomePage />} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupouns"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
