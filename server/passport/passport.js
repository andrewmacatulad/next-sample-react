const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

// const keys = require("../config/keys");

// passport.serializeUser((user, done) => {
//   // the user.id is the id in the mongo
//   done(null, user.id);
// });

// // the id pass here is the cookie use in the serializeUser
// // in this case the userId
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "896857006016-phkj0hb3990eh2l1kt24fb7pm9jmbe9g.apps.googleusercontent.com",
      clientSecret: "RMIbONxs3JoDyYWxjKaJkt49",
      callbackURL: "/auth/google/callback"
    },
    async (req, accessToken, refreshToken, profile, done) => {
      if (!req.user) {
        let existingUser;
        try {
          existingUser = await User.findOne({ googleId: profile.id });
        } catch (error) {
          return done(error);
        }

        if (existingUser) {
          return done(null, existingUser);
        }

        try {
          const user = await new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id
          }).save();
          done(null, user);
        } catch (error) {
          console.dir(error.message, { colors: true });
        }
      }
    }
  )
);
