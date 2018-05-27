require("dotenv").config();
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const Omdb = require("omdbapi");


const keys = require('./keys.js');
const spotify = new Spotify(keys.spotifykeys);
const twitter = new Twitter(keys.twitterkeys);
const omdb = keys.omdb.key;


const userInput = process.argv[2];

console.log(userInput);

function showTweets() {
    twitter.get('statuses/user_timeline.json?screen_name=askimnu87&count=20', function(error, tweets, response) {
        if (error) throw error;
        
        for (let i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
        
    });
}

if (userInput === 'my-tweets') {
    showTweets();
}