import React, { useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Layers3,
  MessageSquareText,
  Sparkles,
  TimerReset,
  Users2,
} from "lucide-react";
import { Link } from "react-router-dom";

type WorkflowStep = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const workflowSteps: WorkflowStep[] = [
  {
    title: "Plan With Structure",
    desc: "Break work into clear milestones and map dependencies early.",
    icon: <Layers3 className="w-5 h-5" />,
  },
  {
    title: "Execute In Sync",
    desc: "Keep owners aligned with shared context and live status visibility.",
    icon: <Users2 className="w-5 h-5" />,
  },
  {
    title: "Deliver Reliably",
    desc: "Use measurable progress signals to ship with confidence.",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

const revealStyle = (delay: number): React.CSSProperties =>
  ({ "--reveal-delay": `${delay}ms` }) as React.CSSProperties;

const Home: React.FC = () => {
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
      <section className="relative overflow-hidden border-b border-slate-200 home-blueprint">
        <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-20 pb-14">
          <div data-reveal className="reveal-on-scroll text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-5">
              <Sparkles className="w-4 h-4" />
              One workspace, end-to-end visibility
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
              Project momentum
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                {" "}
                you can see.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Tasky helps teams coordinate work, track delivery risk, and ship
              consistently without the overhead of disconnected tools.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
              >
                View Feature Tour
              </Link>
            </div>
          </div>

          <div
            data-reveal
            className="reveal-on-scroll mt-12 md:mt-14 rounded-3xl border border-white/70 bg-white/90 backdrop-blur-sm p-5 md:p-6 shadow-xl card-glow"
            style={revealStyle(120)}
          >
            <div className="grid lg:grid-cols-12 gap-4">
              <article className="lg:col-span-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-3">
                  Sample Workflow
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <ClipboardList className="w-4 h-4 text-blue-600" />
                    Define sprint priorities
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <MessageSquareText className="w-4 h-4 text-blue-600" />
                    Review feedback thread
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <TimerReset className="w-4 h-4 text-blue-600" />
                    Update milestone timeline
                  </div>
                </div>
              </article>

              <article className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-slate-900">Delivery Health</p>
                  <span className="text-xs font-semibold rounded-full px-2 py-1 bg-emerald-100 text-emerald-700">
                    Preview
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Example Completion</span>
                      <span className="font-semibold text-slate-900">74%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Example Milestones On Track</span>
                      <span className="font-semibold text-slate-900">83%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full w-[83%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                    </div>
                  </div>
                </div>
              </article>

              <article className="lg:col-span-3 rounded-2xl border border-slate-200 bg-slate-900 text-white p-4">
                <p className="text-sm text-slate-300 mb-2">Demo Insight</p>
                <p className="text-3xl font-bold mb-1">+19%</p>
                <p className="text-sm text-slate-300">
                  Example improvement in completion rate.
                </p>
                <div className="mt-4 text-cyan-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </article>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Preview data shown for illustration only. Sign in to see your team&apos;s real metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div data-reveal className="reveal-on-scroll mb-10">
          <h2 className="text-3xl font-bold text-slate-900">How Teams Use Tasky</h2>
          <p className="text-slate-600 mt-2">
            A practical flow built for speed, clarity, and reliable delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {workflowSteps.map((step, index) => (
            <article
              key={step.title}
              data-reveal
              className="reveal-on-scroll rounded-2xl border border-slate-200 bg-white p-5 relative"
              style={revealStyle(index * 100)}
            >
              <span className="absolute top-4 right-4 text-xs font-semibold text-blue-600">
                0{index + 1}
              </span>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div data-reveal className="reveal-on-scroll rounded-2xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Typical Active Projects</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">10-50</p>
          </div>
          <div
            data-reveal
            className="reveal-on-scroll rounded-2xl bg-slate-50 border border-slate-200 p-5"
            style={revealStyle(80)}
          >
            <p className="text-sm text-slate-500">Supported Team Size</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">5-500+</p>
          </div>
          <div
            data-reveal
            className="reveal-on-scroll rounded-2xl bg-slate-50 border border-slate-200 p-5"
            style={revealStyle(160)}
          >
            <p className="text-sm text-slate-500">Task Capacity</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">High Volume</p>
          </div>
          <div
            data-reveal
            className="reveal-on-scroll rounded-2xl bg-slate-50 border border-slate-200 p-5"
            style={revealStyle(240)}
          >
            <p className="text-sm text-slate-500">Delivery Visibility</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">Real-time</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div
          data-reveal
          className="reveal-on-scroll rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Build your next project in Tasky</h2>
              <p className="text-blue-100 text-lg">
                Replace tool sprawl with one focused workspace for execution.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors w-fit"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
