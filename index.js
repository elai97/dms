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

const db = require("./models");
const Role = db.role;

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


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "SimReg_Storage"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'SimReg_Storage' to roles collection");
      });

      new Role({
        name: "MTNF_Storage"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'MTNF_Storage' to roles collection");
      });

      new Role({
        name: "PPK_Storage"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'PPK_Storage' to roles collection");
      });
    }
  });
}

initial();


module.exports = app;
