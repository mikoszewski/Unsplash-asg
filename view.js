const changeBtn = document.querySelector(".blank--btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const resultPic = document.getElementById("view");
const background = document.querySelector(".background");
const wallpaper = document.querySelector(".wall");

///wersja doa Zadanie UNPLASH
// export const manyPics = function (data) {
//   const date = new Date(data.created_at);

//   return `
//     <div class="row">
//       <li class="list">
//         <img
//           class="column"
//           id="myImg"
//           src="${data.urls.small}"
//           style="width: 100%; max-width: 500px"
//         />
//         <div>
//         <h3 class="preview"> ${date.getMonth() + 1} ${date.getFullYear()}<br>${
//     data.user.name
//   }</h3>
//         </div>
//       </li>
//     </div>`;
// };

// export const manyPics = function (data) {
//   const date = new Date(data.created_at);

//   return `
//     <div class="row">
//       <div class="column">
//         <img src="${data.urls.small}">
//       </div>
//     </div>`;
// };

export const manyPics = function (data, index) {
  const date = new Date(data.created_at);

  return `<div class="responsive">
          <div class="gallery data-${index}">
              <img id="view" src="${data.urls.small}" alt="${
    data.user.name
  }"  width="600" height="400" data-test="${
    "0" + (date.getMonth() + 1)
  } ${date.getFullYear()}">
        </div>`;
};

export const showModalHandler = function (handler) {
  changeBtn.addEventListener("click", handler);
};
export const closeModalHandler = function (handler) {
  btnCloseModal.addEventListener("click", handler);
};

export const closeModalOverlayHandler = function (handler) {
  overlay.addEventListener("click", handler);
};
export const imageHandler = function (handler) {
  createEventListener.addEventListener("click", handler);
};

export const createEventListener = function (element, handler) {
  console.log(element);
  if (element) {
    element.addEventListener("click", function (e) {
      console.log(e.target);
      handler(e.target);
      // handler(e.t);
    });
  } else {
    console.log("fail");
  }
};
