import React, { useState, createContext, useEffect, useContext } from "react"; //import React hooks and context
import { AuthContext } from './authContext'; //import authentication context
import { getPlaylist, addToPlaylist as addToPlaylistAPI, removeFromPlaylist as removeFromPlaylistAPI } from "../api/tmdb-api"; //import playlist API functions

export const PlaylistContext = createContext(null); //create playlist context

const PlaylistContextProvider = (props) => { //playlist context provider component
  const [myPlaylist, setMyPlaylist] = useState([]); //state for playlist movies
  const authContext = useContext(AuthContext); //get authentication context

  useEffect(() => { //effect to fetch playlist when authentication changes
    const fetchPlaylist = async () => {
      if (authContext.isAuthenticated) {
        try {
          const result = await getPlaylist();
          setMyPlaylist(result.playlist || []);
        } catch (error) {
          console.error('Failed to fetch playlist:', error);
        }
      } else {
        const playlist = localStorage.getItem("myPlaylist");
        if (playlist) {
          setMyPlaylist(JSON.parse(playlist));
        }
      }
    };
    fetchPlaylist();
  }, [authContext.isAuthenticated]);

  const addToPlaylist = async (movie) => { //add movie to playlist
    let newPlaylist = [];
    if (!myPlaylist.some((m) => m.id === movie.id)) {
      newPlaylist = [...myPlaylist, movie];
    } else {
      newPlaylist = [...myPlaylist];
    }
    setMyPlaylist(newPlaylist);
    localStorage.setItem("myPlaylist", JSON.stringify(newPlaylist));
    if (authContext.isAuthenticated) {
      try {
        await addToPlaylistAPI(movie);
      } catch (error) {
        console.error('Failed to add to playlist backend:', error);
      }
    }
  };

  const removeFromPlaylist = async (movie) => { //remove movie from playlist
    const newPlaylist = myPlaylist.filter((m) => m.id !== movie.id);
    setMyPlaylist(newPlaylist);
    localStorage.setItem("myPlaylist", JSON.stringify(newPlaylist));
    if (authContext.isAuthenticated) {
      try {
        await removeFromPlaylistAPI(movie.id);
      } catch (error) {
        console.error('Failed to remove from playlist backend:', error);
      }
    }
  };

  return ( //render provider with value
    <PlaylistContext.Provider
      value={{
        myPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;