import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

const StartPage = () => {
    const context = useContext(AuthContext);
  
    return context.isAuthenticated ? (
        <p>
            Welcome {context.userName}! View your <Link to="/profile">Profile</Link>.
        </p>
    ) : (
        <p>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to access your profile!
        </p>
    );
  };

export default StartPage;
