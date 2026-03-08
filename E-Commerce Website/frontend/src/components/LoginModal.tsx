import { useState, type ChangeEvent, type SubmitEvent } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Modal from "./Modal";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  onLoginSuccess?: () => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onOpenRegister,
  onLoginSuccess,
}: LoginModalProps) {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector((state) => state.auth.loginStatus);
  const loginError = useAppSelector((state) => state.auth.loginError);
  const [error, setError] = useState({ email: false, pass: false });
  const [form, setForm] = useState({
    email: "",
    pass: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as "email" | "pass";
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError({
      ...error,
      [field]: false,
    });
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = form.email.trim();
    const pass = form.pass.trim();
    if (!email || !pass) {
      setError({
        email: Boolean(!email),
        pass: Boolean(!pass),
      });
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      await dispatch(loginUser({ email, pass })).unwrap();
      toast.success("Login successful");
      onLoginSuccess?.();
      setForm({ email: "", pass: "" });
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign in">
      <p className="mb-4 text-sm text-slate-600">
        Access your orders, saved products, and personalized deals.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="login-email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none ${
              error.email ? "border-rose-500" : "border-slate-300"
            }`}
            required
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="login-password"
            name="pass"
            type="password"
            value={form.pass}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none ${
              error.pass ? "border-rose-500" : "border-slate-300"
            }`}
            required
          />
        </div>

        {loginError && (
          <p className="text-sm text-rose-600">{loginError}</p>
        )}

        <button
          type="submit"
          disabled={loginStatus === "loading"}
          className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 cursor-pointer"
        >
          {loginStatus === "loading" ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        New here?{" "}
        <button
          type="button"
          onClick={onOpenRegister}
          className="font-semibold text-slate-900 underline-offset-2 underline cursor-pointer"
        >
          Create an account
        </button>
      </p>
    </Modal>
  );
}
