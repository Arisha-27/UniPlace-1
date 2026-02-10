import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Trophy,
  GraduationCap,
  Users,
  Calendar,
  Code2,
  FileText,
  Mail,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Companies", path: "/companies", icon: Building2 },
  { title: "Job Postings", path: "/job-postings", icon: Briefcase },
  { title: "Results", path: "/results", icon: Trophy },
  { title: "Students Database", path: "/students", icon: GraduationCap },
  { title: "Companies & POC", path: "/companies-poc", icon: Users },
  { title: "Events", path: "/events", icon: Calendar },
  { title: "Hackathons", path: "/hackathons", icon: Code2 },
  { title: "Blogs Approval", path: "/blogs", icon: FileText },
  { title: "Email Center", path: "/email", icon: Mail },
  { title: "Reports & Exports", path: "/reports", icon: BarChart3 },
  { title: "Settings", path: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 min-h-screen bg-sidebar flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-sidebar-primary-foreground">UniPlace</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 text-xs text-sidebar-foreground/50">
        © 2026 UniPlace
      </div>
    </aside>
  );
}
