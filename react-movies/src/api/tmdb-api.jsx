export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getMovie = ({ queryKey }) => {
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

export const getGenres = () => {
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

export const getUpcoming = () => {
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

export const getMovieImages = ({ queryKey }) => {
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

export const getMovieReviews = ({ queryKey }) => {
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

export const getTrendingWeek = () => {
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

export const getTrendingToday = () => {
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

export const getPopularMovies = () => {
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

export const getTopRatedMovies = () => {
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

export const getNowPlayingMovies = () => {
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

export const getMovieDetails = ({ queryKey }) => {
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

export const getMovieCredits = ({ queryKey }) => {
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

export const getActorDetails = ({ queryKey }) => {
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

export const getActorMovieCredits = ({ queryKey }) => {
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

export const login = async (username, password) => {
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

export const signup = async (username, password) => {
  const response = await fetch(`http://localhost:8080/api/users?action=register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const json = await response.json();
  return json;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? token : ''
  };
};

export const getFavorites = async () => {
  const response = await fetch(`http://localhost:8080/api/users/me/favorites`, {
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to fetch favorites');
  }
  return json;
};

export const addFavorite = async (movieId) => {
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

export const removeFavorite = async (movieId) => {
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

export const getFavoritesList = async () => {
  const response = await fetch(`http://localhost:8080/api/favorites`, {
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to fetch favorites list');
  }
  return json;
};

export const addFavoriteItem = async (movieId) => {
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

export const removeFavoriteItem = async (movieId) => {
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

export const getPlaylist = async () => {
  const response = await fetch(`http://localhost:8080/api/users/me/playlist`, {
    headers: getAuthHeaders()
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.msg || 'Failed to fetch playlist');
  }
  return json;
};

export const addToPlaylist = async (movie) => {
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

export const removeFromPlaylist = async (movieId) => {
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
