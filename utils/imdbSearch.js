const request = require('request')

const searchMovie = (title, callback) => {
    const url = 'http://www.omdbapi.com/?apikey=4ffa9b2a&t='+encodeURIComponent(title)+'';

    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to services', undefined);
        } else if (response.body.Response === 'False') {
            callback('Cannot find movie, please try another', undefined);
        } else {
            const title = response.body.Title;            
            const genre = response.body.Genre;            
            const year = response.body.Year;            
            const actors = response.body.Actors;            
            const director = response.body.Director;            
            const plot = response.body.Plot;
            const poster = response.body.Poster;            
            callback(undefined, title, genre,year, actors, director, plot, poster);

        }
    })   
}

module.exports = searchMovie;