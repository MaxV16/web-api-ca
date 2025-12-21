import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => { //MovieReviewPage component
  let location = useLocation(); //get location state
  const {movie, review} = location.state; //extract movie and review
  
  return ( //render page template with movie review
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
