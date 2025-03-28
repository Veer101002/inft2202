// import the express library
const express = require('express');
const path = require('path');

// set the port for the server, use 3022
const PORT = 3022;

// create a new server instance
const app = express();

// configure the body renderer to parse json inputs
app.use(express.json());

// automatically serve static assets from the client folder
app.use(express.static(path.join(__dirname, '../client')));

// automatically serve static assets from the node_modules folder
app.use('/scripts', express.static(path.join(__dirname, '../../../node_modules')));

// import movie data
const movieData = require('./data/movies');

// create a new router instance
const router = express.Router();

// create a new route and route handler, check the README for more details.
router.get('/movies', (req, res) => {
  const { genre, rating } = req.query;
  let results = movieData;

  if (genre && genre !== 'All') {
    results = results.filter(movie =>
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (rating && rating !== 'All') {
    const minRating = parseFloat(rating);
    results = results.filter(movie => movie.rating >= minRating);
  }

  res.json(results);
});

// configure the server to use your new router instance
app.use('/api', router);

// start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
