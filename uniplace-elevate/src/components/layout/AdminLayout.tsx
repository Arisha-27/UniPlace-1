import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { TopNavbar } from "./TopNavbar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
