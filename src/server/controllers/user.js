const User = require('../models/User.model');

exports.UpdateHistorySearch = function(req, res, next){
  const email = req.params.email;
  const city = req.params.city;

  if (!email || !city){
    return res.status(422).send({error: 'Are you logged in?'})
  }
  // update the lastCity history search
  User.findOneAndUpdate({email: email}, { $set: { lastCity: city } }, function(err, existingUser){
    if (err) {return next(err)};
  })
}
