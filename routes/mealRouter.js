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
module.exports = router;
