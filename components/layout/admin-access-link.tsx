"use client";
import Link from "next/link";
import { LayoutDashboard, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminAccessLink({ compact = false }: { compact?: boolean }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth/me").then((res) => setLoggedIn(res.ok)).catch(() => setLoggedIn(false));
  }, []);

  const Icon = loggedIn ? LayoutDashboard : LogIn;
  const label = loggedIn ? "Dashboard" : "Login";

  return <Button asChild variant="ghost" size={compact ? "sm" : "default"}><Link href={loggedIn ? "/admin/dashboard" : "/admin/login"} aria-label={label}><Icon size={compact ? 20 : 18} />{compact ? null : label}</Link></Button>;
}
