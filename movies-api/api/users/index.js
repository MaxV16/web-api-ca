import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

router.get('/me/favorites', authenticate, asyncHandler(async (req, res) => {
    const user = await User.findByUserName(req.user.username);
    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found' });
    }
    res.status(200).json({ success: true, favorites: user.favorites });
}));

router.post('/me/favorites', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    if (!movieId) {
        return res.status(400).json({ success: false, msg: 'Movie ID is required' });
    }
    const id = Number(movieId);
    console.log(`POST /me/favorites called for user=${req.user?.username} movieId=${id}`);
    const user = await User.findByUserName(req.user.username);
    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found' });
    }
    if (!user.favorites.includes(id)) {
        user.favorites.push(id);
        await user.save();
    }
    res.status(200).json({ success: true, favorites: user.favorites });
}));

router.delete('/me/favorites/:movieId', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const user = await User.findByUserName(req.user.username);
    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found' });
    }
    user.favorites = user.favorites.filter(id => id !== Number(movieId));
    await user.save();
    res.status(200).json({ success: true, favorites: user.favorites });
}));

router.get('/me/playlist', authenticate, asyncHandler(async (req, res) => {
    const user = await User.findByUserName(req.user.username);
    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found' });
    }
    res.status(200).json({ success: true, playlist: user.playlist });
}));

router.post('/me/playlist', authenticate, asyncHandler(async (req, res) => {
    const movie = req.body.movie;
    if (!movie || !movie.id) {
        return res.status(400).json({ success: false, msg: 'Movie object with id is required' });
    }
    console.log(`POST /me/playlist called for user=${req.user?.username} movieId=${movie.id}`);
    const user = await User.findByUserName(req.user.username);
    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found' });
    }
    const exists = user.playlist.some(m => m.id === movie.id);
    if (!exists) {
        user.playlist.push(movie);
        await user.save();
    }
    res.status(200).json({ success: true, playlist: user.playlist });
}));

router.delete('/me/playlist/:movieId', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const user = await User.findByUserName(req.user.username);
    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found' });
    }
    user.playlist = user.playlist.filter(m => m.id !== Number(movieId));
    await user.save();
    res.status(200).json({ success: true, playlist: user.playlist });
}));

async function registerUser(req, res) {
  try {
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorMessage = error.errors.password.message;
      return res.status(400).json({ success: false, msg: errorMessage });
    }
    console.error(error);
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}


export default router;
