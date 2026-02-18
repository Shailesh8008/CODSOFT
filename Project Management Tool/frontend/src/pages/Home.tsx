import React from "react";

const FeatureCard = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Manage projects{" "}
            <span className="text-blue-600">without the chaos.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Cartify helps your team assign tasks, track deadlines, and hit
            milestones in one beautiful, centralized workspace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
              Create Your First Project
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
              Watch Demo
            </button>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="bg-gray-50 py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="🚀"
                title="Rapid Assignment"
                desc="Assign tasks to team members in seconds. Keep roles clear and accountability high."
              />
              <FeatureCard
                icon="📅"
                title="Smart Deadlines"
                desc="Visualize timelines and set milestones. We'll nudge you before things get overdue."
              />
              <FeatureCard
                icon="📈"
                title="Progress Tracking"
                desc="Real-time analytics on project health. See exactly how close you are to the finish line."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
