var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';


/* GET home page. */
router.get('/', function(req, res, next) {
  const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
  // console.log(nowPlayingUrl);
  // request.get() takes 2 arguments
  // 1. URL to get
  // 2. the call back to run when request is fulfilled
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    // console.log(parsedData);
    res.render('index', { parsedData: parsedData.results, imageBaseUrl });
  });
  // res.render('index', { title: 'Express' });
});

// anytime you see a colon (:) in an epress router, that means it's a wildcard
router.get('/movie/:id', (req, res, next)=> {
  // res.json(req.params);
  const movieId = req.params.id;
  // console.log(movieId);
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
    // console.log(thisMovieUrl);
    res.render('single-movie', {
      parsedData, imageBaseUrl
    });

    // res.render('single-movie', {});
  });
});

module.exports = router;
