var express = require("express");
const roleValidation = require("../middleware/roleValidation");
var router = express.Router();
const userService = require("../services/userService");

router.post("/signup", async (req, res) => {
  try {
    await userService.signup(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const webToken = await userService.login(email, password);
    res.status(200).json(webToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//TODO if empty can still access from browser
//only admin can see all users

router.get("/all", roleValidation("admin"), async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", roleValidation("user"), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//only admin can delete
router.delete("/:id", roleValidation(), async (req, res) => {
  try {
    const { id } = req.params;
    await userService.removeUser(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", roleValidation(), async (req, res) => {
  try {
    const { id } = req.params;
    //const { email, name, password } = req.body;
    await userService.editUser(req.user, id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
