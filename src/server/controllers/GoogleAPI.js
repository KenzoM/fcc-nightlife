var Yelp = require('yelp');

const googleAPI = process.env.GOOGLEAPI || require('../config').googleAPI;

// Give the Google API to client
exports.getAPI = function(req, res, next){
  res.send({googleAPI})
}
