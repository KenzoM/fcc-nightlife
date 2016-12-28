const path = require('path');


const Authentication = require('./controllers/authentication');

const passportService = require('./services/passport'); // source of Middleware for passport
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false }); //middleWare
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app){

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

}
