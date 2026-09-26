import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  ChefHat,
  Clock3,
  Flame,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { deleteRecipe, getSavedRecipes } from "../services/api";

import { useAuth } from "../context/useAuth";

interface Recipe {
  _id: string;

  title: string;
  description: string;

  cuisine: string;
  mealType: string;
  diet: string;

  prepTime: number;
  cookTime: number;
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
  };

  ingredients: string[];
  steps: string[];

  createdAt: string;
}

function SavedRecipes() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!token) {
        setError("You need to be logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getSavedRecipes(token);

        setRecipes(data.recipes);
      } catch (error) {
        console.error("Failed to load saved recipes:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load saved recipes.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [token]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!token) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteRecipe(recipeId, token);

      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe._id !== recipeId),
      );
    } catch (error) {
      console.error("Failed to delete recipe:", error);

      setError(
        error instanceof Error ? error.message : "Failed to delete recipe.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Navbar */}

      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[var(--color-background)]/90 px-6 py-4 backdrop-blur-xl dark:border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => navigate("/pantry")}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft size={18} />
            Back to Pantry
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
              <ChefHat size={22} />
            </div>

            <span className="font-display text-2xl text-[var(--color-primary)]">
              PantryAI
            </span>
          </Link>
        </div>
      </nav>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Bookmark size={20} className="text-[var(--color-accent)]" />

            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
              Your collection
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl">Saved Recipes</h1>

          <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
            Your favorite PantryAI creations, all in one place.
          </p>
        </div>

        {/* Search */}

        <div className="mb-8 max-w-xl">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />

            <input
              type="text"
              placeholder="Search your saved recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-black/5 bg-white py-3.5 pl-12 pr-4 outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary-light)] dark:border-white/5 dark:bg-[#17231E]"
            />
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div className="py-20 text-center">
            <ChefHat
              size={36}
              className="mx-auto animate-pulse text-[var(--color-primary-light)]"
            />

            <p className="mt-4 text-[var(--color-text-muted)]">
              Loading your recipes...
            </p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading && !error && recipes.length === 0 && (
          <div className="rounded-[28px] border border-black/5 bg-white p-12 text-center shadow-sm dark:border-white/5 dark:bg-[#17231E]">
            <ChefHat size={48} className="mx-auto text-[var(--color-accent)]" />

            <h2 className="mt-5 font-display text-2xl">
              Your recipe collection is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[var(--color-text-muted)]">
              Generate a recipe from your pantry and save it here.
            </p>

            <button
              onClick={() => navigate("/pantry")}
              className="mt-6 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
            >
              Create a Recipe
            </button>
          </div>
        )}

        {/* No search results */}

        {!loading &&
          !error &&
          recipes.length > 0 &&
          filteredRecipes.length === 0 && (
            <div className="py-16 text-center">
              <Search
                size={36}
                className="mx-auto text-[var(--color-text-muted)]"
              />

              <p className="mt-4 text-[var(--color-text-muted)]">
                No recipes match your search.
              </p>
            </div>
          )}

        {/* Recipe Grid */}

        {!loading && !error && filteredRecipes.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <article
                key={recipe._id}
                className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5 dark:bg-[#17231E]"
              >
                {/* Recipe top */}

                <div className="flex h-40 items-center justify-center bg-[var(--color-primary)]">
                  <ChefHat
                    size={52}
                    className="text-[var(--color-accent)] transition duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}

                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[var(--color-primary-light)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary-light)]">
                      {recipe.cuisine}
                    </span>

                    <span className="rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--color-accent-strong)]">
                      {recipe.mealType}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl">{recipe.title}</h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text-muted)]">
                    {recipe.description}
                  </p>

                  {/* Stats */}

                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-black/5 py-4 dark:border-white/5">
                    <div className="text-center">
                      <Clock3
                        size={17}
                        className="mx-auto text-[var(--color-primary-light)]"
                      />

                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Time
                      </p>

                      <p className="text-sm font-semibold">
                        {recipe.prepTime + recipe.cookTime}m
                      </p>
                    </div>

                    <div className="text-center">
                      <Flame
                        size={17}
                        className="mx-auto text-[var(--color-accent)]"
                      />

                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Calories
                      </p>

                      <p className="text-sm font-semibold">
                        {recipe.nutrition.calories}
                      </p>
                    </div>

                    <div className="text-center">
                      <Users
                        size={17}
                        className="mx-auto text-[var(--color-primary-light)]"
                      />

                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Servings
                      </p>

                      <p className="text-sm font-semibold">{recipe.servings}</p>
                    </div>
                  </div>

                  {/* View button */}

                  <button
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={17} />
                    Delete Recipe
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SavedRecipes;
