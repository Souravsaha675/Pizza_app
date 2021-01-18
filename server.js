const path = require("path");
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");

const app = express();

const PORT = process.env.PORT || 3000;

//Assets

app.use(express.static("public"));

//Set Template Engine

app.use(expressLayout);

app.set("views", path.join(__dirname, "/resources/views"));

app.set("view engine", "ejs");

//Routes

app.get("/", (req, res) => res.render("home"));

app.get("/cart", (req, res) => res.render("customers/cart"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
