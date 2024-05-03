const mobileButtonElement = document.querySelector("#mobile-menu-button");
const curtainMenuElement = document.querySelector("#close-curtain-menu");

mobileButtonElement.addEventListener("click", () => {
  document.getElementById("myNav").style.width = "100%";
});

curtainMenuElement.addEventListener("click", () => {
  document.getElementById("myNav").style.width = "0%";
});
