const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cors = require("cors"),
  app = express();
require("dotenv").config();

// Static routes
app.use(express.static('public'))

// allow cross-origin requests
app.use(cors())

// log HTTP requests
app.use(morgan('dev'));

// parse JSON data
app.use(bodyParser.json());

// import routes
const VideosRoutes = require("./routes/videos");

// use routes
app.use("/api/videos", VideosRoutes);


app.listen(4000, () => console.log(`app is listening to port 4000`));
