export function changeValueQuantity(button) {
  const classList = button.classList[2];
  const quantity = button.parentElement.querySelector(".cartQuantity");
  const quantityValue = quantity.textContent;
  let value = +quantityValue;
  if (classList === "add") {
    quantity.textContent = value += 1;
  } else {
    quantity.textContent = value -= 1;
  }
  return value;
}
