'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

// node server

var http = require('http');
var fs = require('fs');

// 404 response
function send404Response(response) {
    response.writeHead(404, {"Content-Type"});
    response.write("Error 404: Page not found!");
    response.end();
}

// Handle a user request
function onRequest(request, response) {
    if( request.method == 'GET' && request.url == '/'){
      response.writeHead(200, {"Content-Type": "text/html"});
      fs.createReadStream("./login.html").pipe(response);
    } else {
      send404Response(response);
    }

}

http.createServer(onRequest).listen(3000);
console.log('Server is now running'); 

// var util = require('util');

// var facebookScrape = require('facebook-scrape')

// google trends api here -- !not working
// const googleTrends = require('google-trends-api');

// create express app object
var app = express();

var PORT = process.env.PORT | 3000;

app.listen(PORT, (error) =>{
if(error){
  console.log('error starting server ', error);
}else{
  console.log("App is listening on port", PORT);
}
})

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



// listen to connections to our server
