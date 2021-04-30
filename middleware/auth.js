var exports = {}

exports.checkLogin = function(req, res, next) {
    // if session is logged in
    if (req.session.isLoggedIn === true) {
        // proceed to next route
        next();
    } else {
        // send message to prompt login, deny action
        return res.redirect("/login")
    }
}

module.exports = exports;