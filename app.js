var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dbURI = process.env.MONGODBURI;

var indexRouter = require("./routes/index");
const gamesRouter = require("./routes/games");
const authorRouter = require("./routes/authors");
const publisherRouter = require("./routes/publishers");
const genreRouter = require("./routes/genres");

var app = express();

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect(dbURI);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/authors", authorRouter);
app.use("/publishers", publisherRouter);
app.use("/genres", genreRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8000);

module.exports = app;
