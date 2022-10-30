const express = require("express");
const path = require("path");
const url = require("url");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const { rmSync } = require("fs");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users/", userRoute);
app.use("/api/pins", pinRoute);


app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "ok",
  });
  next();
});
app.get("/myapp", (req, res) => {
  return res.status(200).json({
    message: "Hello!",
  });
});
app.get("/api/myapp", (req, res) => {
  const reqUrl = url.parse(req.url).path;
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});
