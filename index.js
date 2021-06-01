const express = require("express"),
  bodyParser = require("body-parser"),
  exphbs = require("express-handlebars"),
  morgan = require("morgan"),
  methodOverride = require("method-override"),
  cookieSession = require("cookie-session"),
  flash = require("connect-flash"),
  app = express();
require("dotenv").config();

// ------------
//  App setup
// ------------
// log HTTP requests
app.use(morgan("common"));

// parse HTTP data
app.use(bodyParser.urlencoded({ extended: true }));
// allow the use of PUT and DELETE HTTP requests through method rewriting
app.use(methodOverride("_method"));

// use cookie sessions
app.use(cookieSession({ secret: process.env.COOKIE_SECRET }));

// use flash for error and success messages
app.use(flash());
app.use(function (req, res, next) {
  // pass the session and flash messages to handlebars
  res.locals.session = req.session;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  return next();
});

// Enable HTML templating with handlebars
app.engine(
  "hbs",
  exphbs({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    helpers: {
      displayDate: (val) => moment(val).format("MMM Do YY"),
      count: (val) => val.length,
      idMatches: (val1, val2) => val1.equals(val2),
      trimDescription: (text, len) => text.substring(0, len) + "...",
      splitLines: (text) => text.split("\n"),
      ifEquals: (val1, val2, options) =>
        val1 === val2 ? options.fn(this) : options.inverse(this),
    },
  })
);
app.set("view engine", "hbs");

// Static routes
app.use(express.static("public"));

// import routes
const indexRoutes = require("./routes"),
  VideosRoutes = require("./routes/videos"),
  AuthRoutes = require("./routes/auth");

// use routes
app.use("/", indexRoutes);
app.use("/", AuthRoutes);
app.use("/videos", VideosRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`SERVER: listening to port ${PORT}`));
