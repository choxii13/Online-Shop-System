function sessionAuth(req, res, existingUser, redirectTo) {
  req.session.uid = existingUser._id.toString();
  req.session.isAdmin = existingUser.isAdmin;
  req.session.save(function () {
    res.redirect(redirectTo);
  });
}

function removeAuth(req) {
  req.session.uid = null;
  req.session.isAdmin = null;
  req.session.isAuth = null;
}

module.exports = { sessionAuth: sessionAuth, removeAuth: removeAuth };
