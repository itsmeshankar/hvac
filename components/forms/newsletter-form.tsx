"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { submitNewsletter } from "@/lib/client-api";

const schema = z.object({ email: z.string().email("Enter a valid email") });
type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      await submitNewsletter(values.email);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"><div className="flex-1"><input {...register("email")} className="w-full rounded-brand border border-white/20 bg-white px-4 py-3 text-navy-900 outline-none focus:ring-2 focus:ring-orange-500" placeholder="Email address" />{errors.email ? <p className="mt-2 text-sm text-orange-100">{errors.email.message}</p> : null}{status === "success" ? <p className="mt-2 text-sm text-sky-100">You are subscribed.</p> : null}{status === "error" ? <p className="mt-2 text-sm text-orange-100">Subscription failed. Check the backend API.</p> : null}</div><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Joining..." : "Join"}</Button></form>;
}
