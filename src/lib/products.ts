import vaccinesImg from "@/assets/cat-vaccines.jpg";
import medicinesImg from "@/assets/cat-medicines.jpg";
import supplementsImg from "@/assets/cat-supplements.jpg";
import chemicalsImg from "@/assets/cat-chemicals.jpg";

export type CategorySlug = "vaccines" | "medicines" | "supplements" | "chemicals";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  mrp: number;
  unit: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  shortDescription: string;
  description: string;
  composition: string;
  dosage: string;
  image: string;
  tags: string[];
}

export const categories: Category[] = [
  { slug: "vaccines", name: "Poultry Vaccines", tagline: "Disease prevention you can trust", image: vaccinesImg },
  { slug: "medicines", name: "Veterinary Medicines", tagline: "Treat infections fast", image: medicinesImg },
  { slug: "supplements", name: "Feed Supplements", tagline: "Boost growth & immunity", image: supplementsImg },
  { slug: "chemicals", name: "Farm Chemicals", tagline: "Biosecurity & hygiene", image: chemicalsImg },
];

const make = (
  id: string, name: string, category: CategorySlug, brand: string,
  price: number, mrp: number, unit: string,
  shortDescription: string, composition: string, dosage: string,
  image: string, tags: string[] = [], rating = 4.5, reviews = 42, inStock = true,
): Product => ({
  id, name, category, brand, price, mrp, unit,
  shortDescription,
  description: shortDescription + " Manufactured under GMP standards and stored cold-chain where required. Recommended by leading poultry consultants across India.",
  composition, dosage, image, tags, rating, reviews, inStock,
});

export const products: Product[] = [
  make("v-001", "Newcastle Disease Vaccine (LaSota)", "vaccines", "VetCare", 320, 380, "1000 doses",
    "Live lyophilized vaccine for active immunization of chickens against Newcastle Disease.",
    "Live attenuated NDV LaSota strain ≥ 10^6.5 EID50/dose",
    "Drinking water or eye drop, day 5–7 and booster at day 21.",
    vaccinesImg, ["bestseller", "cold-chain"], 4.8, 312),
  make("v-002", "IBD (Gumboro) Intermediate Plus", "vaccines", "BioShield", 450, 520, "1000 doses",
    "Protects broilers and layers against Infectious Bursal Disease.",
    "Live attenuated IBDV intermediate-plus strain", "Drinking water at day 14 and 21.",
    vaccinesImg, ["cold-chain"], 4.7, 198),
  make("v-003", "Marek's Disease HVT Vaccine", "vaccines", "VetCare", 680, 760, "1000 doses",
    "Day-old chick vaccination against Marek's disease.",
    "Cell-associated HVT FC126", "Subcutaneous injection at hatchery, 0.2 ml/chick.",
    vaccinesImg, ["cold-chain"], 4.6, 142),
  make("v-004", "Infectious Bronchitis Vaccine H120", "vaccines", "BioShield", 290, 340, "1000 doses",
    "Live vaccine for IB protection in broilers and layers.",
    "Live attenuated IBV H120 strain", "Spray or drinking water at day 1 and 14.",
    vaccinesImg, [], 4.5, 88),

  make("m-001", "Enrofloxacin 10% Oral Solution", "medicines", "PoultryMed", 240, 290, "1 litre",
    "Broad spectrum antibiotic for respiratory and enteric infections.",
    "Enrofloxacin 100 mg/ml",
    "1 ml per 2 litres of drinking water for 3–5 days.",
    medicinesImg, ["bestseller"], 4.7, 421),
  make("m-002", "Amoxicillin 20% Soluble Powder", "medicines", "PoultryMed", 180, 220, "100 g",
    "Treatment of bacterial infections including CRD and coryza.",
    "Amoxicillin trihydrate 200 mg/g",
    "1 g per 4 litres of water for 5 days.",
    medicinesImg, [], 4.5, 256),
  make("m-003", "Tylosin Tartrate Soluble Powder", "medicines", "VetCare", 320, 380, "100 g",
    "Effective against mycoplasma and gram-positive bacteria.",
    "Tylosin tartrate 1000 mg/g",
    "0.5 g per litre of drinking water for 3–5 days.",
    medicinesImg, [], 4.6, 134),
  make("m-004", "Toltrazuril 2.5% Oral Suspension", "medicines", "BioShield", 410, 480, "1 litre",
    "Anticoccidial for prevention and treatment of coccidiosis.",
    "Toltrazuril 25 mg/ml",
    "7 mg/kg body weight for 2 consecutive days.",
    medicinesImg, [], 4.7, 188),

  make("s-001", "Liver Tonic with Silymarin", "supplements", "GrowMax", 260, 310, "1 litre",
    "Herbal liver protectant to improve FCR and detoxify aflatoxins.",
    "Silymarin, Andrographis, Phyllanthus, B-complex",
    "1 ml per litre of drinking water for 5 days/month.",
    supplementsImg, ["bestseller", "herbal"], 4.8, 502),
  make("s-002", "Electrolyte & Vitamin C Powder", "supplements", "GrowMax", 95, 120, "100 g",
    "Anti-stress formulation for heat stress and post-vaccination.",
    "Vit C 50g, Glucose, Sodium, Potassium",
    "1 g per litre of water for 3 days.",
    supplementsImg, [], 4.6, 388),
  make("s-003", "Calcium + D3 Suspension for Layers", "supplements", "BioShield", 350, 410, "1 litre",
    "Improves egg shell quality and prevents leg weakness.",
    "Calcium gluconate, Vitamin D3, Phosphorus",
    "2 ml per litre of water, alternate days.",
    supplementsImg, [], 4.7, 271),
  make("s-004", "Probiotic Gut Health Powder", "supplements", "GrowMax", 480, 560, "500 g",
    "Multi-strain probiotic for improved digestion and FCR.",
    "Lactobacillus, Bacillus subtilis, Saccharomyces ≥10^9 CFU/g",
    "500 g per ton of feed, continuous.",
    supplementsImg, ["herbal"], 4.8, 612),

  make("c-001", "Glutaraldehyde Disinfectant 25%", "chemicals", "FarmGuard", 540, 620, "5 litre",
    "Broad spectrum farm disinfectant for footbaths and surfaces.",
    "Glutaraldehyde 25%, QAC 10%",
    "1:200 dilution for routine disinfection.",
    chemicalsImg, ["bestseller"], 4.7, 219),
  make("c-002", "Iodine Teat Dip / Sanitizer", "chemicals", "FarmGuard", 380, 440, "5 litre",
    "PVP-Iodine sanitizer for drinking water and equipment.",
    "PVP-Iodine 1.75% available iodine",
    "5 ml per 10 litres of drinking water.",
    chemicalsImg, [], 4.5, 96),
  make("c-003", "Insecticide Spray Concentrate", "chemicals", "FarmGuard", 290, 340, "1 litre",
    "Controls darkling beetles, flies and mites in poultry sheds.",
    "Cypermethrin 10% EC",
    "10 ml per litre, spray on walls and litter.",
    chemicalsImg, [], 4.4, 78),
  make("c-004", "Fogging Solution for Poultry Sheds", "chemicals", "BioShield", 620, 720, "5 litre",
    "Aerial disinfectant for use in occupied poultry houses.",
    "Hydrogen peroxide 50% + Silver",
    "Fog at 1:100 dilution weekly.",
    chemicalsImg, [], 4.6, 145),
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const getByCategory = (slug: CategorySlug) => products.filter(p => p.category === slug);
export const getCategory = (slug: CategorySlug) => categories.find(c => c.slug === slug);
export const featured = () => products.filter(p => p.tags.includes("bestseller"));

export const BRANDS = Array.from(new Set(products.map(p => p.brand)));
