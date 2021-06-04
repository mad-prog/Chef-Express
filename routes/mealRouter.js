const express = require("express");
const router = express.Router();

const mealService = require("../services/mealService");

router.post("/", async (req, res) => {
  try {
    await mealService.createMeal(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const meals = await mealService.getAllMeals();
    res.status(200).json(meals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await mealService.getMealById(id);
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await mealService.removeMeal(id);
    res.status(200).json("destroyed row(s):" + meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await mealService.editMeal(id, req.body);
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
