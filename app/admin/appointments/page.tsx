import { StatusTable } from "@/components/admin/status-table";
export default function AppointmentsAdminPage() { return <StatusTable title="Appointments" endpoint="/api/admin/appointments" statuses={["new", "contacted", "confirmed", "completed", "cancelled"]} />; }
