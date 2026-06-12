import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Users, Globe2, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Sharma Enterprises" },
      { name: "description", content: "Sharma Enterprises is a trusted Indian supplier of poultry vaccines, veterinary medicines, feed supplements and farm chemicals with 15+ years of experience." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-4xl font-extrabold sm:text-5xl">About Sharma Enterprises</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Founded in 2009, Sharma Enterprises has grown into one of North India's most trusted suppliers of poultry health products — serving farmers, distributors, hatcheries and veterinary clinics across the country.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, value: "5,000+", label: "Farmers served" },
          { icon: Globe2, value: "22 states", label: "PAN-India reach" },
          { icon: Award, value: "15+ years", label: "Industry expertise" },
          { icon: HeartHandshake, value: "98%", label: "Repeat customers" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-5 shadow-card">
            <s.icon className="h-6 w-6 text-primary" />
            <div className="mt-3 font-display text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Our mission</h2>
          <p className="mt-3 text-foreground/90">
            To make genuine, vet-approved poultry health products accessible to every farmer in India — at fair prices, delivered fast, with the cold-chain integrity these products demand.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Why farmers choose us</h2>
          <ul className="mt-3 space-y-2 text-foreground/90">
            <li>✓ 100% authentic stock sourced directly from manufacturers</li>
            <li>✓ GMP-compliant warehousing & cold-chain logistics</li>
            <li>✓ Bulk pricing for distributors and large farms</li>
            <li>✓ On-call veterinary support for product usage</li>
            <li>✓ Fast PAN-India dispatch within 24 hours</li>
          </ul>
        </div>
      </section>

      <section className="mt-14 rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground sm:p-12">
        <h2 className="font-display text-3xl font-bold">Partner with us</h2>
        <p className="mt-3 max-w-2xl text-primary-foreground/90">
          Whether you run a backyard flock or manage thousands of birds, our team is ready to help you build a healthier, more profitable operation.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg"><Link to="/contact">Contact us</Link></Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent text-primary-foreground hover:bg-white/10"><Link to="/products">Browse products</Link></Button>
        </div>
      </section>
    </div>
  );
}
