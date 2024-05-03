const cartBadgeElements = document.querySelectorAll(".quantity");

export function cartBadge(totalItem) {
  for (let i = 0; i < cartBadgeElements.length; i++) {
    cartBadgeElements[i].textContent = totalItem;
  }
}
