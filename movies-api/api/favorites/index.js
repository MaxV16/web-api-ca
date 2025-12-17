import express from 'express';
import Favorite from './favoriteModel.js';
import authenticate from '../../authenticate/index.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', authenticate, asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: favorites.length,
        favorites: favorites.map(fav => ({
            movieId: fav.movieId,
            createdAt: fav.createdAt,
        })),
    });
}));

router.post('/', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({
            success: false,
            msg: 'Movie ID is required',
        });
    }

    const existing = await Favorite.findOne({
        user: req.user._id,
        movieId: Number(movieId),
    });

    if (existing) {
        return res.status(409).json({
            success: false,
            msg: 'Movie already in favorites',
        });
    }

    const favorite = await Favorite.create({
        user: req.user._id,
        movieId: Number(movieId),
    });

    res.status(201).json({
        success: true,
        favorite: {
            movieId: favorite.movieId,
            createdAt: favorite.createdAt,
        },
    });
}));

router.delete('/:movieId', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    const deleted = await Favorite.findOneAndDelete({
        user: req.user._id,
        movieId: Number(movieId),
    });

    if (!deleted) {
        return res.status(404).json({
            success: false,
            msg: 'Favorite not found',
        });
    }

    res.status(200).json({
        success: true,
        msg: 'Favorite removed',
    });
}));

export default router;