import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Headset, Award, Star } from "lucide-react";
import heroImg from "@/assets/hero-farm.jpg";
import { categories, featured } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sharma Enterprises — Poultry Vaccines, Medicines & Feed Supplements" },
      { name: "description", content: "India's trusted online store for poultry vaccines, veterinary medicines, feed supplements and farm chemicals. Cold-chain dispatch. Bulk pricing for distributors." },
    ],
  }),
  component: Home,
});

const testimonials = [
  { name: "Rajbir Singh", role: "Broiler Farmer, Punjab", quote: "Sharma Enterprises has been our go-to for vaccines for 3 years. Always genuine stock, cold-chain delivery on time.", rating: 5 },
  { name: "Dr. Anita Verma", role: "Poultry Veterinarian", quote: "I recommend their liver tonic and probiotics to all my clients. Quality is consistent and pricing is fair.", rating: 5 },
  { name: "Mahesh Distributors", role: "Distributor, Telangana", quote: "Excellent bulk rates and prompt dispatch. Their team understands the trade and supports us with marketing material too.", rating: 5 },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Genuine · GMP Certified
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Healthier flocks, <span className="text-primary">stronger profits.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Sharma Enterprises supplies poultry vaccines, veterinary medicines, feed supplements and farm chemicals to farmers, distributors and veterinary clinics across India.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/products">Shop products <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={waLink("Hi, I'd like to discuss bulk pricing for my farm.")} target="_blank" rel="noopener noreferrer">Bulk enquiry on WhatsApp</a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              <div><div className="font-display text-2xl font-bold text-primary">15+ yrs</div><div className="text-muted-foreground">in poultry trade</div></div>
              <div><div className="font-display text-2xl font-bold text-primary">5,000+</div><div className="text-muted-foreground">happy farmers</div></div>
              <div><div className="font-display text-2xl font-bold text-primary">PAN India</div><div className="text-muted-foreground">cold-chain</div></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl" aria-hidden />
            <img src={heroImg} alt="Veterinarian vaccinating poultry" width={1536} height={1024} className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-lift" />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "100% Genuine", text: "Direct from authorized brands" },
            { icon: Truck, title: "Cold-chain Dispatch", text: "Insulated packing for vaccines" },
            { icon: Award, title: "Bulk Distributor Pricing", text: "Best rates for traders" },
            { icon: Headset, title: "Veterinary Helpline", text: "Mon–Sat, 9 AM – 7 PM" },
          ].map(f => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Shop by category</h2>
            <p className="mt-2 text-muted-foreground">Curated, vet-approved range for every flock size.</p>
          </div>
          <Link to="/products" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">View all →</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(c => (
            <Link key={c.slug} to="/products/$category" params={{ category: c.slug }}
              className="group overflow-hidden rounded-xl border bg-card shadow-card transition hover:shadow-lift">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Bestsellers</h2>
        <p className="mt-2 text-muted-foreground">What farmers reorder most often.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured().map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground sm:p-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Are you a distributor or large farm?</h2>
            <p className="mt-3 text-primary-foreground/90">Get exclusive bulk pricing, dedicated account manager and priority cold-chain dispatch. Talk to our team today.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href={waLink("Hi, I'm a distributor and would like bulk pricing.")} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground hover:bg-white/10">
                <Link to="/contact">Contact form</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Trusted by farmers across India</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map(t => (
            <figure key={t.name} className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-400" />)}</div>
              <blockquote className="mt-3 text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
