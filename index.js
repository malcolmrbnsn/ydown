const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cors = require("cors"),
  cookieSession = require("cookie-session"),
  app = express();
require("dotenv").config();


// ------------ 
//  App setup
// ------------
// log HTTP requests
app.use(morgan("common"));

// allow cross-origin requests
app.use(cors());

// parse JSON data
app.use(bodyParser.json());

// use cookie sessions
app.use(cookieSession({ secret: process.env.COOKIE_SECRET }));


app.use((req, res, next) => {
  if (req.session.isLoggedIn === undefined) {
    // set the session defaults
    req.session.isLoggedIn = false
    req.user = {}
  }
  next()
})

// Static routes
app.use(express.static('public'));


// import routes
const VideosRoutes = require("./routes/videos"),
  AuthRoutes = require("./routes/auth");

// use routes
app.use("/api/videos", VideosRoutes);
app.use("/api/auth", AuthRoutes);

// serve rendered frontend if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + "/client/build/"));
  app.get("/*", function (req, res) {
    res.sendFile(__dirname + "/client/build/index.html");
  });
}

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`SERVER: listening to port ${PORT}`));
