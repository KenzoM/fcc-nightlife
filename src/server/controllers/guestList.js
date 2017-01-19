const Promise = require('promise');
const User = require('../models/User.model');
const Club = require('../models/Club.model');

//Retrieve all current guest list for each clubID
exports.getGuestLists = function(req, res, next){
  const clubID = req.params.clubID
  Club.findOne({clubID: clubID}, function(err, existingClub){
    if(err){ console.err(err)}
    //if clubID doesnt exist in database, it simply means
    //there is no one reserved at that club at the momemnt
    if(!existingClub || existingClub.guests.length === 0){
      res.send({'guests': []})
      // otherwise, send a JSON with all the guest lists
    } else{
      res.send({'guests': existingClub.guests})
    }
    // next()
  })
}
