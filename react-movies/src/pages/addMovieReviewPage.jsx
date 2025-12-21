import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useMovie } from "../hooks/useMovie";

const WriteReviewPage = (props) => { //WriteReviewPage component
  const location = useLocation(); //get location state
  const movieId = location.state.movieId; //extract movieId

  const { data: movie, error, isLoading, isError } = useMovie(movieId); //fetch movie using custom hook

  if (isLoading) { //show spinner while loading
    return <Spinner />;
  }

  if (isError) { //show error if any
    return <h1>{error.message}</h1>;
  }
  return ( //render page template with review form
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;
