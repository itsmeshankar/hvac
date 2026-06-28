"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(formData: FormData) {
    setError("");
    const res = await fetch("/api/admin/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.get("email"), password: formData.get("password") }) });
    if (!res.ok) { setError("Invalid login details"); return; }
    router.push("/admin/dashboard");
    router.refresh();
  }
  return <section className="flex min-h-screen items-center justify-center bg-graphite-50 p-6"><form action={submit} className="w-full max-w-md rounded-brand bg-white p-8 shadow-soft"><h1 className="text-3xl font-black text-navy-900">Admin Login</h1><p className="mt-2 text-graphite-500">Manage HVAC website content.</p><label className="mt-6 block text-sm font-bold">Email<input name="email" type="email" defaultValue="admin@demo.com" className="mt-2 w-full rounded-brand border border-graphite-100 p-3" /></label><label className="mt-4 block text-sm font-bold">Password<input name="password" type="password" defaultValue="DemoAdmin123!" className="mt-2 w-full rounded-brand border border-graphite-100 p-3" /></label>{error ? <p className="mt-4 text-sm font-bold text-orange-600">{error}</p> : null}<Button className="mt-6 w-full">Login</Button><a href="/admin/forgot-password" className="mt-4 block text-center text-sm font-bold text-orange-600">Forgot password?</a></form></section>;
}
