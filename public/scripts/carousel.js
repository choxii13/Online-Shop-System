const carouselItem = document.querySelectorAll(".carousel img");
const dotElements = document.querySelectorAll(".dot i");
const nextElement = document.querySelector("#next");
const beforeElement = document.querySelector("#before");

let currentIndex = 0;
let interval = setInterval(nextSlideInterval, 3000);

function currentSlide(index) {
  carouselItem.forEach((images) => {
    images.style.display = "none";
  });
  dotElementFn();
  dotElements[index].style.color = "black";
  carouselItem[index].style.display = "block";
}

function dotElementFn() {
  dotElements.forEach((dot, dotIndex) => {
    dotClickable(dot, dotIndex);
    dot.style.color = "#666666";
  });
}

function dotClickable(dot, dotIndex) {
  dot.addEventListener("click", () => {
    clearInterval(interval);
    currentIndex = dotIndex;
    currentSlide(currentIndex);
  });
}

function nextSlideInterval() {
  currentIndex = (currentIndex + 1) % carouselItem.length;
  currentSlide(currentIndex);
}

function nextSlide() {
  nextSlideInterval();
  clearInterval(interval);
}

function beforeSlide() {
  currentIndex = (currentIndex - 1 + carouselItem.length) % carouselItem.length;
  currentSlide(currentIndex);
  clearInterval(interval);
}

nextElement.addEventListener("click", nextSlide);
beforeElement.addEventListener("click", beforeSlide);

currentSlide(currentIndex);
