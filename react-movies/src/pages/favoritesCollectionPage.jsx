import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getFavoritesList, removeFavoriteItem } from "../api/tmdb-api";
import { getMovie } from "../api/tmdb-api";
import { useQueries } from "@tanstack/react-query";
import Spinner from '../components/spinner';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const FavoritesCollectionPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [ratingFilter, setRatingFilter] = useState("0");

  const queryClient = useQueryClient();

  const { data: favoritesData, isLoading, error } = useQuery({
    queryKey: ['favoritesList'],
    queryFn: getFavoritesList,
  });

  const favoriteItems = favoritesData?.favorites || [];
  const movieIds = favoriteItems.map(item => item.movieId);

  const movieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ['movie', { id: movieId }],
      queryFn: getMovie,
    }))
  });

  const removeMutation = useMutation({
    mutationFn: removeFavoriteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['favoritesList']);
    },
  });

  const handleRemove = (movieId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeMutation.mutate(movieId);
    }
  };

  const isPending = isLoading || movieQueries.find(q => q.isPending);

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading favorites: {error.message}</div>;
  }

  const movies = movieQueries.map((q, index) => {
    const movie = q.data;
    const favorite = favoriteItems[index];
    return {
      ...movie,
      favoriteId: favorite.movieId,
      createdAt: favorite.createdAt,
      genre_ids: movie.genres ? movie.genres.map(g => g.id) : [],
    };
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
    else if (type === "sort") setSortOption(value);
    else if (type === "rating") setRatingFilter(value);
    else console.log("Invalid type", type);
  };

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      const nameMatch = nameFilter ? m.title && typeof m.title === 'string' && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1 : true;
      const genreMatch = genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true;
      const releaseYearMatch = releaseYearFilter ? m.release_date && m.release_date.substring(0, 4).includes(releaseYearFilter) : true;
      const ratingMatch = ratingFilter ? m.vote_average && m.vote_average >= Number(ratingFilter) : true;
      return m && nameMatch && genreMatch && releaseYearMatch && ratingMatch;
    })
    .filter((m) => m && (ratingFilter > 0 ? m.vote_average && m.vote_average >= ratingFilter : true))
    .sort((a, b) => {
      if (!sortOption) return 0;

      const [key, order] = sortOption.split('.');
      let valA = a[key];
      let valB = b[key];

      if (key === 'title') {
        valA = valA ? valA.toLowerCase() : '';
        valB = valB ? valB.toLowerCase() : '';
      }

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });

  const action = (movie) => {
    const createdAt = movie.createdAt ? new Date(movie.createdAt).toLocaleString() : '';
    return (
      <>
        <IconButton
          aria-label="remove from favorites"
          onClick={() => handleRemove(movie.favoriteId)}
          color="error"
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
          Added: {createdAt}
        </div>
      </>
    );
  };

  return (
    <PageTemplate
      title="Favorites Collection"
      movies={displayedMovies}
      action={action}
      onUserInput={handleChange}
      nameFilter={nameFilter}
      genreFilter={genreFilter}
      releaseYearFilter={releaseYearFilter}
      sortOption={sortOption}
      ratingFilter={ratingFilter}
    />
  );
};

export default FavoritesCollectionPage;