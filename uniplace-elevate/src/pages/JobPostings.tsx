import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Loader2, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Options
const BRANCHES = ["CSE", "IT", "ECE", "MAE", "AI-ML"];
const DEGREES = ["B.Tech", "M.Tech", "MCA"];

export default function JobPostings() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    company: "",
    companyWebsite: "",
    type: "Intern" as "Intern" | "FTE",
    location: "",
    ctc: "",
    description: "",
    deadline: "",
    rounds: "",
    minCgpa: "",
    batch: "",
    activeBacklogs: false,
    deadBacklogs: false,
    branches: [] as string[],
    degrees: [] as string[]
  });

  // Fetch jobs from Supabase
  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_postings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ variant: "destructive", title: "Error fetching jobs", description: error.message });
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  // Save to Supabase
  const handleSave = async () => {
    if (!form.title || !form.company) {
      toast({ variant: "destructive", title: "Required", description: "Title and Company are required." });
      return;
    }

    const { error } = await supabase
      .from('job_postings')
      .insert([{
        title: form.title,
        company: form.company,
        company_website: form.companyWebsite,
        type: form.type,
        location: form.location,
        ctc: form.ctc,
        description: form.description,
        deadline: form.deadline || null,
        rounds: form.rounds.split(",").map(s => s.trim()).filter(s => s !== ""),
        min_cgpa: parseFloat(form.minCgpa) || 0,
        batch: form.batch,
        active_backlogs: form.activeBacklogs,
        dead_backlogs: form.deadBacklogs,
        branches: form.branches,
        degrees: form.degrees,
        status: "Open"
      }]);

    if (error) {
      toast({ variant: "destructive", title: "Failed", description: error.message });
    } else {
      toast({ title: "Success", description: "Job posting created" });
      setDialogOpen(false);
      resetForm();
      fetchJobs();
    }
  };

  const resetForm = () => {
    setForm({
      title: "", company: "", companyWebsite: "", type: "Intern", location: "", ctc: "", description: "", deadline: "", rounds: "", minCgpa: "", batch: "",
      activeBacklogs: false, deadBacklogs: false, branches: [], degrees: []
    });
  };

  const toggleSelection = (field: "branches" | "degrees", value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Job Postings</h1>
          <p className="page-subtitle">Manage all job postings and eligibility</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Create Job Posting</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Job Posting</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">

              {/* Job Title & Company */}
              <div className="col-span-2 sm:col-span-1">
                <Label>Job Title</Label>
                <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="mt-1" placeholder="e.g. SDE Intern" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label>Company Name</Label>
                <Input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="mt-1" placeholder="e.g. Amazon" />
              </div>

              {/* WEBSITE INPUT (For Auto-Logo) */}
              <div className="col-span-2">
                <Label>Company Website (Auto-fetches Logo)</Label>
                <div className="relative mt-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={form.companyWebsite}
                    onChange={e => setForm(p => ({ ...p, companyWebsite: e.target.value }))}
                    className="pl-10"
                    placeholder="e.g. amazon.com"
                  />
                </div>
              </div>

              {/* Type & Location */}
              <div>
                <Label>Job Type</Label>
                <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v as any }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Intern">Intern</SelectItem>
                    <SelectItem value="FTE">Full Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Location</Label>
                <Input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className="mt-1" placeholder="e.g. Bangalore" />
              </div>

              {/* CTC & CGPA */}
              <div>
                <Label>CTC / Stipend</Label>
                <Input value={form.ctc} onChange={e => setForm(p => ({ ...p, ctc: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Min CGPA</Label>
                <Input type="number" step="0.1" value={form.minCgpa} onChange={e => setForm(p => ({ ...p, minCgpa: e.target.value }))} className="mt-1" />
              </div>

              {/* Backlog Settings */}
              <div className="col-span-2 flex gap-6 p-3 border rounded-md bg-muted/20">
                <div className="flex items-center space-x-2">
                  <Checkbox id="activeBacklog" checked={form.activeBacklogs} onCheckedChange={(c) => setForm(p => ({ ...p, activeBacklogs: !!c }))} />
                  <Label htmlFor="activeBacklog" className="cursor-pointer text-sm">Allow Active Backlogs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="deadBacklog" checked={form.deadBacklogs} onCheckedChange={(c) => setForm(p => ({ ...p, deadBacklogs: !!c }))} />
                  <Label htmlFor="deadBacklog" className="cursor-pointer text-sm">Allow Dead Backlogs</Label>
                </div>
              </div>

              {/* Degrees */}
              <div className="col-span-2">
                <Label className="mb-2 block text-sm font-medium">Allowed Degrees</Label>
                <div className="flex flex-wrap gap-4">
                  {DEGREES.map(deg => (
                    <div key={deg} className="flex items-center space-x-2">
                      <Checkbox id={`deg-${deg}`} checked={form.degrees.includes(deg)} onCheckedChange={() => toggleSelection("degrees", deg)} />
                      <Label htmlFor={`deg-${deg}`} className="font-normal cursor-pointer text-sm">{deg}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branches */}
              <div className="col-span-2">
                <Label className="mb-2 block text-sm font-medium">Allowed Branches</Label>
                <div className="flex flex-wrap gap-4">
                  {BRANCHES.map(br => (
                    <div key={br} className="flex items-center space-x-2">
                      <Checkbox id={`br-${br}`} checked={form.branches.includes(br)} onCheckedChange={() => toggleSelection("branches", br)} />
                      <Label htmlFor={`br-${br}`} className="font-normal cursor-pointer text-sm">{br}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other */}
              <div>
                <Label>Deadline</Label>
                <Input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Batch</Label>
                <Input value={form.batch} onChange={e => setForm(p => ({ ...p, batch: e.target.value }))} placeholder="2026" className="mt-1" />
              </div>
              <div className="col-span-2">
                <Label>Selection Rounds</Label>
                <Input value={form.rounds} onChange={e => setForm(p => ({ ...p, rounds: e.target.value }))} placeholder="OA, Interview, HR" className="mt-1" />
              </div>
              <div className="col-span-2">
                <Label>Description</Label>
                <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Create Posting</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="data-table">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Job Title", "Type", "CTC", "Status"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-10 text-muted-foreground">No job postings found.</td></tr>
            ) : (
              filtered.map(j => (
                <tr key={j.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">

                      {/* --- AUTO LOGO ONLY --- */}
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-white flex items-center justify-center">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${j.company_website || 'google.com'}&sz=128`}
                          alt={j.company}
                          className="h-8 w-8 object-contain"
                          onError={(e) => {
                            // Fallback to Initials
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(j.company)}&background=random&color=fff&bold=true`;
                            e.currentTarget.className = "h-full w-full object-cover";
                          }}
                        />
                      </div>
                      {/* ---------------------- */}

                      <div>
                        <div className="font-medium text-foreground">{j.title}</div>
                        <div className="text-xs text-muted-foreground">{j.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={j.type === "Intern" ? "badge-pending" : "badge-active"}>{j.type}</span></td>
                  <td className="px-4 py-3 text-sm text-primary font-medium">{j.ctc}</td>
                  <td className="px-4 py-3"><span className={j.status === "Open" ? "badge-open" : "badge-closed"}>{j.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}