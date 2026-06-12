import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, formatINR } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Sharma Enterprises" }] }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal, count, clear } = useCart();
  const shipping = subtotal > 0 && subtotal < 2000 ? 99 : 0;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Button asChild className="mt-6"><Link to="/products">Start shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {lines.map(({ product, qty, total }) => (
            <div key={product.id} className="flex gap-4 rounded-xl border bg-card p-4 shadow-card">
              <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
                <img src={product.image} alt={product.name} className="h-24 w-24 rounded-lg object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to="/product/$id" params={{ id: product.id }} className="font-medium hover:text-primary">{product.name}</Link>
                    <div className="text-xs text-muted-foreground">{product.brand} · {product.unit}</div>
                  </div>
                  <button onClick={() => remove(product.id)} aria-label="Remove" className="rounded p-1 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border">
                    <button onClick={() => setQty(product.id, qty - 1)} className="p-1.5 hover:bg-muted" aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="p-1.5 hover:bg-muted" aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="font-semibold">{formatINR(total)}</div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        <aside className="h-fit rounded-xl border bg-card p-6 shadow-card">
          <h2 className="font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-success">FREE</span> : formatINR(shipping)}</dd></div>
            {shipping > 0 && <p className="text-xs text-muted-foreground">Add {formatINR(2000 - subtotal)} more for free shipping.</p>}
            <div className="flex justify-between border-t pt-2 text-base font-bold"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          <Button asChild className="mt-5 w-full" size="lg"><Link to="/checkout">Proceed to checkout</Link></Button>
          <Button asChild className="mt-2 w-full" variant="outline"><Link to="/products">Continue shopping</Link></Button>
        </aside>
      </div>
    </div>
  );
}
