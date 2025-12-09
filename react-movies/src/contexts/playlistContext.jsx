import React, { useState, createContext, useEffect, useContext } from "react";
import { AuthContext } from './authContext';
import { getPlaylist, addToPlaylist as addToPlaylistAPI, removeFromPlaylist as removeFromPlaylistAPI } from "../api/tmdb-api";

export const PlaylistContext = createContext(null);

const PlaylistContextProvider = (props) => {
  const [myPlaylist, setMyPlaylist] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
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

  const addToPlaylist = async (movie) => {
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

  const removeFromPlaylist = async (movie) => {
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

  return (
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