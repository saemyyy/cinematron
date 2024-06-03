function run() {
  const standort = document.querySelector("#standort").value;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/9.0.0",
    },
  };

  fetch(
    `https://api.rawg.io/api/games?key=46583ab05364427381d8d2898c770227&search=${standort}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const output = response.results[0].genres.map((genre) => genre.name);
      console.log(output);
      movie(output); // Call the updated movie function with genres array
      // renderTo(response, "games.mustache", "#games");
    })
    .catch((err) => console.error(err));
}

function movie(genres) {
  const apiEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=68c7e70b372d783d6c8bc9fbc4426293&language=en-US`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM3ZTcwYjM3MmQ3ODNkNmM4YmM5ZmJjNDQyNjI5MyIsInN1YiI6IjY1YzIwMWI2ZWZlYTdhMDE2MzUxZTYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kU8E-MDtr88wBqxZv__Wr8zHfodJBxFBG-We1uyrhPU",
      accept: "application/json",
    },
  };

  fetch(apiEndpoint, options)
    .then((response) => response.json())
    .then((data) => {
      const foundGenreIds = [];
      genres.forEach((genre) => {
        let foundGenre = data.genres.find(
          (g) => g.name.toLowerCase() === genre.toLowerCase()
        );

        if (foundGenre) {
          console.log(
            `Genre found: It's ${foundGenre.name} and the ID is ${foundGenre.id}.`
          );
          foundGenreIds.push(foundGenre.id);
        } else {
          console.log(`Genre "${genre}" does not exist in the database.`);
        }
      });

      // Fetch movies based on found genre IDs
      fetchMoviesByGenres(foundGenreIds);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fetchMoviesByGenres(genreIds) {
  // Construct the API endpoint to fetch movies based on genre IDs
  const apiEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=68c7e70b372d783d6c8bc9fbc4426293&with_genres=${genreIds.join(
    ","
  )}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(apiEndpoint, options)
    .then((response) => response.json())
    .then((response) => {
      console.log("Movies based on found genres:", response);
      // Render the fetched movies
      renderTo(response, "movies.mustache", "#movies");
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}
