const inputContainerElements = document.querySelectorAll(".input-container");
const iconDesign = ["bi", "bi-exclamation-circle-fill", "error"];

for (const inputContainerElement of inputContainerElements) {
  const errorMessage = inputContainerElement.dataset.error;
  const inputElement = inputContainerElement.querySelector("input");
  removingError(inputElement);
  if (errorMessage) {
    const icon = document.createElement("i");
    const para = document.createElement("p");
    para.textContent = errorMessage;
    para.classList.add("error");

    for (const iconDes of iconDesign) {
      icon.classList.add(iconDes);
    }

    inputContainerElement.appendChild(icon);
    inputContainerElement.after(para);
  }
}

function removingError(inputElement) {
  inputElement.addEventListener("input", () => {
    const errorIcon = inputElement.parentElement.children[3];
    if (errorIcon) {
      inputElement.parentElement.parentElement.removeChild(
        inputElement.parentElement.nextSibling
      );
      inputElement.parentElement.removeChild(errorIcon);
    }
  });
}
