import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Contexts/AuthContext";

import MainLayout from "../Components/Layouts/MainLayout";
// import LandingPage from "../Components/Landings/LandingPage";

import Login from "../Pages/Login";
import Register from "../Pages/Register";

import SideNavAndHeader from "../Common/SideNavAndHeader";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../Pages/Dashboard";
import Users from "../Pages/Users";
import Medicines from "../Pages/Medicines";
import Payments from "../Pages/Payments";
import Settings from "../Pages/Settings";
import Prescriptions from "../Pages/Prescriptions";

import LandingPage from "../Components/Landings/Landingpage";
import { CartProvider } from "../Contexts/CartContext";
import Cart from "../Pages/Cart";
import AllProducts from "../Pages/AllProducts";
import Checkout from "../Pages/Checkout";
 

import Categories from "../Pages/Categories";
import Home from "../Components/Landings/Home";
import Offers from "../Pages/Offers";
import AboutUs from "../Pages/AboutUs";
import MyOrders from "../Pages/MyOrders";
import AllOrders from "../Pages/AllOrders";
import ResetPassword from "../Pages/ResetPassword";
import VerifyOtp from "../Pages/VerifyOtp";
import ForgotPassword from "../Pages/ForgotPassword";
import UserProfile from "../Pages/UserProfile";


const AppRoutes = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            {/* 🌐 PUBLIC WEBSITE (Landing + common header/footer) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/home" element={<Home />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/myorders" element={<MyOrders />} />
                <Route path="/userprofile" element={<UserProfile />} />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* 🔓 AUTH PAGES (NO layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />


            {/* 🔒 DASHBOARD (SIDENAV + HEADER) */}
            <Route
              element={
                <PrivateRoute>
                  <SideNavAndHeader />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/allproducts" element={<AllProducts />} />
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/allorders" element={<AllOrders />} />
            

            </Route>

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
