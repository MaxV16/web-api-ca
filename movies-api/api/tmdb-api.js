import fetch from 'node-fetch';

const TMDB_BASE = 'https://api.themoviedb.org/3'; //TMDB API base URL
const API_KEY = process.env.TMDB_KEY; //API key from environment
const LANGUAGE = 'en-US'; //language parameter

const fetchTMDB = async (endpoint, queryParams = '') => { //generic fetch function for TMDB
    const url = `${TMDB_BASE}${endpoint}?api_key=${API_KEY}&language=${LANGUAGE}${queryParams}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    return await response.json();
};

export const getMovies = async () => { //fetch discover movies
    return fetchTMDB('/discover/movie', '&include_adult=false&include_video=false&page=1');
};

export const getUpcoming = async () => { //fetch upcoming movies
    return fetchTMDB('/movie/upcoming', '&page=1');
};

export const getGenres = async () => { //fetch movie genres
    return fetchTMDB('/genre/movie/list');
};

export const getMovie = async (id) => { //fetch movie by id
    return fetchTMDB(`/movie/${id}`);
};

export const getMovieImages = async (id) => { //fetch movie images
    return fetchTMDB(`/movie/${id}/images`);
};

export const getMovieReviews = async (id) => { //fetch movie reviews
    return fetchTMDB(`/movie/${id}/reviews`);
};

export const getTrendingWeek = async () => { //fetch trending movies this week
    return fetchTMDB('/trending/movie/week');
};

export const getTrendingToday = async () => { //fetch trending movies today
    return fetchTMDB('/trending/movie/day');
};

export const getPopularMovies = async () => { //fetch popular movies
    return fetchTMDB('/movie/popular');
};

export const getTopRatedMovies = async () => { //fetch top rated movies
    return fetchTMDB('/movie/top_rated');
};

export const getNowPlayingMovies = async () => { //fetch now playing movies
    return fetchTMDB('/movie/now_playing');
};

export const getMovieCredits = async (id) => { //fetch movie credits
    return fetchTMDB(`/movie/${id}/credits`);
};

export const getActorDetails = async (id) => { //fetch actor details
    return fetchTMDB(`/person/${id}`);
};

export const getActorMovieCredits = async (id) => { //fetch actor movie credits
    return fetchTMDB(`/person/${id}/movie_credits`);
};
