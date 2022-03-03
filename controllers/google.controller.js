const passport = require("passport");

module.exports.google = passport.authenticate('google', { scope: ['profile', 'email'] });
