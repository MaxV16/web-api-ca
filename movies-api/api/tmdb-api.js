import fetch from 'node-fetch';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_KEY;
const LANGUAGE = 'en-US';

const fetchTMDB = async (endpoint, queryParams = '') => {
    const url = `${TMDB_BASE}${endpoint}?api_key=${API_KEY}&language=${LANGUAGE}${queryParams}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    return await response.json();
};

export const getMovies = async () => {
    return fetchTMDB('/discover/movie', '&include_adult=false&include_video=false&page=1');
};

export const getUpcoming = async () => {
    return fetchTMDB('/movie/upcoming', '&page=1');
};

export const getGenres = async () => {
    return fetchTMDB('/genre/movie/list');
};

export const getMovie = async (id) => {
    return fetchTMDB(`/movie/${id}`);
};

export const getMovieImages = async (id) => {
    return fetchTMDB(`/movie/${id}/images`);
};

export const getMovieReviews = async (id) => {
    return fetchTMDB(`/movie/${id}/reviews`);
};

export const getTrendingWeek = async () => {
    return fetchTMDB('/trending/movie/week');
};

export const getTrendingToday = async () => {
    return fetchTMDB('/trending/movie/day');
};

export const getPopularMovies = async () => {
    return fetchTMDB('/movie/popular');
};

export const getTopRatedMovies = async () => {
    return fetchTMDB('/movie/top_rated');
};

export const getNowPlayingMovies = async () => {
    return fetchTMDB('/movie/now_playing');
};

export const getMovieCredits = async (id) => {
    return fetchTMDB(`/movie/${id}/credits`);
};

export const getActorDetails = async (id) => {
    return fetchTMDB(`/person/${id}`);
};

export const getActorMovieCredits = async (id) => {
    return fetchTMDB(`/person/${id}/movie_credits`);
};
