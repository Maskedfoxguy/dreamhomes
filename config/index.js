// We reuse this import in order to have access to the `body` property in requests
const express = require("express");
// :fuente_de_información: Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");
// :fuente_de_información: Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");
// :fuente_de_información: Session middleware for authentication
// https://www.npmjs.com/package/express-session
const session = require("express-session");// :fuente_de_información: Session middleware for authentication
// https://www.npmjs.com/package/connect-mongo
const MongoStore = require("connect-mongo");
// Connects the mongo uri to maintain the same naming structure
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dreamhomes";
// :fuente_de_información: Serves a custom favicon on each request
// https://www.npmjs.com/package/serve-favicon
const favicon = require("serve-favicon");
// :fuente_de_información: global package used to `normalize` paths amongst different operating systems
// https://www.npmjs.com/package/path
const path = require("path");
// Middleware configuration
module.exports = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));
  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");
  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));
  // Handles access to the favicon
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
 // :fuente_de_información: Middleware that adds a "req.session" information and later to check that you are who you say you are :sonrisa_con_sudor:
 app.use(
  session({
    secret: process.env.SESSION_SECRET || "super hyper secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 //--> 1day
    },
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
  })
);
};