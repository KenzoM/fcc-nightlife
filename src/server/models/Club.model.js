const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/*
UserSchema:
  userName: the id of the club
  email: to look for users who RSVP for particular clubs
*/

const clubSchema = new Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
    lowercase: true
  }
})

module.exports = mongoose.model('Club', clubSchema)
