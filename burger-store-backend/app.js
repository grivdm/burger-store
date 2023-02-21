const orderRoutes = require('./routes/orders'); 
const productRoutes = require('./routes/products'); 
const userRoutes = require('./routes/users'); 
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user'); 
const mongoose = require("mongoose");
const dbConfig = require("./config/database");
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport setup
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Route setup
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use(errorHandler)


mongoose.set("strictQuery", false);
mongoose
  .connect(dbConfig.production.databaseUri, dbConfig.production.options)
  .catch((err) => console.error(err));
const db = mongoose.connection;

// Check connection status
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`MongoDB connection readyState: ${db.readyState}`);
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


module.exports = app;

// nodemon burger-store-backend