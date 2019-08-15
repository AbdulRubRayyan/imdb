console.log('This is the client side JS file')

const siteForm = document.querySelector('form')
const searched = document.querySelector('input')
const title = document.querySelector('#title-info')
const genre = document.querySelector('#genre-info')
const year = document.querySelector('#year-info')
const actors = document.querySelector('#actors-info')
const director = document.querySelector('#director-info')
const plot = document.querySelector('#plot-info')
const poster = document.querySelector('#poster')


siteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const movieTitle = searched.value;
    title.textContent = "Loading.."
    genre.textContent ='';
    year.textContent = '';
    actors.textContent = '';
    director.textContent = '';
    plot.textContent = '';
    poster.src= '';

    fetch('/movie?title='+movieTitle).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                title.textContent = data.error
            } else {
                title.innerHTML = '<b>Title: </b>'+ data.Title;
                poster.src = data.Poster;
                genre.innerHTML = '<b>Genre: </b>' +data.Genre;
                year.innerHTML = '<b>Year: </b>'+ data.Year;
                actors.innerHTML = '<b>Actors: </b>'+ data.Actors;
                director.innerHTML = '<b>Director: </b>' +data.Director;
                plot.innerHTML = '<b>Plot: </b>'+ data.Plot;
            }
        })
    }) 
    
})