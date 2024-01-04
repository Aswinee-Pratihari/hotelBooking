import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    checkUser();
  }, []);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage?.getItem("token")}`,
    // Add other headers as needed
  };
  const checkUser = async () => {
    const res = await axios.get(`${BASE_URL}/user/checkUser`, { headers });
    try {
      const user = await res?.data;

      console.log(user);
      if (user) {
        setUser(user);
        if (location.pathname == "/signIn" || location.pathname == "/signUp") {
          navigate("/", { replace: true });
        } else {
          navigate(location.pathname ? location.pathname : "/");
        }
      } else {
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (formData) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, formData);
      const result = await res?.data;
      console.log(result);
      if (result?.user && result?.token) {
        localStorage.setItem("token", result?.token);
        setUser(result?.user);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("Login Error ", error);
      return error;
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/register`, formData);
      const result = await res?.data;

      if (result) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("Register Error ", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, setUser, register }}>
      {children}
    </AuthContext.Provider>
  );
};
