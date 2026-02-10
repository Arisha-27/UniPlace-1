import { useState } from "react";
import { mockStudents } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, GraduationCap, Users, Award, Clock } from "lucide-react";

export default function StudentsDatabase() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search);
    const matchBranch = branchFilter === "all" || s.branch === branchFilter;
    const matchStatus = statusFilter === "all" || (statusFilter === "placed" ? s.placed : !s.placed);
    return matchSearch && matchBranch && matchStatus;
  });

  const totalByBranch = (branch: string) => mockStudents.filter(s => s.branch === branch).length;
  const placedByBranch = (branch: string) => mockStudents.filter(s => s.branch === branch && s.placed).length;
  const ppoCount = mockStudents.filter(s => s.ppoStatus === "Yes").length;
  const internCount = mockStudents.filter(s => s.internStatus === "Completed" || s.internStatus === "Ongoing").length;

  const summaryCards = [
    { label: "Total Students", value: mockStudents.length, icon: GraduationCap },
    { label: "Placed", value: mockStudents.filter(s => s.placed).length, icon: Users },
    { label: "PPO Holders", value: ppoCount, icon: Award },
    { label: "Interns", value: internCount, icon: Clock },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Students Database</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map(c => (
          <div key={c.label} className="stat-card flex items-center gap-4">
            <c.icon className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Branch" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {["CSE", "IT", "ECE", "EE"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="placed">Placed</SelectItem>
            <SelectItem value="unplaced">Unplaced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="data-table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Name", "Roll No", "Branch", "CGPA", "Intern", "PPO", "Placed", "Company", "Package"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{s.rollNo}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{s.branch}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{s.cgpa}</td>
                <td className="px-4 py-3"><span className={s.internStatus === "Completed" ? "badge-approved" : s.internStatus === "Ongoing" ? "badge-pending" : "badge-inactive"}>{s.internStatus}</span></td>
                <td className="px-4 py-3"><span className={s.ppoStatus === "Yes" ? "badge-approved" : "badge-inactive"}>{s.ppoStatus}</span></td>
                <td className="px-4 py-3"><span className={s.placed ? "badge-approved" : "badge-rejected"}>{s.placed ? "Yes" : "No"}</span></td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{s.company}</td>
                <td className="px-4 py-3 text-sm font-medium text-primary">{s.package}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
