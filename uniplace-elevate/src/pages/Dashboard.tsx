import {
  Building2,
  Briefcase,
  GraduationCap,
  Users,
  UserX,
  Award,
  Clock,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { dashboardStats, branchWisePlacement, companyWiseHiring } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "hsl(142, 72%, 42%)",
  "hsl(33, 100%, 50%)",
  "hsl(200, 80%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(350, 80%, 55%)",
  "hsl(170, 60%, 45%)",
];

const statCards = [
  { label: "Total Students", value: dashboardStats.totalStudents, icon: GraduationCap, color: "text-primary" },
  { label: "Total Companies", value: dashboardStats.totalCompanies, icon: Building2, color: "text-info" },
  { label: "Active Job Postings", value: dashboardStats.activeJobPostings, icon: Briefcase, color: "text-accent" },
  { label: "Students Placed", value: dashboardStats.studentsPlaced, icon: Users, color: "text-primary" },
  { label: "Students Unplaced", value: dashboardStats.studentsUnplaced, icon: UserX, color: "text-destructive" },
  { label: "PPO Count", value: dashboardStats.ppoCount, icon: Award, color: "text-accent" },
  { label: "6M Intern Count", value: dashboardStats.sixMonthInterns, icon: Clock, color: "text-info" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subtitle mt-1">Placement Season 2026 Overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate("/companies")} className="gap-2">
          <Plus className="w-4 h-4" /> Add Company
        </Button>
        <Button onClick={() => navigate("/job-postings")} className="gap-2">
          <Plus className="w-4 h-4" /> Add Job Posting
        </Button>
        <Button onClick={() => navigate("/events")} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add Event
        </Button>
        <Button onClick={() => navigate("/hackathons")} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add Hackathon
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch-wise Placement */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Placement by Branch</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchWisePlacement}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="branch" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="placed" fill="hsl(142, 72%, 42%)" radius={[4, 4, 0, 0]} name="Placed" />
              <Bar dataKey="total" fill="hsl(214, 20%, 90%)" radius={[4, 4, 0, 0]} name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Company-wise Hiring */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Company-wise Hiring</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={companyWiseHiring}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="hires"
                nameKey="company"
                label={({ company, hires }) => `${company}: ${hires}`}
              >
                {companyWiseHiring.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
