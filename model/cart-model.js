const db = require("../data/database");
const Mongodb = require("mongodb");
class Cart {
  constructor(items = [], cartQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.cartQuantity = +cartQuantity;
    this.totalPrice = +totalPrice;
  }

  addItemToCart(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      // this.items will use loop to determine the value of the item

      // if the cartItem is already been in the this.items[]
      // will check the id of product and item

      if (item.product.id === product.id) {
        // getting the same id to get the one value of this.items[i]
        cartItem.quantity = +item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;
        this.cartQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    // additional code but using built in function, findIndex()

    // const itemIndex = this.items.findIndex((value) => value === product.id);
    // const existingId = this.items[itemIndex];
    // if (existingId) {
    //   if (existingId.product.id === product.id) {
    //     cartItem.quantity = +item.quantity + 1;
    //     cartItem.totalPrice = item.totalPrice + product.price;
    //     this.items[itemIndex] = cartItem;
    //     this.cartQuantity++;
    //     this.totalPrice += product.price;
    //     return;
    //   }
    // }

    // if cartItem is newly Added, it will go here:
    this.items.push(cartItem);
    this.cartQuantity++;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId && newQuantity > 0) {
        // getting the same id to get the one value of this.items[i]
        // here, updating cartItem by getting the item in this.item[i]
        // using spread operator
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        // here changing all the value of the cart item
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * item.product.price;

        this.items[i] = cartItem;
        this.cartQuantity = this.cartQuantity + quantityChange;
        this.totalPrice += quantityChange * item.product.price;
        // returning the updatedItemPrice to use in DOM
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.product.id === productId && newQuantity <= 0) {
        // if the quantity is less than 0, it will delete the product
        // in the dom and in this.items[]
        this.items.splice(i, 1);
        this.cartQuantity = this.cartQuantity - item.quantity;
        this.totalPrice -= item.totalPrice;
        // returning the updatedItemPrice to use in DOM
        return { updatedItemPrice: 0 };
      }
    }
  }

  static updateUserCart(userId, cart) {
    const id = new Mongodb.ObjectId(userId);
    return db
      .getDb()
      .collection("users")
      .updateOne({ _id: id }, { $set: { cart: cart } });
  }

  static getUserCart(userId) {
    const id = new Mongodb.ObjectId(userId);
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: id }, { projection: { cart: 1, _id: 0 } });
  }
}

module.exports = Cart;
