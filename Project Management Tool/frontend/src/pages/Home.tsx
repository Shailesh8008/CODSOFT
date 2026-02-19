import React from "react";
import { Zap, Calendar, BarChart3, ArrowRight, PlayCircle } from "lucide-react";
import type { FeatureProps } from "../interfaces";

const FeatureCard = ({ title, desc, icon }: FeatureProps) => (
  <div className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Now with AI-powered tracking
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight">
              Manage projects <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                without the chaos.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Tasky is the project management tool built for speed. Assign
              tasks, track deadlines, and visualize progress in one clean
              workspace.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-200">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
                <PlayCircle className="w-5 h-5" /> Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="bg-gray-50/50 py-24 px-4 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Rapid Assignment"
                desc="Instantly delegate tasks to your team with smart role management and clear ownership."
              />
              <FeatureCard
                icon={<Calendar className="w-6 h-6" />}
                title="Visual Deadlines"
                desc="Never miss a milestone with our intuitive timeline view and automated reminder system."
              />
              <FeatureCard
                icon={<BarChart3 className="w-6 h-6" />}
                title="Real-time Tracking"
                desc="Get high-level overviews or granular details on how your project is progressing."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
