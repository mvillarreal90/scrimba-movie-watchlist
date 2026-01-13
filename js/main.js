import { search } from "./api.js";
import { getMoviesHtml } from "./render.js";
import { addMovieToWatchlist } from "./storage.js";

const searchBtnEl = document.getElementById("search-btn");
const searchInputEl = document.getElementById("search-input");
const emptySearchEl = document.getElementById("empty-search");
const messageEl = document.getElementById("message");
const moviesListEl = document.getElementById("movies-list");

let moviesData = [];

function render() {
    const action = "search";
    moviesListEl.innerHTML = getMoviesHtml(moviesData, action);
}

async function searchMovie() {
    const searchData = await search(searchInputEl.value);
    if(searchData) {
        emptySearchEl.style.display = "none";
        moviesListEl.style.display = "block";
        moviesData = searchData;
        render();
    } else {
        emptySearchEl.style.display = "block";
        moviesListEl.style.display = "none";
        messageEl.textContent = `There are no results for ${searchInputEl.value}. Please try another movie.`
    }
}

function addMovie(e) {
    if (e.target.classList.contains("plus-btn")) {
        const movie = moviesData.find(m => m.imdbID === e.target.dataset.id);
        if(addMovieToWatchlist(movie)) {
            e.target.parentElement.innerHTML = `<span>Added!</span>`;
        };
    }
}

searchBtnEl.addEventListener("click", searchMovie);
moviesListEl.addEventListener("click", addMovie);