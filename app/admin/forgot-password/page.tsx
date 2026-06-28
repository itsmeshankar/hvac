"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  async function submit(formData: FormData) {
    const res = await fetch("/api/admin/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.get("email") }) });
    const json = await res.json();
    setMessage(json.data?.message ?? "Reset request received.");
  }
  return <section className="flex min-h-screen items-center justify-center bg-graphite-50 p-6"><form action={submit} className="w-full max-w-md rounded-brand bg-white p-8 shadow-soft"><h1 className="text-3xl font-black text-navy-900">Forgot Password</h1><p className="mt-2 text-graphite-500">Enter an admin email to start the reset workflow.</p><label className="mt-6 block text-sm font-bold">Email<input name="email" type="email" className="mt-2 w-full rounded-brand border border-graphite-100 p-3" /></label><Button className="mt-6 w-full">Request Reset</Button>{message ? <p className="mt-4 text-sm text-sky-600">{message}</p> : null}<a href="/admin/login" className="mt-4 block text-center text-sm font-bold text-orange-600">Back to login</a></form></section>;
}
