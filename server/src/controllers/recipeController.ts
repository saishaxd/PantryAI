import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";

import Recipe from "../models/Recipe.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

interface RecipeRequest {
  ingredients: string[];
  gadgets: string[];
  cuisine: string;
  mealType: string;
  diet: string;
  maxTime: number;
  servings: number;
  selectedRecipe?: string;
}

interface RecipeSuggestion {
  title: string;
  description: string;
  cuisine: string;
  mealType: string;
  diet: string;
  totalTime: number;
  calories: number;
}

//GENERATE RECIPE

export const generateRecipe = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      ingredients,
      gadgets,
      cuisine,
      mealType,
      diet,
      maxTime,
      servings,
      selectedRecipe,
    } = req.body as RecipeRequest;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({
        message: "At least one ingredient is required.",
      });
    }

    const prompt = `
You are PantryAI, an AI recipe generation assistant.

Create one complete, practical recipe for the user.

The user has selected this recipe idea:
${selectedRecipe ?? "No specific recipe selected."}

Available ingredients:
${ingredients.join(", ")}

Available kitchen gadgets:
${gadgets.length > 0 ? gadgets.join(", ") : "No specific gadgets provided"}

Cuisine:
${cuisine}
Meal type: ${mealType}
Diet: ${diet}
Maximum cooking time: ${maxTime} minutes
Servings: ${servings}

Important rules:
- Prefer the ingredients provided by the user.
- Do not require equipment the user does not have.
- Keep the total cooking time within the requested limit.
- Respect the dietary preference.
- The recipe should be realistic and easy to follow.
- You may assume common pantry staples such as salt, oil and basic spices.

Return the recipe using the required JSON structure.

Nutrition rules:
- Estimate nutrition for the entire recipe based on the ingredients and quantities.
- Return nutrition values per serving, not for the entire recipe.
- Calories should be in kcal.
- Protein, carbohydrates, fat, and fiber should be in grams.
- Use reasonable approximate values; nutrition estimates do not need to be exact.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            title: {
              type: "string",
            },

            description: {
              type: "string",
            },

            cuisine: {
              type: "string",
            },

            mealType: {
              type: "string",
            },

            diet: {
              type: "string",
            },

            prepTime: {
              type: "number",
            },

            cookTime: {
              type: "number",
            },

            servings: {
              type: "number",
            },

            nutrition: {
              type: "object",

              properties: {
                calories: {
                  type: "number",
                },

                protein: {
                  type: "number",
                },

                carbohydrates: {
                  type: "number",
                },

                fat: {
                  type: "number",
                },

                fiber: {
                  type: "number",
                },
              },

              required: [
                "calories",
                "protein",
                "carbohydrates",
                "fat",
                "fiber",
              ],
            },

            ingredients: {
              type: "array",

              items: {
                type: "string",
              },
            },

            steps: {
              type: "array",

              items: {
                type: "string",
              },
            },
          },

          required: [
            "title",
            "description",
            "cuisine",
            "mealType",
            "diet",
            "prepTime",
            "cookTime",
            "servings",
            "nutrition",
            "ingredients",
            "steps",
          ],
        },
      },
    });

    const content = response.text;

    if (!content) {
      return res.status(500).json({
        message: "AI did not return a recipe.",
      });
    }

    const recipe = JSON.parse(content);

    return res.status(200).json({
      recipe,
    });

  } catch (error) {
    console.error("Recipe generation error:", error);

    return res.status(500).json({
      message: "Failed to generate recipe.",
    });
  }
};


// RECIPE SUGGESTIONS
export const getRecipeSuggestions = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      ingredients,
      gadgets,
      cuisine,
      mealType,
      diet,
      maxTime,
      servings,
    } = req.body as RecipeRequest;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({
        message: "Please provide at least one ingredient.",
      });
    }

    const prompt = `
You are PantryAI, an AI recipe recommendation assistant.

Suggest exactly 4 different recipes based on the user's available ingredients and preferences.

Available ingredients:
${ingredients.join(", ")}

Available kitchen gadgets:
${gadgets.length > 0 ? gadgets.join(", ") : "No specific gadgets provided"}

Cuisine:
${cuisine}

Meal type:
${mealType}

Diet:
${diet}

Maximum cooking time:
${maxTime} minutes

Servings:
${servings}

Rules:
- Suggest exactly 4 recipes.
- Recipes must be practical and realistically cookable.
- Prefer using the available ingredients.
- Respect the requested diet.
- Respect the requested cuisine and meal type.
- Each recipe must fit within the maximum cooking time.
- Make the 4 recipes meaningfully different from each other.
- You may assume basic pantry staples such as salt, oil, and water.
- Do not invent unusual ingredients that are difficult to obtain.
- totalTime must be the estimated total preparation + cooking time in minutes.
- calories must be the estimated calories per serving.
- Keep descriptions short and appealing.
- Do NOT provide ingredients or cooking steps yet. Those will be generated after the user selects a recipe.

Return ONLY valid JSON in the following format:

{
  "suggestions": [
    {
      "title": "Recipe title",
      "description": "Short description",
      "cuisine": "Cuisine",
      "mealType": "Meal type",
      "diet": "Diet",
      "totalTime": 25,
      "calories": 400
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            suggestions: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  cuisine: {
                    type: "string",
                  },
                  mealType: {
                    type: "string",
                  },
                  diet: {
                    type: "string",
                  },
                  totalTime: {
                    type: "number",
                  },
                  calories: {
                    type: "number",
                  },
                },
                required: [
                  "title",
                  "description",
                  "cuisine",
                  "mealType",
                  "diet",
                  "totalTime",
                  "calories",
                ],
              },
            },
          },
          required: ["suggestions"],
        },
      },
    });

    const suggestions = JSON.parse(
      response.text ?? '{"suggestions":[]}',
    ) as {
      suggestions: RecipeSuggestion[];
    };

    return res.status(200).json(suggestions);
  } catch (error) {
    console.error("Recipe suggestion generation failed:", error);

    return res.status(500).json({
      message: "Failed to generate recipe suggestions.",
    });
  }
};


//SAVE RECIPE

export const saveRecipe = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated.",
      });
    }

    const recipeData = req.body;

    if (!recipeData.nutrition) {
      return res.status(400).json({
        message: "Recipe nutrition data is required.",
      });
    }

    const existingRecipe = await Recipe.findOne({
      userId,
      title: recipeData.title,
    });

    if (existingRecipe) {
      return res.status(409).json({
        message: "Recipe is already saved.",
        recipe: existingRecipe,
      });
    }

    const recipe = await Recipe.create({
      userId,

      title: recipeData.title,
      description: recipeData.description,

      cuisine: recipeData.cuisine,
      mealType: recipeData.mealType,
      diet: recipeData.diet,

      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      servings: recipeData.servings,
      nutrition: recipeData.nutrition,

      ingredients: recipeData.ingredients,
      steps: recipeData.steps,
    });

    return res.status(201).json({
      message: "Recipe saved successfully.",
      recipe,
    });
  } catch (error) {
    console.error("Save recipe error:", error);

    return res.status(500).json({
      message: "Failed to save recipe.",
    });
  }
};


//GET SAVED RECIPES

export const getSavedRecipes = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated.",
      });
    }

    const recipes = await Recipe.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      recipes,
    });
  } catch (error) {
    console.error(
      "Get saved recipes error:",
      error,
    );

    return res.status(500).json({
      message: "Failed to fetch saved recipes.",
    });
  }
};


//DELETE RECIPE

export const deleteRecipe = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const recipeId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated.",
      });
    }

    const recipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      userId,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found.",
      });
    }

    return res.status(200).json({
      message: "Recipe deleted successfully.",
    });
  } catch (error) {
    console.error("Delete recipe error:", error);

    return res.status(500).json({
      message: "Failed to delete recipe.",
    });
  }
};