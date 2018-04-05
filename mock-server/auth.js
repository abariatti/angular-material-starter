const fs = require('fs')
const express = require('express');
const router = express.Router();


const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const _ = require("lodash");


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const userdb = JSON.parse(fs.readFileSync('./mock-server/data/users.json', 'UTF-8'))

//BEWARE: Not best pratice, this must be passed via environment variable or config file
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const expiresIn = '1h'

function createToken(id) {
  return jwt.sign(id, JWT_SECRET, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, (err, decode) => decode !== undefined ? decode : err)
}

function findUser(email, password){
  return userdb.users.find(user => user.email === email && user.password === password)
}

router.post('/api/authenticate', function (req, res) {
  const { email, password } = req.body
  const user = findUser(email, password)

  if (!user) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})

    return
  }
  const access_token = createToken({email, password})
  user.token = access_token
  res.status(200).json(user)
})

router.use(function (req, res, next) {

  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})

    return;
  }

  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
 } catch (err) {
   const status = 401
   const message = 'Error access_token is revoked'
   res.status(status).json({status, message})
 }

  // if (typeof bearerHeader !== 'undefined') {
  //   var bearer = bearerHeader.split(" ");
  //   bearerToken = bearer[1];
  //   try {
  //     verifyToken(bearerToken);
  //     next();
  //   } catch (ex) {
  //     const status = 401
  //     const message = 'Error access_token is revoked'
  //     res.status(status).json({ status, message })
  //   }

  //   // var matchingUser = _.find(users, function(u) { return u.token == bearerToken; });
  //   // if (matchingUser) {
  //   //     console.log("token found");
  //   //     next();
  //   //     return;
  //   // } else {
  //   //     res.sendStatus(401);
  //   // }
  // } else {
  //   console.log("Token failed");
  //   res.sendStatus(401);
  // }
});

module.exports = router;
