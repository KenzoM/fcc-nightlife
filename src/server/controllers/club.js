const Promise = require('promise');
const User = require('../models/User.model');
const Club = require('../models/Club.model');

exports.GuestLists = function(req, res, next){
  const email = req.params.email;
  const city = req.params.city;
  // console.log(email, city, 'DSFSDFSD!!!')
  next()
}

exports.UpdateGuestList = function(req, res, next){
  const clubID = req.params.clubID;
  const userName = req.params.userName
  const userEmail = req.params.userEmail;

  function test(){
    console.log('testing~~~')
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
              console.log(doc)
              // return res.send({"message": "removed new guest"})
            })

          } else{         //2) if the current userName doesnt exist, push it into guests aaray
            console.log('Push in guest')
            Club.findOneAndUpdate({clubID: clubID}, {$push: {guests: userName}}, function(err, doc){
              if(err) {console.error(err)}
              // if(!err) {return next(err)}
              console.log(doc)
              resolve()
            })
          }
          resolve()
          return res.send({"message": "done"})
        }

        // If clubID does not exist, create and save clubID
        const club = new Club({
          clubID: clubID,
          guests: [userName]
        })

        club.save(function(err, doc){
          if (err) {return next(err)}
          console.log(doc)
          resolve()
        })
      })
    })

  }
  test().then(function(){
    console.log('EWREWREWRW')
    console.log(data, 'this is resolved@!@')
  })
}
