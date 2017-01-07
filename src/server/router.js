const path = require('path');

const consumer_key = require('./config').consumer_key;
const consumer_secret = require('./config').consumer_secret;
const token = require('./config').token;
const token_secret = require('./config').token_secret;

const YelpData = require('./controllers/yelpdata')
const User = require('./controllers/user')
const Club = require('./controllers/club')

//For JWT & Authentication purposes
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport'); // source of Middleware for passport
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false }); //middleWare
const requireSignIn = passport.authenticate('local', { session: false });


module.exports = function(app){

  //Responsible of collecting YelpData's
  app.get('/yelp/:city', YelpData.getData)

  //Responsible of updating user's last search history
  app.put('/user/:email/:city', User.UpdateHistorySearch)

  //Responsile of updating guestList in particular club, as well as
  //current user's own RSVP club lists
  app.post('/club/:clubID/:userName/:userEmail', function(req, res, next){
    console.log(req.params)
    res.send({message: 'this is just message'})
    next()
  })

  //Responsible of retriving current guestList in particular clubs
  app.get('/club/:email/:city', Club.GuestLists )

  //Responsible of adding guests in particular clubs
  app.post('/club/:email:city', function(req, res, next){

  })

  //Authentication Routes
  app.post('/signup', Authentication.signup)
  app.post('/signin', requireSignIn,  Authentication.signin)

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

}


// I'm having hard time how to go on about keeping track of users of where they are attending bar. I am creating the app with MERN with Redux.
//
// This is what I've planned out so far:
//
// When a signed-in user submit a form to fetch` data (city of the name for example),  from Yelp's API, before Redux's reducer receives the data, it will go straight to my server where it will copy the all of the data, and add attribute for the current user
