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
// Static routes
app.use(express.static('public'))
// allow cross-origin requests
app.use(cors())
// log HTTP requests
app.use(morgan('dev'));
// parse JSON data
app.use(bodyParser.json());
// use cookie sessions
app.use(cookieSession({ secret: process.env.COOKIE_SECRET }))

// import routes
const VideosRoutes = require("./routes/videos"),
  AuthRoutes = require("./routes/auth");

// use routes
app.use("/api/videos", VideosRoutes);
app.use("/api/auth", AuthRoutes)

app.listen(4000, () => console.log(`app is listening to port 4000`));
