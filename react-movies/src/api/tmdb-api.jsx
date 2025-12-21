export const getMovies = () => { //this fetches a list of movies from the backend server
  return fetch(
    `http://localhost:8080/api/movies/discover` //this fetches the movies from the backend server
  ).then((response) => {
    if (!response.ok) { //error handling
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json(); //return the response as json
  })
  .catch((error) => { //catch any errorss
      throw error
  });
};

export const getMovie = ({ queryKey }) => { //fetch a single movie by id
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getGenres = () => { //fetch movie genres
  return fetch(
    "http://localhost:8080/api/movies/genres"
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getUpcoming = () => { //fetch upcoming movies
  return fetch(
    "http://localhost:8080/api/movies/upcoming"
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovieImages = ({ queryKey }) => { //fetch images for a movie
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/images`
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovieReviews = ({ queryKey }) => { //fetch reviews for a movie
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/reviews`
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getTrendingWeek = () => { //fetch trending movies this week
  return fetch(
    `http://localhost:8080/api/movies/trending/week`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getTrendingToday = () => { //fetch trending movies today
  return fetch(
    `http://localhost:8080/api/movies/trending/day`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getPopularMovies = () => { //fetch popular movies
  return fetch(
    `http://localhost:8080/api/movies/popular`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getTopRatedMovies = () => { //fetch top rated movies
  return fetch(
    `http://localhost:8080/api/movies/top_rated`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getNowPlayingMovies = () => { //fetch now playing movies
  return fetch(
    `http://localhost:8080/api/movies/now_playing`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovieDetails = ({ queryKey }) => { //fetch movie details (same as getMovie?)
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovieCredits = ({ queryKey }) => { //fetch movie credits
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/credits`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getActorDetails = ({ queryKey }) => { //fetch actor details
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/actor/${id}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getActorMovieCredits = ({ queryKey }) => { //fetch actor's movie credits
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/actor/${id}/movie_credits`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const login = async (username, password) => { //authenticate user
  const response = await fetch(`http://localhost:8080/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const json = await response.json();
  if (!response.ok) {
    return json;
  }
  return json;
};

export const signup = async (username, password) => { //register new user
  const response = await fetch(`http://localhost:8080/api/users?action=register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const json = await response.json();
  return json;
};

const getAuthHeaders = () => { //helper to get authorization headers
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? token : ''
  };
};

export const getFavorites = async () => { //fetch user's favorites
  const response = await fetch(`http://localhost:8080/api/users/me/favorites`, {
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to fetch favorites');
  }
  return json;
};

export const addFavorite = async (movieId) => { //add movie to favorites
  const response = await fetch(`http://localhost:8080/api/users/me/favorites`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ movieId })
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to add favorite');
  }
  return json;
};

export const removeFavorite = async (movieId) => { //remove movie from favorites
  const response = await fetch(`http://localhost:8080/api/users/me/favorites/${movieId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to remove favorite');
  }
  return json;
};

export const getFavoritesList = async () => { //fetch favorites list (alternative)
  const response = await fetch(`http://localhost:8080/api/favorites`, {
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to fetch favorites list');
  }
  return json;
};

export const addFavoriteItem = async (movieId) => { //add favorite item (alternative)
  const response = await fetch(`http://localhost:8080/api/favorites`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ movieId })
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to add favorite item');
  }
  return json;
};

export const removeFavoriteItem = async (movieId) => { //remove favorite item (alternative)
  const response = await fetch(`http://localhost:8080/api/favorites/${movieId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to remove favorite item');
  }
  return json;
};

export const getPlaylist = async () => { //fetch user's playlist
  const response = await fetch(`http://localhost:8080/api/users/me/playlist`, {
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to fetch playlist');
  }
  return json;
};

export const addToPlaylist = async (movie) => { //add movie to playlist
  const response = await fetch(`http://localhost:8080/api/users/me/playlist`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ movie })
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to add to playlist');
  }
  return json;
};

export const removeFromPlaylist = async (movieId) => { //remove movie from playlist
  const response = await fetch(`http://localhost:8080/api/users/me/playlist/${movieId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to remove from playlist');
  }
  return json;
};
