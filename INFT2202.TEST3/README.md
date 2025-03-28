# Test 3: A Full Stack example.

---
-   **Time Alotted:** 1h 50m
-   **Weight:** 10% of your overall grade.
-   **Read all of the instructions carefully before beginning.**
---

### General Information

Create a page based on the movie data provided.

Be sure to read all of the files that have been included.  You should not need any other files or assets to finish this test.  Comment your code thoroughly.

### Server Side

You are to set up a very simple web server using the express library.  
It is not installed by default, so you will have to do that.
Install nodemon as a dev dependency, and configure an npm script that uses it to run your server.
Look in `src/server/app.js` and follow the comments.

-   Create a new route
    -   Using the GET method, have it respond to the url `/api/movies`
    -   Import the datafile included
    -   Check for a parameter called `rating`.  
        -   If it exists, check that it's a number between 1 and 10.  
        -   If it exists but isn't in range, send an error code and a message that that should be shown in the front end.
        -   If it exists and it is in range, `filter` out any records that have a rating of that number or above.
    -   Check for a parameter called `genre`.
        -   If it exists, find out if there are any records in the dataset that are in that genre, it should ignore case.
    -   If any or all of the above parameters are passed in the request, return the filtered array.  Otherwise return the entire array.
        -   In either case, sort the array from highest rated to lowest rated.
    -   You should test this endpoint with postman.  Ensure the proper responses get sent and check that your error handling is correct.


### Client Side

-   The HTML is complete.  You should not make any changes to this file.
-   Create the functions described in `index.js`.
-   Use js to change the footer so that it includes your full name, and the current year.  Use the Date class to do it.
-   When either the genre or ratings dropdown is changed, call `fetchMovies` with whatever is selected in both boxes.
    -   If there are any movies in the response, call the `insertMoviesIntoTable` function to re-draw the table.
    -   If there are no movies in the response, hide the table and show an error message saying there are no movies that match your selected filters.
    -   If the call fails, or returns something other than a 2xx code, you should `catch` the error and display a message on the page describing the issue.
