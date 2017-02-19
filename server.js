var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

var util = require('util');

// google trends api here
const googleTrends = require('google-trends-api');

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

googleTrends.interestOverTime({keyword: 'Valentines Day'})
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});

// listen to connections to our server
app.listen(PORT, (error) =>{
if(error){
  console.log('error starting server ', error);
}else{
  console.log("App is listening on port", PORT);
}
})
