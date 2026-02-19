import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [isPass, setIsPass] = useState(false);
  const [error, setError] = useState({ email: false, pass: false });
  const [form, setForm] = useState({
    email: "",
    pass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError({
      ...error,
      [e.target.id]: false,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your active projects."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1 w-fit"
          >
            Email Address
            {error.email && (
              <span className="text-red-600 ml-1">*Required</span>
            )}
          </label>
          <div className="relative group">
            <Mail
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all ${error.email ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-500"}`}
            />
            <input
              id="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              placeholder="abc123@gmail.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                error.email
                  ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }  outline-none transition-all`}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label
              htmlFor="pass"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
              {error.pass && (
                <span className="text-red-600 ml-1">*Required</span>
              )}
            </label>
            <Link to="" className="text-sm text-blue-600 hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative group">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error.pass ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-500"} transition-all`}
            />
            <input
              id="pass"
              type={isPass ? "text" : "password"}
              value={form.pass}
              onChange={handleChange}
              placeholder={isPass ? "strong@pass" : "••••••••••"}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                error.pass
                  ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              } outline-none transition-all`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none"
              onClick={() => setIsPass(!isPass)}
            >
              {isPass ? (
                <FaEye className="h-5 w-5" aria-hidden="true" />
              ) : (
                <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group cursor-pointer">
          Sign In{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
