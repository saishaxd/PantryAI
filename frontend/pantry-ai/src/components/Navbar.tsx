import { ChefHat, LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "../context/useTheme";
import { useAuth } from "../context/useAuth";

import { useState } from "react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 py-5">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
            <ChefHat size={22} />
          </div>

          <span className="font-display text-2xl text-[var(--color-primary)]">
            PantryAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/#home"
            className="text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-primary-light)]"
          >
            Home
          </a>

          <a
            href="/#features"
            className="text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary-light)]"
          >
            Features
          </a>

          <a
            href="/#how-it-works"
            className="text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary-light)]"
          >
            How It Works
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              border border-black/10
              text-[var(--color-text)]
              transition-all duration-300
              hover:bg-black/5
              dark:border-white/10
              dark:hover:bg-white/5
            "
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className="
                  absolute left-4 right-4 top-full z-50
                  mt-2
                  rounded-2xl
                  border border-black/5
                  bg-[var(--color-surface)]
                  p-4
                  shadow-xl shadow-black/10
                  dark:border-white/10
                  md:hidden
                "
            >
              <div className="flex flex-col gap-1">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      text-[var(--color-text)]
                      transition
                      hover:bg-[var(--color-primary)]/5
                      hover:text-[var(--color-primary)]
                    "
                >
                  Home
                </Link>

                <a
                  href="/#features"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      text-[var(--color-text)]
                      transition
                      hover:bg-[var(--color-primary)]/5
                      hover:text-[var(--color-primary)]
                    "
                >
                  Features
                </a>

                <a
                  href="/#how-it-works"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      text-[var(--color-text)]
                      transition
                      hover:bg-[var(--color-primary)]/5
                      hover:text-[var(--color-primary)]
                    "
                >
                  How It Works
                </a>

                <div className="my-2 border-t border-black/5 dark:border-white/10" />

                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="
                          rounded-xl px-4 py-3
                          text-sm font-medium
                          text-[var(--color-text)]
                          transition
                          hover:bg-[var(--color-primary)]/5
                          hover:text-[var(--color-primary)]
                        "
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="
                          mt-1 rounded-xl
                          bg-[var(--color-primary)]
                          px-4 py-3
                          text-center
                          text-sm font-semibold text-white
                          transition
                          hover:bg-[var(--color-primary-light)]
                        "
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2">
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Signed in as
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-[var(--color-text)]">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/pantry"
                      onClick={() => setIsMenuOpen(false)}
                      className="
                          rounded-xl px-4 py-3
                          text-sm font-medium
                          text-[var(--color-text)]
                          transition
                          hover:bg-[var(--color-primary)]/5
                          hover:text-[var(--color-primary)]
                        "
                    >
                      My Pantry
                    </Link>

                    <Link
                      to="/saved"
                      onClick={() => setIsMenuOpen(false)}
                      className="
                          rounded-xl px-4 py-3
                          text-sm font-medium
                          text-[var(--color-text)]
                          transition
                          hover:bg-[var(--color-primary)]/5
                          hover:text-[var(--color-primary)]
                        "
                    >
                      Saved Recipes
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="
                          flex w-full items-center gap-2
                          rounded-xl px-4 py-3
                          text-left text-sm
                          text-[var(--color-text-muted)]
                          transition
                          hover:bg-[var(--color-accent-strong)]/5
                          hover:text-[var(--color-accent-strong)]
                        "
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-black/10
                text-[var(--color-text)]
                transition-all duration-300
                hover:bg-black/5
                dark:border-white/10
                dark:hover:bg-white/5
                md:hidden
              "
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logged Out */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="
                  hidden rounded-full
                  px-4 py-2.5
                  text-sm font-semibold
                  text-[var(--color-text)]
                  transition
                  hover:text-[var(--color-primary)]
                  sm:block
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  rounded-full
                  bg-[var(--color-primary)]
                  px-5 py-2.5
                  text-sm font-semibold text-white
                  transition
                  hover:bg-[var(--color-primary-light)]
                "
              >
                <span className="hidden sm:inline">Sign Up</span>

                <span className="sm:hidden">Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              {/* Logged In Navigation */}
              <Link
                to="/pantry"
                className="
                  hidden rounded-full
                  px-4 py-2.5
                  text-sm font-semibold
                  text-[var(--color-text)]
                  transition
                  hover:text-[var(--color-primary)]
                  sm:block
                "
              >
                My Pantry
              </Link>

              <Link
                to="/saved"
                className="
                  hidden rounded-full
                  px-4 py-2.5
                  text-sm font-semibold
                  text-[var(--color-text)]
                  transition
                  hover:text-[var(--color-primary)]
                  lg:block
                "
              >
                Saved Recipes
              </Link>

              {/* User */}
              <div className="group relative">
                <button
                  type="button"
                  className="
                    flex items-center gap-2
                    rounded-full
                    border border-black/10
                    bg-[var(--color-surface)]
                    px-3 py-2
                    text-sm font-medium
                    text-[var(--color-text)]
                    transition
                    hover:border-[var(--color-primary)]/30
                    dark:border-white/10
                  "
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <User size={15} />
                  </span>

                  <span className="hidden max-w-24 truncate sm:block">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown */}
                <div
                  className="
                    invisible absolute right-0 top-full z-50 mt-2
                    w-48
                    translate-y-1
                    rounded-2xl
                    border border-black/5
                    bg-[var(--color-surface)]
                    p-2
                    opacity-0
                    shadow-xl shadow-black/10
                    transition-all duration-200
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    dark:border-white/10
                  "
                >
                  <div className="px-3 py-2">
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Signed in as
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-[var(--color-text)]">
                      {user?.email}
                    </p>
                  </div>

                  <div className="my-1 border-t border-black/5 dark:border-white/10" />

                  <Link
                    to="/pantry"
                    className="
                      block rounded-xl px-3 py-2
                      text-sm text-[var(--color-text)]
                      transition
                      hover:bg-[var(--color-primary)]/5
                      hover:text-[var(--color-primary)]
                    "
                  >
                    My Pantry
                  </Link>

                  <Link
                    to="/saved"
                    className="
                      block rounded-xl px-3 py-2
                      text-sm text-[var(--color-text)]
                      transition
                      hover:bg-[var(--color-primary)]/5
                      hover:text-[var(--color-primary)]
                    "
                  >
                    Saved Recipes
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="
                      flex w-full items-center gap-2
                      rounded-xl px-3 py-2
                      text-left text-sm
                      text-[var(--color-text-muted)]
                      transition
                      hover:bg-[var(--color-accent-strong)]/5
                      hover:text-[var(--color-accent-strong)]
                    "
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
