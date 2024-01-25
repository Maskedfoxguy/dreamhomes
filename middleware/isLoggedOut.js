  // if an already logged in user tries to access the login page it
    // redirects the user to the home page


module.exports = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect("/");
    }
    next();
  };

  