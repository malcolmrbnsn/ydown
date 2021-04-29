const router = require("express").Router(),
    db = require("../models");

router.get("/signup", (req, res) => res.render("auth/signup", { title: "Signup" }))

router.post("/signup", async (req, res) => {
    try {
        // get fields from the request body
        const { email, password } = req.body;
        if (!email || !password) {
            req.flash("error", "Please fill in all fields")
            return res.redirect("/")
        }

        let existingUser = await db.User.findOne({email});

        if (existingUser) {
            req.flash("error", "This email is already signed up.")
            return res.redirect("/signup")
        }

        // create the new user
        const user = new db.User({
            email,
            password
        });

        // save to database
        await user.save();

        // set the session as logged in
        req.session.isLoggedIn = true;
        req.session.user = user

        // return the user
        req.flash("success", "Signed up")
        return res.redirect("/videos")
    } catch (error) {
        console.log(error)
        req.flash("error", "An error occured.")
        return res.redirect("/login")
    }
})

router.get("/login", (req, res) => res.render("auth/login", { title: "Login" }))

router.post("/login", async (req, res) => {
    try {
        // get email and password from request body
        const { email, password } = req.body;

        // try to find one match in the database
        const user = await db.User.findOne({
            email,
            password
        });

        // if no user was found send user back to login form
        if (!user) {
            return res.redirect("/login")
        }

        // set the session to logged in and populate the user info
        req.session.isLoggedIn = true;
        req.session.user = user._id

        req.flash("success", "Logged In")
        return res.redirect("/videos")
    } catch (error) {
        console.log(error)
        req.flash("error", "An error occured.")
        return res.redirect("/login")
    }
})

router.get("/logout", (req, res) => {
    try {
        // remove the logged in state from session
        req.session.isLoggedIn = false;
        req.session.user = {}

        // return user to home page
        req.flash("success", "Logged out.")
        res.redirect("/login")
    } catch (error) {
        console.log(error)
        req.flash("error", "An error occured.")
        return res.redirect("/login")
    }
})

module.exports = router;