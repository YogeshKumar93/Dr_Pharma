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
import Orders from "../Pages/Orders";
import LandingPage from "../Components/Landings/Landingpage";
import { CartProvider } from "../Contexts/CartContext";
import Cart from "../Pages/Cart";

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
          </Route>

          {/* 🔓 AUTH PAGES (NO layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          

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
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/orders" element={<Orders />} />
            
          </Route>

        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
