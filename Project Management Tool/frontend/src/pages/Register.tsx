import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass1: "",
    pass2: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    pass: false,
    pass1: false,
    pass2: false,
  });
  const [isPass, setIsPass] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError({ ...error, [e.target.id]: false, pass: false });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start your 14-day free trial. No credit card required."
    >
      <form className="space-y-4" onSubmit={handleForm}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1 w-fit"
          >
            Full Name
            {error.name && <span className="text-red-600 ml-1">*Required</span>}
          </label>
          <div className="relative group">
            <User
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error.name ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-500"} transition-all`}
            />
            <input
              id="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Jim Carry"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${error.name ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-transparent"} focus:ring-2 outline-none transition-all`}
            />
          </div>
        </div>

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
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error.email ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-500"} transition-all`}
            />
            <input
              id="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              placeholder="jim@gmail.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                error.email
                  ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
              } focus:ring-2 outline-none transition-all`}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="pass1"
            className="block text-sm font-semibold text-gray-700 mb-1 w-fit"
          >
            Password
            {error.pass1 && (
              <span className="text-red-600 ml-1">*Required</span>
            )}
            {error.pass && (
              <span className="text-red-600 ml-1 text-xs">
                (Passwords do not match)
              </span>
            )}
          </label>
          <div className="relative group">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error.pass1 ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-500"} transition-all`}
            />
            <input
              id="pass1"
              type={isPass ? "text" : "password"}
              value={form.pass1}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                error.pass1 || error.pass2
                  ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
              } focus:ring-2 outline-none transition-all`}
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

        <div>
          <label
            htmlFor="pass2"
            className="block text-sm font-semibold text-gray-700 mb-1 w-fit"
          >
            Confirm Password
            {error.pass2 && (
              <span className="text-red-600 ml-1">*Required</span>
            )}
          </label>
          <div className="relative group">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error.pass2 ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-500"} transition-all`}
            />
            <input
              id="pass2"
              type={isPass ? "text" : "password"}
              value={form.pass2}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${error.pass2 || error.pass ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-transparent"} focus:ring-2 outline-none transition-all`}
            />
          </div>
        </div>

        <div className="flex items-start gap-2 py-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mt-1 rounded text-blue-600"
            id="terms"
          />
          <label
            htmlFor="terms"
            className="text-xs text-gray-500 leading-tight"
          >
            I agree to the{" "}
            <Link to="#" className="text-blue-600 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-blue-600 underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
          Create Account{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already using Tasky?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
