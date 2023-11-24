let data = JSON.parse(localStorage.getItem("favouritesData"));
const fav_main = document.getElementById("fav-main");
console.log(data);

const IMG = "https://image.tmdb.org/t/p/w500/";

let removeFav = (i) => {
  console.log("hey");
  data.splice(i, 1);
  localStorage.setItem("favouritesData", JSON.stringify(data));
  fillPage();
};

function fillPage() {
  data = JSON.parse(localStorage.getItem("favouritesData"));
  fav_main.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    fav_main.innerHTML =
      fav_main.innerHTML +
      ` 
  <div class="card" id="123456">

  <div class="fav-imgs">
      <img id="favs-img" alt="Image" src="${IMG + data[i].poster_path}">
  </div>
  <div class="info">
      <h3 id="favs-title">${data[i].title}</h3>
      <div class="single-info">
          <span>Ratings:</span>
          <span id="green">10/10</span>
      </div>
      <div class="single-info">
          <span>Release Date</span>
          <span id="fav-releases">10-04-2022</span>
      </div>
  </div>
  <h3>Remove from favourite <button style="background:red" onclick="removeFav(${i})" id=x_btn>x</button></h3>
</div>
`;
  }
}

fillPage();

// const IMG = "https://image.tmdb.org/t/p/w500/";

// const favs_img = document.getElementById("favs-img");
// const favs_title = document.getElementById("favs-title");
// const rating = document.getElementById("green");
// const release_date = document.getElementById("fav-releases");

// favs_img.setAttribute("src", IMG + data.poster_path);
// favs_title.innerText = data.title;
// rating.innerHTML = data.vote_average;
// release_date.innerHTML = data.release_date;

// console.log(fav_data);
