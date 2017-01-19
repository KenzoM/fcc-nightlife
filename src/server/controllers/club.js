const Promise = require('promise');
const User = require('../models/User.model');
const Club = require('../models/Club.model');

exports.GuestLists = function(req, res, next){
  const userEmail = req.params.email;
  const clubID = req.params.clubID;
  // if user is not logged in, skip of going through the database
  if (userEmail !== 'null'){
    User.findOne({ email: userEmail}, function(err, existingUser){
      if(err) {console.error(err)}
      if (existingUser.clubs.includes(clubID)){
        // console.log('current user is RESERVED')
        return res.send({'isCurrentUserReserved' : true})
      } else{
        // console.log('current user is NOT RESERVED')
        return res.send({'isCurrentUserReserved' : false})
      }
    })
  } else{
    res.send({'message' : 'user is not logged in'})
    next()
  }
}

exports.UpdateGuestList = function(req, res, next){
  const clubID = req.params.clubID;
  const userName = req.params.userName
  const userEmail = req.params.userEmail;

  function updateClubSchema(){
    return new Promise(function(resolve, reject){
      Club.findOne({ clubID: clubID}, function(err, existingClub){
        if (err) { return next(err) ;}
        // if clubID exist in the data base, check the following
        if (existingClub){
                         //1) if the current userName exist, remove it from guests array
          if (existingClub.guests.includes(userName)){
            console.log('Remove guest')
            Club.findOneAndUpdate({clubID: clubID}, {$pull: {guests: userName}}, function(err, doc){
              if(err) {console.error(err)}
              resolve()
              // console.log(doc)
              // return res.send({"message": "removed new guest"})
            })

          } else{         //2) if the current userName doesnt exist, push it into guests array
            console.log('Push in guest')
            Club.findOneAndUpdate({clubID: clubID}, {$push: {guests: userName}}, function(err, doc){
              if(err) {console.error(err)}
              // if(!err) {return next(err)}
              // console.log(doc)
              resolve()
            })
          }
          resolve()
          // return res.send({"message": "done"})
        }
        // If clubID does not exist, create and save clubID
        const club = new Club({
          clubID: clubID,
          guests: [userName]
        })

        club.save(function(err, doc){
          if (err) {return next(err)}
          // console.log(doc)
          resolve()
        })
      })
    })

  }

  updateClubSchema().then(function(){ //update Usermodel after Club
    User.findOne({email: userEmail}, function(err, existingUser){
      if(err){return console.error(err)}
      if(existingUser.clubs.includes(clubID)){
        console.log('remove club in the user list')
        User.findOneAndUpdate({email: userEmail}, {$pull: {clubs: clubID}}, function(err, doc){
          if(err) {console.error(err)}
          // console.log(doc)
          // res.send({"message": "added club in user list"})
          return res.send({'message': 'removed club in user list'})
        })
      } else{
        console.log('add club in user list')
        User.findOneAndUpdate({email: userEmail}, {$push: {clubs: clubID}}, function(err, doc){
          if(err) {console.error(err)}
          // console.log(doc)
          // res.send({'message': 'added club in user list'})
          return res.send({'message': 'added club in user list'})
        })
      }
    })
  })
}
