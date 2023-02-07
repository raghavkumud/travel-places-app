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

app.use(express.static(path.join(__dirname, "/client/build")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});
