import { useContext } from "react"; 
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from './contexts/authContext'

const ProtectedRoutes = () => { //ProtectedRoutes component

  const context = useContext(AuthContext); //get authentication context
  const location = useLocation(); //get current location because we want to redirect back after login

  return context.isAuthenticated === true ? ( //render outlet if authenticated, else redirect to login
    <Outlet /> 
  ) : (
    <Navigate to='/login' replace state={{ from: location }}/>
  );
};

export default ProtectedRoutes;
