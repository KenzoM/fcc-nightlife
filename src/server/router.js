const path = require('path');

const YelpData = require('./controllers/yelpdata')
const User = require('./controllers/user')
const Club = require('./controllers/club')
const GuestList = require('./controllers/guestList')

//For JWT & Authentication purposes
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport'); // source of Middleware for passport
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false }); //middleWare
const requireSignIn = passport.authenticate('local', { session: false });


module.exports = function(app){

  //Responsible of collecting data from Yelp API
  app.get('/yelp/:city', YelpData.getData)

  //Responsible of updating user's last search history
  app.put('/user/:email/:city', User.UpdateHistorySearch)

  //Responsible of updating guestList in particular club, as well as
  //current user's own RSVP club lists
  app.put('/club/:clubID/:userName/:userEmail', Club.UpdateGuestList)

  //Responsible of retriving current guestList in particular clubs
  app.get('/club/:email/:clubID', Club.GuestLists )

  //Responsible of retrieving guestList for each particular club
  app.get('/guestList/:clubID', GuestList.getGuestLists)

  //Authentication Routes
  app.post('/signup', Authentication.signup)
  app.post('/signin', requireSignIn,  Authentication.signin)

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

}
