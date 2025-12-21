import React from "react"; //import React
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; //import back arrow icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; //import forward arrow icon
import Paper from "@mui/material/Paper"; //import Paper component
import IconButton from "@mui/material/IconButton"; //import IconButton component
import Typography from "@mui/material/Typography"; //import Typography component
import HomeIcon from "@mui/icons-material/Home"; //import home icon
import { useNavigate } from "react-router-dom"; //import useNavigate for navigation

const MovieHeader = (props) => { //MovieHeader component
  const movie = props.movie; //extract movie prop
  const navigate = useNavigate(); //get navigate function

  return ( //render header
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {movie.title}
        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
