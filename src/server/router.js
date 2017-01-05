const path = require('path');

const consumer_key = require('./config').consumer_key;
const consumer_secret = require('./config').consumer_secret;
const token = require('./config').token;
const token_secret = require('./config').token_secret;

const YelpData = require('./controllers/yelpdata')
const User = require('./controllers/user')

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

  app.get('/user/:email/:city', function(req, res, next){
    console.log(req.params)
    console.log('POOP')
    next()
  })

  //Authentication Routes
  app.post('/signup', Authentication.signup)
  app.post('/signin', requireSignIn,  Authentication.signin)

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

}
