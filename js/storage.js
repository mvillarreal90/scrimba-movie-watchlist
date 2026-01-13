
export function getWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
}

export function addMovieToWatchlist(movie) {
    const currentWatchlist = getWatchlist();
    if (currentWatchlist.find(m => m.imdbID === movie.imdbID)) {
        alert("Movie already added to watchlist");
        return false;
    }
    else {
        currentWatchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(currentWatchlist));
        return true;
    }
}

export function removeMovieFromWatchlist(movieId) {
    const currentWatchlist = getWatchlist();
    const movieToRemove = currentWatchlist.find(m => m.imdbID === movieId);
    if (movieToRemove) {
        const index = currentWatchlist.indexOf(movieToRemove);
        currentWatchlist.splice(index, 1);
        localStorage.setItem("watchlist", JSON.stringify(currentWatchlist));
        return true;
    }
    else {
        alert("This movie is not in your watchlist.")
        return false;
    }
}