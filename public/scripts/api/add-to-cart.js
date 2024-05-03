import { cartBadge } from "./elements/cart-badge.js";
import { useFetch } from "./use-fetch.js";
const addToCartButtonElements = document.querySelectorAll(".js-add-to-cart");
const addToCartButtonElement = document.querySelector("#js-add-to-cart");

async function addToCart(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;
  const errorMessage = "Something went wrong - could not add the product";

  const responseData = await useFetch(
    "/home/shopping-cart",
    "POST",
    errorMessage,
    {
      productId: productId,
      _csrf: csrfToken,
    }
  );

  cartBadge(responseData.newTotalItems);
}

if (addToCartButtonElements) {
  for (const addToCartButtonElement of addToCartButtonElements) {
    addToCartButtonElement.addEventListener("click", addToCart);
  }
}

if (addToCartButtonElement) {
  addToCartButtonElement.addEventListener("click", addToCart);
}
