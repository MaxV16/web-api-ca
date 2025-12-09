import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setError("Password must be at least 8 characters long and contain at least one letter, digit, and special character.");
      return;
    }
    if (password !== passwordAgain) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const result = await context.register(userName, password);
      if (result) {
        setRegistered(true);
      } else {
        setError("Registration failed. Username may already exist.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h5" color="primary" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          You must register a username and password to log in. Usernames must be unique and passwords must contain a minimum of 8 characters (with at least one letter, digit, and special character).
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="At least 8 characters with letter, digit, and special character."
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordAgain"
            label="Confirm Password"
            type="password"
            id="passwordAgain"
            autoComplete="new-password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </SubmitButton>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default SignUpPage;
