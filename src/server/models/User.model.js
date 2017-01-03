const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
})

//Using bcrypt to encrypt our uses's password
userSchema.pre('save', function(next){
  const user = this; // access to user model (it is instance of user Model)

  // generate a salt, then run a callback
  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err);}

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) { return next(err);}

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    })
  })
});

//extend another method for comparing password (LocalStrategy)
userSchema.methods.comparePassword = function(candidatePassword, callback){
  let userDataPassword = this.password; // the actual encrypted password in db
  //bcrypt.compare allows us to compare candidatePassword and userDataPassword to see if matched
  bcrypt.compare(candidatePassword, userDataPassword, function(err, isMatch) {
    if (err) { return callback(err)}
    callback(null, isMatch)
  })
}


module.exports = mongoose.model('User', userSchema)
