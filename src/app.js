const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);

const app = express();

// Define Paths for express config
const pubilcDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pubilcDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Omar Elweshy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Omar Elweshy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMsg: "This is a help message",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provida an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          res.send({ error });
        }

        res.send({
          forcast: foreCastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Omar Elweshy",
    errorMessage: "This is no help here",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Omar Elweshy",
    errorMessage: "Page not found",
  });
});

// Server
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
