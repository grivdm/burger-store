require("dotenv").config({path: '../.env'});

module.exports = {
  production: {
    databaseUri: process.env.DB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    },
  },
  test: {
    databaseUri:  process.env.DB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    },
  },
};
