const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

function configurePassport(passport, userModel) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  
  const strategy = new JwtStrategy(options, (payload, done) => {
    userModel.findByPk(payload.sub)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => done(err));
  });

  passport.use(strategy);
}

module.exports = configurePassport;