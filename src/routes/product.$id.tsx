import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
import { getProduct, getByCategory } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, formatINR } from "@/lib/cart";
import { waLink } from "@/lib/whatsapp";
import { ProductCard } from "@/components/site/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Sharma Enterprises` },
      { name: "description", content: loaderData.product.shortDescription },
      { property: "og:title", content: loaderData.product.name },
      { property: "og:description", content: loaderData.product.shortDescription },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/products" className="mt-4 inline-block text-primary hover:underline">Browse all products</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = getByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/products" className="hover:text-foreground">Shop</Link> /{" "}
        <Link to="/products/$category" params={{ category: product.category }} className="hover:text-foreground capitalize">{product.category}</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-muted">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <div className="text-sm font-medium text-secondary">{product.brand}</div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 stroke-amber-400" /> <strong>{product.rating}</strong> <span className="text-muted-foreground">({product.reviews} reviews)</span></span>
            {product.inStock
              ? <Badge className="bg-success text-success-foreground hover:bg-success">In stock</Badge>
              : <Badge variant="destructive">Out of stock</Badge>}
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-4xl font-bold">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatINR(product.mrp)}</span>
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-sm font-semibold text-destructive">Save {discount}%</span>
              </>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Pack: {product.unit} · Inclusive of all taxes</p>

          <p className="mt-5 text-foreground/90">{product.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2 hover:bg-muted" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-2 hover:bg-muted" aria-label="Increase"><Plus className="h-4 w-4" /></button>
            </div>
            <Button size="lg" onClick={() => { add(product.id, qty); toast.success("Added to cart"); }} disabled={!product.inStock}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={waLink(`Hi, I'd like to enquire about ${product.name} (${product.id}).`)} target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "Genuine product" },
              { icon: Truck, label: "Cold-chain dispatch" },
              { icon: RefreshCw, label: "Easy returns" },
            ].map(b => (
              <li key={b.label} className="flex items-center gap-2 rounded-lg border bg-card p-3 text-sm">
                <b.icon className="h-4 w-4 text-primary" /> {b.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-5 rounded-xl border bg-card p-5">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="mt-1 text-sm text-foreground/90">{product.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Composition</h3>
              <p className="mt-1 text-sm text-foreground/90">{product.composition}</p>
            </div>
            <div>
              <h3 className="font-semibold">Dosage & Administration</h3>
              <p className="mt-1 text-sm text-foreground/90">{product.dosage}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Related products</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
