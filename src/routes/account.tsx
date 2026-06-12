import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Package, User } from "lucide-react";
import { formatINR } from "@/lib/cart";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Sharma Enterprises" }] }),
  component: AccountPage,
});

interface AccountUser { name: string; email: string; phone: string }
interface OrderRecord { id: string; date: string; status: string; total: number; items: { id: string; name: string; qty: number; price: number }[] }

const KEY = "se-account";

function AccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
      const o = JSON.parse(localStorage.getItem("se-orders") || "[]");
      setOrders(o);
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && !form.name) return toast.error("Enter your name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Enter a valid email");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    const u: AccountUser = { name: form.name || form.email.split("@")[0], email: form.email, phone: form.phone };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    toast.success(mode === "signup" ? "Account created" : "Welcome back");
  };

  const logout = () => { localStorage.removeItem(KEY); setUser(null); setForm({ name: "", email: "", phone: "", password: "" }); };

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <div className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /><h1 className="font-display text-2xl font-bold">{mode === "login" ? "Sign in" : "Create account"}</h1></div>
          <p className="mt-1 text-sm text-muted-foreground">Manage your orders, addresses and reorder favourites.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div><Label htmlFor="name">Full name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            )}
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
            {mode === "signup" && (
              <div><Label htmlFor="phone">Mobile</Label><Input id="phone" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            )}
            <div><Label htmlFor="password">Password</Label><Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
            <Button type="submit" className="w-full" size="lg">{mode === "login" ? "Sign in" : "Create account"}</Button>
          </form>
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-4 w-full text-center text-sm text-primary hover:underline">
            {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Hello, {user.name}</h1>
          <p className="text-muted-foreground">{user.email}{user.phone && ` · ${user.phone}`}</p>
        </div>
        <Button variant="outline" onClick={logout}><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
      </div>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Package className="h-5 w-5" /> Your orders</h2>
        {orders.length === 0 ? (
          <div className="mt-4 rounded-xl border bg-card p-8 text-center text-muted-foreground">
            No orders yet. <Link to="/products" className="text-primary hover:underline">Start shopping</Link>.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map(o => (
              <div key={o.id} className="rounded-xl border bg-card p-5 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{o.id}</div>
                    <div className="text-xs text-muted-foreground">{new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </div>
                  <div className="text-sm"><span className="rounded-full bg-success/10 px-2 py-0.5 font-medium text-success">{o.status}</span></div>
                  <div className="font-semibold">{formatINR(o.total)}</div>
                  <Button asChild size="sm" variant="outline"><Link to="/track-order" search={{ id: o.id }}>Track</Link></Button>
                </div>
                <ul className="mt-3 text-sm text-muted-foreground">
                  {o.items.map(i => <li key={i.id}>{i.name} × {i.qty}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
