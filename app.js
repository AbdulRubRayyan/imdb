const express = require('express')
const hbs = require('hbs')
const path = require('path');
const searchMovie = require('./utils/imdbSearch')
const request = require('request');

const app = express();
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
const publicPath = path.join(__dirname, './public')
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'IMDB SEARCH'
    })
})

app.get('/movie', (req, res) => {
    if(!req.query.title) {
        res.send({
            error: 'You have to enter a title '
        })
    } else {
        searchMovie(req.query.title, (error, title, genre, year, actors, director, plot, poster) => {
            if(error) {
                return res.send({
                    error
                })
            } else {
                res.send({
                    Title: title,
                    Genre: genre,
                    Year: year,
                    Actors: actors,
                    Director: director,
                    Plot: plot,
                    Poster: poster
                })
            }
        })
    }
})

app.listen(port, () => {
    console.log('Server is running on port');
})