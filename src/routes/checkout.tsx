import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart, formatINR } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Sharma Enterprises" }] }),
  component: CheckoutPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email"),
  address: z.string().trim().min(10, "Enter complete address").max(300),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a 6-digit pincode"),
});

function CheckoutPage() {
  const { lines, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "" });
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState<string | null>(null);

  const shipping = subtotal > 0 && subtotal < 2000 ? 99 : 0;
  const total = subtotal + shipping;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const orderId = "SE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      const orders = JSON.parse(localStorage.getItem("se-orders") || "[]");
      orders.unshift({
        id: orderId, date: new Date().toISOString(), status: "Confirmed", total,
        items: lines.map(l => ({ id: l.product.id, name: l.product.name, qty: l.qty, price: l.product.price })),
        customer: parsed.data, payment,
      });
      localStorage.setItem("se-orders", JSON.stringify(orders.slice(0, 50)));
    } catch {}
    clear();
    setPlaced(orderId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-4 font-display text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for your order. We'll WhatsApp you shipping updates shortly.</p>
        <div className="mt-6 rounded-xl border bg-card p-6">
          <div className="text-sm text-muted-foreground">Order ID</div>
          <div className="font-display text-2xl font-bold tracking-wider">{placed}</div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => navigate({ to: "/track-order", search: { id: placed } })}>Track this order</Button>
          <Button variant="outline" asChild><Link to="/products">Continue shopping</Link></Button>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
        <Button asChild className="mt-4"><Link to="/products">Shop products</Link></Button>
      </div>
    );
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Checkout</h1>
      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-semibold">Contact & shipping</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="name">Full name</Label><Input id="name" value={form.name} onChange={set("name")} required maxLength={80} /></div>
              <div><Label htmlFor="phone">Mobile</Label><Input id="phone" inputMode="tel" value={form.phone} onChange={set("phone")} required maxLength={10} /></div>
              <div className="sm:col-span-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={set("email")} required maxLength={120} /></div>
              <div className="sm:col-span-2"><Label htmlFor="address">Address</Label><Textarea id="address" value={form.address} onChange={set("address")} required rows={3} maxLength={300} /></div>
              <div><Label htmlFor="city">City</Label><Input id="city" value={form.city} onChange={set("city")} required maxLength={60} /></div>
              <div><Label htmlFor="state">State</Label><Input id="state" value={form.state} onChange={set("state")} required maxLength={60} /></div>
              <div><Label htmlFor="pincode">Pincode</Label><Input id="pincode" inputMode="numeric" value={form.pincode} onChange={set("pincode")} required maxLength={6} /></div>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-semibold">Payment method</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="mt-4 space-y-3">
              {[
                { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                { id: "upi", label: "UPI / Net banking", desc: "Pay securely via UPI" },
                { id: "card", label: "Credit / Debit card", desc: "Visa, Mastercard, RuPay" },
              ].map(p => (
                <Label key={p.id} htmlFor={p.id} className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem id={p.id} value={p.id} />
                  <div><div className="font-medium">{p.label}</div><div className="text-xs text-muted-foreground">{p.desc}</div></div>
                </Label>
              ))}
            </RadioGroup>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-xl border bg-card p-6 shadow-card">
          <h2 className="font-semibold">Your order</h2>
          <ul className="space-y-3 text-sm">
            {lines.map(l => (
              <li key={l.product.id} className="flex justify-between gap-3">
                <span className="line-clamp-2">{l.product.name} <span className="text-muted-foreground">× {l.qty}</span></span>
                <span className="shrink-0 font-medium">{formatINR(l.total)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t pt-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-success">FREE</span> : formatINR(shipping)}</dd></div>
            <div className="flex justify-between border-t pt-2 text-base font-bold"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          <Button type="submit" className="w-full" size="lg">Place order</Button>
          <p className="text-xs text-muted-foreground">By placing your order you agree to our terms.</p>
        </aside>
      </form>
    </div>
  );
}
