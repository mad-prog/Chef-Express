const express = require("express");
const roleValidation = require("../middleware/roleValidation");
const router = express.Router();

const mealService = require("../services/mealService");

router.post("/", roleValidation(["user", "mod"]), async (req, res) => {
  try {
    await mealService.createMeal(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/all", roleValidation(["user", "mod"]), async (req, res) => {
  try {
    const meals = await mealService.getAllMeals();
    res.status(200).json(meals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", roleValidation(["user", "mod"]), async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await mealService.getMealById(id);
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//only admin & mod can delete meals
router.delete("/:id", roleValidation("mod"), async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await mealService.removeMeal(id);
    res.status(200).json("destroyed row(s):" + meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", roleValidation(["user", "mod"]), async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await mealService.editMeal(req.user, id, req.body);
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
