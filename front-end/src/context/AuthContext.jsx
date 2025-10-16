import { Children, createContext, useState } from "react";

export const AuthContext = createContext();

export const AdminAuthContext = ({ children }) => {
  const authInfo = localStorage.getItem('authInfo');
  const [user, setUser] = useState(authInfo);

  const login = (user) => {
    setUser(user)
  }

  const logOut = () => {
    localStorage.removeItem('authInfo');
    setUser(null)
  }



return (
  <AuthContext.Provider value={{ user, login, logOut }}>
    {children}
  </AuthContext.Provider>
);



}