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
app.use(morgan());

// allow cross-origin requests
app.use(cors());

// parse JSON data
app.use(bodyParser.json());

// use cookie sessions
app.use(cookieSession({ secret: process.env.COOKIE_SECRET }));

// Static routes
const DOWNLOAD_PATH = process.env.DOWNLOAD_PATH;
app.use('/api/videos', express.static(DOWNLOAD_PATH));

// import routes
const VideosRoutes = require("./routes/videos"),
  AuthRoutes = require("./routes/auth");

// use routes
app.use("/api/videos", VideosRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.API_PORT | 3000
app.listen(PORT, () => console.log(`SERVER: listening to port ${PORT}`));
