const lazyLoadingImages = document.querySelectorAll("img");

for (let i = 0; i < lazyLoadingImages.length; i++) {
  lazyLoadingImages[i].loading = "lazy";
}
