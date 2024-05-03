export function updateOverAllPrice(responseData) {
  const overAllPrice = document.querySelector("#total-price-p");
  overAllPrice.innerHTML = `<span id="total-price-title"> Total Price: </span>
    <span id="total-price"> ₱ ${responseData.updatedCartData.newTotalPrice.toFixed(
      2
    )} </span>`;
}
