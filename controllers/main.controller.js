const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);
const mongoose = require('mongoose');

// Main Controller
exports.main = (req, res) => {
    res.render('index');
}

// Login Controller
exports.login = (req, res) => {
    res.render('login');
}

exports.loginPost = (req, res) => {
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      }
      verify().then(() => {
          res.cookie('session-token', token);
          res.send('done');
      }).catch(console.error);
}

exports.dashboard = (req, res, next) => {
    const user = req.user;
    res.render('dashboard', {user});
}

exports.logout = (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/login');
}

