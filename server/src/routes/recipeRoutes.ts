import { Router } from "express";

import {
  generateRecipe,
  saveRecipe,
  getSavedRecipes,
  getRecipeSuggestions,
  deleteRecipe,
} from "../controllers/recipeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/suggestions", protect, getRecipeSuggestions);
router.post("/generate", protect, generateRecipe);
router.post("/save", protect, saveRecipe);
router.get("/saved", protect, getSavedRecipes);
router.delete("/:id", protect, deleteRecipe);

export default router;