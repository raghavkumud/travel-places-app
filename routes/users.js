const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    // generate a secure password
    const salt = await bcrypt.genSalt(10);
    console.log("user password " + req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // generating a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // save user and send response
    const user = await newUser.save();
    res.status(200).json(user._id);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Wrong username or password");
      return;
    }
    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong username or password");
      return;
    }
    // send response
    res.status(200).json({ _id: user._id, username: user.username });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
