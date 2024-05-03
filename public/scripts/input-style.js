const inputElements = document.querySelectorAll(".input-container input");
const defaultDesignStyle = `top: -9px; font-size: 0.6rem; padding:0  5px;  margin-left: 0`;
const animationStyleFocus = `animation: toInputText 0.3s;`;
const animationStyleFocusOut = `animation: toOutputText 0.3s;`;

for (i = 0; i < inputElements.length; i++) {
  if (labelDesign(inputElements[i])) {
    labelDesign(inputElements[i]);
  } else {
    labelDesign(inputElements[i]).style = animationStyleFocusOut;
  }
}

function inputAnimation(event) {
  const input = event.target;
  labelDesign(input);
  labelDesign(input).style = `${animationStyleFocus} ${defaultDesignStyle}`;
}

function inputDesign(event) {
  const input = event.target;
  labelDesign(input);
  labelDesign(input).style = animationStyleFocusOut;
}

for (const inputElement of inputElements) {
  inputElement.addEventListener("focusin", inputAnimation);
}

for (const inputElement of inputElements) {
  inputElement.addEventListener("focusout", inputDesign);
}

function labelDesign(input) {
  const labelElement = input.parentElement.querySelector("label");
  if (input.value !== "") {
    return (labelElement.style = defaultDesignStyle);
  }

  return labelElement;
}
