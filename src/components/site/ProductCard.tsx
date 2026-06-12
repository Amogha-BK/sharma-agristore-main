import { Link } from "@tanstack/react-router";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatINR, useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-card transition hover:shadow-lift">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2 py-0.5 text-xs font-semibold text-destructive-foreground">
            {discount}% OFF
          </span>
        )}
        {product.tags.includes("bestseller") && (
          <span className="absolute right-3 top-3 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
            Bestseller
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.brand}</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 stroke-amber-400" /> {product.rating}</span>
        </div>
        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 font-medium leading-snug hover:text-primary">
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="text-lg font-bold text-foreground">{formatINR(product.price)}</div>
            {product.mrp > product.price && (
              <div className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</div>
            )}
          </div>
          <Button size="sm" onClick={() => { add(product.id); toast.success("Added to cart", { description: product.name }); }} className="shrink-0">
            <ShoppingCart className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>
        {!product.inStock && <Badge variant="destructive" className="w-fit">Out of stock</Badge>}
      </div>
    </div>
  );
}
