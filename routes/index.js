const router = require("express").Router();

router.get("/", (req, res) => {
  // if the user is logged in go to the library
  if (req.session.isLoggedIn) {
    return res.redirect("/videos");
  }

  // if the user has logged in before
  if (req.session.isUser) {
    // redirect to login page
    return res.redirect("/login");
  } else {
    // redirect to signup page
    return res.redirect("/signup");
  }
});

module.exports = router;
