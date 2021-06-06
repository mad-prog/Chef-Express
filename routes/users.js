var express = require("express");
const roleValidation = require("../middleware/roleValidation");
var router = express.Router();
const userService = require("../services/userService");

router.post("/signup", async (req, res, next) => {
  try {
    await userService.signup(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const webToken = await userService.login(email, password);
    res.status(200).json(webToken);
  } catch (error) {
    next(error);
  }
});

//TODO if empty can still access from browser
//only admin can see all users

router.get("/all", roleValidation("admin"), async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//only admin can delete
router.delete("/:id", roleValidation(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.removeUser(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.editUser(req.user, id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
