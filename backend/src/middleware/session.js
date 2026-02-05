const session = require('express-session');
const MongoStore = require('connect-mongo');

const SESSION_SECRET = process.env.SESSION_SECRET || 'replace-this-secret';

module.exports = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false },
  store: MongoStore.create({
    mongoUrl:
      process.env.MONGODB_URI || 'mongodb://localhost:27017/specify_app',
  }),
});
