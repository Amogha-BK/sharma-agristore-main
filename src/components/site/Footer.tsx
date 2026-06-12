import { Link } from "@tanstack/react-router";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">Sharma Enterprises</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Trusted suppliers of poultry vaccines, veterinary medicines, feed supplements and farm chemicals to farmers and distributors across India.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products/$category" params={{ category: "vaccines" }} className="hover:text-foreground">Poultry Vaccines</Link></li>
            <li><Link to="/products/$category" params={{ category: "medicines" }} className="hover:text-foreground">Veterinary Medicines</Link></li>
            <li><Link to="/products/$category" params={{ category: "supplements" }} className="hover:text-foreground">Feed Supplements</Link></li>
            <li><Link to="/products/$category" params={{ category: "chemicals" }} className="hover:text-foreground">Farm Chemicals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/track-order" className="hover:text-foreground">Track Order</Link></li>
            <li><Link to="/account" className="hover:text-foreground">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4" /> <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}>{PHONE_DISPLAY}</a></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4" /> info@sharmaenterprises.in</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> Industrial Area, Karnal, Haryana</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Sharma Enterprises. All rights reserved.</span>
          <span>GST registered · GMP-compliant supply chain</span>
        </div>
      </div>
    </footer>
  );
}
