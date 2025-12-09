import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  marginTop: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: '#ffffff',
  boxShadow: theme.shadows[4],
}));

const ProfilePage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    context.signout();
    navigate('/');
  };

  if (!context.isAuthenticated) {
    return (
      <Container component="main" maxWidth="sm">
        <StyledPaper elevation={6}>
          <Typography variant="h5" color="primary" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1" paragraph>
            You must log in to see your profile!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ExitToAppIcon />}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      <StyledPaper elevation={6}>
        <Typography variant="h4" color="primary" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Welcome, {context.userName}!
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <ProfileCard>
              <CardContent>
                <FavoriteIcon color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Favorites
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  View and manage your favorite movies.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate('/movies/favorites')}
                >
                  Go to Favorites
                </Button>
              </CardActions>
            </ProfileCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileCard>
              <CardContent>
                <PlaylistPlayIcon color="secondary" sx={{ fontSize: 60 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Playlist
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Manage your custom movie playlists.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate('/movies/playlist')}
                >
                  Go to Playlist
                </Button>
              </CardActions>
            </ProfileCard>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default ProfilePage;
