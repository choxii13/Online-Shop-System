const User = require("../model/user-model");
const objVal = require("../util/objectDestructure");
const sessionFlash = require("../util/sessionFlash");
const { userDetailsAreValid } = require("../util/validation");
const sessionAuth = require("../util/sessionAuth");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = sessionFlash.defaultData();
  }

  res.render("./customer/signup", {
    inputData: sessionData,
  });
}

async function signup(req, res, next) {
  const { _csrf, email, password, ...enteredData } = req.body;
  const enteredDataValue = objVal(enteredData, (value) => value);

  let user;
  let hasSameEmail;

  try {
    user = new User(email, password, ...enteredDataValue);
    hasSameEmail = await user.alreadyExists();
  } catch (error) {
    next(error);
    return;
  }

  const userError = userDetailsAreValid(
    hasSameEmail,
    email,
    password,
    ...enteredDataValue
  );
  const isValid = objVal(userError, (value) => value === "" || !value);

  if (isValid.some((data) => data === false) || hasSameEmail) {
    sessionFlash.flashDataToSession(
      req,
      res,
      {
        errorMessage: userError,
        successMessage: "",
        email,
        password,
        ...enteredData,
      },
      "/signup"
    );
    return;
  }

  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  sessionFlash.flashDataToSession(
    req,
    res,
    {
      ...sessionFlash.defaultData(),
      successMessage: "Signup Successfully",
    },
    "/signup"
  );
}

function getSignin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      errorMessage: "",
      successMessage: "",
      email: "",
      password: "",
    };
  }

  res.render("./customer/signin", { inputData: sessionData });
}

async function signin(req, res, next) {
  const { email, password } = req.body;

  let existingUser;
  let passwordIsCorrect;
  let user;

  try {
    user = new User(email, password);
    existingUser = await user.getUserWithSameEmail();
    if (existingUser) {
      passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
    }
  } catch (error) {
    next(error);
  }

  if (!passwordIsCorrect || !existingUser) {
    const userError = userDetailsAreValid(
      existingUser,
      email,
      passwordIsCorrect
    );

    sessionFlash.flashDataToSession(
      req,
      res,
      {
        errorMessage: userError,
        successMessage: "",
        email: email,
        password: password,
      },
      "/signin"
    );
    return;
  }

  sessionAuth.sessionAuth(req, res, existingUser, "/");
}

function logout(req, res) {
  sessionAuth.removeAuth(req);
  res.redirect("/signin");
}

module.exports = {
  getSignin: getSignin,
  getSignup: getSignup,
  signin: signin,
  signup: signup,
  logout: logout,
};
