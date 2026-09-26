import { ArrowRight, Clock3, Flame, LoaderCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import type { RecipeSuggestion } from "../services/api";
import { generateRecipe } from "../services/api";
import { useAuth } from "../context/useAuth";

interface RecipeRequest {
  ingredients: string[];
  gadgets: string[];
  cuisine: string;
  mealType: string;
  diet: string;
  maxTime: number;
  servings: number;
}

function RecipeSuggestions() {
  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [selectedTitle, setSelectedTitle] = useState("");
  const [error, setError] = useState("");

  const suggestions = location.state?.suggestions as
    | RecipeSuggestion[]
    | undefined;

  const recipeRequest = location.state?.recipeRequest as
    | RecipeRequest
    | undefined;

  const handleSelectRecipe = async (suggestion: RecipeSuggestion) => {
    if (!token || !recipeRequest || !suggestions) {
      return;
    }

    setSelectedTitle(suggestion.title);
    setError("");

    try {
      const request = {
        ...recipeRequest,
        selectedRecipe: suggestion.title,
      };

      const data = await generateRecipe(request, token);

      navigate("/recipe", {
        state: {
          recipe: data.recipe,
          recipeRequest: request,
          suggestions,
        },
      });
    } catch (error) {
      console.error("Recipe generation failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate the recipe.",
      );

      setSelectedTitle("");
    }
  };

  if (!suggestions || !recipeRequest) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-display text-4xl text-[var(--color-text)]">
              No recipe ideas found
            </h1>

            <p className="mt-3 text-[var(--color-text-muted)]">
              Go back to your pantry and generate some recipe ideas.
            </p>

            <button
              type="button"
              onClick={() => navigate("/pantry")}
              className="
                mt-6 rounded-full
                bg-[var(--color-primary)]
                px-6 py-3
                text-sm font-semibold text-white
                transition
                hover:bg-[var(--color-primary-light)]
              "
            >
              Back to Pantry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
            PantryAI Suggestions
          </p>

          <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">
            What would you like to cook?
          </h1>

          <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
            We found {suggestions.length} recipes that match your ingredients
            and preferences.
          </p>
        </div>

        {/* Recipe Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.title}-${index}`}
              type="button"
              disabled={selectedTitle !== ""}
              onClick={() => handleSelectRecipe(suggestion)}
              className="
                group
                text-left
                overflow-hidden
                rounded-3xl
                border border-black/5
                bg-[var(--color-surface)]
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl hover:shadow-black/5
                dark:border-white/10
              "
            >
              {/* Card visual */}
              <div
                className="
                  flex h-36 items-center justify-center
                  bg-[var(--color-primary)]/5
                  text-6xl
                  transition-transform duration-300
                  group-hover:scale-105
                "
              >
                {["🍝", "🥘", "🍛", "🌯"][index % 4]}
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span
                    className="
                      rounded-full
                      bg-[var(--color-primary)]/10
                      px-2.5 py-1
                      text-xs font-semibold
                      text-[var(--color-primary)]
                    "
                  >
                    {suggestion.cuisine}
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-[var(--color-accent)]/15
                      px-2.5 py-1
                      text-xs font-semibold
                      text-[var(--color-text)]
                    "
                  >
                    {suggestion.diet}
                  </span>
                </div>

                <h2 className="mt-4 line-clamp-2 text-lg font-semibold leading-6 text-[var(--color-text)]">
                  {suggestion.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-muted)]">
                  {suggestion.description}
                </p>

                {/* Stats */}
                <div className="mt-5 flex items-center gap-4 border-t border-black/5 pt-4 dark:border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]">
                    <Clock3 size={14} />
                    {suggestion.totalTime} min
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]">
                    <Flame size={14} />
                    {suggestion.calories} kcal
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="
                      mt-5 flex items-center gap-2
                      text-sm font-semibold
                      text-[var(--color-primary)]
                    "
                >
                  {selectedTitle === suggestion.title ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" />
                      Creating Recipe...
                    </>
                  ) : (
                    <>
                      View Recipe
                      <ArrowRight
                        size={16}
                        className="
                            transition-transform duration-300
                            group-hover:translate-x-1
                          "
                      />
                    </>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {error && (
          <div
            className="
                mx-auto mt-8 max-w-xl
                rounded-2xl
                border border-[var(--color-accent-strong)]/20
                bg-[var(--color-accent-strong)]/5
                px-5 py-4
                text-center
                text-sm
                text-[var(--color-accent-strong)]
              "
          >
            {error}
          </div>
        )}
        {/* Back */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => navigate("/pantry")}
            className="
              text-sm font-medium
              text-[var(--color-text-muted)]
              transition
              hover:text-[var(--color-primary)]
            "
          >
            ← Change ingredients or preferences
          </button>
        </div>
      </main>
    </div>
  );
}

export default RecipeSuggestions;
