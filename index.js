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

console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", (req, res, next) => {
  return res.send(200).json({
    success: true,
    message: "ok",
  });
  next();
});
app.get("/api/myapp", (req, res) => {
  const reqUrl = url.parse(req.url).path;
  console.log(reqUrl);

  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 8800, () => {
  console.log(process.env.PORT);
  console.log("Backend server is running!");
});
