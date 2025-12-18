import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/authContext';
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
const SiteHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Favorites Collection", path: "/movies/favorites/collection" },
    { label: "Trending This Week", path: "/movies/trending/week" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular Movies", path: "/movie/popular" },
    { label: "Top Rated Movies", path: "/movies/top_rated" },
    { label: "Now Playing Movies", path: "/movies/now_playing" },
    { label: "My Playlist", path: "/movies/playlist" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };


  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#212121' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: "#bbdefb" }}>
            TMDB Client
          </Typography>
          {authContext && authContext.isAuthenticated && (
            <Typography variant="body1" sx={{
              color: '#bbdefb',
              ml: 2,
              display: { xs: 'none', md: 'inline' },
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}>
              Welcome, {authContext.userName}!
            </Typography>
          )}
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerOpen}
                color="white"
              >
                <MenuIcon color="white"/>
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
              >
                <List>
                  {menuOptions.map((opt) => (
                    <ListItemButton key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                      <ListItemText primary={opt.label} />
                    </ListItemButton>
                  ))}
                  <Divider />
                  {authContext && authContext.isAuthenticated ? (
                    <>
                      <ListItemButton onClick={() => { handleDrawerClose(); navigate('/profile'); }}>
                        <ListItemText primary="Profile" />
                      </ListItemButton>
                      <ListItemButton onClick={() => { authContext.signout(); handleDrawerClose(); navigate('/'); }}>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </>
                  ) : (
                    <>
                      <ListItemButton onClick={() => { handleDrawerClose(); navigate('/login'); }}>
                        <ListItemText primary="Login" />
                      </ListItemButton>
                      <ListItemButton onClick={() => { handleDrawerClose(); navigate('/signup'); }}>
                        <ListItemText primary="Sign Up" />
                      </ListItemButton>
                    </>
                  )}
                </List>
              </Drawer>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    sx={{
                      color: '#bbdefb',
                      '&:hover': { backgroundColor: '#424242' },
                      textTransform: 'none',
                    }}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
                {/* Authentication buttons */}
                {authContext && authContext.isAuthenticated ? (
                  <>
                    <Button
                      sx={{
                        color: '#bbdefb',
                        marginLeft: 2,
                        '&:hover': { backgroundColor: '#424242' },
                        textTransform: 'none',
                      }}
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </Button>
                    <Button
                      sx={{
                        color: '#bbdefb',
                        marginLeft: 2,
                        '&:hover': { backgroundColor: '#424242' },
                        textTransform: 'none',
                      }}
                      onClick={() => { authContext.signout(); navigate('/'); }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      sx={{
                        color: '#bbdefb',
                        marginLeft: 2,
                        '&:hover': { backgroundColor: '#424242' },
                        textTransform: 'none',
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      sx={{
                        color: '#bbdefb',
                        marginLeft: 2,
                        '&:hover': { backgroundColor: '#424242' },
                        textTransform: 'none',
                      }}
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
