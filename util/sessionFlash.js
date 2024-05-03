function getSessionData(req) {
  const sessionData = req.session.flashedData;
  req.session.flashedData = null;
  return sessionData;
}

function flashDataToSession(req, res, data, redirectTo) {
  req.session.flashedData = data;
  req.session.save(function () {
    return res.redirect(redirectTo);
  });
}

function defaultData() {
  const userData = {
    fullname: "",
    email: "",
    street: "",
    city: "",
    ["postal-code"]: "",
    password: "",
    ["new-password"]: "",
  };

  return {
    errorMessage: userData,
    successMessage: "",
    ...userData,
  };
}

module.exports = {
  getSessionData,
  flashDataToSession,
  defaultData,
};
