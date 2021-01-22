require("dotenv").config();

const path = require("path");
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);

const Routes = require("./routes/web");
const passportInit = require("./app/config/passport");

const app = express();

const PORT = process.env.PORT || 3000;

//Database
const url = `mongodb+srv://admin-souravsaha675:${process.env.DATABASE_PASSWORD}@cluster0-tvv6o.mongodb.net/pizza`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;

connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("connection error...");
  });

//Passport cofig
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Sessions-store

let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//Sessions-config

app.use(
  session({
    secret: process.env.COOKIE,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

//Assets

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Global Middleware

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//Set Template Engine

app.use(expressLayout);

app.set("views", path.join(__dirname, "/resources/views"));

app.set("view engine", "ejs");

//Routes

Routes(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
