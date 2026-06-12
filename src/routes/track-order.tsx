import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Circle, Package, Truck, Home } from "lucide-react";
import { formatINR } from "@/lib/cart";

const searchSchema = z.object({ id: fallback(z.string(), "").default("") });

export const Route = createFileRoute("/track-order")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({ meta: [{ title: "Track Order — Sharma Enterprises" }] }),
  component: TrackPage,
});

interface OrderRecord { id: string; date: string; status: string; total: number; items: { id: string; name: string; qty: number; price: number }[] }

const stages = [
  { key: "Confirmed", icon: CheckCircle2, label: "Order confirmed" },
  { key: "Packed", icon: Package, label: "Packed at warehouse" },
  { key: "Shipped", icon: Truck, label: "Shipped (cold-chain)" },
  { key: "Delivered", icon: Home, label: "Delivered" },
];

function TrackPage() {
  const { id } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [input, setInput] = useState(id);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => { if (id) lookup(id); /* eslint-disable-next-line */ }, [id]);

  const lookup = (orderId: string) => {
    setSearched(true);
    try {
      const list: OrderRecord[] = JSON.parse(localStorage.getItem("se-orders") || "[]");
      setOrder(list.find(o => o.id.toUpperCase() === orderId.trim().toUpperCase()) || null);
    } catch { setOrder(null); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ search: { id: input.trim() } });
    lookup(input);
  };

  // Simulate progression by date for demo realism
  const stageIdxFor = (o: OrderRecord) => {
    const hours = (Date.now() - new Date(o.date).getTime()) / 36e5;
    if (hours < 1) return 0;
    if (hours < 24) return 1;
    if (hours < 72) return 2;
    return 3;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Track your order</h1>
      <p className="mt-1 text-muted-foreground">Enter your Order ID to see real-time status.</p>
      <form onSubmit={submit} className="mt-6 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="oid" className="sr-only">Order ID</Label>
          <Input id="oid" placeholder="e.g. SE-AB12CD" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <Button type="submit" size="lg">Track</Button>
      </form>

      {searched && !order && (
        <div className="mt-8 rounded-xl border bg-card p-8 text-center text-muted-foreground">
          We couldn't find that order. Please check the ID or contact our helpline.
        </div>
      )}

      {order && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Order ID</div>
                <div className="font-display text-xl font-bold">{order.id}</div>
              </div>
              <div className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleString("en-IN")}</div>
              <div className="font-semibold">{formatINR(order.total)}</div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-semibold">Status</h2>
            <ol className="mt-5 space-y-5">
              {stages.map((s, i) => {
                const active = i <= stageIdxFor(order);
                const Icon = active ? s.icon : Circle;
                return (
                  <li key={s.key} className="flex items-start gap-3">
                    <Icon className={`h-6 w-6 ${active ? "text-success" : "text-muted-foreground/40"}`} />
                    <div>
                      <div className={`font-medium ${active ? "" : "text-muted-foreground"}`}>{s.label}</div>
                      {i === stageIdxFor(order) && <div className="text-xs text-muted-foreground">In progress</div>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-semibold">Items</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {order.items.map(i => (
                <li key={i.id} className="flex justify-between">
                  <span>{i.name} × {i.qty}</span>
                  <span className="font-medium">{formatINR(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
