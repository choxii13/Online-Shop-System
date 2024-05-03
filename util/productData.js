function getProductData(product) {
  const productData = {
    shortenTitle: product["product-short-title"],
    title: product["product-title"],
    price: product["product-price"],
    sellingDescription: {
      one: product["selling-description-one"],
      two: product["selling-description-two"],
      three: product["selling-description-three"],
      four: product["selling-description-four"],
    },
    productDescription: {
      one: product["product-description-one"],
      two: product["product-description-two"],
      three: product["product-description-three"],
      four: product["product-description-four"],
    },
  };
  return productData;
}

module.exports = getProductData;
