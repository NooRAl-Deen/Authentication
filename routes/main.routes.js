const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);

router.get('/', mainController.main);
router.get('/login', mainController.login);
router.post('/login', mainController.loginPost);
router.get('/dashboard', checkAuthenticated, mainController.dashboard);
router.get('/logout', mainController.logout);


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.email = payload.email;
        user.picture = payload.picture;
        user.given_name = payload.given_name;
        user.family_name = payload.family_name;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login');
      })

}

module.exports = router;