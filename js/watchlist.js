import { getWatchlist, removeMovieFromWatchlist } from "./storage.js";
import { getMoviesHtml } from "./render.js";

const moviesListEl = document.getElementById("movies-list");
const emptyListEl = document.getElementById("empty-list");

function render() {
    const currentWatchlist = getWatchlist();
    if (currentWatchlist.length > 0) {
        emptyListEl.style.display = "none";
        moviesListEl.innerHTML = getMoviesHtml(currentWatchlist);
    } else {
        emptyListEl.style.display = "block";
        moviesListEl.style.display = "none";
    }
}

function removeMovie(e) {
    if (e.target.classList.contains("remove-btn")) {
        if (removeMovieFromWatchlist(e.target.dataset.id)) {
            render();
        }
    }
}

moviesListEl.addEventListener("click", removeMovie);

render();