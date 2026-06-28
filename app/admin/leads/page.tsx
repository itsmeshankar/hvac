import { StatusTable } from "@/components/admin/status-table";
export default function LeadsAdminPage() { return <StatusTable title="Contact Leads" endpoint="/api/admin/contact-leads" statuses={["new", "contacted", "closed"]} />; }
