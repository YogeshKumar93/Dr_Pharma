import { createContext, useContext, useEffect, useState } from "react";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";

// --------------------
// CONTEXT
// --------------------
const AuthContext = createContext(null);

// --------------------
// PROVIDER
// --------------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------
  // AUTO LOGIN ON PAGE REFRESH
  // ---------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    apiCall("GET", ApiEndpoints.ME)
      .then(({ response }) => {
        // Expected backend response:
        // { status: true, user: {...} }
        if (response?.user) {
          setUser(response.user);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ---------------------------------
  // LOGIN
  // ---------------------------------
  const login = async (email, password) => {
    const { response, error } = await apiCall("POST", ApiEndpoints.LOGIN, {
      email,
      password,
    });

    if (error || !response?.status) {
      throw new Error(response?.message || "Invalid credentials");
    }

    // Save token only (JWT rule)
    localStorage.setItem("token", response.token);
    setUser(response.user);

    return response.user;
  };

  // ---------------------------------
  // LOGOUT
  // ---------------------------------
  const logout = async () => {
    try {
      await apiCall("POST", ApiEndpoints.LOGOUT);
    } catch (e) {
      // ignore
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  // ---------------------------------
  // CONTEXT VALUE
  // ---------------------------------
  const value = {
    user,                 // logged in user
    loading,              // auth loading state
    isLoggedIn: !!user,   // boolean
    login,                // login(email, password)
    logout,               // logout()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// --------------------
// HOOK
// --------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

// --------------------
// DEFAULT EXPORT (VERY IMPORTANT)
// --------------------
export default AuthContext;
