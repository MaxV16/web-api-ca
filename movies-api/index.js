import dotenv from 'dotenv'; //load environment variables
import express from 'express'; //import express framework
import './db'; //connect to database
import cors from 'cors'; //import CORS middleware
import usersRouter from './api/users'; //import users router
import authenticate from './authenticate'; //import authentication middleware
import moviesRouter from './api/movies'; //import movies router
import favoritesRouter from './api/favorites'; //import favorites router



dotenv.config(); //load environment variables from .env file

const errHandler = (err, req, res, next) => { //global error handler
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express(); //create express app

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

const port = process.env.PORT; //get port from environment

app.use(express.json()); //parse JSON request bodies


app.use('/api/movies', moviesRouter); //mount movies router
// app.use('/api/tasks', authenticate, tasksRouter);

//Users router
app.use('/api/users', usersRouter); //mount users router

//Favorites router (protected)
app.use('/api/favorites', authenticate, favoritesRouter); //mount favorites router with authentication


app.use(errHandler); //use global error handler


app.get('/', (req, res) => { //serve static index.html
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => { //start server
  console.info(`Server running at ${port}`);
});