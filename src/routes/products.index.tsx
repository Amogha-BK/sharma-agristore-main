import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { categories, products, BRANDS, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["popular", "price-asc", "price-desc", "rating"]), "popular").default("popular"),
});

export const Route = createFileRoute("/products/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Shop All Products — Sharma Enterprises" },
      { name: "description", content: "Browse our full catalogue of poultry vaccines, veterinary medicines, feed supplements and farm chemicals." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { q, category, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (q) {
      const term = q.toLowerCase();
      list = list.filter(p => (p.name + " " + p.brand + " " + p.shortDescription).toLowerCase().includes(term));
    }
    if (category) list = list.filter(p => p.category === category);
    if (brands.length) list = list.filter(p => brands.includes(p.brand));
    list = list.filter(p => p.price <= maxPrice);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => Number(b.tags.includes("bestseller")) - Number(a.tags.includes("bestseller")));
    return list;
  }, [q, category, sort, brands, maxPrice]);

  const toggleBrand = (b: string) =>
    setBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);

  const FilterPanel = () => (
    <aside className="space-y-6 rounded-xl border bg-card p-5 shadow-card">
      <div>
        <h3 className="font-semibold">Category</h3>
        <div className="mt-3 space-y-2">
          <button onClick={() => navigate({ search: (s: typeof Route.types.fullSearchSchema) => ({ ...s, category: "" }) })}
            className={`block w-full rounded px-2 py-1 text-left text-sm ${!category ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"}`}>
            All categories
          </button>
          {categories.map(c => (
            <button key={c.slug}
              onClick={() => navigate({ search: (s: typeof Route.types.fullSearchSchema) => ({ ...s, category: c.slug }) })}
              className={`block w-full rounded px-2 py-1 text-left text-sm ${category === c.slug ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Brand</h3>
        <div className="mt-3 space-y-2">
          {BRANDS.map(b => (
            <div key={b} className="flex items-center gap-2">
              <Checkbox id={`b-${b}`} checked={brands.includes(b)} onCheckedChange={() => toggleBrand(b)} />
              <Label htmlFor={`b-${b}`} className="cursor-pointer text-sm font-normal">{b}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Max price: ₹{maxPrice}</h3>
        <input type="range" min={50} max={1000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full accent-primary" />
      </div>
      <Button variant="outline" size="sm" className="w-full" onClick={() => { setBrands([]); setMaxPrice(1000); navigate({ search: { q: "", category: "", sort: "popular" } }); }}>
        Reset filters
      </Button>
    </aside>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Shop</span></nav>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
        {category ? categories.find(c => c.slug === category)?.name : "All products"}
      </h1>
      <p className="mt-1 text-muted-foreground">{filtered.length} product{filtered.length !== 1 && "s"}{q && ` matching "${q}"`}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block"><FilterPanel /></div>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters(s => !s)}>
              <SlidersHorizontal className="mr-1 h-4 w-4" /> Filters
            </Button>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort:</span>
              <select value={sort} onChange={(e) => navigate({ search: (s: typeof Route.types.fullSearchSchema) => ({ ...s, sort: e.target.value as typeof sort }) })}
                className="rounded-md border bg-background px-3 py-1.5 text-sm">
                <option value="popular">Popular</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
          {showFilters && <div className="mb-5 lg:hidden"><FilterPanel /></div>}

          {filtered.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center">
              <p className="text-muted-foreground">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// silence unused
void ({} as CategorySlug);
