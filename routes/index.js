const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.session.isUser) {
    return res.redirect("/login");
  } else {
    return res.redirect("/signup");
  }
});

module.exports = router;
