import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export interface CartLine { id: string; qty: number }
export interface CartContextValue {
  items: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lines: { product: Product; qty: number; total: number }[];
}

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "se-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = (id: string, qty = 1) =>
    setItems(prev => {
      const existing = prev.find(l => l.id === id);
      if (existing) return prev.map(l => l.id === id ? { ...l, qty: l.qty + qty } : l);
      return [...prev, { id, qty }];
    });
  const remove = (id: string) => setItems(prev => prev.filter(l => l.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems(prev => qty <= 0 ? prev.filter(l => l.id !== id) : prev.map(l => l.id === id ? { ...l, qty } : l));
  const clear = () => setItems([]);

  const lines = items
    .map(l => { const p = getProduct(l.id); return p ? { product: p, qty: l.qty, total: p.price * l.qty } : null; })
    .filter((x): x is { product: Product; qty: number; total: number } => x !== null);
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const count = items.reduce((s, l) => s + l.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, subtotal, lines }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
