const router = require("express").Router()

router.get("/", (req, res) => {
    return res.render("index", { layout: false })
})

module.exports = router;