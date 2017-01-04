const User = require('../models/User.model');
const jwt = require('jwt-simple');
const secret = process.env.SECRET || require('../config').secret;

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret)
}

exports.signin = function(req, res, next){
  // User has already had their email and password autho'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user), userName: req.user.userName, email: req.user.email})
}

exports.signup = function(req, res, next){
  const userName = req.body.userName
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password){
    return res.status(422).send({error: 'You must provide email/password'})
  }
  // See if a user with given eamil exist
  User.findOne({ email: email}, function(err, existingUser){
    if (err) { return next(err) ;}

    // If a user with email does exit, return err
    if (existingUser){
      console.log(existingUser, ': Email already exist')
      res.status(402)
      res.send({"error": "Email already exist!"})
    }

    // If a user does not exist, create and save user's record
    const user = new User({
      userName: userName,
      email: email,
      password: password
    })

    user.save(function(err){
      if (err) {return next(err)}
      res.json({token: tokenForUser(user), userName: userName, email: email })
    })
  })
}
