const bcrypt = require("bcryptjs");
const db = require("../data/database");
const mongodb = require("mongodb");

class User {
  constructor(
    email,
    password,
    fullname,
    street,
    city,
    postalCode,
    confirmPassword
  ) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      city: city,
      postalCode: postalCode,
    };
    this.confirmPassword = confirmPassword;
  }

  static async findById(userId) {
    const uid = new mongodb.ObjectId(userId);
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0, cart: 0 } });
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async alreadyExists() {
    const alreadyExists = await this.getUserWithSameEmail();
    if (alreadyExists) {
      return true;
    }
    return false;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db
      .getDb()
      .collection("users")
      .insertOne({
        email: this.email,
        name: this.name,
        street: this.address,
        password: hashedPassword,
        cart: { items: [], cartQuantity: 0, totalPrice: 0 },
      });
  }

  async hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
