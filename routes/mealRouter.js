const express = require("express");
const router = express.Router();

const roleValidation = require("../middleware/roleValidation");
const mealService = require("../services/mealService");
const multer = require("../middleware/multer");

router.post(
  "/",
  roleValidation(["user", "mod"]),
  //multer.single("HappyApiMeal"),
  async (req, res, next) => {
    try {
      await mealService.createMeal(req.body);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/all", roleValidation(["user", "mod"]), async (req, res, next) => {
  try {
    const meals = await mealService.getAllMeals();
    res.status(200).json(meals);
  } catch (error) {
    next(error);
  }
});
//post?
//rolevalidation
router.get("/search:category?:ingredient?", async (req, res, next) => {
  try {
    const ingredientsearchword = req.query.ingredient;
    const categorySearchWord = req.query.category;
    if (ingredientsearchword) {
      const meals = await mealService.getAllMealsWithNamedIngredient(
        ingredientsearchword
      );
      res.status(200).json(meals);
    } else if (categorySearchWord) {
      const meals = await mealService.getAllMealsWithCategory(
        categorySearchWord
      );
      res.status(200).json(meals);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/category/:category", async (req, res, next) => {
  try {
    const searchCategoryWord = req.params.category;
    console.log("category" + searchCategoryWord);
    const meals = await mealService.getAllMealsWithCategory(searchCategoryWord);
    res.status(200).json(meals);
  } catch (error) {
    next(error);
  }
});

//roleValidation
router.get("/random", async (req, res, next) => {
  try {
    const { id } = req.user;
    const meal = await mealService.getRandomMealPlan(id);
    res.status(200).json(meal);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", roleValidation(["user", "mod"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const meal = await mealService.getMealById(id);
    res.status(200).json(meal);
  } catch (error) {
    next(error);
  }
});

//only admin & mod can delete meals
router.delete("/:id", roleValidation("mod"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const meal = await mealService.removeMeal(id);
    res.status(200).json("destroyed row(s):" + meal);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  roleValidation(["user", "mod"]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const meal = await mealService.editMeal(req.user, id, req.body);
      res.status(200).json(meal);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
