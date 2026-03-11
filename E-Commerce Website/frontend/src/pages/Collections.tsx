import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

function summarizeCategory(name: string, inStock: number, total: number): string {
  if (inStock === total && total > 0) {
    return `All ${total} items in ${name} are currently in stock.`;
  }
  if (inStock === 0) {
    return `Browse ${name} products and check back for upcoming restocks.`;
  }
  return `${inStock} of ${total} items in ${name} are ready to order right now.`;
}

export default function Collections() {
  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  const collections = useMemo(() => {
    const grouped = new Map<
      string,
      {
        title: string;
        total: number;
        inStock: number;
        featuredCount: number;
        imageUrl: string | null;
      }
    >();

    for (const product of products) {
      const title = product.category.trim() || "Uncategorized";
      const current = grouped.get(title) ?? {
        title,
        total: 0,
        inStock: 0,
        featuredCount: 0,
        imageUrl: null,
      };

      current.total += 1;
      if (product.status.toLowerCase() === "in stock") {
        current.inStock += 1;
      }
      if (product.featured) {
        current.featuredCount += 1;
      }
      if (!current.imageUrl && product.imageUrl) {
        current.imageUrl = product.imageUrl;
      }

      grouped.set(title, current);
    }

    return Array.from(grouped.values())
      .sort((a, b) => b.total - a.total || a.title.localeCompare(b.title))
      .map((collection) => ({
        ...collection,
        subtitle: summarizeCategory(
          collection.title,
          collection.inStock,
          collection.total,
        ),
      }));
  }, [products]);

  const trendingTags = useMemo(
    () => collections.slice(0, 5).map((collection) => collection.title),
    [collections],
  );

  const isLoading = status === "idle" || status === "loading";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-slate-900 px-6 py-14 text-white sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
          Curated Collections
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Discover looks built around your lifestyle
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Browse handpicked product groups designed for work, travel, fitness,
          and everyday living. New curation drops weekly.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Trending now</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {trendingTags.map((tag) => (
            <Link
              key={tag}
              to={`/shop?category=${encodeURIComponent(tag)}`}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {isLoading && <p className="mt-10 text-sm text-slate-500">Loading collections...</p>}
      {error && !isLoading && <p className="mt-10 text-sm text-red-600">{error}</p>}

      {!isLoading && !error && (
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
              No collections are available yet.
            </div>
          ) : (
            collections.map((collection) => (
              <article
                key={collection.title}
                className="rounded-2xl border border-slate-200 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-36 overflow-hidden rounded-xl bg-slate-100">
                  {collection.imageUrl ? (
                    <img
                      src={collection.imageUrl}
                      alt={collection.title}
                      className="h-full w-full object-contain"
                    />
                  ) : null}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{collection.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{collection.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                    {collection.total} products
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-700">
                    {collection.inStock} in stock
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    {collection.featuredCount} featured picks
                  </span>
                  <Link
                    to={`/shop?category=${encodeURIComponent(collection.title)}`}
                    className="text-sm font-semibold text-slate-900"
                  >
                    View Collection
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>
      )}
    </div>
  );
}
