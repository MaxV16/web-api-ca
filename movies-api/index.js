import dotenv from 'dotenv';
import express from 'express';
import './db';
import cors from 'cors';
import usersRouter from './api/users';
import authenticate from './authenticate';
import moviesRouter from './api/movies';
import favoritesRouter from './api/favorites';



dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

// Enable CORS for all requests
// Enable CORS and allow Authorization header for requests from the frontend
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.static('public'));

const port = process.env.PORT;

app.use(express.json());


app.use('/api/movies', moviesRouter); 
//>>> use this after implementing authenticate and stuff..
// app.use('/api/tasks', authenticate, tasksRouter);

//Users router
app.use('/api/users', usersRouter);

//Favorites router (protected)
app.use('/api/favorites', authenticate, favoritesRouter);


app.use(errHandler);


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});