const passport = require('passport');
// const User = require('../models/User.model');
const secret = process.env.SECRET || require('../config').secret;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Local Strategy
const localOptions = { usernameField: 'email'} // override localJWT default's usernameField
const localLogin = new LocalStrategy(localOptions , function(email, password, done){
  // Verify this email and password, call done with user
  User.findOne({ email: email}, function(err, user){
    if (err) {return (done(err))}
    if (!user) { return done(null, false) } //no error, but user not found in db
    //compare passwords - is 'password equal to user.password?'
    //user.comparePassword is extended method. Check User.model.js
    user.comparePassword(password, function(err, isMatch){
      //isMatch returns true or false
      if (err) {return done(err)}
      if (!isMatch) { return done(null, false)} // no error, but password is not matched
      return done(null, user)
    })
  })
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.sub, function(err, user){
    if (err) { return done(err, false)}

    if (user){
      done(null, user);
    } else{
      done(null, false)
    }
  });
});

// Tell Passport to use this Strategy (Middleware)
passport.use(jwtLogin)
passport.use(localLogin)
