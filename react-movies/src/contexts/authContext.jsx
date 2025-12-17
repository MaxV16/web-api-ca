import { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(existingToken ? true : false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
    setIsAuthenticated(true);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
      localStorage.setItem("userName", username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
