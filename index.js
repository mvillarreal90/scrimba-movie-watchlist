//My private key
const APIkey = "5b00676d";

const searchEl = document.getElementById("search-btn");
const searchInputEl = document.getElementById("search-input");
const emptySearchEl = document.getElementById("empty-search");
const messageEl = document.getElementById("message");
const moviesListEl = document.getElementById("movies-list");

function getMoviesHtml(moviesData) {
    const htmlArray = moviesData.map(movie => {
        return `
            <div class="movie-card">
                <img class="movie-poster" src=${movie.Poster}/>
                <div class="movie-card-details">
                    <div class="movie-card-details-header">
                        <h3>${movie.Title}</h3>
                        <p><span>&starf;</span>${movie.imdbRating}</p>
                    </div>
                    <div class="movie-card-details-data">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button>+</button>
                        <p>Watchlist</p>
                    </div>
                    <div>
                        <p class="movie-plot">${movie.Plot}</p>
                    </div>    
                </div>
            </div>
        `
    })
    return htmlArray.join("");
}

async function getMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${APIkey}&i=${imdbID}`);
        const data = await response.json();
        return data;
    } catch (err) {
        alert(err);
    }
}

async function loadMovies(movies) {
    const promises = movies.map(m => getMovieDetails(m.imdbID));
    const moviesData = await Promise.all(promises);
    moviesListEl.innerHTML = getMoviesHtml(moviesData);
}

async function searchMovie() {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${APIkey}&s=${searchInputEl.value}`);
        const data = await response.json();
        if(data.Response === "False") {
            emptySearchEl.style.display = "block";
            moviesListEl.style.display = "none";
            messageEl.textContent = `There are no results for ${searchEl.value}. Please try another movie.`
        }
        else if (data.Search){  
            emptySearchEl.style.display = "none";
            moviesListEl.style.display = "block";
            loadMovies(data.Search);
        }
    } catch(err) {
        alert(err.message);
    }
}

searchEl.addEventListener("click", searchMovie);