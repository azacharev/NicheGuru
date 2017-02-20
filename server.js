'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

var util = require('util');

var facebookScrape = require('facebook-scrape')

// google trends api here -- !not working
// const googleTrends = require('google-trends-api');

// create express app object
var app = express();

var PORT = process.env.PORT | 3000;

// mount the middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}), bodyParser.json());
app.use(express.static('public'));

// define routes here
// test route
// app.get('/', (req, res)=>{
//    res.send("Hello!");
// });

// doesn't work

// googleTrends.interestOverTime({keyword: 'Valentines Day'})
// .then(function(results){
//   console.log(results);
// })
// .catch(function(err){
//   console.error(err);
// });

facebookScrape('tea', function(err, json) {
if(err){
  console.log('error: ', err)
}
else {
  console.log(json);
}
  // err will be an error if the scrape failed
  // json will be the data that json scraped (the values in the og-tags)
})


// listen to connections to our server
app.listen(PORT, (error) =>{
if(error){
  console.log('error starting server ', error);
}else{
  console.log("App is listening on port", PORT);
}
})
