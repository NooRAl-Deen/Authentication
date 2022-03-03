const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserGoogle = require('../models/User.google');
const dotenv = require('dotenv');

dotenv.config();


module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
          const newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value,
              email: profile.emails[0].value
          };
          try {
              let user = await UserGoogle.findOne({ googleId: profile.id })
              if(user) {
                  done(null, user);
              } else {
                  user = await UserGoogle.create(newUser);
                  done(null, user);
              }
          } catch (err) {
              console.log(err);
          }
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
      });
    
      passport.deserializeUser((id, done) => {
        UserGoogle.findById(id, (err, user) => done(err, user))
      });
}