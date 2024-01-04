import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    console.log(formData);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, register }}>
      {children}
    </AuthContext.Provider>
  );
};
