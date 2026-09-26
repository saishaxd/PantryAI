import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Home() {
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
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />

        {/* Features */}
        <section id="features" className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
                Why PantryAI
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">
                More than just a recipe generator.
              </h2>

              <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
                PantryAI works around what you actually have, instead of making
                you shop for a recipe.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  emoji: "🥕",
                  title: "Use What You Have",
                  description:
                    "Build recipes around the ingredients already sitting in your pantry.",
                },
                {
                  emoji: "✨",
                  title: "AI-Powered",
                  description:
                    "Get personalized recipes generated around your preferences and constraints.",
                },
                {
                  emoji: "🍽️",
                  title: "Your Preferences",
                  description:
                    "Choose cuisine, meal type, diet, cooking time, servings, and more.",
                },
                {
                  emoji: "📊",
                  title: "Nutrition Included",
                  description:
                    "See calories, protein, carbs, fat, and fiber for every generated recipe.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="
                    rounded-2xl
                    border border-black/5
                    bg-[var(--color-surface)]
                    p-6
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-lg hover:shadow-black/5
                    dark:border-white/10
                  "
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-2xl">
                    {feature.emoji}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-[var(--color-text)]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
                How it works
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">
                From pantry to plate in three steps.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  number: "01",
                  emoji: "🧺",
                  title: "Pick your ingredients",
                  description:
                    "Tell PantryAI what ingredients and kitchen gadgets you have available.",
                },
                {
                  number: "02",
                  emoji: "⚙️",
                  title: "Set your preferences",
                  description:
                    "Choose your cuisine, meal type, diet, cooking time, and servings.",
                },
                {
                  number: "03",
                  emoji: "👨‍🍳",
                  title: "Cook something great",
                  description:
                    "Get a personalized recipe with ingredients, instructions, and nutrition.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="
                    relative
                    rounded-2xl
                    border border-black/5
                    bg-[var(--color-surface)]
                    p-7
                    dark:border-white/10
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--color-primary-light)]">
                      {step.number}
                    </span>

                    <span className="text-3xl">{step.emoji}</span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold text-[var(--color-text)]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 pb-20 pt-10 sm:pb-28">
          <div
            className="
              mx-auto max-w-5xl
              overflow-hidden
              rounded-[28px]
              bg-[var(--color-primary)]
              px-6 py-14
              text-center
              sm:px-12 sm:py-16
            "
          >
            <div className="mx-auto max-w-2xl">
              <span className="text-4xl">🍳</span>

              <h2 className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl">
                Your next meal is already in your kitchen.
              </h2>

              <p className="mt-5 text-sm leading-6 text-white/75 sm:text-base">
                Stop wondering what to cook. Give PantryAI your ingredients and
                let&apos;s make something delicious.
              </p>

              <button
                type="button"
                onClick={handleGetStarted}
                className="
                    mt-8 inline-flex items-center justify-center
                    rounded-full
                    bg-white
                    px-6 py-3.5
                    text-sm font-semibold
                    text-[var(--color-primary)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-[var(--color-background)]
                  "
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
