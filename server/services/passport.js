const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const db = require('../app/users/table');
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user.googleid);
});

passport.deserializeUser((id, done) => {
  console.log('id', id);
  db.findUser({ id } )
  .then(user => {
    console.log('deserializeUser', user);
    done(null, user); 
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {

        const { name, emails } = profile;
        const { familyName, givenName } = name;
        const firstEmail = emails[0];
        const { value } = firstEmail;

      db.findUser({ id: profile.id })
        .then((Users) => {

          const { users } = Users;

          
          if (users) {
            console.log('existingUser', users); 
            done(null, users);
            
            // 
          } else {

            console.log('adding user');
            db.storeUser({ id: profile.id, firstname: givenName, lastname: familyName, email: value } )
            .then(user => done(null, user)); 

          }
        })


    }
  )
);

module.exports = passport;
