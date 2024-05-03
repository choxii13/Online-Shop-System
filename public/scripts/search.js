const searchElement = document.querySelector("#search");
const searchIconElement = document.querySelector("#search-icon");
const nameValueElements = document.querySelectorAll(".js-product-item");
const nameValueElement = document.querySelectorAll(".js-product-item .name");

searchElement.addEventListener("input", () => {
  const searchVal = searchElement.value.toUpperCase();

  for (let i = 0; i < nameValueElement.length; i++) {
    const parent = nameValueElement[i].parentElement.parentElement;
    const value = nameValueElement[i].textContent.trim().toUpperCase();
    const newVal = value.slice(0, searchVal.length);

    if (searchVal.length <= 0 || searchVal === newVal) {
      parent.classList.remove("remove");
    }

    if (searchVal !== newVal) {
      parent.classList.add("remove");
    }
  }
});
