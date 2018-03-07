let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config();
let session = require('express-session');
let passport = require('passport');

let index = require('./routes/index');
let users = require('./routes/users');
let boards = require('./routes/boards');
let auth = require('./routes/auth');
let me = require('./routes/me');
let pins = require('./routes/pins');
let app = express();

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// sessions

app.use(session({
  secret: 'random stuff',
  resave: false,
  saveUninitialized: true,
}))

// models
let User = require('./models/User');
// passport config
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
app.use(passport.initialize());
app.use(passport.session());

let TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({twitterID: profile.id}, (err, result) => {
      if (err) { return done(err); }
      else if (!result) {
        //If no user with that ID exists create a new profile.
        let new_user = new User({
          twitterID: profile.id,
          displayName: profile.displayName,
          profilePic : profile._json.profile_image_url,
          following : [],
          followers : [],
        })
        new_user.save((err, res) => {
          if(err) { return done(err) }
          else { return done(null, res) }
        })
      }
      else if (result){
        return done(null, result);
      }
    })
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/boards', boards);
app.use('/auth', auth);
app.use('/me', me);
app.use('/pins', pins);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
