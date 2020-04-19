const mongoose = require("mongoose");
const { mongoDbPassword } = require("./config/config.dev");

const uri = `mongodb+srv://develop:${mongoDbPassword}@cluster0-lnwlc.mongodb.net/test?retryWrites=true&w=majority`;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}

module.exports = new Database();

// ("mongodb+srv://develop:<password>@cluster0-lnwlc.mongodb.net/test?retryWrites=true&w=majority");
