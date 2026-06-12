import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getByCategory, getCategory, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category as CategorySlug);
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.category.name} — Sharma Enterprises` },
      { name: "description", content: `${loaderData.category.name}: ${loaderData.category.tagline}. Order online with cold-chain dispatch.` },
    ] : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Category not found</h1>
      <Link to="/products" className="mt-4 inline-block text-primary hover:underline">Browse all products</Link>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = getByCategory(category.slug);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/products" className="hover:text-foreground">Shop</Link> /{" "}
        <span className="text-foreground">{category.name}</span>
      </nav>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{category.name}</h1>
          <p className="mt-1 text-muted-foreground">{category.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c.slug !== category.slug).map(c => (
            <Link key={c.slug} to="/products/$category" params={{ category: c.slug }}
              className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
