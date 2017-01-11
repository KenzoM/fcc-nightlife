const path = require('path');
var Yelp = require('yelp');

//API KEY for Yelp
const consumer_key = require('../config').consumer_key;
const consumer_secret = require('../config').consumer_secret;
const token = require('../config').token;
const token_secret = require('../config').token_secret;

const yelp = new Yelp({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  token: token,
  token_secret: token_secret,
});


exports.getData = function(req, res, next){
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
    res.send(err.data)
  });
}
