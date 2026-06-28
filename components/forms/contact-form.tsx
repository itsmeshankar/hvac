import type React from "react";
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { submitAppointment, submitContactLead } from "@/lib/client-api";

const schema = z.object({
  fullName: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().min(7, "Enter your phone"),
  serviceNeeded: z.string().min(1, "Choose a service"),
  propertyType: z.enum(["residential", "commercial"]),
  address: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().min(10, "Tell us what is going on"),
  requestType: z.enum(["appointment", "contact"]),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { serviceNeeded: "AC Repair", propertyType: "residential", requestType: "appointment" } });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      if (values.requestType === "appointment") {
        await submitAppointment({ full_name: values.fullName, phone: values.phone, email: values.email || undefined, service_needed: values.serviceNeeded, property_type: values.propertyType, address: values.address, preferred_date: values.preferredDate, preferred_time: values.preferredTime, message: values.message });
      } else {
        await submitContactLead({ full_name: values.fullName, phone: values.phone, email: values.email || undefined, service_needed: values.serviceNeeded, address: values.address, message: values.message });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)} className="rounded-brand border border-graphite-100 bg-white p-6 shadow-soft"><div className="grid gap-4 md:grid-cols-2"><Field label="Name" error={errors.fullName?.message}><input {...register("fullName")} className="input" /></Field><Field label="Phone" error={errors.phone?.message}><input {...register("phone")} className="input" /></Field><Field label="Email" error={errors.email?.message}><input {...register("email")} className="input" /></Field><Field label="Service" error={errors.serviceNeeded?.message}><select {...register("serviceNeeded")} className="input"><option>AC Repair</option><option>AC Installation</option><option>Heating Repair</option><option>Furnace Installation</option><option>Heat Pumps</option><option>Indoor Air Quality</option><option>Commercial HVAC</option><option>Maintenance Plans</option></select></Field><Field label="Property" error={errors.propertyType?.message}><select {...register("propertyType")} className="input"><option value="residential">Residential</option><option value="commercial">Commercial</option></select></Field><Field label="Request type" error={errors.requestType?.message}><select {...register("requestType")} className="input"><option value="appointment">Appointment booking</option><option value="contact">Contact lead</option></select></Field><Field label="Preferred date" error={errors.preferredDate?.message}><input type="date" {...register("preferredDate")} className="input" /></Field><Field label="Preferred time" error={errors.preferredTime?.message}><input {...register("preferredTime")} placeholder="Morning, afternoon, or exact time" className="input" /></Field></div><Field label="Address" error={errors.address?.message} className="mt-4"><input {...register("address")} className="input" /></Field><Field label="Message" error={errors.message?.message} className="mt-4"><textarea {...register("message")} className="input min-h-32" /></Field><Button className="mt-5" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Request Appointment"}</Button>{status === "success" ? <p className="mt-4 text-sm font-semibold text-sky-600">Thanks. Your request was sent to the backend endpoint.</p> : null}{status === "error" ? <p className="mt-4 text-sm font-semibold text-orange-600">The request could not be sent. Check that the backend API is running.</p> : null}<style jsx>{`.input{width:100%;border:1px solid #eceff3;border-radius:16px;padding:12px 14px;color:#101828}.input:focus{outline:2px solid #f97316;outline-offset:2px}`}</style></form>;
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) { return <label className={className}><span className="mb-2 block text-sm font-bold text-navy-900">{label}</span>{children}{error ? <span className="mt-2 block text-sm text-orange-600">{error}</span> : null}</label>; }
