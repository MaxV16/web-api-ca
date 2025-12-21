import express from 'express'; //import express framework
import User from '../users/userModel.js'; //import User model
import authenticate from '../../authenticate/index.js'; //import authentication middleware
import asyncHandler from 'express-async-handler'; //import async handler for error handling

const router = express.Router(); //create express router

router.get('/', authenticate, asyncHandler(async (req, res) => { //get all favorites for authenticated user
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({
            success: false,
            msg: 'User not found',
        });
    }
    const favorites = user.favorites.map(movieId => ({
        movieId,
        createdAt: null,
    }));
    res.status(200).json({
        success: true,
        count: favorites.length,
        favorites,
    });
}));

router.post('/', authenticate, asyncHandler(async (req, res) => { //add a movie to favorites
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({
            success: false,
            msg: 'Movie ID is required',
        });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({
            success: false,
            msg: 'User not found',
        });
    }

    const id = Number(movieId);
    if (user.favorites.includes(id)) {
        return res.status(409).json({
            success: false,
            msg: 'Movie already in favorites',
        });
    }

    user.favorites.push(id);
    await user.save();

    res.status(201).json({
        success: true,
        favorite: {
            movieId: id,
            createdAt: null,
        },
    });
}));

router.delete('/:movieId', authenticate, asyncHandler(async (req, res) => { //remove a movie from favorites
    const { movieId } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({
            success: false,
            msg: 'User not found',
        });
    }

    const id = Number(movieId);
    const initialLength = user.favorites.length;
    user.favorites = user.favorites.filter(favId => favId !== id);
    if (user.favorites.length === initialLength) {
        return res.status(404).json({
            success: false,
            msg: 'Favorite not found',
        });
    }

    await user.save();

    res.status(200).json({
        success: true,
        msg: 'Favorite removed',
    });
}));

export default router; //export the router