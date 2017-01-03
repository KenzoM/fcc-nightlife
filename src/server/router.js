const path = require('path');

const consumer_key = require('./config').consumer_key;
const consumer_secret = require('./config').consumer_secret;
const token = require('./config').token;
const token_secret = require('./config').token_secret;

const YelpData = require('./controllers/yelpdata')

//For JWT & Authentication purposes
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport'); // source of Middleware for passport
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false }); //middleWare
const requireSignIn = passport.authenticate('local', { session: false });


module.exports = function(app){

  app.get('/yelp/:city', YelpData.getData)

  app.post('/signup', Authentication.signup)

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

}
