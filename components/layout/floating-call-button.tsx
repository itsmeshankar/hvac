import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/site";
import { formatPhoneHref } from "@/lib/utils";

export function FloatingCallButton({
  phone = business.phone,
}: {
  phone?: string;
}) {
  return (
    <Link
      href={formatPhoneHref(phone)}
      className="focus-ring"
      aria-label={`Call ${phone}`}
      style={{
        alignItems: "center",
        background: "#f97316",
        border: "1px solid rgba(255, 255, 255, 0.75)",
        borderRadius: "9999px",
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
        boxShadow: "0 18px 45px rgba(10, 35, 66, 0.24)",
        color: "#fff",
        display: "inline-flex",
        height: "56px",
        justifyContent: "center",
        position: "fixed",
        right: "1rem",
        width: "56px",
        zIndex: 9999,
      }}
    >
      <Phone size={24} strokeWidth={2.4} />
    </Link>
  );
}
