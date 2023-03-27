const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
global.__basedir = __dirname;
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(cors());
var corsOptions = {
  origin: "http://localhost:8081"
};

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

const port = process.env.PORT || 8080;

// db connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Cannot connect to db", err);
    process.exit();
  });

// declare routes
require("./routes/storage")(app);
require("./routes/auth")(app);

// listen to server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
