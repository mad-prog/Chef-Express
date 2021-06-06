const express = require("express");
const roleValidation = require("../middleware/roleValidation");
const router = express.Router();

const commentService = require("../services/commentService");

router.post("/", roleValidation(["user", "mod"]), async (req, res) => {
  try {
    await commentService.addComment(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//downstream before getById to avoid clash
//only admin
router.get("/all", roleValidation("admin"), async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", roleValidation(["mod", "user"]), async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getComment(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", roleValidation(["mod", "user"]), async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await commentService.removeComment(req.user, id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", roleValidation(["mod", "user"]), async (req, res) => {
  try {
    const { id } = req.params;
    await commentService.editComment(req.user, id, req.body);

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
