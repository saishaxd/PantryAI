import { useState } from "react";
import {
  ArrowRight,
  ChefHat,
  Eye,
  EyeOff,
  Leaf,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register(name, email, password);

      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-5 py-8 text-[var(--color-text)]">

      {/* Logo */}
      <div className="mx-auto mb-8 flex max-w-6xl items-center">
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
            <ChefHat size={22} />
          </div>

          <span className="font-display text-2xl text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            PantryAI
          </span>
        </Link>
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-black/5 bg-[var(--color-surface)] shadow-[0_20px_70px_rgba(27,67,50,0.10)] dark:border-white/5 lg:grid-cols-2">

        {/* Left panel */}
        <div className="relative hidden min-h-[650px] overflow-hidden bg-[var(--color-primary)] p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-primary-light)] opacity-30" />

          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[var(--color-accent)] opacity-20" />

          {/* Floating food items */}
          <div className="absolute right-12 top-28 animate-[bounce_4s_ease-in-out_infinite] text-4xl">
            🍅
          </div>

          <div className="absolute bottom-37 left-12 animate-[bounce_5s_ease-in-out_infinite] text-4xl">
            🥑
          </div>

          <div className="absolute bottom-35 right-20 animate-[bounce_5s_ease-in-out_infinite] text-3xl">
            🧅
          </div>

          {/* Content */}
          <div className="relative z-10">

            <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Sparkles size={30} />
            </div>

            <h1 className="font-display max-w-md text-5xl leading-[1.08]">
              Your pantry has
              <span className="block text-[var(--color-accent-strong)]">
                stories to cook.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/75">
              Tell PantryAI what you've got in your kitchen,
              and we'll turn those ingredients into something
              worth cooking.
            </p>
          </div>

          {/* Bottom feature */}
          <div className="relative z-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-primary)]">
              <Leaf size={20} />
            </div>

            <div>
              <p className="font-semibold">
                Cook with what you have
              </p>

              <p className="mt-1 text-sm text-white/60">
                Less waste. More delicious experiments.
              </p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex items-center p-7 sm:p-10 lg:p-14">

          <div className="w-full max-w-md mx-auto">

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold tracking-wide text-[var(--color-accent-strong)]">
                GET COOKING
              </p>

              <h2 className="font-display text-4xl sm:text-5xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                Your next favorite recipe might already
                be hiding in your pantry.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Sai"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3.5 text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary-light)] focus:ring-4 focus:ring-[var(--color-primary-light)]/10 dark:border-white/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3.5 text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary-light)] focus:ring-4 focus:ring-[var(--color-primary-light)]/10 dark:border-white/10"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3.5 pr-12 text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary-light)] focus:ring-4 focus:ring-[var(--color-primary-light)]/10 dark:border-white/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-[var(--color-accent-strong)]/20 bg-[var(--color-accent-strong)]/10 px-4 py-3 text-sm text-[var(--color-accent-strong)]">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[var(--color-primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--color-primary)]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:text-[#101714]"
              >
                {loading ? (
                  "Creating your kitchen..."
                ) : (
                  <>
                    Create my kitchen
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-[var(--color-text-muted)]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent-strong)] dark:text-[var(--color-primary-light)]"
              >
                Log in
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mx-auto mt-6 max-w-6xl text-center text-xs text-[var(--color-text-muted)]">
        Made for curious cooks & hungry minds.
      </p>
    </div>
  );
}

export default Register;