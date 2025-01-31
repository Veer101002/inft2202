import { movies } from "../data/movies.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log(movies);
    
    const allMoviesTable = document.querySelector("#all-movies-container table");
    const pinnedMoviesTable = document.querySelector("#pinned-movies-container table");
    
    let pinnedMovies = getPinnedMoviesFromStorage();
    console.log(pinnedMovies);
    
    if (pinnedMovies.length === 0) {
        document.querySelector("#pinned-movies-container .alert").classList.remove("d-none");
    } else {
        document.querySelector("#pinned-movies-container .alert").classList.add("d-none");
        pinnedMoviesTable.classList.remove("d-none");
        insertMoviesIntoTable(pinnedMoviesTable, pinnedMovies);
    }
    
    if (movies.length === 0) {
        document.querySelector("#all-movies-container .alert").classList.remove("d-none");
    } else {
        document.querySelector("#all-movies-container .alert").classList.add("d-none");
        allMoviesTable.classList.remove("d-none");
        insertMoviesIntoTable(allMoviesTable, movies);
    }
});

function getPinnedMoviesFromStorage() {
    return JSON.parse(localStorage.getItem("pinnedMovies")) || [];
}

function insertMoviesIntoTable(eleTable, moviesList) {
    let sortedMovies = moviesList.filter(m => m.genre !== "Drama").sort((a, b) => b.rating - a.rating);
    let tbody = eleTable.querySelector("tbody");
    tbody.innerHTML = "";
    
    sortedMovies.forEach(movie => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = movie.title;
        row.insertCell(1).textContent = movie.genre;
        row.insertCell(2).textContent = new Date(movie.release_date * 1000).toDateString();
        row.insertCell(3).textContent = movie.director;
        row.insertCell(4).textContent = movie.rating;
        
        let btnCell = row.insertCell(5);
        let btn = document.createElement("button");
        let pinnedMovies = getPinnedMoviesFromStorage();
        let isPinned = pinnedMovies.some(m => m.title === movie.title);
        
        btn.classList.add("btn", isPinned ? "btn-danger" : "btn-primary");
        btn.innerHTML = `<i class="fa ${isPinned ? "fa-times" : "fa-pencil"}"></i>`;
        btn.addEventListener("click", () => {
            let updatedPinnedMovies = getPinnedMoviesFromStorage();
            if (isPinned) {
                updatedPinnedMovies = updatedPinnedMovies.filter(m => m.title !== movie.title);
            } else {
                updatedPinnedMovies.push(movie);
            }
            localStorage.setItem("pinnedMovies", JSON.stringify(updatedPinnedMovies));
            location.reload();
        });
        btnCell.appendChild(btn);
        
        if (movie.rating <= 2) row.classList.add("table-danger");
        else if (movie.rating > 2 && movie.rating <= 5) row.classList.add("table-warning");
        else if (movie.rating > 5 && movie.rating <= 8) row.classList.add("table-info");
        else if (movie.rating > 8) row.classList.add("table-success");
    });
}
