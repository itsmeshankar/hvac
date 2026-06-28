import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const root = process.cwd();
const envPath = path.join(root, ".env.local");
try {
  const env = await fs.readFile(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
} catch {}

const config = {
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  multipleStatements: true,
};
const database = process.env.DATABASE_NAME || "hvac_website";
const connection = await mysql.createConnection(config);
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
await connection.query(`USE \`${database}\``);
const schema = (await fs.readFile(path.join(root, "database", "schema.sql"), "utf8")).replace(/^\uFEFF/, "");
await connection.query(schema);

const hash = async (password) => bcrypt.hash(password, 12);
const superHash = await hash("ChangeThisStrongPassword123!");
const adminHash = await hash("DemoAdmin123!");

await connection.execute(
  `INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, 'superadmin', 'active')
   ON DUPLICATE KEY UPDATE name=VALUES(name), password_hash=VALUES(password_hash), role=VALUES(role), status=VALUES(status)`,
  ["Super Admin", "superadmin@softmandu.com", superHash]
);
await connection.execute(
  `INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, 'admin', 'active')
   ON DUPLICATE KEY UPDATE name=VALUES(name), password_hash=VALUES(password_hash), role=VALUES(role), status=VALUES(status)`,
  ["Demo Admin", "admin@demo.com", adminHash]
);

await connection.execute(
  `INSERT INTO website_settings (id, site_name, primary_phone, email, address, business_hours)
   VALUES (1, 'Apex HVAC', '(555) 019-4820', 'service@apexcomfort.test', '1240 Market Street, Springfield, USA', 'Mon-Sat 7:00 AM-8:00 PM')
   ON DUPLICATE KEY UPDATE site_name=VALUES(site_name), primary_phone=VALUES(primary_phone), email=VALUES(email), address=VALUES(address), business_hours=VALUES(business_hours)`
);

const pages = [
  ["Home", "home", "home"], ["About", "about", "about"], ["Services", "services", "services"], ["Before & After", "before-after", "before_after"], ["Financing", "financing", "financing"], ["Reviews", "reviews", "reviews"], ["Service Areas", "service-areas", "service_areas"], ["Blog", "blog", "blog"], ["FAQ", "faq", "faq"], ["Contact", "contact", "contact"],
];
for (const page of pages) {
  await connection.execute(`INSERT INTO pages (title, slug, page_type, status) VALUES (?, ?, ?, 'published') ON DUPLICATE KEY UPDATE title=VALUES(title), page_type=VALUES(page_type), status=VALUES(status)`, page);
}

const categories = ["AC Repair", "Heating", "Indoor Air Quality", "Energy Saving", "HVAC Maintenance", "Smart Thermostats", "Commercial HVAC", "Seasonal Tips"];
for (const name of categories) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  await connection.execute(`INSERT INTO blog_categories (name, slug, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description)`, [name, slug, `${name} articles and guides`]);
}

const services = [
  ["AC Repair", "ac-repair", "Fast and reliable air conditioning repair services.", 1],
  ["AC Installation", "ac-installation", "Energy-efficient AC installation for homes and businesses.", 2],
  ["Heating Repair", "heating-repair", "Professional heating system repair services.", 3],
  ["Furnace Installation", "furnace-installation", "Reliable furnace installation and replacement.", 4],
  ["Heat Pumps", "heat-pumps", "Heat pump installation, repair, and maintenance.", 5],
  ["Indoor Air Quality", "indoor-air-quality", "Cleaner, healthier indoor air solutions.", 6],
  ["Commercial HVAC", "commercial-hvac", "Commercial HVAC services for businesses.", 7],
  ["Maintenance Plans", "maintenance-plans", "Preventive HVAC maintenance plans.", 8],
];
for (const [title, slug, summary, order] of services) {
  await connection.execute(
    `INSERT INTO services (title, slug, short_description, description, benefits, common_problems, process_steps, faq_content, status, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)
     ON DUPLICATE KEY UPDATE title=VALUES(title), short_description=VALUES(short_description), description=VALUES(description), benefits=VALUES(benefits), common_problems=VALUES(common_problems), process_steps=VALUES(process_steps), faq_content=VALUES(faq_content), status=VALUES(status), sort_order=VALUES(sort_order)`,
    [title, slug, summary, `${summary} Our licensed team provides clear diagnostics and clean workmanship.`, JSON.stringify(["Licensed technicians", "Upfront options", "Warranty-backed work"]), JSON.stringify(["Poor comfort", "High utility bills", "Unusual noise"]), JSON.stringify(["Schedule", "Diagnose", "Approve", "Restore"]), JSON.stringify([{ question: `Do you provide ${title.toLowerCase()}?`, answer: "Yes. Our team services residential and light commercial systems." }]), order]
  );
}

const faqs = [
  ["Do you offer same-day service?", "Yes. Same-day appointments are available whenever schedule capacity allows.", "General", 1],
  ["Do you offer financing?", "Yes. Qualified customers can choose flexible monthly payment options.", "Financing", 2],
  ["How often should HVAC systems be maintained?", "Most systems should be maintained twice per year.", "Maintenance", 3],
];
for (const faq of faqs) await connection.execute(`INSERT INTO faqs (question, answer, category, sort_order, status) VALUES (?, ?, ?, ?, 'published')`, faq);

await connection.execute(`INSERT INTO testimonials (customer_name, customer_location, rating, review_text, source, is_featured, status) VALUES ('Maya R.', 'Springfield', 5, 'The technician explained every option and had our AC cooling again the same afternoon.', 'Google', true, 'published')`);
await connection.execute(`INSERT INTO financing_plans (title, description, features, button_text, button_url, sort_order, status) VALUES ('Flexible Monthly Payments', 'Qualified customers can spread major HVAC costs over time.', ?, 'Apply Now', '/contact', 1, 'published')`, [JSON.stringify(["Fast application", "Clear terms", "Replacement-ready"])]);
await connection.execute(`INSERT INTO service_areas (city, state, slug, description, status) VALUES ('Springfield', '', 'springfield', 'Local HVAC dispatch for Springfield homes and businesses.', 'published') ON DUPLICATE KEY UPDATE city=VALUES(city), description=VALUES(description), status=VALUES(status)`);

const heroSections = [
  ["home", "Premium HVAC Service", "Comfort that holds up in every season.", "Repair, replacement, indoor air quality, and maintenance from licensed technicians who keep the process clear from first call to final walkthrough.", "/contact", "Book Appointment"],
  ["about", "About us", "A local HVAC team built for premium service.", "We combine licensed technical work with clean communication, careful home protection, and practical comfort planning.", "/contact", "Meet The Team"],
  ["services", "HVAC services", "Repair, replace, maintain, and improve comfort.", "Explore premium HVAC services for residential and light commercial properties.", "/contact", "Schedule Service"],
  ["before-after", "Before and after", "See what better comfort looks like.", "Project snapshots that show the work, the improvement, and the service outcome.", "/before-after", "View Projects"],
  ["financing", "Financing", "Comfort upgrades with flexible payments.", "Qualified customers can finance replacement systems, major repairs, and indoor air quality improvements.", "/contact", "Ask About Financing"],
  ["reviews", "Reviews", "Trusted by local homeowners.", "Read what customers say after choosing Apex HVAC for comfort repairs and installations.", "/reviews", "Read Reviews"],
  ["service-areas", "Service areas", "Fast local dispatch across the metro.", "Residential and light commercial HVAC support in nearby neighborhoods and surrounding communities.", "/contact", "Book Local Service"],
  ["blog", "HVAC blog", "Seasonal tips and repair guidance.", "Practical content for energy savings, maintenance, indoor air quality, and replacement planning.", "/blog", "Read Articles"],
  ["faq", "FAQ", "Answers before your appointment.", "Quick guidance on service, pricing, maintenance, financing, and emergency HVAC support.", "/contact", "Still Need Help?"],
  ["contact", "Contact", "Book HVAC service today.", "Tell us what is going on and our team will help you choose the right next step.", "/contact", "Request Appointment"],
];
for (const [slug, eyebrow, title, subtitle, buttonUrl, buttonText] of heroSections) {
  const [[page]] = await connection.query("SELECT id FROM pages WHERE slug=? LIMIT 1", [slug]);
  if (!page) continue;
  const sectionKey = `${slug}_hero`;
  const [[existing]] = await connection.query("SELECT id FROM page_sections WHERE page_id=? AND section_key=? LIMIT 1", [page.id, sectionKey]);
  if (existing) {
    await connection.execute("UPDATE page_sections SET content=?, section_title=?, section_subtitle=?, button_url=?, button_text=?, is_active=1 WHERE id=?", [eyebrow, title, subtitle, buttonUrl, buttonText, existing.id]);
  } else {
    await connection.execute("INSERT INTO page_sections (page_id, section_key, content, section_title, section_subtitle, button_url, button_text, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1)", [page.id, sectionKey, eyebrow, title, subtitle, buttonUrl, buttonText]);
  }
}

await connection.execute(`INSERT INTO blog_posts (category_id, title, slug, excerpt, content, author_name, status, published_at) SELECT id, 'Signs Your AC Needs Repair', 'signs-your-ac-needs-repair', 'Learn the early warning signs that your cooling system needs a professional inspection.', '<h2>Early warning signs</h2><p>Warm air, short cycling, and unusual noise can mean your AC needs repair.</p>', 'Apex HVAC', 'published', NOW() FROM blog_categories WHERE slug='ac-repair' ON DUPLICATE KEY UPDATE title=VALUES(title), excerpt=VALUES(excerpt), content=VALUES(content), status=VALUES(status)`);

await connection.end();
console.log(`Seeded ${database}.`);
