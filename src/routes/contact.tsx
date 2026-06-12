import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PHONE_DISPLAY, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Sharma Enterprises" },
      { name: "description", content: "Talk to Sharma Enterprises about poultry vaccines, medicines, bulk pricing or veterinary support. WhatsApp +91 70158 33269." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile"),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    const text = `New enquiry from ${parsed.data.name}\nPhone: ${parsed.data.phone}\nEmail: ${parsed.data.email}\nSubject: ${parsed.data.subject}\n\n${parsed.data.message}`;
    window.open(waLink(text), "_blank");
    toast.success("Opening WhatsApp to send your enquiry");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Have a question about a product, need bulk pricing, or want veterinary advice? We're here to help.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold">Send us a message</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} /></div>
            <div><Label htmlFor="phone">Mobile</Label><Input id="phone" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={10} /></div>
            <div className="sm:col-span-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={120} /></div>
            <div className="sm:col-span-2"><Label htmlFor="subject">Subject</Label><Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={120} /></div>
            <div className="sm:col-span-2"><Label htmlFor="message">Message</Label><Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} /></div>
          </div>
          <Button type="submit" size="lg" className="mt-5"><MessageCircle className="mr-2 h-4 w-4" /> Send via WhatsApp</Button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="font-semibold">Contact information</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" /> <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="hover:text-primary">{PHONE_DISPLAY}</a></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /> info@sharmaenterprises.in</li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Industrial Area, Karnal, Haryana 132001</li>
            </ul>
          </div>
          <a href={waLink("Hello Sharma Enterprises, I'd like to enquire.")} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-[#25D366] p-5 text-white shadow-card hover:opacity-95">
            <MessageCircle className="h-6 w-6" />
            <div>
              <div className="font-semibold">Chat on WhatsApp</div>
              <div className="text-sm opacity-90">Fastest response, Mon–Sat 9 AM – 7 PM</div>
            </div>
          </a>
        </aside>
      </div>
    </div>
  );
}
