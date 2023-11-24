const API_KEY = "api_key=a1a0acd6dc5498d634e54190caa93de4";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&" +
  API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const main = document.getElementById("main");
const form = document.getElementById("forms");
const search = document.getElementById("search");
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const genre = [
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
const tags = document.getElementById("tags");

let selected_Genre = [];

SetGenre();
function SetGenre() {
  tags.innerHTML = "";
  genre.forEach((genre) => {
    const x = document.createElement("div");
    x.classList.add("tag");
    x.id = genre.id;
    x.innerText = genre.name;
    x.addEventListener("click", () => {
      if (selected_Genre.length == 0) {
        selected_Genre.push(genre.id);
      } else {
        if (selected_Genre.includes(genre.id)) {
          selected_Genre.forEach((id, idx) => {
            if (id == genre.id) {
              selected_Genre.splice(idx, 1);
            }
          });
        } else {
          selected_Genre.push(genre.id);
        }
      }
      console.log(selected_Genre);
      getMovies(
        API_URL + "&with_genres=" + encodeURI(selected_Genre.join(","))
      );
      highlight_tags();
    });
    tags.append(x);
  });
}

function highlight_tags() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  clearBtn();
  if (selected_Genre.length != 0) {
    selected_Genre.forEach((id) => {
      const highlighted_tags = document.getElementById(id);
      highlighted_tags.classList.add("highlight");
    });
  }
}

function clearBtn() {
  let clearBtn = document.getElementById("clear");
  if (clearBtn) {
  } else {
    let clear = document.createElement("div");
    clear.id = "clear";
    clear.innerHTML = `<Button class="clear_btn">Clear genres(x)</Button>`;
    clear.addEventListener("click", () => {
      selected_Genre = [];
      SetGenre();
      getMovies(API_URL);
    });
    tags.append(clear);
  }
}

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        main.innerHTML = `<h1 class="no-results">No Results Found...</h1>`;
      }
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
  const searcher = search.value;
  selected_Genre = [];
  SetGenre();
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
