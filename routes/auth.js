const { request } = require("express");
const { exists } = require("../models/video");

const router = require("express").Router(),
  db = require("../models");

router.get("/signup", (req, res) => {
  return res.render("auth/signup", { title: "Signup" });
});

router.post("/signup", async (req, res) => {
  try {
    // get fields from the request body
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error", "Please fill in all fields");
      return res.redirect("/");
    }

    let existingUser = await db.User.findOne({ email });

    if (existingUser) {
      req.flash("error", "This email is already signed up.");
      return res.redirect("/signup");
    }

    // create the new user
    const user = new db.User({
      email,
      password,
    });

    // save to database
    await user.save();

    // set the session as logged in and populate the user object
    req.session.isLoggedIn = true;
    req.session.user = user;

    // note in the session that the user has logged in before
    req.session.isUser = true;

    // return the user
    req.flash("success", "Signed up");
    return res.redirect("/videos");
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occured.");
    return res.redirect("/signup");
  }
});

router.get("/login", (req, res) =>
  res.render("auth/login", { title: "Login" })
);

router.post("/login", async (req, res) => {
  try {
    // get email and password from request body
    const { email, password } = req.body;

    // try to find one match in the database
    const user = await db.User.findOne({
      email,
      password,
    });

    // if no user was found send user back to login form
    if (!user) {
      req.flash("error", "Username or Password was incorrect");
      return res.redirect("/login");
    }

    // set the session to logged in and populate the user info
    req.session.isLoggedIn = true;
    req.session.user = user._id;

    // note in the session that the user has logged in before
    req.session.isUser = true;

    req.flash("success", "Logged In");
    return res.redirect("/videos");
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occured.");
    return res.redirect("/login");
  }
});

router.post("/changepassword", async (req, res) => {
  try {
    // get form data from request
    let { oldPassword, newPassword, newPasswordRepeat } = req.body;

    // if any field is missing return an error
    if (!oldPassword || !newPassword || !newPasswordRepeat) {
      req.flash("error", "Check you have filled in all fields.");
      return res.redirect("/options");
    }

    // find the user from the session
    let user = await db.User.findById(req.session.user);

    // if the old password is incorrect return an error
    if (oldPassword !== user.password) {
      req.flash("error", "Check the old password is correct and try again.");
      return res.redirect("/options");
    }

    // if the new passwords do not match return an error
    if (newPassword !== newPasswordRepeat) {
      req.flash("error", "Check the new password is the same in both boxes.");
      return res.redirect("/options");
    }

    // update the password and save to database
    user.password = newPassword
    await user.save();

    req.flash("success", "Password changed.");
    return res.redirect("/options");
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occured.");
    return res.redirect("/options");
  }
})

router.get("/logout", (req, res) => {
  try {
    // remove the logged in state from session
    req.session.isLoggedIn = false;
    req.session.user = {};

    // return user to home page
    req.flash("success", "Logged out.");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occured.");
    return res.redirect("/login");
  }
});

module.exports = router;
