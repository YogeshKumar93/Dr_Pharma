import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null; // or loader

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // 👈 VERY IMPORTANT
      />
    );
  }

  return children;
};

export default PrivateRoute;
