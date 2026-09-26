import { useState } from "react";
import {
  ArrowRight,
  ChefHat,
  Eye,
  EyeOff,
  Heart,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);

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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
            <ChefHat size={22} />
          </div>

          <span className="font-display text-2xl text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            PantryAI
          </span>
        </Link>
      </div>

      {/* Main card */}
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-black/5 bg-[var(--color-surface)] shadow-[0_20px_70px_rgba(27,67,50,0.10)] dark:border-white/5 lg:grid-cols-2">

        {/* Left visual panel */}
        <div className="relative hidden min-h-[650px] overflow-hidden bg-[var(--color-primary)] p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative blobs */}
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[var(--color-primary-light)] opacity-25" />

          <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[var(--color-accent)] opacity-20" />

          {/* Floating ingredients */}
          <div className="absolute right-14 top-28 animate-[bounce_4s_ease-in-out_infinite] text-4xl">
            🥕
          </div>

          <div className="absolute bottom-50 left-12 animate-[bounce_5s_ease-in-out_infinite] text-4xl">
            🍋
          </div>

          <div className="absolute bottom-50 right-24 animate-[bounce_5s_ease-in-out_infinite] text-3xl">
            🌶️
          </div>

          {/* Main visual */}
          <div className="relative z-10">

            <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Sparkles size={30} />
            </div>

            <h1 className="font-display max-w-md text-5xl leading-[1.08]">
              Welcome back,
              <span className="block text-[var(--color-accent)]">
                hungry human.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/75">
              Your pantry is waiting. Pick up where you
              left off and discover what you can cook next.
            </p>
          </div>

          {/* Recipe preview */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wider text-white/50">
                  LAST CRAVING
                </p>

                <p className="mt-1 font-display text-2xl">
                  Paneer Masala
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-primary)]">
                <Heart size={19} fill="currentColor" />
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">
                🇮🇳 Indian
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">
                🌱 Vegetarian
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">
                25 min
              </span>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="flex items-center p-7 sm:p-10 lg:p-14">

          <div className="mx-auto w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold tracking-wide text-[var(--color-accent-strong)]">
                WELCOME BACK
              </p>

              <h2 className="font-display text-4xl sm:text-5xl">
                Let's get cooking.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                Sign in and let's see what your pantry
                can become today.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

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
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent-strong)] dark:text-[var(--color-primary-light)]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
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
                  "Opening your kitchen..."
                ) : (
                  <>
                    Let's cook
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-[var(--color-text-muted)]">
              New to PantryAI?{" "}
              <Link
                to="/register"
                className="font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent-strong)] dark:text-[var(--color-primary-light)]"
              >
                Create an account
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mx-auto mt-6 max-w-6xl text-center text-xs text-[var(--color-text-muted)]">
        Good food starts with a little imagination.
      </p>
    </div>
  );
}

export default Login;