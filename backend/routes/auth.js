const router = require("express").Router(),
    db = require("../models"); 

router.post("/signup", async (req, res) => {
    const {username, email, password } = req.body;
    const user = new db.User({
        username,
        email, 
        password
    });
    await user.save();
    req.session.isLoggedIn = true;
    req.session.userId = user._id
    return res.status(201).json(user)
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await db.User.findOne({
        email,
        password
    });
    req.session.isLoggedIn = true;
    req.session.user = user._id
    return res.json(user)
})

router.get("/", (req, res) => {
    res.send(req.session)
})

router.get("/logout", (req, res) => {
    req.session.isLoggedIn = false;
    req.session.user = ""
})

module.exports = router;