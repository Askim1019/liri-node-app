// Require all the packages and libraries necessary for the application
require("dotenv").config();
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const omdb = require("omdbapi");
const request = require("request");
const fs = require("fs");
const keys = require('./keys.js');

// Obtain keys from keys.js to keep api keys hidden from github resources
const spotify = new Spotify(keys.spotifykeys);
const twitter = new Twitter(keys.twitterkeys);
const omdbKey = keys.omdb.key;

// get the node.js terminal paramaters with process
let command = process.argv[2];
let params = process.argv; 
let songName = "";
let movieName = "";


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


// Method to search for a movie provided by user input
function movieStats() {
    for (let i = 3; i < params.length; i++) {
        movieName += params[i] + " ";
    }

    if (movieName ===  "")  {
        movieName = "Mr. Nobody";
    }

    console.log(movieName);

    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKey;

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            
            let movie = JSON.parse(body);

            console.log("\nMovie Title: " + movie.Title);
            console.log("\nYear Released: " + movie.Year);
            console.log("\nIMDB Rating: " + movie.imdbRating);

            let rottenTomatoesRating = "";

            for (let i = 0; i < movie.Ratings.length; i++) {
                if (movie.Ratings[i].Source === 'Rotten Tomatoes') {
                    rottenTomatoesRating = movie.Ratings[i].Value;
                }
            }

            console.log("\nRotten Tomatoes Rating: " + rottenTomatoesRating);
            console.log("\nCountries of Production: " + movie.Country);
            console.log("\nLanguage: " + movie.Language);
            console.log("\nMovie Plot: " + movie.Plot);
            console.log("\nActors/Actresses: " + movie.Actors);
        }
    });
}







//Set the conditional commands for liri depending on user command

//Tweet method invocation
if (command === 'my-tweets') {
    showTweets();
}

// Spotify method invocation
if (command === 'spotify-this-song' && params.length > 3) {
    songStats();
} else if (command === 'spotify-this-song' && params.length <= 3) {
    defaultSong(); 
}

// Omdb movie search method invocation
if (command === 'movie-this') {
    movieStats();
}