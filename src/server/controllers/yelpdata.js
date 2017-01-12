const path = require('path');
var Yelp = require('yelp');

//API KEY for Yelp
const consumer_key = process.env.CONSUMER_KEY || require('../config').consumer_key;
const consumer_secret = process.env.CONSUMER_SECRET || require('../config').consumer_secret;
const token = process.env.TOKEN || require('../config').token;
const token_secret = process.env.TOKEN_SECRET || require('../config').token_secret;

const yelp = new Yelp({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  token: token,
  token_secret: token_secret,
});

// More info on Yelp API Search
// https://www.yelp.com/developers/documentation/v2/search_api
exports.getData = function(req, res, next){
  let city = req.params.city;
  yelp.search({
    term: 'clubs',
    location: city,
    category_filter: 'bars',
    sort: 1
   })
  .then(function (data) {
    res.send(data)
  })
  .catch(function (err) {
    console.error(err);
    res.send(err.data)
  });
}
