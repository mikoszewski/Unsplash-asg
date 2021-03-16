import nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";
import { manyPics } from "./view.js";

const btn = document.querySelector(".button");
const image = document.getElementById("myImg");
const parag = document.querySelector(".parag");
const header = document.querySelector(".header");
const background = document.querySelector(".background");
const searchField = document.querySelector(".example");
const searchButton = document.querySelector(".fa");

const unsplash = createApi({
  accessKey: "5j4rDTmTLNT5zqvuu9AD2NKuWdfoJVQL02ZDwOmWRY8",
  fetch: nodeFetch,
});
let renderPic;

const listOfPhotos = async function () {
  const pictures = await unsplash.search.getPhotos({
    query: "beach",
    page: 1,
    perPage: 10,
    color: "green",
    orientation: "portrait",
  });

  const order = 0;
  const finalPic = pictures.response.results[order];
  const nextPic = pictures.response.results[order + 1];

  // const pic2 = await unsplash.photos.get({ photoId: "mtNweauBsMQ" });
  // console.log(finalPic);
  // console.log(finalPic.user.name);
  const date = new Date(finalPic.created_at);
  // console.log(date.toLocaleDateString());

  // console.log(pic2);
  image.setAttribute("src", finalPic.urls.small);
  // console.log(nextPic.urls.small);
  // background.insertAdjacentHTML("afterend", img(nextPic));

  parag.innerHTML = `${date.getMonth() + 1} ${date.getFullYear()}`;
  header.innerHTML = `${finalPic.user.name}`;

  renderPic = pictures.response.results[order + 1];
};

// listOfPhotos();

// btn.addEventListener("click", function () {
//   listOfPhotos2();
// });

/*
const collView = async function() {
  // const collections = await unsplash.collections.getRelated({ collectionId: 29 });
  const collList = await unsplash.collections.list({ page: 1, perPage: 10 });
};

collView();
*/

const listOfPhotos2 = async function (theme) {
  const pictures = await unsplash.search.getPhotos({
    query: `${theme}`,
    page: 1,
    perPage: 10,
    color: "green",
    orientation: "portrait",
  });

  const listOfPics = pictures.response.results;
  console.log(listOfPics);
  listOfPics.forEach(function (elem) {
    background.insertAdjacentHTML("afterend", manyPics(elem));
  });
};

// let searchResult;

// searchButton.addEventListener("click", function() {
//   // e.preventDefault();
//   console.log("a");
//   searchResult = searchField.value;
//   console.log(searchResult);
// });

//////////////HTML
/*
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
    <script type="module" defer src="script.js"></script>
    <title>Assignment 1</title>
    <style></style>
  </head>
  <body>
    <div class="background">
      <h2 class="header">Okienko</h2>
      <p1 class="parag">
        Tu będzie zdjęcie jakieś i dodatki do zdjecia jakieś.
      </p1>
      <br />
      <img
        class="modal-content"
        id="myImg"
        src=""
        style="width: 100%; max-width: 200px"
      />
      <button class="button">Modal button</button>
      <form class="example" style="margin:auto;   max-width:300px">
        <input type="text" placeholder="Search.." name="search2" />
        <button type="submit"><i class="fa"></i></button>
      </form>
    </div>
  </body>
</html>





*/
