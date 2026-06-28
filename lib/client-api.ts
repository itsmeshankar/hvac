export type ContactLeadPayload = {
  full_name: string;
  phone?: string;
  email?: string;
  service_needed?: string;
  address?: string;
  message?: string;
};

export type AppointmentPayload = {
  full_name: string;
  phone: string;
  email?: string;
  service_needed?: string;
  property_type?: "residential" | "commercial";
  address?: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
  source?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function postJson(path: string, payload: unknown) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }

  return response.json().catch(() => ({ success: true }));
}

export function submitContactLead(payload: ContactLeadPayload) {
  return postJson("/api/contact", payload);
}

export function submitAppointment(payload: AppointmentPayload) {
  return postJson("/api/appointments", { ...payload, source: payload.source ?? "website" });
}

export function submitNewsletter(email: string) {
  return postJson("/api/newsletter", { email });
}
