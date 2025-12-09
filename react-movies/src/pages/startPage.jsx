import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  marginTop: theme.spacing(8),
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

const StartPage = () => {
  const context = useContext(AuthContext);

  return (
    <Container component="main" maxWidth="md">
      <StyledPaper elevation={6}>
        <Typography variant="h3" color="primary" gutterBottom>
          Welcome to TMDB Client
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Discover movies, manage favorites, and create playlists.
        </Typography>
        {context.isAuthenticated ? (
          <Box>
            <Typography variant="h5" gutterBottom>
              Welcome back, {context.userName}!
            </Typography>
            <Typography variant="body1" paragraph>
              You can view your profile, explore movies, or check your favorites and playlist.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              component={Link}
              to="/profile"
            >
              View Profile
            </StyledButton>
            <StyledButton
              variant="outlined"
              color="primary"
              component={Link}
              to="/"
            >
              Browse Movies
            </StyledButton>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom>
              Get Started
            </Typography>
            <Typography variant="body1" paragraph>
              Please log in or sign up to access your personalized movie dashboard.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </StyledButton>
            <StyledButton
              variant="outlined"
              color="primary"
              component={Link}
              to="/signup"
            >
              Sign Up
            </StyledButton>
          </Box>
        )}
      </StyledPaper>
    </Container>
  );
};

export default StartPage;
