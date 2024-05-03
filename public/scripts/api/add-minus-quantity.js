import { cartBadge } from "./elements/cart-badge.js";
import { updateOverAllPrice } from "./elements/updateOverAllPrice.js";
import { updateTotalPrice } from "./elements/updateTotalPrice.js";
import { changeValueQuantity } from "./elements/changeValueQuantity.js";
import { useFetch } from "./use-fetch.js";

const addQuantityElements = document.querySelectorAll(".add");
const minusQuantityElements = document.querySelectorAll(".minus");

async function updatePrice(event) {
  const button = event.target;
  const quantity = changeValueQuantity(button);
  const trParent = button.parentElement.parentElement.parentElement;
  const csrfToken = trParent.dataset.csrf;
  const productId = trParent.dataset.productid;
  const errorMessage =
    "Something went wrong - could not add/substract the product quantity";

  const responseData = await useFetch(
    "/home/shopping-cart",
    "PATCH",
    errorMessage,
    {
      productId: productId,
      quantity: quantity,
      _csrf: csrfToken,
    }
  );

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    trParent.remove();
  }

  updateTotalPrice(trParent, responseData);
  updateOverAllPrice(responseData);
  cartBadge(responseData.updatedCartData.newTotalQuantity);
}

for (const addQuantityElement of addQuantityElements) {
  addQuantityElement.addEventListener("click", updatePrice);
}

for (const minusQuantityElement of minusQuantityElements) {
  minusQuantityElement.addEventListener("click", updatePrice);
}
