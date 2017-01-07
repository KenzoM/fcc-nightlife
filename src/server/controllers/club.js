const User = require('../models/User.model');
const Club = require('../models/Club.model');

exports.GuestLists = function(req, res, next){
  const email = req.params.email;
  const city = req.params.city;
  // console.log(email, city, 'DSFSDFSD!!!')
  next()
}
