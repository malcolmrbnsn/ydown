var exports = {}

exports.checkLogin = function(req, res, next) {
    // if session is logged in
    if (req.session.isLoggedIn === true) {
        // proceed to next route
        next();
    } else {
        // send message to prompt login, deny action
        // return res.status(401).json({
        //     message: "Please log in"
        // })
        next()
    }
}

module.exports = exports;