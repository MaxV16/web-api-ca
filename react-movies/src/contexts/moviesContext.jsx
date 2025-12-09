import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from './authContext';
import { getFavorites, addFavorite, removeFavorite } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (authContext.isAuthenticated) {
        try {
          const result = await getFavorites();
          setFavorites(result.favorites || []);
        } catch (error) {
          console.error('Failed to fetch favorites:', error);
        }
      } else {
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [authContext.isAuthenticated]);

  const addToFavorites = async (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
    if (authContext.isAuthenticated) {
      try {
        await addFavorite(movie.id);
      } catch (error) {
        console.error('Failed to add favorite to backend:', error);
      }
    }
  };

  const removeFromFavorites = async (movie) => {
    const newFavorites = favorites.filter((mId) => mId !== movie.id);
    setFavorites(newFavorites);
    if (authContext.isAuthenticated) {
      try {
        await removeFavorite(movie.id);
      } catch (error) {
        console.error('Failed to remove favorite from backend:', error);
      }
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };
  console.log(myReviews);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
