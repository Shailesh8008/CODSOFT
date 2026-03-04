const values = [
  {
    title: "Thoughtful Curation",
    description:
      "We shortlist products that solve real everyday problems, not just trends.",
  },
  {
    title: "Operational Speed",
    description:
      "From checkout to doorstep, we optimize for fast dispatch and clear updates.",
  },
  {
    title: "Long-Term Trust",
    description:
      "Simple policies, responsive support, and transparent communication at every step.",
  },
];

const stats = [
  { label: "Customers served", value: "250K+" },
  { label: "Orders delivered", value: "1.2M+" },
  { label: "Partner brands", value: "180+" },
  { label: "On-time delivery", value: "97%" },
];

export default function About() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-100 p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full bg-amber-200/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-900">
            Our Story
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Not another marketplace.
            <span className="block text-orange-600">A smarter one.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-700 sm:text-lg">
            NovaCart was built for people who want fewer tabs, better choices,
            and faster checkouts. We combine curated products with a cleaner
            shopping flow that saves time.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
            >
              <p className="text-3xl font-extrabold tracking-tight text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {values.map((value, index) => (
          <article
            key={value.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
              0{index + 1}
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">{value.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{value.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-3xl bg-slate-900 px-6 py-12 text-white sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
          Mission
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Shopping should feel clear, not chaotic.
        </h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          We design every step around clarity: discover quickly, compare
          confidently, and checkout without friction. Better decisions, less
          effort.
        </p>
      </section>
    </div>
  );
}
