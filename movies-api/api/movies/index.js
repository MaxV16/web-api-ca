import express from 'express';
import asyncHandler from 'express-async-handler';
import {
    getMovies,
    getUpcoming,
    getGenres,
    getMovie,
    getMovieImages,
    getMovieReviews,
    getTrendingWeek,
    getTrendingToday,
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    getMovieCredits,
    getActorDetails,
    getActorMovieCredits
} from '../tmdb-api';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcoming();
    res.status(200).json(upcomingMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/trending/week', asyncHandler(async (req, res) => {
    const trending = await getTrendingWeek();
    res.status(200).json(trending);
}));

router.get('/trending/day', asyncHandler(async (req, res) => {
    const trending = await getTrendingToday();
    res.status(200).json(trending);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const popular = await getPopularMovies();
    res.status(200).json(popular);
}));

router.get('/top_rated', asyncHandler(async (req, res) => {
    const topRated = await getTopRatedMovies();
    res.status(200).json(topRated);
}));

router.get('/now_playing', asyncHandler(async (req, res) => {
    const nowPlaying = await getNowPlayingMovies();
    res.status(200).json(nowPlaying);
}));

router.get('/movie/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

router.get('/movie/:id/images', asyncHandler(async (req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

router.get('/movie/:id/reviews', asyncHandler(async (req, res) => {
    const reviews = await getMovieReviews(req.params.id);
    res.status(200).json(reviews);
}));

router.get('/movie/:id/credits', asyncHandler(async (req, res) => {
    const credits = await getMovieCredits(req.params.id);
    res.status(200).json(credits);
}));

router.get('/actor/:id', asyncHandler(async (req, res) => {
    const actor = await getActorDetails(req.params.id);
    res.status(200).json(actor);
}));

router.get('/actor/:id/movie_credits', asyncHandler(async (req, res) => {
    const credits = await getActorMovieCredits(req.params.id);
    res.status(200).json(credits);
}));

export default router;
