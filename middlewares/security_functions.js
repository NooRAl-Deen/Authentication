const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function checkAuth(req, res, next) {
    if(req.isAuthenticated() || req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

function checkToken(req, res, next) {
    console.log(req.params.token)
    let decoded = jwt.verify(req.params.token, process.env.JWT_TOKEN)
    if(decoded)
    {
        next();
    }
}

module.exports = {
    checkAuth,
    checkToken
}