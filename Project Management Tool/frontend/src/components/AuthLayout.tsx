import React from "react";
import { LayoutDashboard, CheckCircle2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    // min-h-screen ensures the background covers the full height
    // bg-white is used for the left side to prevent "bleeding" when zoomed out
    <div className="min-h-screen bg-white flex justify-center">
      {/* Main Container: Limits the width on ultra-wide screens */}
      <div className="w-full max-w-[1600px] grid lg:grid-cols-2">
        {/* Left Side: Form Content */}
        <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 py-12">
          {/* Inner Wrapper: Prevents content from hitting the edges when zoomed out */}
          <div className="max-w-md w-full mx-auto lg:ml-auto lg:mr-0">
            <div className="mb-10 flex items-center gap-2">
              <LayoutDashboard
                className="w-8 h-8 text-indigo-600"
                strokeWidth={2.5}
              />
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                Tasky
              </span>
            </div>

            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {title}
              </h2>
              <p className="text-slate-500">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>

        {/* Right Side: Visual Section */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 p-12 text-white relative overflow-hidden max-w-[40rem]">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>

          <div className="max-w-sm relative z-10">
            <h2 className="text-4xl font-bold mb-8 leading-tight">
              The workflow engine for modern teams.
            </h2>
            <div className="space-y-6">
              {[
                "Manage complex projects with ease",
                "Built-in automation for deadlines",
                "Advanced team analytics dashboard",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center border border-indigo-400">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-indigo-100 group-hover:text-white transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
