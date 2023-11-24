const API_KEY = "api_key=a1a0acd6dc5498d634e54190caa93de4";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&" +
  API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const main = document.getElementById("main");
const header = document.getElementById("header");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const movie_genre = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` 
  

    <img src="${IMG_URL + poster_path}" alt="${title}">

     <div class="movie-info">
         <h3>${title}</h3>
         <span id="${getColor(vote_average)}">${vote_average}</span>
     </div>

    <div class="overview">
    ${overview}
     </div>
 </div>`;

    main.appendChild(movieEl);

    movieEl.addEventListener("click", () => {
      localStorage.setItem("overviewData", JSON.stringify(movie));
      location.href = "../overview/index.html";
    });
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const Main_header = document.getElementById("main-header");
  const searcher = search.value;
  Main_header.innerHTML = `<div id="main-header" class="hidden">
  <div class="mySlides fade">
      <header>
          <h1>Blue Beetle</h1>
          <h3>"Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home
              is
              not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime
              unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab."</h3>

      </header>
  </div>

  <div class="mySlides fade">
      <header id="header-2">

          <h1>Elemental</h1>
          <h3>"In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common."</h3>

      </header>
  </div>
  <div class="mySlides fade">
      <header id="header-3">

          <h1>Spiderman: No way home</h1>
          <h3>
              Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.
               </h3>

      </header>
  </div>

  <div class="mySlides fade">
      <header id="header-4">

          <h1>PAW Patrol: The Mighty Movie</h1>
          <h3>A magical meteor crash-lands in Adventure City, gives the PAW Patrol pups superpowers, and transforms them into The Mighty Pups. When the Patrol's archrival Humdinger breaks out of jail and teams up with mad scientist Victoria Vance to steal the powers for themselves, the Mighty Pups must save Adventure City and stop the supervillains before it's too late.
          </h3>

      </header>
  </div>

  <div class="mySlides fade">
      <header id="header-5">

          <h1>After Everything</h1>
          <h3>Besieged by writer's block and the crushing breakup with Tessa, Hardin travels to Portugal in search of a woman he wronged in the past - and to find himself. Hoping to win back Tessa, he realizes he needs to change his ways before he can make the ultimate commitment.</h3>
      </header>
  </div>

  <div class="mySlides fade">
      <header id="header-6">

          <h1>Thor: Love and Thunder</h1>
          <h3>After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher's vengeance and stop him before it's too late.</h3>

      </header>
  </div>
</div>`;

  if (searcher) {
    getMovies(searchURL + "&query=" + searcher);
  }
});

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000);
}
