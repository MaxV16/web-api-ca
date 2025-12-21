import React from "react"; //import React
import RateReviewIcon from "@mui/icons-material/RateReview"; //import RateReviewIcon from MUI
import { Link } from "react-router-dom"; //import Link for navigation

const WriteReviewIcon = ({ movie }) => { //WriteReviewIcon component
  return ( //render link to review form
    <Link
      to={`/reviews/form`}
      state={{
          movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
