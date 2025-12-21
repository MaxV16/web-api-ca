import React, { useState, useEffect, useContext } from "react"; //import React hooks and context
import { AuthContext } from './authContext'; //import authentication context
import { getFavorites, addFavorite, removeFavorite } from "../api/tmdb-api"; //import favorites API functions

export const MoviesContext = React.createContext(null); //create movies context

const MoviesContextProvider = (props) => { //movies context provider component
  const [favorites, setFavorites] = useState([]); //state for favorite movie IDs
  const [myReviews, setMyReviews] = useState({}); //state for user reviews
  const authContext = useContext(AuthContext); //get authentication context

  useEffect(() => { //effect to fetch favorites when authentication changes
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

  const addToFavorites = async (movie) => { //add movie to favorites
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

  const removeFromFavorites = async (movie) => { //remove movie from favorites
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

  const addReview = (movie, review) => { //add review for a movie
    setMyReviews({ ...myReviews, [movie.id]: review });
  };
  console.log(myReviews);

  return ( //render provider with value
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
