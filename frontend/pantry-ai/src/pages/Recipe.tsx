import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { RecipeSuggestion } from "../services/api";
import { saveRecipe } from "../services/api";

import {
  ChefHat,
  Clock3,
  Users,
  Flame,
  Sparkles,
  Bookmark,
  Check,
  ArrowLeft,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

interface RecipeRequest {
  ingredients: string[];
  gadgets: string[];
  cuisine: string;
  mealType: string;
  diet: string;
  maxTime: number;
  servings: number;
}

interface Nutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}

interface RecipeData {
  title: string;
  description: string;
  cuisine: string;
  mealType: string;
  diet: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  nutrition: Nutrition;
  ingredients: string[];
  steps: string[];
}

function Recipe() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const recipe = location.state?.recipe as RecipeData | undefined;

  const recipeRequest = location.state?.recipeRequest as
    | RecipeRequest
    | undefined;

  const suggestions = location.state?.suggestions as
    | RecipeSuggestion[]
    | undefined;

  if (!recipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6">
        <div className="text-center">
          <h1 className="font-display text-3xl">No recipe found</h1>

          <p className="mt-2 text-[var(--color-text-muted)]">
            Generate a recipe from your pantry first.
          </p>

          <button
            onClick={() => navigate("/pantry")}
            className="mt-6 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white"
          >
            Back to Pantry
          </button>
        </div>
      </div>
    );
  }

  const toggleStep = (index: number) => {
    setCompletedSteps((current) =>
      current.includes(index)
        ? current.filter((step) => step !== index)
        : [...current, index],
    );
  };

  const handleSaveRecipe = async () => {
    if (!token) {
      setSaveError("You need to be logged in to save recipes.");
      return;
    }

    setSaveError("");
    setIsSaving(true);

    try {
      await saveRecipe(recipe, token);

      setIsSaved(true);
    } catch (error) {
      console.error("Save recipe failed:", error);

      setSaveError(
        error instanceof Error ? error.message : "Failed to save recipe.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToSuggestions = () => {
    if (!suggestions || !recipeRequest) {
      navigate("/pantry");
      return;
    }

    navigate("/suggestions", {
      state: {
        suggestions,
        recipeRequest,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Navbar */}

      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[var(--color-background)]/90 backdrop-blur-xl dark:border-white/5">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
              <ChefHat size={22} />
            </div>

            <span className="font-display text-2xl text-[var(--color-primary)]">
              PantryAI
            </span>
          </Link>

          <Link
            to="/pantry"
            className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-xs font-semibold transition hover:border-[var(--color-primary-light)] dark:border-white/10"
          >
            <ArrowLeft size={15} />
            Back to Pantry
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {/* Header */}

        <section className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)]/15 px-4 py-2 text-xs font-semibold text-[var(--color-accent-strong)]">
            <Sparkles size={14} />
            AI GENERATED RECIPE
          </div>

          <h1 className="font-display text-4xl sm:text-5xl">{recipe.title}</h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
            {recipe.description}
          </p>

          {/* Tags */}

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-[var(--color-primary-light)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {recipe.cuisine}
            </span>

            <span className="rounded-full bg-[var(--color-primary-light)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {recipe.mealType}
            </span>

            <span className="rounded-full bg-[var(--color-primary-light)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {recipe.diet}
            </span>
          </div>
        </section>

        {/* Recipe stats */}

        <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-4 text-center dark:border-white/5">
            <Clock3
              size={20}
              className="mx-auto mb-2 text-[var(--color-accent-strong)]"
            />

            <p className="text-xs text-[var(--color-text-muted)]">Total Time</p>

            <p className="mt-1 text-sm font-bold">
              {recipe.prepTime + recipe.cookTime} min
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-4 text-center dark:border-white/5">
            <Flame
              size={20}
              className="mx-auto mb-2 text-[var(--color-accent-strong)]"
            />

            <p className="text-xs text-[var(--color-text-muted)]">Calories</p>

            <p className="mt-1 text-sm font-bold">
              {recipe.nutrition.calories} kcal
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-4 text-center dark:border-white/5">
            <Users
              size={20}
              className="mx-auto mb-2 text-[var(--color-accent-strong)]"
            />

            <p className="text-xs text-[var(--color-text-muted)]">Servings</p>

            <p className="mt-1 text-sm font-bold">{recipe.servings}</p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-4 text-center dark:border-white/5">
            <Sparkles
              size={20}
              className="mx-auto mb-2 text-[var(--color-accent-strong)]"
            />

            <p className="text-xs text-[var(--color-text-muted)]">Difficulty</p>

            <p className="mt-1 text-sm font-bold">Easy</p>
          </div>
        </section>

        {/* Nutrition Card */}

        <section className="mt-6 mb-8 rounded-[28px] border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm dark:border-white/5">
          <div className="mb-5">
            <h2 className="font-display text-2xl">Nutrition</h2>

            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Estimated nutrition per serving
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-[var(--color-background)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">Calories</p>

              <p className="mt-1 text-xl font-bold">
                {recipe.nutrition.calories}
                <span className="ml-1 text-sm font-medium">kcal</span>
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--color-background)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">Protein</p>

              <p className="mt-1 text-xl font-bold">
                {recipe.nutrition.protein}
                <span className="ml-1 text-sm font-medium">g</span>
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--color-background)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">Carbs</p>

              <p className="mt-1 text-xl font-bold">
                {recipe.nutrition.carbohydrates}
                <span className="ml-1 text-sm font-medium">g</span>
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--color-background)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">Fat</p>

              <p className="mt-1 text-xl font-bold">
                {recipe.nutrition.fat}
                <span className="ml-1 text-sm font-medium">g</span>
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[var(--color-background)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Fiber</p>

            <p className="mt-1 text-xl font-bold">
              {recipe.nutrition.fiber}
              <span className="ml-1 text-sm font-medium">g</span>
            </p>
          </div>
        </section>

        {/* Main recipe content */}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Ingredients */}

          <section className="rounded-[28px] border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm dark:border-white/5 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[var(--color-accent-strong)]">
                  WHAT YOU NEED
                </p>

                <h2 className="mt-1 font-display text-2xl">Ingredients</h2>
              </div>

              <div className="rounded-xl bg-[var(--color-primary-light)]/10 px-3 py-2 text-xs font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {recipe.ingredients.length} items
              </div>
            </div>

            <div className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <div
                  key={ingredient}
                  className="flex items-center gap-3 rounded-xl bg-[var(--color-background)] px-4 py-3"
                >
                  <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />

                  <span className="text-sm">{ingredient}</span>
                </div>
              ))}
            </div>

            {/* Save */}

            <button
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-primary-light)] px-4 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary-light)]/10 dark:text-[var(--color-primary-light)]"
              onClick={handleSaveRecipe}
            >
              {isSaved ? (
                <>
                  <Check className="h-5 w-5" />
                  Saved!
                </>
              ) : isSaving ? (
                <>
                  <Bookmark className="h-5 w-5 animate-pulse" />
                  Saving...
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5" />
                  Save Recipe
                </>
              )}
            </button>

            {saveError && (
              <p className="mt-2 text-sm text-red-500">{saveError}</p>
            )}


            {/* Back to suggestions */}

            <button
              type="button"
              onClick={handleBackToSuggestions}
              className="
                  inline-flex items-center justify-center gap-5
                  rounded-full
                  border border-black/10
                  bg-[var(--color-surface)]
                  px-5 py-2
                  text-sm font-semibold
                  text-[var(--color-text)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[var(--color-primary)]/30
                  hover:text-[var(--color-primary)]
                  dark:border-white/10
                "
            >
              ← Back to Recipe Ideas
            </button>

          </section>

          {/* Cooking steps */}

          <section className="rounded-[28px] border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm dark:border-white/5 sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-wide text-[var(--color-accent-strong)]">
                LET'S COOK
              </p>

              <h2 className="mt-1 font-display text-2xl">Cooking steps</h2>
            </div>

            <div className="space-y-4">
              {recipe.steps.map((step, index) => {
                const completed = completedSteps.includes(index);

                return (
                  <button
                    key={index}
                    onClick={() => toggleStep(index)}
                    className={`flex w-full gap-4 rounded-2xl border p-4 text-left transition-all ${
                      completed
                        ? "border-[var(--color-primary-light)] bg-[var(--color-primary-light)]/10"
                        : "border-black/5 bg-[var(--color-background)] hover:-translate-y-0.5 dark:border-white/5"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        completed
                          ? "bg-[var(--color-primary)] text-white dark:text-[#101714]"
                          : "bg-[var(--color-primary-light)]/10 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]"
                      }`}
                    >
                      {completed ? <Check size={15} /> : index + 1}
                    </div>

                    <div>
                      <p
                        className={`text-sm leading-6 ${
                          completed
                            ? "text-[var(--color-text-muted)] line-through"
                            : ""
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Recipe;
