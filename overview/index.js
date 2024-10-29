let data = JSON.parse(localStorage.getItem("overviewData"));

const IMG_URL = "https://image.tmdb.org/t/p/w500/";

const overview_img = document.getElementById("overview_img");
const preview_title = document.getElementById("preview-title");
const overview_text = document.getElementById("overview-text");
const overview_title = document.getElementById("overview-title");
const ratings = document.getElementById("green");
const Date_Released = document.getElementById("released");
const button = document.getElementById("fav-button");
overview_img.setAttribute("src", IMG_URL + data.poster_path);
overview_text.innerText = data.overview;
overview_title.innerText = data.title;
preview_title.innerText = data.title;
ratings.innerText = data.vote_average;
Date_Released.innerText = data.release_date;

button.addEventListener("click", () => {
  let newArr = [];
  if (localStorage.getItem("favouritesData")) {
    newArr = JSON.parse(localStorage.getItem("favouritesData"));
  }
  newArr.push(data);
  localStorage.setItem("favouritesData", JSON.stringify(newArr));
  location.href = "../Favourites/favourites.html";
});

console.log(data);
