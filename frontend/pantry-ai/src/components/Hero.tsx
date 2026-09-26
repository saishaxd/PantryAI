import {
  ArrowRight,
  Check,
  ChefHat,
  Clock3,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Hero() {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/pantry");
    } else {
      navigate("/register");
    }
  };
  
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--color-primary-light)]/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        
        {/* LEFT — Hero Content */}
        <div>
          {/* Small badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/5 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
            <Sparkles size={16} />
            AI-powered recipe generation
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-[var(--color-text)] sm:text-6xl lg:text-7xl">
            Your pantry.
            <br />
            <span className="text-[var(--color-primary)]">
              Your next meal.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
            Turn the ingredients you already have into delicious,
            personalized recipes. Tell PantryAI what&apos;s in your kitchen,
            and let AI do the rest.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleGetStarted}
              className="
                  group inline-flex items-center justify-center gap-2
                  rounded-full
                  bg-[var(--color-primary)]
                  px-6 py-3.5
                  text-sm font-semibold text-white
                  shadow-lg shadow-[var(--color-primary)]/15
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[var(--color-primary-light)]
                "
            >
              <Sparkles size={17} />
              Generate My Recipe
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {[
              "Personalized",
              "Pantry-friendly",
              "AI-powered",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Check size={13} strokeWidth={2.5} />
                </span>

                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — App Preview */}
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          
          {/* Decorative circle */}
          <div className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />

          {/* Main Preview */}
          <div
            className="
              relative rounded-[28px]
              border border-black/5
              bg-white/80
              p-4
              shadow-2xl shadow-black/5
              backdrop-blur-sm
              dark:border-white/10
              dark:bg-[var(--color-surface)]
              sm:p-5
            "
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/10">
              <div>
                <p className="text-xs font-medium text-[var(--color-text-muted)]">
                  YOUR PANTRY
                </p>

                <h2 className="mt-1 text-lg font-semibold text-[var(--color-text)]">
                  What are we cooking?
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <ChefHat size={20} />
              </div>
            </div>

            {/* Ingredients */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  Ingredients
                </p>

                <span className="text-xs text-[var(--color-text-muted)]">
                  4 selected
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { emoji: "🥔", name: "Potato" },
                  { emoji: "🍅", name: "Tomato" },
                  { emoji: "🧅", name: "Onion" },
                  { emoji: "🧀", name: "Paneer" },
                ].map((ingredient) => (
                  <div
                    key={ingredient.name}
                    className="
                      flex items-center gap-3
                      rounded-xl
                      border border-black/5
                      bg-[var(--color-background)]
                      px-3 py-3
                      dark:border-white/10
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
                      className="ml-auto text-[var(--color-primary-light)]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Preferences
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {["Indian", "Dinner", "Vegetarian"].map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      bg-[var(--color-primary)]/10
                      px-3 py-1.5
                      text-xs font-medium
                      text-[var(--color-primary)]
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              type="button"
              className="
                mt-5 flex w-full items-center justify-center gap-2
                rounded-xl
                bg-[var(--color-primary)]
                py-3
                text-sm font-semibold text-white
              "
            >
              <Sparkles size={16} />
              Generate Recipe
            </button>

            {/* Recipe Result */}
            <div className="mt-5 rounded-2xl bg-[var(--color-background)] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[var(--color-primary-light)]">
                    AI RECIPE
                  </p>

                  <h3 className="mt-1 font-display text-xl text-[var(--color-text)]">
                    Paneer Masala
                  </h3>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-[var(--color-accent)]/15 px-2.5 py-1 text-xs font-medium text-[var(--color-accent-strong)]">
                  <Clock3 size={12} />
                  25 min
                </div>
              </div>

              <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                A comforting Indian-style paneer dish made with the
                ingredients you already have.
              </p>
            </div>
          </div>

          {/* Floating badge
          <div
            className="
              absolute -bottom-5 -left-4
              hidden items-center gap-3
              rounded-2xl
              border border-black/5
              bg-white
              px-4 py-3
              shadow-xl
              dark:border-white/10
              dark:bg-[var(--color-surface)]
              sm:flex
            "
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]/15">
              ✨
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--color-text)]">
                Personalized for you
              </p>

              <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                Based on your pantry
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;