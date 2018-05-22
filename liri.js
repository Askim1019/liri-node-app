require("dotenv").config();
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const Omdb = require("omdbapi");


const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
const twitter = new Twitter(keys.twitter);
const omdb = keys.omdb.key;

console.log(twitter);
console.log(spotify);
console.log(omdb);

console.log(module.filename);
console.log(module.id);
console.log(module.exports);


