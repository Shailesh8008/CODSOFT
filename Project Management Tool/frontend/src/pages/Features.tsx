import React, { useEffect } from "react";
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Component,
  Fingerprint,
  FileText,
  FolderKanban,
  Gauge,
  GitBranch,
  Layers,
  MessageSquareMore,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
  WandSparkles,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const heroHighlights: FeatureItem[] = [
  {
    title: "Live Team Pulse",
    description:
      "See updates, blockers, and completions in one stream without jumping across tabs.",
    icon: <BellRing className="w-5 h-5" />,
  },
  {
    title: "Timeline Confidence",
    description:
      "Keep milestones realistic with planning views that reveal risk before deadlines slip.",
    icon: <CalendarClock className="w-5 h-5" />,
  },
  {
    title: "Delivery Clarity",
    description:
      "Get a clear picture of progress, ownership, and scope so everyone stays aligned.",
    icon: <Gauge className="w-5 h-5" />,
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "Project Workspaces",
    description:
      "Organize every initiative into a clear workspace with tasks, members, timelines, and files in one place.",
    icon: <FolderKanban className="w-5 h-5" />,
  },
  {
    title: "Task Assignment",
    description:
      "Assign work instantly, set owners, and keep accountability visible for everyone on your team.",
    icon: <Users2 className="w-5 h-5" />,
  },
  {
    title: "Deadline Tracking",
    description:
      "Plan deliverables with due dates and stay ahead with timeline-based planning and milestone views.",
    icon: <CalendarClock className="w-5 h-5" />,
  },
  {
    title: "Progress Insights",
    description:
      "Monitor completion rates, bottlenecks, and velocity so you can make better delivery decisions.",
    icon: <Gauge className="w-5 h-5" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Keep communication close to the work with task comments, updates, and clear context history.",
    icon: <MessageSquareMore className="w-5 h-5" />,
  },
  {
    title: "Smart Notifications",
    description:
      "Get alerts for status changes, upcoming deadlines, and important activity without extra noise.",
    icon: <BellRing className="w-5 h-5" />,
  },
];

const workflowFeatures: FeatureItem[] = [
  {
    title: "Status Pipelines",
    description:
      "Move tasks from Not Started to In Progress to Completed with a clean, consistent workflow.",
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    title: "Time Awareness",
    description:
      "Spot aging tasks quickly and keep execution healthy with visibility into task timing.",
    icon: <Clock3 className="w-5 h-5" />,
  },
  {
    title: "Detailed Records",
    description:
      "Maintain clear project documentation and updates so decisions are always traceable.",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Reliable Delivery",
    description:
      "Built-in checks and structured planning help teams ship on time with fewer surprises.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

const valuePillars: FeatureItem[] = [
  {
    title: "Fast Setup",
    description: "Create a structured project space in minutes, not hours.",
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    title: "Focused Work",
    description:
      "Cut context switching with one workspace for tasks and updates.",
    icon: <Target className="w-5 h-5" />,
  },
  {
    title: "Consistent Output",
    description:
      "Ship more predictable releases with clear priorities and ownership.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const executionFlow: FeatureItem[] = [
  {
    title: "Plan",
    description: "Define goals, scope, and deadlines for each project.",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    title: "Assign",
    description: "Delegate tasks with clear ownership and expected outcomes.",
    icon: <Users2 className="w-5 h-5" />,
  },
  {
    title: "Track",
    description: "Monitor status changes and spot blockers in real time.",
    icon: <Fingerprint className="w-5 h-5" />,
  },
  {
    title: "Deliver",
    description:
      "Close the loop with completion visibility and measurable progress.",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

const revealStyle = (delay: number): React.CSSProperties =>
  ({ "--reveal-delay": `${delay}ms` }) as React.CSSProperties;

const FeatureCard: React.FC<FeatureItem & { delay?: number }> = ({
  title,
  description,
  icon,
  delay = 0,
}) => (
  <article
    data-reveal
    className="reveal-on-scroll group bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    style={revealStyle(delay)}
  >
    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </article>
);

const Features: React.FC = () => {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 grid-pattern">
        <div className="feature-orb feature-orb--one" />
        <div className="feature-orb feature-orb--two" />
        <div className="feature-orb feature-orb--three" />

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div data-reveal className="reveal-on-scroll">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-blue-100 text-blue-700 text-sm font-semibold mb-5">
                <WandSparkles className="w-4 h-4" />
                Built for modern delivery teams
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Creative flow.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                  Reliable execution.
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
                Tasky turns project complexity into visible momentum with smart
                planning, clear ownership, and real-time progress signals.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                >
                  Start Free <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition-colors cursor-pointer">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>

            <div
              data-reveal
              className="reveal-on-scroll"
              style={revealStyle(120)}
            >
              <div className="rounded-3xl border border-white/70 bg-white/85 backdrop-blur-md shadow-xl p-6 md:p-7 card-glow">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-slate-900">
                    Live Command Center
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                    Active
                  </span>
                </div>
                <div className="space-y-3">
                  {heroHighlights.map((highlight, index) => (
                    <div
                      key={highlight.title}
                      data-reveal
                      className="reveal-on-scroll p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-200 transition-colors"
                      style={revealStyle(index * 120 + 220)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                          {highlight.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">
                            {highlight.title}
                          </p>
                          <p className="text-slate-600 text-sm mt-0.5">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div data-reveal className="mb-10 reveal-on-scroll">
          <h2 className="text-3xl font-bold text-slate-900">
            Feature Ecosystem
          </h2>
          <p className="text-slate-600 mt-2">
            High-impact capabilities presented in a flexible, visual workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          <div
            data-reveal
            className="reveal-on-scroll lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-3xl p-7 shadow-lg space-y-10"
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-5">
              <Component className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold">
              Everything connects naturally
            </h3>
            <p className="text-blue-100 mt-3 leading-relaxed">
              Projects, tasks, members, and progress all live in a single
              ecosystem. No duplicated updates. No lost context.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {valuePillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  data-reveal
                  className="reveal-on-scroll rounded-xl bg-white/10 border border-white/15 p-3"
                  style={revealStyle(index * 100 + 180)}
                >
                  <div className="text-cyan-200 mb-2">{pillar.icon}</div>
                  <p className="font-semibold text-sm">{pillar.title}</p>
                  <p className="text-xs text-blue-100 mt-1">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {coreFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 90}
            />
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div data-reveal className="mb-10 reveal-on-scroll">
            <h2 className="text-3xl font-bold text-slate-900">
              Workflow Intelligence
            </h2>
            <p className="text-slate-600 mt-2">
              Structured flow with visibility from kickoff to delivery.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
              {executionFlow.map((step, index) => (
                <article
                  key={step.title}
                  data-reveal
                  className="reveal-on-scroll relative bg-slate-50 border border-slate-200 rounded-2xl p-5"
                  style={revealStyle(index * 120)}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-200">
                    {step.icon}
                  </div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Step {index + 1}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowFeatures.map((feature, index) => (
              <div
                key={feature.title}
                data-reveal
                className="reveal-on-scroll bg-slate-900 text-white rounded-2xl p-5"
                style={revealStyle(index * 80 + 180)}
              >
                <div className="text-cyan-300 mb-3">{feature.icon}</div>
                <p className="font-semibold">{feature.title}</p>
                <p className="text-slate-300 text-sm mt-1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div
          data-reveal
          className="reveal-on-scroll bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white card-glow"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-3">
                <Sparkles className="w-4 h-4" />
                Creative UI, practical outcomes
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Ready to upgrade your team workflow?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl">
                Set up your workspace and start tracking meaningful progress in
                minutes.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors w-fit"
            >
              <CheckCircle2 className="w-5 h-5" />
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Features;
