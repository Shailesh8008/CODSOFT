import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type DashboardOrder = {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
};

type CartEntry = {
  id: string;
  quantity: number;
  price: number;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  return value as Record<string, unknown>;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function readNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);

  const backendUrl =
    (import.meta.env.VITE_BACKEND_URL as string | undefined)?.trim().replace(/\/$/, "") ?? "";

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) {
        setOrders([]);
        setCartItems([]);
        setError(null);
        return;
      }
      if (!backendUrl) {
        setError("Backend URL is missing.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const [ordersRes, cartRes] = await Promise.all([
          fetch(`${backendUrl}/api/myorders`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${backendUrl}/api/fetchcart`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        if (!ordersRes.ok) {
          throw new Error(`Failed to fetch orders (${ordersRes.status})`);
        }
        if (!cartRes.ok) {
          throw new Error(`Failed to fetch cart (${cartRes.status})`);
        }

        const ordersPayload: unknown = await ordersRes.json();
        const ordersRoot = asRecord(ordersPayload);
        if (!ordersRoot || ordersRoot.ok !== true) {
          throw new Error(
            typeof ordersRoot?.message === "string"
              ? ordersRoot.message
              : "Unable to fetch dashboard orders.",
          );
        }

        const cartPayload: unknown = await cartRes.json();
        const cartRoot = asRecord(cartPayload);
        if (!cartRoot || cartRoot.ok !== true) {
          throw new Error(
            typeof cartRoot?.message === "string"
              ? cartRoot.message
              : "Unable to fetch dashboard cart.",
          );
        }

        const orderRows = Array.isArray(ordersRoot.data) ? ordersRoot.data : [];
        const mappedOrders = orderRows
          .map((row) => {
            const rec = asRecord(row);
            if (!rec) {
              return null;
            }
            return {
              id: readString(rec._id) || readString(rec.orderId),
              orderId: readString(rec.orderId),
              amount: readNumber(rec.amount),
              status: readString(rec.status) || "pending",
              createdAt: readString(rec.createdAt),
            };
          })
          .filter((entry): entry is DashboardOrder => entry !== null)
          .sort((a, b) => {
            const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bTime - aTime;
          });

        const cartData = asRecord(cartRoot.data);
        const rawCartItems = Array.isArray(cartData?.CartItems) ? cartData?.CartItems : [];
        const mappedCart = rawCartItems
          .map((item) => {
            const rec = asRecord(item);
            if (!rec) {
              return null;
            }
            const id = readString(rec.id) || readString(rec.productId);
            if (!id) {
              return null;
            }
            return {
              id,
              quantity: Math.max(1, Math.floor(readNumber(rec.quantity) || 1)),
              price: readNumber(rec.price),
            };
          })
          .filter((entry): entry is CartEntry => entry !== null);

        setOrders(mappedOrders);
        setCartItems(mappedCart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, [backendUrl, user]);

  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + order.amount, 0),
    [orders],
  );
  const paidOrders = useMemo(
    () => orders.filter((order) => order.status.toLowerCase() === "paid").length,
    [orders],
  );
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );
  const cartValue = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 px-6 py-10 text-white sm:px-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">User Dashboard</h1>
        <p className="mt-2 text-blue-100">
          {user ? `Welcome back, ${user.name}.` : "Track your account activity and orders."}
        </p>
      </section>

      {!user ? (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-slate-700">Please login to access your dashboard.</p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Go to home
          </Link>
        </section>
      ) : (
        <section className="mt-8 space-y-5">
          {loading && (
            <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              Loading dashboard...
            </p>
          )}
          {error && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Orders</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{orders.length}</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Paid Orders</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{paidOrders}</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Spent</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(totalSpent)}</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cart Snapshot</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{cartCount} item{cartCount === 1 ? "" : "s"}</p>
                  <p className="mt-1 text-sm text-slate-600">{formatCurrency(cartValue)}</p>
                </article>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="text-lg font-semibold text-slate-900">Latest Order</h2>
                  {orders.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-600">No orders yet.</p>
                  ) : (
                    <div className="mt-3 space-y-1 text-sm text-slate-700">
                      <p><span className="font-medium text-slate-900">Order:</span> {orders[0].orderId || "N/A"}</p>
                      <p><span className="font-medium text-slate-900">Amount:</span> {formatCurrency(orders[0].amount)}</p>
                      <p><span className="font-medium text-slate-900">Status:</span> {orders[0].status}</p>
                      <p>
                        <span className="font-medium text-slate-900">Date:</span>{" "}
                        {orders[0].createdAt ? new Date(orders[0].createdAt).toLocaleString() : "N/A"}
                      </p>
                    </div>
                  )}
                  <Link
                    to="/my-orders"
                    className="mt-4 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                  >
                    View all orders
                  </Link>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                  <div className="mt-4 grid gap-2">
                    <Link
                      to="/shop"
                      className="rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      to="/my-orders"
                      className="rounded-xl border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                    >
                      Open My Orders
                    </Link>
                  </div>
                </article>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
