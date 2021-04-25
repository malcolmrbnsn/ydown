const router = require("express").Router(),
    db = require("../models"); 

// return the current user to the client
router.get("/me", async (req, res) => {
    return res.json(req.session)
})

router.post("/signup", async (req, res) => {
    // get fields from the request body
    const {username, email, password } = req.body;
    // create the new user
    const user = new db.User({
        username,
        email, 
        password
    });
    // save to database
    await user.save();
    // set the session as logged in
    req.session.isLoggedIn = true;
    req.session.user = user
    // return the user
    return res.status(201).json(user)
    //TODO: ADD ERROR HERE
})

router.post("/login", async (req, res) => {
    // get email and password from request body
    const {email, password} = req.body;
    // try to find one match in the database
    const user = await db.User.findOne({
        email,
        password
    });
    if (user) {
    // set the session to logged in
    req.session.isLoggedIn = true;
    req.session.user = user._id
    // return the user for the client
    return res.json(user)
    } else {
        return res.status(403).json({error: {
            message: "Email or password was incorrect"
        }})
    }
})

router.get("/logout", (req, res) => {
    // remove the logged in state from session
    req.session.isLoggedIn = false;
    req.session.user = ""
    // return success to user
    res.status(200).json({
        message: "Logged out",
        type: "success"
    })
})

module.exports = router;