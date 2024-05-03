import { useFetch } from "./use-fetch.js";

const deleteProductButtonElements =
  document.querySelectorAll(".js-delete-item"); // for admin/products
const deleteViewItem = document.querySelector("#delete-view-item"); // for admin/product-view-item

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;
  const errorMessage = "Something went wrong - could not delete the product";
  await useFetch(
    "/admin/delete-product/" + productId + "?_csrf=" + csrfToken,
    "DELETE",
    errorMessage
  );

  if (deleteViewItem) {
    window.location.href = "/admin/all-products";
  }

  buttonElement.parentElement.parentElement.remove();
}

if (deleteProductButtonElements) {
  for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener("click", deleteProduct);
  }
}

if (deleteViewItem) {
  deleteViewItem.addEventListener("click", deleteProduct);
}
