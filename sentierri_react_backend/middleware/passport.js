const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          // Find the user with the provided email
          const user = await User.findOne({ where: { email } });
  
          // If no user is found, return a message indicating the user was not found
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          // Compare the provided password with the stored password hash
          const isPasswordValid = await bcrypt.compare(password, user.password);
  
          // If the password is not valid, return a message indicating an incorrect password
          if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password' });
          }
  
          // If the user is found and the password is valid, return the user
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
);

// Serialize the user ID to store in the session
// passport.serializeUser((user, done) => {
//     done(null, user.id);
//     });

module.exports = passport;
