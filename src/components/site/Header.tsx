import { Link } from "@tanstack/react-router";
import { ShoppingCart, Search, User, Menu, X, Leaf, PackageSearch } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY } from "@/lib/whatsapp";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/track-order", label: "Track Order" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span className="hidden sm:inline">Free shipping on orders above ₹2,000 · Cold-chain dispatch pan-India</span>
          <span>Helpline: <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="font-semibold hover:underline">{PHONE_DISPLAY}</a></span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold tracking-tight sm:text-lg">Sharma Enterprises</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">Poultry & Veterinary Solutions</span>
          </span>
        </Link>

        <form
          onSubmit={(e) => { e.preventDefault(); window.location.href = `/products?q=${encodeURIComponent(q)}`; }}
          className="hidden flex-1 md:flex"
        >
          <div className="flex w-full items-center rounded-full border bg-muted/50 px-4 py-2 focus-within:ring-2 focus-within:ring-ring">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search vaccines, medicines, supplements..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map(n => (
            <Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Link to="/account" aria-label="Account" className="rounded-full p-2 hover:bg-muted">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-muted">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="border-t md:hidden">
        <form
          onSubmit={(e) => { e.preventDefault(); window.location.href = `/products?q=${encodeURIComponent(q)}`; }}
          className="mx-auto max-w-7xl px-4 py-2"
        >
          <div className="flex w-full items-center rounded-full border bg-muted/50 px-4 py-2">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </form>
      </div>

      {open && (
        <div className="border-t lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {nav.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <Link to="/products" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-primary hover:bg-muted">
              <PackageSearch className="h-4 w-4" /> Browse all categories
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
