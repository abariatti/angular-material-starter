// server.js
var jsonServer = require('json-server')

var server = jsonServer.create()

var middlewares = jsonServer.defaults()

server.use(middlewares)


var config = require('./mock-server/config.js');

if (config.authEnabled) {
    var auth = require("./mock-server/auth.js");
    server.use(auth);
}

console.log("starting api server");
//middleware to generate delayed response, for promise learning
server.use(function(req, res, next){

    var delay_in_seconds = Math.floor(Math.random() * 0.8) + 0.3;

    setTimeout(function(){
        next();
    }, delay_in_seconds * 1000);

});

// Add this before server.use(router)

server.use(jsonServer.rewriter({
  '/api/products': '/api/products/products',
  '/api/brands': '/api/brands/brands',
  '/api/cities': '/api/cities/cities',
  '/api/states': '/api/states/states',
  '/api/cart': '/api/cart/cart',
  '/api/users': '/api/users/users',
}))

var router = jsonServer.router('./mock-server/data/products.json')
server.use('/api/products', router)

var router = jsonServer.router('./mock-server/data/brands.json')
server.use('/api/brands', router)

var router = jsonServer.router('./mock-server/data/cities.json')
server.use('/api/cities', router)

var router = jsonServer.router('./mock-server/data/states.json')
server.use('/api/states', router)

var router = jsonServer.router('./mock-server/data/cart.json')
server.use('/api/cart', router)

var router = jsonServer.router('./mock-server/data/users.json')
server.use('/api/users', router)

server.listen(7070, function () {
  console.log('JSON API Server is running on port 7070')

  console.log("End point simulate network response between 0.3-0.8 seconds ");

  console.log("http://localhost:7070/api/products");
  console.log("http://localhost:7070/api/brands");
  console.log("http://localhost:7070/api/cities");
  console.log("http://localhost:7070/api/states");
  console.log("http://localhost:7070/api/cart");
})
