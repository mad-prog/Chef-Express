var express = require("express");
var router = express.Router();
const userService = require("../services/userService");

router.post("/signup", async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
