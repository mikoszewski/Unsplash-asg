"use strict";

import nodeFetch from "./node_modules/node-fetch";

import { createApi } from "./node_modules/unsplash-js";
import { closeModalHandler } from "./view.js";
import { manyPics } from "./view.js";
import { createEventListener } from "./view.js";

const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
// const example = document.querySelector(".example");
const image = document.getElementById("myImg");
const header2 = document.getElementById("header2");
const parag1 = document.getElementById("para1");
// const searchField = document.querySelector(".input");
const searchField = document.querySelector(".example");
const searchButton = document.querySelector(".btnSearch");
const container = document.querySelector(".main--container");
const wallpaper = document.querySelector(".wall");
const secondSearch = document.getElementById("secondSearch");
// const searchFields = document.querySelectorAll(".search--field");

let searchResult;

const unsplash = createApi({
  accessKey: "5j4rDTmTLNT5zqvuu9AD2NKuWdfoJVQL02ZDwOmWRY8",
  fetch: nodeFetch,
});

const closeModal = function () {
  modal.classList.add("hidden");
};

const openModal = function (e) {
  image.src = `${e.src}`;
  // console.log(e.alt);
  header2.textContent = `${e.alt}`;
  parag1.textContent = `${e.dataset.test}`;
  modal.classList.remove("hidden");
};

const loadWord = function () {
  searchResult = searchField.value;
  container.innerHTML = "";
  document.body.style.backgroundImage = "url()";
  secondSearch.classList.remove("hidden");
  listOfPhotos2(searchResult);
};

const loadWord2 = function () {
  searchResult = secondSearch.value;
  container.innerHTML = "";
  document.body.style.backgroundImage = "url()";
  const loadedPage = document.querySelectorAll(".responsive");
  loadedPage.forEach(function (ele) {
    ele.innerHTML = "";
  });
  secondSearch.classList.remove("hidden");
  listOfPhotos2(searchResult);
};

//Submit word with SearchButton - currently non activ
// searchButton.addEventListener("click", async function (e) {
//   e.preventDefault();
//   loadWord();
// });

// searchFields.forEach((item) => {
//   item.addEventListener("keyup", function (e) {
//     // console.log(e);
//     // e.preventDefault();
//     if (e.keyCode === 13 && searchField.selectionStart > 0) {
//       e.preventDefault();
//       console.log("olo");
//       loadWord();
//       item.value = "";
//     }
//   });
// });

// Event listener for first page
searchField.addEventListener("keyup", function (e) {
  // console.log(e);
  // e.preventDefault();
  if (e.key === "Enter" && searchField.selectionStart > 0) {
    e.preventDefault();
    loadWord();
    searchField.value = "";
  }
});

//Event listener for second page search field
secondSearch.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && secondSearch.selectionStart > 0) {
    e.preventDefault();
    loadWord2();
    secondSearch.value = "";
  }
});

const listOfPhotos2 = async function (theme) {
  try {
    //ściaga max 10 także zakładam ze nie bedzie nigdy na stronie więcej niz 10,
    const pictures = await unsplash.search.getPhotos({
      query: `${theme}`,
      page: 1,
      perPage: 10,
      // orientation: "portrait",
    });

    const listOfPics = pictures.response.results;

    if (!(listOfPics.length === 0)) {
      listOfPics.forEach(function (elem, index) {
        wallpaper.insertAdjacentHTML("beforeend", manyPics(elem, index));
      });
      for (let i = 0; i < listOfPics.length; i++) {
        createEventListener(document.querySelector(`.data-${i}`), openModal);
      }
    } else {
      alert("No pics found for given word. Please choose another one.");
    }
  } catch (err) {
    alert(err);
  }
};

// showModalHandler(openModal);
closeModalHandler(closeModal);
// closeModalOverlayHandler(closeModal);
