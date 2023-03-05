const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/productCategory.routes");
const authRoutes = require("./routes/auth.routes");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const dbConfig = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const passport = require('./config/passport'); // configure passport
const secret = require('./config/secret'); 

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: String(secret),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Route setup
app.use('/auth', authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);

app.use(errorHandler);

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
