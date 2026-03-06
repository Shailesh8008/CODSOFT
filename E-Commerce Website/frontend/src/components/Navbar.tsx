import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const navLinks = [
  { label: "Shop", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Deals", to: "/" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const switchToRegister = () => {
    closeSignIn();
    openRegister();
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            NovaCart
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openSignIn}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Login
            </button>
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
              Cart (2)
            </button>
          </div>
        </nav>
      </header>

      <Modal isOpen={isSignInOpen} onClose={closeSignIn} title="Sign in">
        <p className="mb-4 text-sm text-slate-600">
          Access your orders, saved products, and personalized deals.
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          New here?{" "}
          <button
            type="button"
            onClick={switchToRegister}
            className="font-semibold text-slate-900 underline-offset-2 underline"
          >
            Click here to create an account
          </button>
        </p>
      </Modal>

      <Modal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        title="Create account"
      >
        <p className="mb-4 text-sm text-slate-600">
          Register to track orders, save favorites, and get faster checkout.
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="register-name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>
            <input
              id="register-name"
              type="text"
              placeholder="Your full name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="register-confirm-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Confirm password
            </label>
            <input
              id="register-confirm-password"
              type="password"
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Create account
          </button>
        </form>
      </Modal>
    </>
  );
}
