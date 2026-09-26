import mongoose, { Document, Schema } from "mongoose";

interface INutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}

interface IRecipe extends Document {
  userId: mongoose.Types.ObjectId;

  title: string;
  description: string;

  cuisine: string;
  mealType: string;
  diet: string;

  prepTime: number;
  cookTime: number;
  servings: number;
  nutrition: INutrition;

  ingredients: string[];
  steps: string[];

  createdAt: Date;
}

const recipeSchema = new Schema<IRecipe>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    mealType: {
      type: String,
      required: true,
    },

    diet: {
      type: String,
      required: true,
    },

    prepTime: {
      type: Number,
      required: true,
    },

    cookTime: {
      type: Number,
      required: true,
    },

    servings: {
      type: Number,
      required: true,
    },

    nutrition: {
      calories: {
        type: Number,
        required: true,
      },

      protein: {
        type: Number,
        required: true,
      },

      carbohydrates: {
        type: Number,
        required: true,
      },

      fat: {
        type: Number,
        required: true,
      },

      fiber: {
        type: Number,
        required: true,
      },
    },

    ingredients: {
      type: [String],
      required: true,
    },

    steps: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Recipe = mongoose.model<IRecipe>(
  "Recipe",
  recipeSchema,
);

export default Recipe;