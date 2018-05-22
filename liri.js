require("dotenv").config();
require("node-spotify-api");
require("twitter");


var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);


console.log(twitter);
console.log(spotify);


console.log(module.filename);
console.log(module.id);
console.log(module.exports);