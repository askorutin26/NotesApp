import React, { useState, createContext } from "react";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const isLogged = () => !!localStorage.getItem("token");
  const [logged, setLogged] = useState(isLogged());
  const [userID, setID] = useState(localStorage.getItem("userID"));
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const logIn = (token, userID) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);
    setID(userID);
    setLogged(true);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    setID("");
    setLogged(false);
  };
  const props = { userID, logged, logIn, logOut };
  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}
export { AuthProvider };
export { AuthContext };
