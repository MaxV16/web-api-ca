import { useState, createContext } from "react"; //import React hooks and context
import { login, signup } from "../api/tmdb-api"; //import login and signup API functions

export const AuthContext = createContext(null); //create authentication context

const AuthContextProvider = (props) => { //authentication context provider component
  const existingToken = localStorage.getItem("token"); //retrieve existing token from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(existingToken ? true : false); //state for authentication status
  const [authToken, setAuthToken] = useState(existingToken); //state for auth token
  const [userName, setUserName] = useState(localStorage.getItem("userName") || ""); //state for username

  const setToken = (data) => { //function to set token in localStorage and state
    localStorage.setItem("token", data);
    setAuthToken(data);
    setIsAuthenticated(true);
  }

  const authenticate = async (username, password) => { //authenticate user with username and password
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
      localStorage.setItem("userName", username);
    }
  };

  const register = async (username, password) => { //register new user
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => { //sign out user
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
  }

  return ( //render provider with value
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
