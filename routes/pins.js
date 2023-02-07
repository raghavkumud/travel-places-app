const router = require("express").Router();
const Pin = require("../models/Pin.js");

router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    console.log(pins);
    res.status(200).json(pins);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
