const statusElements = document.querySelectorAll(".status");
statusStyle();
export function statusStyle() {
  for (let i = 0; i < statusElements.length; i++) {
    let status = statusElements[i].textContent.trim();
    switch (status) {
      case "fulfilled":
        statusElements[i].style = "background-color:green";
        break;
      case "pending":
        statusElements[i].style = "background-color:#08cef1; color:white;";
        break;
      case "cancelled":
        statusElements[i].style = "background-color:red";
        break;
    }
  }
}
