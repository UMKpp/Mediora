import DashboardShell from "./DashboardShell";

export const metadata = {
  title: "Mediora Dashboard",
  description: "User dashboard for Mediora healthcare tools",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
