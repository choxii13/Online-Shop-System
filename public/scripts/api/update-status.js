import { statusStyle } from "../status-style.js";
import { useFetch } from "./use-fetch.js";

const updateOrderFormElements = document.querySelectorAll(
  ".order-actions form"
);

statusStyle();

async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;
  const formAllData = new FormData(form);
  const formData = Object.fromEntries(formAllData);
  const errorMessage = "Something went wrong - could not update order status.";

  const responseData = await useFetch(
    `/admin/orders/${formData.orderid}`,
    "PATCH",
    errorMessage,
    {
      newStatus: formData.status,
      _csrf: formData._csrf,
    }
  );

  form.parentElement.parentElement.querySelector(".status").textContent =
    responseData.newStatus;
  statusStyle();
}

for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener("submit", updateOrder);
}
