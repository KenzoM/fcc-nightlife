const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/*
UserSchema:
  clubID: the id of the club
  email: to look for users who RSVP for particular clubs
*/

const clubSchema = new Schema({
  clubID: String,
  guests: [String]
})

module.exports = mongoose.model('Club', clubSchema)
