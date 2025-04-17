import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "./assets/css/perfect-scrollbar.css";
import "./assets/css/choices.css";
import "./assets/css/apexcharts.css";
import "./assets/css/quill.css";
import "./assets/css/rangeslider.css";
import "./assets/css/custom.css";
import "./assets/css/main.css";
import Home from "./Pages/Home/Home";
import Productlist from "./Pages/Product/Productlist";
import Aside from "./Pages/Home/Aside";
import Header from "./Pages/Home/Header";
import AddProduct from "./Pages/Product/AddProduct";
import Category from "./Pages/Category/Category";
import Customerlist from "./Pages/Customer/Customerlist";
import Orderlist from "./Pages/Order/Orderlist";
import OrderDetail from "./Pages/Order/OrderDetail";
import Transaction from "./Pages/Order/Transaction";
import Review from "./Pages/Review/Review";
import Coupon from "./Pages/Coupon/Coupon";
import Profile from "./Pages/Settings/Profile";
import GenralSetting from "./Pages/Settings/GenralSetting";
import Login from "./Components/Authentication/Login";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import { Toaster } from "react-hot-toast";
import Websetting from "./Pages/Settings/Websetting";
import ResetPassword from "./Components/Authentication/ResetPassword";
import AddBlog from "./Pages/Blogs/AddBlog";
import ListBlog from "./Pages/Blogs/ListBlog";
import AddBanner from "./Pages/Banner/AddBanner";
import EditProduct from "./Pages/Product/EditProduct";

function Layout() {
  const location = useLocation();
  const [sideMenu, setSideMenu] = useState(true);

  const toggleSideMenu = () => {
    setSideMenu(!sideMenu);
  };
  const hideLayoutRoutes = ["/login", "/forgot", "/Reset-password"];
  const isLoginPage = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!isLoginPage && (
        <Aside
          sideMenu={sideMenu}
          toggleSideMenu={toggleSideMenu}
          setSideMenu={setSideMenu}
        />
      )}
      <div
        className={
          !isLoginPage
            ? "tp-main-content lg:ml-[250px] xl:ml-[300px] w-[calc(100% - 300px)]"
            : "w-full"
        }
      >
        {!isLoginPage && <Header toggleSideMenu={toggleSideMenu} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-list" element={<Productlist />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/customer-list" element={<Customerlist />} />
          <Route path="/order-list" element={<Orderlist />} />
          <Route path="/order-details/:id" element={<OrderDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<GenralSetting />} />
          <Route path="/site-settings" element={<Websetting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/Reset-password" element={<ResetPassword />} />
          <Route path="/Add-blog" element={<AddBlog />} />
          <Route path="/Blog-list" element={<ListBlog />} />
          <Route path="/Banner" element={<AddBanner />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
