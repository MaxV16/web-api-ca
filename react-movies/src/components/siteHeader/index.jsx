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


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar); //to offset the content for fixed app bar
const SiteHeader = () => { //main site header component, shows navigation and auth options
  const [drawerOpen, setDrawerOpen] = useState(false); //state for mobile drawer

  const theme = useTheme(); //get the theme for design from MUI
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); //check if the screen is mobile size
  
  const navigate = useNavigate(); //for navigation between pages
  const authContext = useContext(AuthContext); //get authentication context

  const menuOptions = [ //menu options for navigation
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Trending This Week", path: "/movies/trending/week" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular Movies", path: "/movie/popular" },
    { label: "Top Rated Movies", path: "/movies/top_rated" },
    { label: "Now Playing Movies", path: "/movies/now_playing" },
    { label: "My Playlist", path: "/movies/playlist" },
  ];

  const handleMenuSelect = (pageURL) => { //handle menu selection and navigate
    navigate(pageURL);
  };


  const handleDrawerOpen = () => { //open mobile drawer
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => { //close mobile drawer
    setDrawerOpen(false);
  };

  return ( //for rendering the site header
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
                  {authContext && authContext.isAuthenticated ? ( //if authenticated show profile and logout
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
              {menuOptions.map((opt) => ( //desktop menu options
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

                {authContext && authContext.isAuthenticated ? ( //if authenticated show profile and logout
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
