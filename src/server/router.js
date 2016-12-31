const path = require('path');
var Yelp = require('yelp');

//API KEY for Yelp
const consumer_key = require('./config').consumer_key;
const consumer_secret = require('./config').consumer_secret;
const token = require('./config').token;
const token_secret = require('./config').token_secret;

const yelp = new Yelp({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  token: token,
  token_secret: token_secret,
});

//For JWT & Authentication purposes
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport'); // source of Middleware for passport
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false }); //middleWare
const requireSignIn = passport.authenticate('local', { session: false });


module.exports = function(app){

  app.get('/yelp/:city', function(req, res){
    let city = req.params.city;
    yelp.search({
      term: 'clubs',
      location: city,
      category_filter: 'bars'
     })
    .then(function (data) {
      res.send(data)
    })
    .catch(function (err) {
      console.error(err);
    });
  })
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

}
