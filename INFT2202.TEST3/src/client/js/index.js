// Follow the README.md to set up the rest of this file.

document.addEventListener("DOMContentLoaded", () => {
    const genreSelect = document.getElementById("genre-selector");
    const ratingSelect = document.getElementById("rating-selector");
    const table = document.querySelector("table");
    const alertBox = document.querySelector(".alert");
    const tbody = table.querySelector("tbody");

    genreSelect.addEventListener("change", updateMovies);
    ratingSelect.addEventListener("change", updateMovies);

    updateMovies(); // Load movies on page load

    async function updateMovies() {
        const genre = genreSelect.value;
        const rating = ratingSelect.value;

        try {
            const movies = await fetchMovies(genre, rating);

            // Show/hide based on movie count
            if (movies.length === 0) {
                table.classList.add("d-none");
                alertBox.classList.remove("d-none");
            } else {
                table.classList.remove("d-none");
                alertBox.classList.add("d-none");
                insertMoviesIntoTable(tbody, movies);
            }
        } catch (err) {
            console.error("Error fetching movies:", err.message);
            alertBox.classList.remove("d-none");
            table.classList.add("d-none");
        }
    }
});

/*
 *  fetchMovies
 *  Uses URLSearchParams, URL, Headers, and Request.
 */
async function fetchMovies(genre = null, rating = null) {
    const url = new URL("/api/movies", window.location.origin);
    const params = new URLSearchParams();

    if (genre) params.append("genre", genre);
    if (rating) params.append("rating", rating);

    url.search = params.toString();

    const headers = new Headers({
        "Accept": "application/json"
    });

    const request = new Request(url, {
        method: "GET",
        headers: headers
    });

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

/*
 *  insertMoviesIntoTable
 *  Populates <tbody> with movie rows.
 */
function insertMoviesIntoTable(tbody, movies) {
    tbody.innerHTML = ""; // Clear previous results

    // Create an array to hold movie data along with the color class
    let movieData = movies.map(movie => {
        let colorClass = '';
        const rating = parseFloat(movie.rating);

        if (rating <= 2) colorClass = "table-danger"; // Red
        else if (rating > 2 && rating <= 5) colorClass = "table-warning"; // Orange
        else if (rating > 5 && rating <= 8) colorClass = "table-info"; // Blue
        else if (rating > 8) colorClass = "table-success"; // Green

        return { movie, colorClass };
    });

    // Sort movies by color class or any other criteria
    movieData.sort((a, b) => a.colorClass.localeCompare(b.colorClass));

    // Insert sorted movies into the table
    movieData.forEach(({ movie, colorClass }) => {
        const row = tbody.insertRow();

        // Insert cells for movie attributes
        const titleCell = row.insertCell();
        const genreCell = row.insertCell();
        const yearCell = row.insertCell();
        const directorCell = row.insertCell();
        const ratingCell = row.insertCell();

        titleCell.textContent = movie.title;
        genreCell.textContent = movie.genre;

        // Convert release_date (Unix timestamp) to readable date
        const releaseDate = new Date(movie.release_date * 1000);
        yearCell.textContent = releaseDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        directorCell.textContent = movie.director;
        ratingCell.textContent = movie.rating;

        // Apply row color based on rating
        row.classList.add(colorClass);
    });
}
