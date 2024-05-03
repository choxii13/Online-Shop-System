const csrf = require("csurf");
const path = require("path");
const express = require("express");
const db = require("./data/database");

const app = express();

const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authStatusMiddleware = require("./middlewares/auth-status");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");

const baseRoutes = require("./routes/base-routes");
const adminRoutes = require("./routes/admin-routes");
const authRoutes = require("./routes/auth-routes");
const cartRoutes = require("./routes/cart-routes");
const orderRoutes = require("./routes/order-routes");

const expressSession = require("express-session");
const createSessionConfig = require("./config/session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(expressSession(createSessionConfig()));
app.use(express.json());

app.use(csrf());
app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware);
app.use(authStatusMiddleware);
app.use(protectRoutesMiddleware);
app.use(authRoutes);
app.use(baseRoutes);
app.use("/home", cartRoutes);
app.use("/home", orderRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandlerMiddleware.handleErrors);
app.use(errorHandlerMiddleware.status404);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed connecting the database");
  });
