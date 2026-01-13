//My private key
const APIkey = "5b00676d";

export async function getMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${APIkey}&i=${imdbID}`);
        const data = await response.json();
        return data;
    } catch (err) {
        alert(err);
    }
}

export async function search(movieName) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${APIkey}&s=${movieName}`);
        const data = await response.json();
        if (data.Search){  
            const promises = data.Search.map(m => getMovieDetails(m.imdbID));
            const moviesData = await Promise.all(promises);
            return moviesData;
        } else {
            return false;
        }
    } catch(err) {
        alert(err.message);
        return false;
    }
}