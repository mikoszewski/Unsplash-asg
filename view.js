const changeBtn = document.querySelector(".blank--btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const resultPic = document.getElementById("view");
const background = document.querySelector(".background");
const wallpaper = document.querySelector(".wall");

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
