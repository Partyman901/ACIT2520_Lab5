/*
 Authors:
Steven Nguyen A01082759
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let moviesList = []

app.get("/", (req, res) => res.render("pages/index", { movies: moviesList }));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  console.log("entered this function")
  // Add your implementation here 
  let movieData = req.body
  let movies = movieData.movies.split(',')
  for (movie of movies) {
    moviesList.push(movie);
  }
  console.log(movies);
  res.redirect("/");
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  console.log("Entered this function!")
  let queryList = [];
  for (let query in req.query) {
    queryList.push(req.query[query]);
  }
  moviesList = queryList;
  res.redirect("/");
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let mySearch = req.params.movieName;
  fs.readFile("./movieDescriptions.txt", "utf8", (err, file) => {
    if (err) {
      console.log(err);
    } else {
      const lines = file.split("\n");
      for (line of lines) {
        let [name, description] = line.split(":");
        if (name.toUpperCase() == mySearch.toUpperCase()) {
          res.render("pages/searchResult", { mySearch, description })
          return;
        };
      };
      res.render("pages/searchResult", { mySearch: null, description: "Movie not found"
      });
    };
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});