import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(location.pathname);
    } else {
      navigate("/signIn");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedLayout;
