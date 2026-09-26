import {
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Sparkles,
  Users,
} from "lucide-react";

function AppShowcase() {
  const ingredients = [
    { emoji: "🥔", name: "Potato" },
    { emoji: "🍅", name: "Tomato" },
    { emoji: "🧅", name: "Onion" },
    { emoji: "🧀", name: "Paneer" },
  ];

  const preferences = [
    "Indian",
    "Dinner",
    "Vegetarian",
  ];

  const steps = [
    "Dice the potatoes and paneer into bite-sized pieces.",
    "Heat oil in a pan and sauté the onions until golden.",
    "Add tomatoes and spices, then cook until softened.",
    "Add potatoes and paneer. Cover and cook until tender.",
  ];

  return (
    <section
      id="app"
      className="relative overflow-hidden px-6 py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary-light)]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/5 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
            <Sparkles size={15} />
            From pantry to plate
          </div>

          <h2 className="font-display text-4xl leading-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Cooking starts with
            <span className="text-[var(--color-primary)]">
              {" "}what you have.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
            Pick your ingredients, set your preferences, and let PantryAI
            create a recipe tailored to your kitchen.
          </p>
        </div>

        {/* Application preview */}
        <div
          className="
            mt-14 overflow-hidden rounded-[28px]
            border border-black/5
            bg-white
            shadow-2xl shadow-black/5
            dark:border-white/10
            dark:bg-[var(--color-surface)]
          "
        >
          {/* Fake browser/app header */}
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 dark:border-white/10 sm:px-7">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-strong)]/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary-light)]/70" />
            </div>

            <span className="hidden text-xs font-medium text-[var(--color-text-muted)] sm:block">
              pantryai.app
            </span>

            <div className="w-12" />
          </div>

          {/* App content */}
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

            {/* LEFT — Pantry */}
            <div className="border-b border-black/5 p-6 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r">
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
                    Step 01
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-[var(--color-text)]">
                    Your pantry
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  🥕
                </div>
              </div>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                Select the ingredients you already have at home.
              </p>

              {/* Search */}
              <div className="mt-6 rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 dark:border-white/10">
                <span className="text-sm text-[var(--color-text-muted)]">
                  Search ingredients...
                </span>
              </div>

              {/* Ingredient categories */}
              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {["All", "Vegetables", "Protein", "Dairy"].map(
                  (category, index) => (
                    <button
                      key={category}
                      type="button"
                      className={`
                        shrink-0 rounded-full px-3.5 py-2 text-xs font-medium
                        ${
                          index === 0
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-[var(--color-background)] text-[var(--color-text-muted)]"
                        }
                      `}
                    >
                      {category}
                    </button>
                  ),
                )}
              </div>

              {/* Ingredients */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.name}
                    className="
                      flex items-center gap-3 rounded-xl
                      border border-[var(--color-primary)]/15
                      bg-[var(--color-primary)]/5
                      px-3 py-3
                    "
                  >
                    <span className="text-xl">
                      {ingredient.emoji}
                    </span>

                    <span className="text-sm font-medium text-[var(--color-text)]">
                      {ingredient.name}
                    </span>

                    <Check
                      size={15}
                      className="ml-auto text-[var(--color-primary)]"
                    />
                  </div>
                ))}
              </div>

              {/* Gadgets */}
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Available gadgets
                  </p>

                  <span className="text-xs text-[var(--color-text-muted)]">
                    2 selected
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  {["🍳 Pan", "🥘 Pot"].map((gadget) => (
                    <div
                      key={gadget}
                      className="
                        rounded-xl border border-[var(--color-primary)]/15
                        bg-[var(--color-primary)]/5
                        px-3 py-2 text-xs font-medium
                        text-[var(--color-text)]
                      "
                    >
                      {gadget}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="mt-7">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  Preferences
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {preferences.map((preference) => (
                    <span
                      key={preference}
                      className="
                        flex items-center gap-1.5 rounded-full
                        bg-[var(--color-background)]
                        px-3 py-2 text-xs font-medium
                        text-[var(--color-text)]
                      "
                    >
                      {preference}
                      <ChevronDown size={12} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Generate */}
              <button
                type="button"
                className="
                  mt-7 flex w-full items-center justify-center gap-2
                  rounded-xl
                  bg-[var(--color-primary)]
                  px-5 py-3.5
                  text-sm font-semibold text-white
                  transition
                  hover:bg-[var(--color-primary-light)]
                "
              >
                <Sparkles size={16} />
                Generate Recipe
              </button>
            </div>

            {/* RIGHT — Recipe */}
            <div className="bg-[var(--color-background)] p-6 sm:p-8">
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={15}
                      className="text-[var(--color-accent-strong)]"
                    />

                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-strong)]">
                      AI generated
                    </p>
                  </div>

                  <h3 className="mt-2 font-display text-3xl text-[var(--color-text)] sm:text-4xl">
                    Paneer Masala
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--color-text-muted)]">
                    A comforting Indian-style paneer dish made from the
                    ingredients already waiting in your kitchen.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Save recipe"
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-full
                    border border-black/5
                    bg-white
                    text-[var(--color-text-muted)]
                    transition
                    hover:text-[var(--color-primary)]
                    dark:border-white/10
                    dark:bg-[var(--color-surface)]
                  "
                >
                  <Bookmark size={18} />
                </button>
              </div>

              {/* Recipe metadata */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-primary)]">
                  🇮🇳 Indian
                </span>

                <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-primary)]">
                  Vegetarian
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white p-3 dark:bg-[var(--color-surface)]">
                  <Clock3 size={16} className="text-[var(--color-accent-strong)]" />
                  <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                    Total time
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--color-text)]">
                    25 min
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 dark:bg-[var(--color-surface)]">
                  <Users size={16} className="text-[var(--color-primary-light)]" />
                  <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                    Servings
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--color-text)]">
                    2 people
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 dark:bg-[var(--color-surface)]">
                  <Flame size={16} className="text-[var(--color-accent-strong)]" />
                  <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                    Calories
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--color-text)]">
                    420 kcal
                  </p>
                </div>
              </div>

              {/* Nutrition */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-[var(--color-text)]">
                  Nutrition per serving
                </h4>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    ["Protein", "22g"],
                    ["Carbs", "28g"],
                    ["Fat", "24g"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-black/5 bg-white px-3 py-3 dark:border-white/10 dark:bg-[var(--color-surface)]"
                    >
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {label}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-[var(--color-text)]">
                  Cooking steps
                </h4>

                <div className="mt-3 space-y-3">
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-primary)]/20 text-xs font-semibold text-[var(--color-primary)]">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save */}
              <button
                type="button"
                className="
                  mt-7 flex w-full items-center justify-center gap-2
                  rounded-xl border
                  border-[var(--color-primary)]/20
                  bg-white
                  py-3
                  text-sm font-semibold
                  text-[var(--color-primary)]
                  transition
                  hover:bg-[var(--color-primary)]/5
                  dark:bg-[var(--color-surface)]
                "
              >
                <Bookmark size={16} />
                Save Recipe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-[var(--color-text-muted)]">
          No complicated meal planning. Just tell PantryAI what you have,
          and start cooking.
        </p>
      </div>
    </section>
  );
}

export default AppShowcase;