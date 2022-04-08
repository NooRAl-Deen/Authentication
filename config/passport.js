const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const UserSocial = require('../models/User.social');
const dotenv = require('dotenv');

dotenv.config();



passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    UserSocial.findById(id, (err, user) => done(err, user))
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_GOOGLE_ID,
    clientSecret: process.env.CLIENT_GOOGLE_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
      const newUser = {
          socialId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
      };
      try {
          let user = await UserSocial.findOne({ socialId: profile.id })
          if(user) {
              done(null, user);
          } else {
              user = await UserSocial.create(newUser);
              done(null, user);
          }
      } catch (err) {
          console.log(err);
      }
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
      const newUser = {
          socialId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
      };
      try {
          let user = await UserSocial.findOne({ socialId: profile.id })
          if(user) {
              done(null, user);
          } else {
              user = await UserSocial.create(newUser);
              done(null, user);
          }
      } catch (err) {
          console.log(err);
      }
  }
));