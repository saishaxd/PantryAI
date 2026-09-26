import {
  ChefHat,
  Search,
  Sparkles,
  Utensils,
  Plus,
  Check,
  // Clock3,
  // Users,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
// import { generateRecipe } from "../services/api";
import { Link } from "react-router-dom";

import { getRecipeSuggestions } from "../services/api";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const cuisines = ["Indian", "Italian", "Chinese", "Mexican", "Continental"];

const diets = ["Vegetarian", "Vegan", "Non-veg"];

const cookingTimes = [15, 30, 45, 60];

const servingOptions = [1, 2, 3, 4];

const ingredients = [
  // 🥦 Vegetables
  {
    name: "Potato",
    category: "Vegetables",
    emoji: "🥔",
  },
  {
    name: "Tomato",
    category: "Vegetables",
    emoji: "🍅",
  },
  {
    name: "Onion",
    category: "Vegetables",
    emoji: "🧅",
  },
  {
    name: "Capsicum",
    category: "Vegetables",
    emoji: "🫑",
  },
  {
    name: "Spinach",
    category: "Vegetables",
    emoji: "🥬",
  },
  {
    name: "Carrot",
    category: "Vegetables",
    emoji: "🥕",
  },
  {
    name: "Cabbage",
    category: "Vegetables",
    emoji: "🥬",
  },
  {
    name: "Cauliflower",
    category: "Vegetables",
    emoji: "🥦",
  },
  {
    name: "Broccoli",
    category: "Vegetables",
    emoji: "🥦",
  },
  {
    name: "Green Peas",
    category: "Vegetables",
    emoji: "🫛",
  },
  {
    name: "Corn",
    category: "Vegetables",
    emoji: "🌽",
  },
  {
    name: "Mushroom",
    category: "Vegetables",
    emoji: "🍄",
  },
  {
    name: "Cucumber",
    category: "Vegetables",
    emoji: "🥒",
  },
  {
    name: "Brinjal",
    category: "Vegetables",
    emoji: "🍆",
  },
  {
    name: "Okra",
    category: "Vegetables",
    emoji: "🥬",
  },
  {
    name: "Green Beans",
    category: "Vegetables",
    emoji: "🫛",
  },
  {
    name: "Zucchini",
    category: "Vegetables",
    emoji: "🥒",
  },
  {
    name: "Sweet Potato",
    category: "Vegetables",
    emoji: "🍠",
  },
  {
    name: "Garlic",
    category: "Vegetables",
    emoji: "🧄",
  },
  {
    name: "Ginger",
    category: "Vegetables",
    emoji: "🫚",
  },

  // 🍗 Protein
  {
    name: "Chicken",
    category: "Protein",
    emoji: "🍗",
  },
  {
    name: "Egg",
    category: "Protein",
    emoji: "🥚",
  },
  {
    name: "Paneer",
    category: "Protein",
    emoji: "🧀",
  },
  {
    name: "Tofu",
    category: "Protein",
    emoji: "🧊",
  },
  {
    name: "Chickpeas",
    category: "Protein",
    emoji: "🫘",
  },
  {
    name: "Kidney Beans",
    category: "Protein",
    emoji: "🫘",
  },
  {
    name: "Black Beans",
    category: "Protein",
    emoji: "🫘",
  },
  {
    name: "Lentils",
    category: "Protein",
    emoji: "🫘",
  },
  {
    name: "Soya Chunks",
    category: "Protein",
    emoji: "🫘",
  },
  {
    name: "Fish",
    category: "Protein",
    emoji: "🐟",
  },

  // 🥛 Dairy
  {
    name: "Milk",
    category: "Dairy",
    emoji: "🥛",
  },
  {
    name: "Curd",
    category: "Dairy",
    emoji: "🥣",
  },
  {
    name: "Greek Yogurt",
    category: "Dairy",
    emoji: "🥣",
  },
  {
    name: "Butter",
    category: "Dairy",
    emoji: "🧈",
  },
  {
    name: "Cheese",
    category: "Dairy",
    emoji: "🧀",
  },
  {
    name: "Cream",
    category: "Dairy",
    emoji: "🥛",
  },
  {
    name: "Coconut Milk",
    category: "Dairy",
    emoji: "🥥",
  },

  // 🌾 Grains & Carbs
  {
    name: "Rice",
    category: "Grains",
    emoji: "🍚",
  },
  {
    name: "Basmati Rice",
    category: "Grains",
    emoji: "🍚",
  },
  {
    name: "Pasta",
    category: "Grains",
    emoji: "🍝",
  },
  {
    name: "Noodles",
    category: "Grains",
    emoji: "🍜",
  },
  {
    name: "Bread",
    category: "Grains",
    emoji: "🍞",
  },
  {
    name: "Roti",
    category: "Grains",
    emoji: "🫓",
  },
  {
    name: "Oats",
    category: "Grains",
    emoji: "🥣",
  },
  {
    name: "Quinoa",
    category: "Grains",
    emoji: "🌾",
  },
  {
    name: "Poha",
    category: "Grains",
    emoji: "🍚",
  },
  {
    name: "Semolina",
    category: "Grains",
    emoji: "🌾",
  },

  // 🫘 Pantry Staples
  {
    name: "Wheat Flour",
    category: "Pantry Staples",
    emoji: "🌾",
  },
  {
    name: "Besan",
    category: "Pantry Staples",
    emoji: "🌾",
  },
  {
    name: "Corn Flour",
    category: "Pantry Staples",
    emoji: "🌽",
  },
  {
    name: "Breadcrumbs",
    category: "Pantry Staples",
    emoji: "🍞",
  },
  {
    name: "Peanuts",
    category: "Pantry Staples",
    emoji: "🥜",
  },
  {
    name: "Cashews",
    category: "Pantry Staples",
    emoji: "🥜",
  },
  {
    name: "Almonds",
    category: "Pantry Staples",
    emoji: "🌰",
  },
  {
    name: "Peanut Butter",
    category: "Pantry Staples",
    emoji: "🥜",
  },
  {
    name: "Sesame Seeds",
    category: "Pantry Staples",
    emoji: "🌱",
  },

  // 🌶️ Spices & Sauces
  {
    name: "Salt",
    category: "Spices & Sauces",
    emoji: "🧂",
  },
  {
    name: "Black Pepper",
    category: "Spices & Sauces",
    emoji: "🌶️",
  },
  {
    name: "Turmeric",
    category: "Spices & Sauces",
    emoji: "🟡",
  },
  {
    name: "Red Chili Powder",
    category: "Spices & Sauces",
    emoji: "🌶️",
  },
  {
    name: "Cumin",
    category: "Spices & Sauces",
    emoji: "🌿",
  },
  {
    name: "Coriander Powder",
    category: "Spices & Sauces",
    emoji: "🌿",
  },
  {
    name: "Garam Masala",
    category: "Spices & Sauces",
    emoji: "🌶️",
  },
  {
    name: "Oregano",
    category: "Spices & Sauces",
    emoji: "🌿",
  },
  {
    name: "Chili Flakes",
    category: "Spices & Sauces",
    emoji: "🌶️",
  },
  {
    name: "Soy Sauce",
    category: "Spices & Sauces",
    emoji: "🥢",
  },
  {
    name: "Tomato Ketchup",
    category: "Spices & Sauces",
    emoji: "🍅",
  },
  {
    name: "Mayonnaise",
    category: "Spices & Sauces",
    emoji: "🥫",
  },
  {
    name: "Mustard",
    category: "Spices & Sauces",
    emoji: "🌭",
  },
  {
    name: "Vinegar",
    category: "Spices & Sauces",
    emoji: "🍶",
  },

  // 🍎 Fruits
  {
    name: "Banana",
    category: "Fruits",
    emoji: "🍌",
  },
  {
    name: "Apple",
    category: "Fruits",
    emoji: "🍎",
  },
  {
    name: "Mango",
    category: "Fruits",
    emoji: "🥭",
  },
  {
    name: "Orange",
    category: "Fruits",
    emoji: "🍊",
  },
  {
    name: "Strawberry",
    category: "Fruits",
    emoji: "🍓",
  },
  {
    name: "Lemon",
    category: "Fruits",
    emoji: "🍋",
  },
  {
    name: "Avocado",
    category: "Fruits",
    emoji: "🥑",
  },
];

const categories = [
  "All",
  "Vegetables",
  "Protein",
  "Dairy",
  "Grains",
  "Pantry Staples",
  "Spices & Sauces",
  "Fruits",
];

const gadgets = [
  {
    name: "Pan",
    emoji: "🍳",
  },
  {
    name: "Pot",
    emoji: "🍲",
  },
  {
    name: "Air Fryer",
    emoji: "🔥",
  },
  {
    name: "Blender",
    emoji: "🥤",
  },
];

function Pantry() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [selectedGadgets, setSelectedGadgets] = useState<string[]>([]);

  const [mealType, setMealType] = useState("Dinner");
  const [cuisine, setCuisine] = useState("Indian");
  const [diet, setDiet] = useState("Vegetarian");
  const [maxTime, setMaxTime] = useState(30);
  const [servings, setServings] = useState(2);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesCategory =
      activeCategory === "All" || ingredient.category === activeCategory;

    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  const toggleGadget = (name: string) => {
    setSelectedGadgets((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  const handleGenerateRecipe = async () => {
    if (!token) {
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const recipeRequest = {
        ingredients: selectedIngredients,
        gadgets: selectedGadgets,
        cuisine,
        mealType,
        diet,
        maxTime,
        servings,
      };

      const suggestions = await getRecipeSuggestions(recipeRequest, token);

      navigate("/suggestions", {
        state: {
          suggestions,
          recipeRequest,
        },
      });
    } catch (error) {
      console.error("Recipe suggestion generation failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate recipe suggestions.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[var(--color-background)]/90 backdrop-blur-xl dark:border-white/5">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
              <ChefHat size={22} />
            </div>

            <span className="font-display text-2xl text-[var(--color-primary)]">
              PantryAI
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a
              href="/pantry"
              className="text-[var(--color-primary)] dark:text-[var(--color-primary-light)]"
            >
              My Pantry
            </a>

            <a
              href="/saved"
              className="text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
            >
              Saved Recipes
            </a>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user?.name}</p>

              <p className="text-xs text-[var(--color-text-muted)]">
                Home cook
              </p>
            </div>

            <button
              onClick={logout}
              className="rounded-xl border border-black/10 px-3 py-2 text-xs font-semibold transition hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] dark:border-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-10">
        {/* Header */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--color-accent-strong)]">
                YOUR KITCHEN
              </p>

              <h1 className="font-display text-4xl leading-tight sm:text-5xl">
                What's in your pantry,
                <span className="text-[var(--color-primary-light)]">
                  {" "}
                  {user?.name?.split(" ")[0]}?
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
                Pick the ingredients you have and we'll figure out what
                delicious things you can make with them.
              </p>
            </div>

            {/* Selected count */}
            <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[var(--color-surface)] px-4 py-3 dark:border-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent-strong)]">
                <Utensils size={19} />
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Ingredients selected
                </p>

                <p className="font-semibold">{selectedIngredients.length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Ingredient section */}
          <section className="rounded-[28px] border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm dark:border-white/5 sm:p-8">
            {/* Search */}
            <div className="relative mb-6">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />

              <input
                type="text"
                placeholder="Search ingredients..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-transparent py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--color-primary-light)] focus:ring-4 focus:ring-[var(--color-primary-light)]/10 dark:border-white/10"
              />
            </div>

            {/* Categories */}
            <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-[var(--color-primary-light)] text-white shadow-md dark:text-[#101714]"
                      : "bg-[var(--color-background)] text-[var(--color-text-muted)] hover:-translate-y-0.5 hover:text-[var(--color-primary)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Ingredient heading */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl">Ingredients</h2>

              <span className="text-xs text-[var(--color-text-muted)]">
                {filteredIngredients.length} available
              </span>
            </div>

            {/* Ingredient grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {filteredIngredients.map((ingredient) => {
                const selected = selectedIngredients.includes(ingredient.name);

                return (
                  <button
                    key={ingredient.name}
                    onClick={() => toggleIngredient(ingredient.name)}
                    className={`group relative rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                      selected
                        ? "border-[var(--color-primary-light)] bg-[var(--color-primary-light)]/10 shadow-md"
                        : "border-black/5 bg-[var(--color-background)] hover:border-[var(--color-primary-light)]/40 dark:border-white/5"
                    }`}
                  >
                    {/* Selected check */}
                    {selected && (
                      <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-white dark:text-[#101714]">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}

                    <div className="mb-4 text-3xl transition-transform duration-300 group-hover:scale-110">
                      {ingredient.emoji}
                    </div>

                    <p className="text-sm font-semibold">{ingredient.name}</p>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {ingredient.category}
                    </p>
                  </button>
                );
              })}
            </div>

            {filteredIngredients.length === 0 && (
              <div className="py-12 text-center">
                <div className="mb-3 text-4xl">🥲</div>

                <p className="font-semibold">Nothing found</p>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Try searching for another ingredient.
                </p>
              </div>
            )}
          </section>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Selected ingredients */}
            <section className="rounded-[28px] border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm dark:border-white/5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[var(--color-accent-strong)]">
                    YOUR PICKS
                  </p>

                  <h2 className="mt-1 font-display text-2xl">Pantry</h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-white dark:text-[#101714]">
                  <Plus size={18} />
                </div>
              </div>

              {selectedIngredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((name) => {
                    const ingredient = ingredients.find(
                      (item) => item.name === name,
                    );

                    return (
                      <button
                        key={name}
                        onClick={() => toggleIngredient(name)}
                        className="group flex items-center gap-2 rounded-full bg-[var(--color-background)] px-3 py-2 text-xs font-medium transition hover:bg-[var(--color-accent)]/15"
                      >
                        <span>{ingredient?.emoji}</span>
                        {name}
                        <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-strong)]">
                          ×
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl bg-[var(--color-background)] p-5 text-center">
                  <div className="mb-2 text-3xl">🧺</div>

                  <p className="text-sm font-medium">Your pantry is empty</p>

                  <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                    Choose ingredients from the list to get started.
                  </p>
                </div>
              )}
            </section>

            {/* Kitchen equipment */}
            <section className="rounded-[28px] border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm dark:border-white/5">
              <div className="mb-5">
                <p className="text-xs font-semibold tracking-wide text-[var(--color-accent-strong)]">
                  YOUR TOOLS
                </p>

                <h2 className="mt-1 font-display text-2xl">
                  Kitchen equipment
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {gadgets.map((gadget) => {
                  const selected = selectedGadgets.includes(gadget.name);

                  return (
                    <button
                      key={gadget.name}
                      onClick={() => toggleGadget(gadget.name)}
                      className={`rounded-2xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                        selected
                          ? "border-[var(--color-primary-light)] bg-[var(--color-primary-light)]/10"
                          : "border-black/5 bg-[var(--color-background)] dark:border-white/5"
                      }`}
                    >
                      <div className="mb-2 text-xl">{gadget.emoji}</div>

                      <p className="text-xs font-semibold">{gadget.name}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Recipe settings preview */}
            <section className="rounded-[28px] bg-[#1B4332] p-6 text-white shadow-lg dark:bg-[#17231E]">
              <div className="mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-[var(--color-accent)]" />

                <p className="text-sm font-semibold">Recipe preferences</p>
              </div>

              {/* Meal Type */}
              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold text-white/70">
                  MEAL TYPE
                </p>

                <div className="flex flex-wrap gap-2">
                  {mealTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setMealType(type)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                        mealType === type
                          ? "bg-[var(--color-accent)] text-[#1B4332] dark:text-[#17231E]"
                          : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cuisine */}
              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold text-white/70">
                  CUISINE
                </p>

                <select
                  value={cuisine}
                  onChange={(event) => setCuisine(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs font-semibold text-white outline-none"
                >
                  {cuisines.map((item) => (
                    <option key={item} value={item} className="text-black">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Diet */}
              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold text-white/70">DIET</p>

                <div className="flex flex-wrap gap-2">
                  {diets.map((item) => (
                    <button
                      key={item}
                      onClick={() => setDiet(item)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                        diet === item
                          ? "bg-[var(--color-accent)] text-[#1B4332] dark:text-[#17231E]"
                          : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cooking Time */}
              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold text-white/70">
                  MAX COOKING TIME
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {cookingTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setMaxTime(time)}
                      className={`rounded-xl py-2.5 text-xs font-semibold transition ${
                        maxTime === time
                          ? "bg-[var(--color-accent)] text-[#1B4332] dark:text-[#17231E]"
                          : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {time}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Servings */}
              <div className="mb-6">
                <p className="mb-2 text-xs font-semibold text-white/70">
                  SERVINGS
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {servingOptions.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setServings(amount)}
                      className={`rounded-xl py-2.5 text-xs font-semibold transition ${
                        servings === amount
                          ? "bg-[var(--color-accent)] text-[#1B4332] dark:text-[#17231E]"
                          : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Generate */}
              <button
                disabled={selectedIngredients.length === 0}
                onClick={handleGenerateRecipe}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-3.5 text-sm font-bold text-[var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    Creating your recipe...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate My Recipe
                  </>
                )}
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Pantry;
