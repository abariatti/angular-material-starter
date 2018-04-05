const express = require('express');
const auth = require("./auth.js");

const MIN_DELAY = 0.3, MAX_DELAY = 0.8;

const server = express();

server.use(auth);

console.log("starting api server");

//middleware to generate delayed response to simulate real network
server.use(function(req, res, next){

    var delay_in_seconds = Math.floor(Math.random() * MAX_DELAY) + MIN_DELAY;

    setTimeout(function(){
        next();
    }, delay_in_seconds * 1000);

});

server.listen(3099, function () {
  console.log('JWT Authentication Server is running on port 3099')

  console.log("End point simulate network response between 0.3-0.8 seconds ");

  console.log("http://localhost:3099/api/authenticate");
  console.log("http://localhost:3099/api/register");
});
