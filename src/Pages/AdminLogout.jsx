import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";

const AdminLogout = () => {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); // 👈 IMPORTANT

  useEffect(() => {
    if (hasLoggedOut.current) return;
    hasLoggedOut.current = true;

    const doLogout = async () => {
      try {
        await apiCall("POST", ApiEndpoints.LOGOUT);
      } catch (e) {
        console.log("Logout API error (ignored)");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    };

    doLogout();
  }, [navigate]);

  return null;
};

export default AdminLogout;
