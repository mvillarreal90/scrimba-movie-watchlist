import { getWatchlist } from "./storage.js";

function getMovieCard(movie, isAdded, action) {
    let movieAction = "";
    if (action === "search") {
        if (isAdded) {
            movieAction = `<span>Added!</span>`;
        }
        else {
            movieAction = `
                <button class="plus-btn" data-id=${movie.imdbID}>+</button>
                <p>Watchlist</p>
            `;
        }
    }
    else {
        movieAction = `
            <button class="remove-btn" data-id=${movie.imdbID}>-</button>
            <p>Remove</p>
        `;
    }
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
                    <div class="movie-action">
                        ${movieAction}
                    </div>
                </div>
                <div>
                    <p class="movie-plot">${movie.Plot}</p>
                </div>    
            </div>
        </div>
    `;
}

export function getMoviesHtml(moviesData, action) {
    const currentWatchlist = getWatchlist();
    const moviesHtml = moviesData.map(movie => {
        const isAdded = currentWatchlist.find(m => m.imdbID === movie.imdbID) ? true : false;
        return getMovieCard(movie, isAdded, action);
    });
    return moviesHtml.join("");
}
