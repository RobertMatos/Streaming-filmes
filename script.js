const divMovies = document.querySelector(".movies");
const divMovie = document.querySelector(".movie");
const modal = document.querySelector(".modal");
let moviesList = [];

const urlMovies =
  "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false";
const urlHighlight =
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR";
const urlVideoLink =
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR";
const urlQueryMovies =
  "https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=";

loadMovies();

function loadMovies() {
  fetch(urlMovies).then((resposta) => {
    const promiseBody = resposta.json();
    promiseBody.then((body) => {
      moviesList = body.results;
      getMoviesInfo();
    });
  });
}

function getMoviesInfo() {
  divMovies.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const movie = document.createElement("div");
    movie.classList.add("movie");
    movie.style.backgroundImage = `url(${moviesList[i].poster_path})`;

    const movie__info = document.createElement("div");
    movie__info.classList.add("movie__info");

    movie.append(movie__info);
    const movie__title = document.createElement("span");
    movie__title.classList.add("movie__title");
    movie__title.textContent = moviesList[i].title;

    const movie__rating = document.createElement("span");
    movie__rating.classList.add("movie__rating");
    movie__rating.textContent = moviesList[i].vote_average;

    const star = document.createElement("img");
    star.src = "./assets/estrela.svg";
    star.alt = "Estrela";
    movie__rating.append(star);

    movie__info.append(movie__title, movie__rating);
    divMovies.append(movie);
  }
  document.querySelectorAll(".movie").forEach((movie) => {
    movie.addEventListener("click", (event) => {
      const title = event.target.querySelector(".movie__title").textContent;
      const movieSelected = moviesList.find((movie) => movie.title === title);

      fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieSelected.id}?language=pt-BR`
      ).then((resposta) => {
        const promiseBody = resposta.json();

        promiseBody.then((body) => {
          const modal = document.querySelector(".modal");

          const modal__title = document.querySelector(".modal__title");

          modal__title.textContent = body.title;

          const modal__img = document.querySelector(".modal__img");
          modal__img.src = body.backdrop_path;

          const modal__description = document.querySelector(
            ".modal__description"
          );
          modal__description.textContent = body.overview;

          const modal__average = document.querySelector(".modal__average");
          modal__average.textContent = body.vote_average;

          const modal__genres = document.querySelector(".modal__genres");

          modal__genres.innerHTML = "";

          body.genres.forEach((genre) => {
            const genres = document.createElement("span");
            genres.classList.add("modal__genre");
            genres.textContent = genre.name;
            modal__genres.append(genres);
          });

          const modal__close = document.querySelector(".modal__close");

          modal__close.addEventListener("click", () => {
            modal.classList.add("hidden");

            return;
          });

          modal.addEventListener("click", () => {
            modal.classList.add("hidden");
            return;
          });

          modal.classList.remove("hidden");
        });
      });
    });
  });
  document.querySelector(".btn-prev").addEventListener("click", () => {
    const movies = document.querySelectorAll(".movie");

    const firstMovieTitle =
      movies[0].querySelector(".movie__title").textContent;

    const index = moviesList.findIndex(
      (movie) => movie.title === firstMovieTitle
    );

    if (index != 0) {
      let i = 5;

      movies.forEach(function (movie) {
        const movie__title = movie.querySelector(".movie__title");
        const movie__rating = movie.querySelector(".movie__rating");

        movie.style.backgroundImage = `url(${
          moviesList[index - i].poster_path
        })`;
        movie__title.textContent = moviesList[index - i].title;
        movie__rating.textContent = moviesList[index - i].vote_average;
        i--;
      });
    } else {
      let i = 5;

      movies.forEach(function (movie, index) {
        const movie__title = movie.querySelector(".movie__title");
        const movie__rating = movie.querySelector(".movie__rating");

        movie.style.backgroundImage = `url(${
          moviesList[moviesList.length - i].poster_path
        })`;
        movie__title.textContent = moviesList[moviesList.length - i].title;
        movie__rating.textContent =
          moviesList[moviesList.length - i].vote_average;
        i--;
      });
    }
  });
  document.querySelector(".btn-next").addEventListener("click", () => {
    const movies = document.querySelectorAll(".movie");

    const lastMovieTitle = movies[4].querySelector(".movie__title").textContent;

    const index = moviesList.findIndex(
      (movie) => movie.title === lastMovieTitle
    );

    if (index === moviesList.length - 1) {
      movies.forEach(function (movie, index) {
        const movie__title = movie.querySelector(".movie__title");
        const movie__rating = movie.querySelector(".movie__rating");

        movie.style.backgroundImage = `url(${moviesList[index].poster_path})`;
        movie__title.textContent = moviesList[index].title;
        movie__rating.textContent = moviesList[index].vote_average;
      });
    } else {
      let i = 1;

      movies.forEach(function (movie) {
        const movie__title = movie.querySelector(".movie__title");
        const movie__rating = movie.querySelector(".movie__rating");

        movie.style.backgroundImage = `url(${
          moviesList[index + i].poster_path
        })`;
        movie__title.textContent = moviesList[index + i].title;
        movie__rating.textContent = moviesList[index + i].vote_average;
        i++;
      });
    }
  });
}
fetch(urlHighlight).then((resposta) => {
  const promiseBody = resposta.json();

  promiseBody.then((body) => {
    const highlight__video = document.querySelector(".highlight__video");
    const highlight__title = document.querySelector(".highlight__title");
    const highlight__rating = document.querySelector(".highlight__rating");
    const highlight__genres = document.querySelector(".highlight__genres");
    const highlight__launch = document.querySelector(".highlight__launch");
    const highlight__description = document.querySelector(
      ".highlight__description"
    );

    highlight__video.style.backgroundImage = `url(${body.backdrop_path})`;
    highlight__title.textContent = body.title;
    highlight__rating.textContent = body.vote_average;
    let genres = [];
    body.genres.forEach((genre) => {
      genres.push(genre.name);
    });
    highlight__genres.textContent = genres.join(", ");
    highlight__launch.textContent = body.release_date;
    highlight__description.textContent = body.overview;
  });
});

fetch(urlVideoLink).then((resposta) => {
  const promiseBody = resposta.json();

  promiseBody.then((body) => {
    const highlight__videoLink = document.querySelector(
      ".highlight__video-link"
    );
    highlight__videoLink.href =
      "https://www.youtube.com/watch?v=" + body.results[0].key;
  });
});

document.querySelector(".input").addEventListener("keypress", (event) => {
  if (event.key !== "Enter") return;
  getMoviesInfo();
  if (!event.target.value) {
    loadMovies();
    event.target.value = "";
    return;
  }
  queryMovies(event.target.value);
  event.target.value = "";
});

function queryMovies(input) {
  fetch(urlQueryMovies + input).then((resposta) => {
    const promiseBody = resposta.json();
    promiseBody.then((body) => {
      moviesList = body.results;
      getMoviesInfo();
    });
  });
}
