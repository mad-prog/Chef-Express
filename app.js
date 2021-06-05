require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mealsRouter = require("./routes/mealRouter");
const commentsRouter = require("./routes/commentRouter");
const loadModels = require("./models/relationship");
const tokenValidation = require("./middleware/tokenValidation");

var app = express();
loadModels();

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//gives each user id, email, role
app.use(tokenValidation);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/meals", mealsRouter);
app.use("/comments", commentsRouter);

module.exports = app;
