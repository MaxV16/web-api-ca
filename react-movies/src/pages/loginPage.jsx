import { useContext, useState } from "react"; //import React hooks
import { Navigate, useLocation } from "react-router-dom"; //import routing components
import { AuthContext } from '../contexts/authContext'; //import authentication context
import { Link } from "react-router-dom"; //import Link for navigation
import { //import MUI components
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles'; //import styled from MUI

const StyledPaper = styled(Paper)(({ theme }) => ({ //styled paper component
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
}));

const StyledForm = styled('form')(({ theme }) => ({ //styled form
  width: '100%',
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({ //styled submit button
  margin: theme.spacing(3, 0, 2),
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

const LoginPage = () => { //LoginPage component
  const context = useContext(AuthContext); //get authentication context
  const [userName, setUserName] = useState(""); //state for username
  const [password, setPassword] = useState(""); //state for password
  const [error, setError] = useState(""); //state for error message

  const login = async () => { //login function
    try {
      await context.authenticate(userName, password);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleSubmit = (e) => { //handle form submission
    e.preventDefault();
    login();
  };

  let location = useLocation(); //get location state for redirect
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  if (context.isAuthenticated === true) { //redirect if already authenticated
    return <Navigate to={from} />;
  }

  return ( //render login form
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h5" color="primary" gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          You must log in to view the protected pages.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        <StyledForm onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Log In
          </SubmitButton>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Not Registered?{' '}
              <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
                Sign Up!
              </Link>
            </Typography>
          </Box>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default LoginPage;
