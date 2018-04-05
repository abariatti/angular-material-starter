const fs = require('fs')
const express = require('express');
const router = express.Router();


const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const _ = require("lodash");


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//BEWARE: Not best pratice, this must be passed via environment variable or config file
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const expiresIn = '1h'

function createToken(id) {
  return jwt.sign(id, JWT_SECRET, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, (err, decode) => decode !== undefined ? decode : err)
}

function findUser(email){
  const userdb = JSON.parse(fs.readFileSync('./mock-server/data/users.json', 'UTF-8'))
  return userdb.users.find(user => user.email === email)
}

function createUser(user){
  const userdb = JSON.parse(fs.readFileSync('./mock-server/data/users.json', 'UTF-8'))
  userdb.users.push(user);
  fs.writeFileSync('./mock-server/data/users.json', JSON.stringify(db));
}

router.post('/api/authenticate', function (req, res) {
  const { email, password } = req.body

  const user = findUser(email)

  if (!user || user.password != password) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})

    return
  }
  const access_token = createToken({email, password})
  user.token = access_token
  res.status(200).json(user)
})

router.post('/api/register', function (req, res) {
  const user = req.body;
  console.log(user);
  try{
    const db = JSON.parse(fs.readFileSync('./mock-server/data/users.json', 'UTF-8'))
    // check if user already exists
    if(findUser(user.email)){
      const status = 409
      const message = "Email " + user.email + " already exists"
      res.status(status).json({status, message})

      return;
    }
    const id = Math.max.apply(Math,db.users.map(function(o){return o.id;})) + 1
    user.id = id;
    createUser(user);
    res.status(200).json(user);
  }catch( err){
    const status = 500
    const message = err.message
    res.status(status).json({status, message})
  }
})

router.use(function (req, res, next) {

  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})

    return;
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    verifyToken(token)

    next()
 } catch (err) {
   const status = 401
   const message = 'Error access_token is revoked'
   res.status(status).json({status, message})
 }
});

module.exports = router;
