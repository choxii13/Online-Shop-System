const mongoDbStore = require("connect-mongodb-session");
const expressSession = require("express-session");
function createSessionStore() {
  const MongoDbStore = mongoDbStore(expressSession);
  const store = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "choxxi-shop",
    collection: "sessions",
  });
  return store;
}

function createSessionConfig() {
  return {
    secret: "super-secret",
    resave: true,
    saveUninitialized: true,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
