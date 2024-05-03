export function updateTotalPrice(element, responseData) {
  element.querySelector(".total-price").textContent =
    "₱ " + responseData.updatedCartData.updatedItemPrice.toFixed(2);
}
