import { useState } from "react";
import { mockCompanies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Companies() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", industry: "", location: "", website: "", description: "",
    pocName: "", pocEmail: "", pocPhone: "",
  });

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.name) return;
    if (editingId) {
      setCompanies(prev => prev.map(c => c.id === editingId ? { ...c, ...form, status: c.status, totalOffers: c.totalOffers } : c));
      toast({ title: "Company updated successfully" });
    } else {
      setCompanies(prev => [...prev, { id: Date.now().toString(), ...form, status: "Active" as const, totalOffers: 0 }]);
      toast({ title: "Company added successfully" });
    }
    setForm({ name: "", industry: "", location: "", website: "", description: "", pocName: "", pocEmail: "", pocPhone: "" });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEdit = (c: typeof mockCompanies[0]) => {
    setForm({ name: c.name, industry: c.industry, location: c.location, website: c.website, description: c.description, pocName: c.pocName, pocEmail: c.pocEmail, pocPhone: c.pocPhone });
    setEditingId(c.id);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    toast({ title: "Company deleted" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Companies</h1>
          <p className="page-subtitle">Manage recruiting companies</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditingId(null); setForm({ name: "", industry: "", location: "", website: "", description: "", pocName: "", pocEmail: "", pocPhone: "" }); } }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Company</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Company" : "Add Company"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { label: "Company Name", key: "name" },
                { label: "Industry", key: "industry" },
                { label: "Location", key: "location" },
                { label: "Website", key: "website" },
                { label: "POC Name", key: "pocName" },
                { label: "POC Email", key: "pocEmail" },
                { label: "POC Phone", key: "pocPhone" },
              ].map(f => (
                <div key={f.key}>
                  <Label>{f.label}</Label>
                  <Input
                    value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <Label>Description</Label>
                <Input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingId ? "Update" : "Add"} Company</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search companies..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="data-table">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Company", "Industry", "Location", "Status", "POC Name", "POC Email", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{c.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{c.industry}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{c.location}</td>
                <td className="px-4 py-3"><span className={c.status === "Active" ? "badge-active" : "badge-inactive"}>{c.status}</span></td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{c.pocName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{c.pocEmail}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(c)} className="p-1.5 rounded hover:bg-muted transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
