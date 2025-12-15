import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../db/connection.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/user/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const collection = await db.collection('users');

        let user = await collection.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        const newUser = {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0]?.value,
          createdAt: new Date(),
        };

        const result = await collection.insertOne(newUser);
        newUser._id = result.insertedId;

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const collection = await db.collection('users');
    const user = await collection.findOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
