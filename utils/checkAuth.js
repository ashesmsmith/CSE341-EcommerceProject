require("dotenv").config()
const checkAuth = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: "User is not authenticated.  Please log in.",
            URL: `${process.env.BASE_URL}/login`
        })
    }
    next()
}

module.exports = checkAuth