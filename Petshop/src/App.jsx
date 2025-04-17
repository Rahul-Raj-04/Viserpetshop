/* eslint-disable react/prop-types */
import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/slick.css";
import "./assets/css/line-awesome.min.css";
import "./assets/css/jquery.classycountdown.min.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/main.css";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Shoppage from "./Pages/Shop/Shoppage";
import Login from "./Pages/Authentication/Login";
import Registration from "./Pages/Authentication/Registration";
import Checkout from "./Pages/Product/Checkout";
import Cart from "./Pages/Product/Cart";
import About from "./Pages/Websites/About";
import Productdetails from "./Pages/Product/Productdetails";
import Wishlist from "./Pages/Product/Wishlist";
import Contact from "./Pages/Websites/Contact";
import Bloglist from "./Pages/Blog/Bloglist";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./Pages/Store/useAuthStore";
import CatShop from "./Pages/Ctegoryshop/CatShop";
import Dashboard from "./Pages/Profile/Dashboard";
import { Helmet } from "react-helmet-async";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import ResetPassword from "./Pages/Authentication/ResetPassword";
import SearchPage from "./Pages/Search/SearchPage";
import Details from "./Pages/Blog/Details";

function ProtectedRoute({ element }) {
  const { authUser } = useAuthStore(); // Get authUser from Zustand store
  return authUser ? element : <Navigate to="/login" replace />;
}

function App() {
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthStore();
  const { settings, fetchSettings } = useAuthStore();
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Helmet>
        {settings?.siteName && <title>{settings.siteName}</title>}
        {settings?.favicon && (
          <link rel="icon" href={settings.favicon} type="image/x-icon" />
        )}
      </Helmet>

      {loading && (
        <div className="preloader">
          <div className="loader-p"></div>
        </div>
      )}

      <BrowserRouter>
        <Header />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Bloglist />} />
            <Route path="/blog/:name" element={<Details />} />
            <Route
              path="/login"
              element={
                authUser ? <Navigate to="/profile" replace /> : <Login />
              }
            />

            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/shop" element={<Shoppage />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/shop/:category" element={<CatShop />} />

            <Route
              path="/Wishlist"
              element={<ProtectedRoute element={<Wishlist />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Dashboard />} />}
            />

            <Route
              path="/cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
            <Route
              path="/checkout"
              element={<ProtectedRoute element={<Checkout />} />}
            />
            <Route path="/product/:id" element={<Productdetails />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
