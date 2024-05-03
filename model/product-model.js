const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.shortenTitle = productData.shortenTitle;
    this.title = productData.title;
    this.price = +productData.price;
    this.sellingDescription = productData.sellingDescription;
    this.productDescription = productData.productDescription;
    this.image = productData.image;

    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      shortenTitle: this.shortenTitle,
      title: this.title,
      price: this.price,
      sellingDescription: this.sellingDescription,
      productDescription: this.productDescription,
      image: this.image,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db.getDb().collection("products").updateOne(
        { _id: productId },
        {
          $set: productData,
        }
      );
    } else {
      const data = await db
        .getDb()
        .collection("products")
        .insertOne(productData);
      return data.insertedId;
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map((productDocument) => {
      return new Product(productDocument);
    });
  }

  static async findById(productId) {
    let prodId;

    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Could not find product with provided id");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
