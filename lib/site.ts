import {
  AirVent,
  BadgeCheck,
  Building2,
  Fan,
  Flame,
  HeartPulse,
  Home,
  ShieldCheck,
  Snowflake,
  ThermometerSun,
  Wrench,
} from "lucide-react";
import type {
  BlogPost,
  FaqItem,
  NavItem,
  Project,
  Service,
  ServiceArea,
  SiteSettings,
  Testimonial,
} from "@/types/content";

export const business: SiteSettings & { rating: string; reviews: string } = {
  name: "Apex HVAC",
  phone: "(555) 019-4820",
  email: "service@apexcomfort.test",
  address: "1240 Market Street, Springfield, USA",
  hours: "Mon-Sat 7:00 AM-8:00 PM",
  rating: "4.9",
  reviews: "1,240+",
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AC Repair", href: "/services/ac-repair" },
      { label: "AC Installation", href: "/services/ac-installation" },
      { label: "Heating Repair", href: "/services/heating-repair" },
      { label: "Maintenance Plans", href: "/services/maintenance-plans" },
    ],
  },
  { label: "Before/After", href: "/before-after" },
  { label: "Financing", href: "/financing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const standardFaqs: FaqItem[] = [
  {
    question: "Do you offer same-day service?",
    answer:
      "Yes. Same-day appointments are available for urgent heating and cooling issues whenever schedule capacity allows.",
    id: 1,
  },
  {
    question: "Are estimates free?",
    answer:
      "Replacement and installation estimates are free. Diagnostic repair visits include an upfront trip and inspection fee.",
    id: 2,
  },
  {
    question: "Do you service all major brands?",
    answer:
      "Our licensed technicians service all major residential and light commercial HVAC brands.",
    id: 3,
  },
];

export const serviceIconMap = {
  ac: Snowflake,
  fan: Fan,
  heating: Flame,
  furnace: ThermometerSun,
  heatPump: AirVent,
  airQuality: HeartPulse,
  commercial: Building2,
  maintenance: ShieldCheck,
  default: Wrench,
};

export const services: Service[] = [
  {
    slug: "ac-repair",
    title: "AC Repair",
    summary: "Fast diagnostics and lasting repairs for cooling issues.",
    description:
      "Restore comfort with precise troubleshooting, transparent repair options, and stocked service vehicles for common AC failures.",
    benefits: [
      "Same-day cooling repairs",
      "Upfront recommendations",
      "Warranty-backed parts",
    ],
    symptoms: [
      "Warm air from vents",
      "Short cycling",
      "Frozen coils",
      "Unusual noises",
    ],
    faqs: standardFaqs,
    icon: Snowflake,
  },
  {
    slug: "ac-installation",
    title: "AC Installation",
    summary: "High-efficiency cooling systems designed for your home.",
    description:
      "Get a properly sized air conditioner with clean installation, smart thermostat options, and energy-saving guidance.",
    benefits: [
      "Load calculations",
      "Premium equipment options",
      "Clean removal and setup",
    ],
    symptoms: [
      "System is 12+ years old",
      "Frequent breakdowns",
      "Rising energy bills",
    ],
    faqs: standardFaqs,
    icon: Fan,
  },
  {
    slug: "heating-repair",
    title: "Heating Repair",
    summary: "Reliable furnace and heat system repairs before comfort drops.",
    description:
      "We diagnose ignition, airflow, sensor, and safety issues so your heating system runs safely and consistently.",
    benefits: [
      "Safety-first inspections",
      "Emergency heat restoration",
      "Clear repair pricing",
    ],
    symptoms: [
      "No heat",
      "Burning smells",
      "Pilot or ignition failure",
      "Cold rooms",
    ],
    faqs: standardFaqs,
    icon: Flame,
  },
  {
    slug: "furnace-installation",
    title: "Furnace Installation",
    summary: "Quiet, efficient furnaces installed with care.",
    description:
      "Upgrade to a right-sized furnace with better comfort control, lower operating noise, and professional commissioning.",
    benefits: [
      "Efficiency matching",
      "Permit-ready installation",
      "Old unit haul-away",
    ],
    symptoms: ["Cracked heat exchanger", "Uneven heat", "Costly repairs"],
    faqs: standardFaqs,
    icon: ThermometerSun,
  },
  {
    slug: "heat-pumps",
    title: "Heat Pumps",
    summary: "Year-round heating and cooling with efficient heat pump systems.",
    description:
      "Design, installation, and repair for ducted and ductless heat pumps that fit modern comfort needs.",
    benefits: [
      "Dual heating and cooling",
      "Ductless options",
      "Lower energy use",
    ],
    symptoms: ["Weak airflow", "Icing outdoor unit", "Aux heat overuse"],
    faqs: standardFaqs,
    icon: AirVent,
  },
  {
    slug: "indoor-air-quality",
    title: "Indoor Air Quality",
    summary:
      "Cleaner air with filtration, humidity, and purification solutions.",
    description:
      "Improve indoor air through whole-home filtration, UV purification, balanced humidity, and ventilation upgrades.",
    benefits: ["Allergy relief", "Humidity control", "Cleaner ducts and air"],
    symptoms: ["Dust buildup", "Dry air", "Odors", "Allergy flare-ups"],
    faqs: standardFaqs,
    icon: HeartPulse,
  },
  {
    slug: "commercial-hvac",
    title: "Commercial HVAC",
    summary:
      "Responsive service for offices, retail, and light commercial systems.",
    description:
      "Keep business comfortable with planned maintenance, repairs, and replacements for rooftop and split systems.",
    benefits: [
      "Priority dispatch",
      "Maintenance reporting",
      "Rooftop unit support",
    ],
    symptoms: ["Tenant complaints", "Hot zones", "Noisy equipment"],
    faqs: standardFaqs,
    icon: Building2,
  },
  {
    slug: "maintenance-plans",
    title: "Maintenance Plans",
    summary: "Prevent breakdowns with seasonal tune-ups and priority service.",
    description:
      "Protect equipment life with recurring inspections, cleanings, safety checks, and member-only savings.",
    benefits: [
      "Two annual tune-ups",
      "Priority scheduling",
      "Repair discounts",
    ],
    symptoms: [
      "Missed tune-ups",
      "Warranty requirements",
      "Unexpected breakdowns",
    ],
    faqs: standardFaqs,
    icon: ShieldCheck,
  },
];

export const features = [
  {
    title: "Licensed Technicians",
    text: "Background-checked pros trained on modern residential and commercial equipment.",
    icon: BadgeCheck,
  },
  {
    title: "Upfront Pricing",
    text: "Clear options before work starts, with no pressure and no surprise add-ons.",
    icon: Wrench,
  },
  {
    title: "Local Comfort Experts",
    text: "Service plans tailored to local weather, homes, utility rates, and comfort goals.",
    icon: Home,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Maya R.",
    text: "The technician explained every option and had our AC cooling again the same afternoon.",
    rating: 5,
  },
  {
    name: "Jordan K.",
    text: "Clean installation, fair financing, and the new system is much quieter than our old unit.",
    rating: 5,
  },
  {
    name: "Elena P.",
    text: "Their maintenance plan caught a furnace issue before winter. Worth every penny.",
    rating: 5,
  },
];

export const projects: Project[] = [
  {
    title: "High-Efficiency AC Upgrade",
    location: "North Springfield",
    service: "AC Installation",
    summary:
      "Replaced an aging condenser and air handler with a high-efficiency matched system.",
    before: "Older outdoor unit with restricted airflow",
    after: "New quiet condenser with clean line set",
  },
  {
    title: "Whole-Home Air Quality Refresh",
    location: "Westfield",
    service: "Indoor Air Quality",
    summary:
      "Added media filtration and humidity control for a family with allergy concerns.",
    before: "Dusty return and basic filter rack",
    after: "Sealed cabinet with upgraded filtration",
  },
  {
    title: "Commercial Rooftop Recovery",
    location: "Downtown",
    service: "Commercial HVAC",
    summary:
      "Restored cooling for a retail space and enrolled the property in planned maintenance.",
    before: "Aging rooftop unit with repeated shutdowns",
    after: "Serviced unit with documented performance checks",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "signs-your-ac-needs-repair",
    title: "Signs Your AC Needs Repair",
    category: "AC Repair",
    excerpt:
      "Learn the early warning signs that your cooling system needs a professional inspection.",
    readTime: "6 min read",
    publishedAt: "2026-05-08",
    content:
      "<p>Start with airflow, age, maintenance history, and changes in comfort. Small warning signs often point to fixable issues when they are handled early.</p>",
  },
  {
    slug: "hvac-maintenance-checklist",
    title: "HVAC Maintenance Checklist",
    category: "HVAC Maintenance",
    excerpt:
      "A seasonal checklist for keeping your system efficient, clean, and reliable.",
    readTime: "8 min read",
    publishedAt: "2026-05-16",
    content:
      "<p>Seasonal inspections help reduce surprise breakdowns and keep energy use under control during peak heating and cooling months.</p>",
  },
  {
    slug: "ac-vs-heat-pump",
    title: "AC vs Heat Pump",
    category: "Energy Saving",
    excerpt:
      "Compare comfort, efficiency, and cost differences before replacing your cooling system.",
    readTime: "7 min read",
    publishedAt: "2026-05-24",
    content:
      "<p>Compare energy use, warranty coverage, and comfort performance before deciding between an AC and a heat pump.</p>",
  },
];

export const serviceAreas: ServiceArea[] = [
  "Springfield",
  "Westfield",
  "Oak Ridge",
  "Riverside",
  "Fairview",
  "Cedar Park",
  "Lakeview",
  "North Hills",
  "Downtown",
  "Brookside",
  "Greendale",
  "Maple Grove",
].map((city) => ({
  city,
  state: "",
  slug: city.toLowerCase().replace(/\s+/g, "-"),
}));

export const faqs: FaqItem[] = [
  ...standardFaqs,
  {
    question: "Do you offer financing?",
    answer:
      "Yes. Qualified customers can choose flexible monthly payment options for replacements and major repairs.",
    id: 1,
  },
  {
    question: "How often should HVAC systems be maintained?",
    answer:
      "Most systems should be professionally maintained twice a year: once before cooling season and once before heating season.",
    id: 2,
  },
];
