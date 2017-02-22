var express = require('express');

var app = express();


app.use(express.static("./")); 


var PORT = process.env.PORT || 3000;

app.listen(PORT, (err)=>{
  if(err){
    console.log('Server error: ', err);
  } else {
    console.log("Server is up and running on port ", PORT);
  }
});
