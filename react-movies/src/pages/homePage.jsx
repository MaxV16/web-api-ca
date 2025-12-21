import React, { useState } from "react"; //import React and useState
import { getMovies } from "../api/tmdb-api"; //import getMovies API function
import PageTemplate from '../components/templateMovieListPage'; //import page template component
import { useQuery } from '@tanstack/react-query'; //import useQuery from React Query
import Spinner from '../components/spinner'; //import Spinner component
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; //import AddToFavoritesIcon component


const HomePage = (props) => { //HomePage component
  const [nameFilter, setNameFilter] = useState(""); //state for name filter
  const [genreFilter, setGenreFilter] = useState("0"); //state for genre filter
  const [releaseYearFilter, setReleaseYearFilter] = useState(""); //state for release year filter
  const [sortOption, setSortOption] = useState(""); //state for sort option
  const [ratingFilter, setRatingFilter] = useState(""); //state for rating filter

  const handleChange = (type, value) => { //handle filter changes
    if (type === "name") setNameFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
    else if (type === "sort") setSortOption(value);
    else if (type === "rating") setRatingFilter(value);
    else setGenreFilter(value);
  };

  const { data, error, isPending, isError } = useQuery({ //fetch movies using React Query
    queryKey: ['discover'],
    queryFn: getMovies,
  });

  

  if (isPending) { //show spinner while pending
    return <Spinner />;
  }

  if (isError) { //show error if any
    return <h1>{error.message}</h1>;
  }

  const movies = data.results; //extract movies from data

  const genreId = Number(genreFilter); //convert genre filter to number

  let displayedMovies = movies //filter movies based on filters
    .filter((m) => m && m.title && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
    .filter((m) => m && (genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true))
    .filter((m) => m && m.release_date && m.release_date.substring(0, 4).includes(releaseYearFilter));


  return ( //render page template
    <PageTemplate
      title="Discover Movies"
      movies={displayedMovies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
      onUserInput={handleChange}
      nameFilter={nameFilter}
      genreFilter={genreFilter}
      releaseYearFilter={releaseYearFilter}
      sortOption={sortOption}
      ratingFilter={ratingFilter}
    />
  );
};

export default HomePage;
