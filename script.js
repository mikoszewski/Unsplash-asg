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
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
const image = document.getElementById("myImg");
const header2 = document.getElementById("header2");
const parag1 = document.getElementById("para1");
const searchField = document.querySelector(".input");
const searchButton = document.querySelector(".btnSearch");
const container = document.querySelector(".main--container");
const wallpaper = document.querySelector(".wall");

const unsplash = createApi({
  accessKey: "5j4rDTmTLNT5zqvuu9AD2NKuWdfoJVQL02ZDwOmWRY8",
  fetch: nodeFetch,
});

const closeModal = function () {
  modal.classList.add("hidden");
};

const openModal = function (e) {
  image.src = `${e.src}`;
  console.log(e.alt);
  header2.textContent = `${e.alt}`;
  parag1.textContent = `${e.dataset.test}`;
  modal.classList.remove("hidden");
};

let searchResult;

searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  searchResult = searchField.value;
  // console.log(searchResult);
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
  listOfPics.forEach(function (elem, index) {
    wallpaper.insertAdjacentHTML("beforeend", manyPics(elem, index));
  });
  for (let i = 0; i < listOfPics.length; i++) {
    createEventListener(document.querySelector(`.data-${i}`), openModal);
  }
};

// showModalHandler(openModal);
closeModalHandler(closeModal);
closeModalOverlayHandler(closeModal);
