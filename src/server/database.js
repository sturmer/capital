const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const uri = `mongodb+srv://develop:${process.env.MONGO_DB_PASSWORD}@cluster0-lnwlc.mongodb.net/test?retryWrites=true&w=majority`;

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
