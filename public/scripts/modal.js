const closeDialog = document.querySelector(".close");
const dialogElement = document.querySelector(".modal");

closeDialog.addEventListener("click", () => {
  dialogElement.close();
});

if (dialogElement.dataset.success) {
  dialogElement.showModal();
}
