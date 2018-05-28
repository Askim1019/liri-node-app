// Require all the packages and libraries necessary for the application
require("dotenv").config();
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const Omdb = require("omdbapi");

// Obtain keys from keys.js to keep api keys hidden from github resources
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotifykeys);
const twitter = new Twitter(keys.twitterkeys);
const omdb = keys.omdb.key;

// get the node.js terminal paramaters with process
let command = process.argv[2];
let params = process.argv; 
let songName = "";


console.log(command);




// Declare a function  that shows 20 most recent tweets of a specified user
function showTweets() {
    twitter.get('statuses/user_timeline.json?screen_name=askimnu87&count=20', function(error, tweets, response) {
        if (error) throw error;
        
        for (let i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
        
    });
}

// Make a method that returns the Arist(s), song name, preview link, and album through spotify api
function songStats() {
    for (let i = 3; i < params.length; i++) {
        songName += params[i] + " ";
    }

    console.log(songName);

    spotify.search({type: 'track', query: songName, limit: 1}, function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);  
        } 

        
        console.log("\nArtists: " + data.tracks.items[0].artists[0].name);
        console.log("\nSong Title: " + data.tracks.items[0].name);
        console.log("\nPreview URL: " + data.tracks.items[0].preview_url);
        console.log("\nAlbum Title: " + data.tracks.items[0].album.name);

    });
    
}

// Default function called when no song parameter provided for spotify command
function defaultSong() {
    songName = "The Sign Ace of Base";

    
    spotify.search({type: 'track', query: songName, limit: 1}, function(err, data) { 
        if (err) {
            return console.log("Error occurred: " + err);
        }

        console.log("\nArtists: Ace of Base");
        console.log("\nSong Title: The Sign");
        console.log("\nPreview URL: " + data.tracks.items[0].preview_url);
        console.log("\nAlbum Title: Happy Nation");
    });

}



//Set the conditional commands for liri depending on user command
if (command === 'my-tweets') {
    showTweets();
}




if (command === 'spotify-this-song' && params.length > 3) {
    songStats();
} else if (command === 'spotify-this-song' && params.length <= 3) {
    defaultSong(); 
}