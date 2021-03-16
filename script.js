"use strict";

import nodeFetch from "./node_modules/node-fetch";

import { createApi } from "./node_modules/unsplash-js";
import { showModalHandler } from "./view.js";
import { imageHandler } from "./view.js";
import { closeModalHandler } from "./view.js";
import { closeModalOverlayHandler } from "./view.js";
import { manyPics } from "./view.js";
import { createEventListener } from "./view.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
const image = document.getElementById("myImg");
const header2 = document.getElementById("header2");
const parag1 = document.getElementById("para1");
const searchField = document.querySelector(".input");
const searchButton = document.querySelector(".btnSearch");
const container = document.querySelector(".main--container");
const changeBtn = document.querySelector(".blank--btn");
const background = document.querySelector(".background");
const resultPic = document.getElementById("view");
const wallpaper = document.querySelector(".wall");

const unsplash = createApi({
  accessKey: "5j4rDTmTLNT5zqvuu9AD2NKuWdfoJVQL02ZDwOmWRY8",
  fetch: nodeFetch,
});

const closeModal = function () {
  modal.classList.add("hidden");
  // overlay.classList.add("hidden");
};

const openModal = function (e) {
  image.src = `${e.src}`;
  console.log(e.alt);
  header2.textContent = `${e.alt}`;
  parag1.textContent = `${e.dataset.test}`;
  modal.classList.remove("hidden");
  // overlay.classList.remove("hidden");
};

// btnCloseModal.addEventListener("click", closeModal);

// overlay.addEventListener("click", closeModal);

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
//     return response.json();
//   });
// };

const country = async function () {
  const data = await fetch(
    `https://restcountries.eu/rest/v2/name/${searchResult}`
  );
  const details = await data.json();

  background.insertAdjacentHTML("afterend", manyPics(details[0]));
};

btnOpenModal.addEventListener("click", country);

let searchResult;

searchButton.addEventListener("click", async function (e) {
  console.log("asasasasasas");
  e.preventDefault();
  searchResult = searchField.value;
  console.log(searchResult);
  container.innerHTML = "";
  document.body.style.backgroundImage = "url()";
  listOfPhotos2(searchResult);
});

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
  listOfPics.forEach(function (elem, index) {
    wallpaper.insertAdjacentHTML("beforeend", manyPics(elem, index));
  });
  console.log(listOfPics.length);
  for (let i = 0; i < listOfPics.length; i++) {
    createEventListener(document.querySelector(`.data-${i}`), openModal);
  }
};

// showModalHandler(openModal);
closeModalHandler(closeModal);
closeModalOverlayHandler(closeModal);
