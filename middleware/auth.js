var exports = {}

exports.checkAuth = function (req, res, next) {
    // if session is logged in
    if (req.session.isLoggedIn === true) {
        // proceed to next route
        next();
    } else {
        return res.status(401).json({
            error: {
                message: "Please log in"
            }
        })
    }
}

module.exports = exports;