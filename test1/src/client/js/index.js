// import the movies array from the supplied data file.
import { movies } from "../data/movies.js";
// write the array to the console, so you can see that they are loading properly
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table
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
// get a list of `pinnedMovies` from local storage
// log them out so you can see that you have working pins
// if there are no pinned movies, put a message on the screen that says so
// but if there are, hide the message
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table



/* 
 *  getPinnedMoviesFromStorage
 *  This should take no parameters, and return an array.
 */
function getPinnedMoviesFromStorage() {
    return JSON.parse(localStorage.getItem("pinnedMovies")) || [];
}

/*
 *  insertMoviesIntoTable
 *  This should take two parameters,
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
function insertMoviesIntoTable(eleTable, movies) 
{
    // sort the list of movies by rating, highest to lowest
    let sortedMovies = moviesList.filter(m => m.genre !== "Drama").sort((a, b) => b.rating - a.rating);
    let tbody = eleTable.querySelector("tbody");
    tbody.innerHTML = "";
    // for each movie
        // insert a row
        sortedMovies.forEach(movie => {
            let row = tbody.insertRow();
            row.insertCell(0).textContent = movie.title;
            row.insertCell(1).textContent = movie.genre;
            row.insertCell(2).textContent = new Date(movie.release_date * 1000).toDateString();
            row.insertCell(3).textContent = movie.director;
            row.insertCell(4).textContent = movie.rating;
        // insert a cell for each attribute of a movie
        let btnCell = row.insertCell(5);
        let btn = document.createElement("button");
        let pinnedMovies = getPinnedMoviesFromStorage();
        let isPinned = pinnedMovies.some(m => m.title === movie.title);
        
        // the datetime is a "unix timestamp", measured in seconds.  
        //   javascript dates are measured in milliseconds.
        //   convert this timestamp to a javascript date and print out the date as a normal string in english
        // create a new button element
        // look in local storage to see if this item is already pinned
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
        //   if it's already pinned, make it red, otherwise make it blue
        // set the html so it shows a font-awesome icon
        //   if it's already pinned, show an x, otherwise show a pencil
        // add an event listener, when this button is clicked...
            // if it is, remove it from the list
            // it it's not, add it to the list 
            // refresh the page
        // create another table row and put the button in it
        // if a movie is rated two or below, make this row red
        if (movie.rating <= 2) row.classList.add("table-danger");
        // if this movie is rated higher than two but less than or equal to five, make this row orange
        else if (movie.rating > 2 && movie.rating <= 5) row.classList.add("table-warning");
        // if this movie is rated higher than five but less than or equal to 8, make this row blue
        else if (movie.rating > 5 && movie.rating <= 8) row.classList.add("table-info");
        // if this movie is rated higher than eight, make this row green
        else if (movie.rating > 8) row.classList.add("table-success");
    });


        
        

        // if this movie is a drama, don't add it to the list
}
