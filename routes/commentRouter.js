const express = require("express");
const router = express.Router();

const commentService = require("../services/commentService");

router.post("/", async (req, res) => {
  try {
    await commentService.addComment(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//downstream before getById to avoid clash
router.get("/all", async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getComment(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await commentService.removeComment(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentService.editComment(id, req.body);
    console.log(comment);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
