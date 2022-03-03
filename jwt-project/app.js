const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(
    "C:/codes/practise/js/assignments/jwt-project/static/index.html"
  );
});

app.get("/login.html", (req, res) => {
  res.sendFile(
    "C:/codes/practise/js/assignments/jwt-project/static/login.html"
  );
});

app.post("/login.html", (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
  };
  const token = jwt.sign(user, "mysecretkey");
  res.send(token);
});

app.listen(3000, () => console.log("This app is listening on port 3000"));
