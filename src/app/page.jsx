import Link from "next/link";
import { SidebarModified } from "./_components/SidebarModified";
import { Dashboard } from "@/components/ui/Dashboard";

export default function Home() {
  return (
    <SidebarModified>
      <Dashboard></Dashboard>
    </SidebarModified>
  );
}
