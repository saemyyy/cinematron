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
      const output = response.results[0].genres;
      console.log(output);
      movie(output);
      renderTo(response, "games.mustache", "#games");
    })
    .catch((err) => console.error(err));
}

function movie(genre) {
  const options = {
    method: "GET",
    headers: {
      cookie:
        "tmdb.prefs=%257B%2522adult%2522%253Afalse%252C%2522i18n_fallback_language%2522%253A%2522en-US%2522%252C%2522locale%2522%253A%2522de-CH%2522%252C%2522country_code%2522%253A%2522CH%2522%252C%2522timezone%2522%253A%2522Europe%252FZurich%2522%257D",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM3ZTcwYjM3MmQ3ODNkNmM4YmM5ZmJjNDQyNjI5MyIsInN1YiI6IjY1YzIwMWI2ZWZlYTdhMDE2MzUxZTYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kU8E-MDtr88wBqxZv__Wr8zHfodJBxFBG-We1uyrhPU",
      accept: "application/json",
    },
  };

  fetch(
    // `https://api.themoviedb.org/3/discover/movie?api_key=68c7e70b372d783d6c8bc9fbc4426293&include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
    `https://api.themoviedb.org/3/discover/movie?api_key=68c7e70b372d783d6c8bc9fbc4426293&include_adult=false&include_video=false&language=en-US&page=1&query=${genre}`,

    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// Function that checkes if there is a genre, input made with prompt, will be changed to be automated
function inputtest() {
  let genresInput = prompt("Insert genres separated by commas");
  if (genresInput) {
    let genres = genresInput.split(",").map((genre) => genre.trim()); // Split and trim the input genres
    let apiEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=68c7e70b372d783d6c8bc9fbc4426293&language=en-US`;

    // Send the request to the API
    fetch(apiEndpoint, {
      method: "GET", // TMDb API expects a GET request for fetching genres
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Parse the JSON from the response
      .then((data) => {
        // Log the response data
        console.log(data);

        // Check each genre from the input against the list from the API
        genres.forEach((genre) => {
          let foundGenre = data.genres.find(
            (g) => g.name.toLowerCase() === genre.toLowerCase()
          );

          if (foundGenre) {
            console.log(`Genre found: It's ${foundGenre.name}.`);
          } else {
            console.log(`Genre "${genre}" does not exist in the database.`);
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("No genres provided.");
  }
}
