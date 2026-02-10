import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Clock, Users, Trophy, Loader2, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function Hackathons() {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // Expanded form state to match your database schema
  const [form, setForm] = useState({
    title: "",
    organizer: "",
    mode: "Online" as "Online" | "Offline" | "Hybrid",
    deadline: "",
    eventDate: "",
    prizes: "",
    teamSize: "",
    skills: "", // Comma separated string
    description: "",
    registrationLink: ""
  });

  // 1. Fetch from Supabase
  const fetchHackathons = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('hackathons')
      .select('*')
      .order('deadline', { ascending: true });

    if (error) {
      toast({ variant: "destructive", title: "Error fetching data", description: error.message });
    } else {
      setHackathons(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  // 2. Save to Supabase
  const handleSave = async () => {
    if (!form.title || !form.organizer) {
      toast({ variant: "destructive", title: "Required", description: "Title and Organizer are required." });
      return;
    }

    const { error } = await supabase
      .from('hackathons')
      .insert([{
        title: form.title,
        organizer: form.organizer,
        mode: form.mode,
        deadline: form.deadline,
        event_date: form.eventDate || null,
        prizes: form.prizes,
        team_size: form.teamSize,
        description: form.description,
        registration_link: form.registrationLink,
        // Convert comma-separated string to array
        skills: form.skills.split(",").map(s => s.trim()).filter(s => s !== "")
      }]);

    if (error) {
      toast({ variant: "destructive", title: "Failed to add", description: error.message });
    } else {
      toast({ title: "Success", description: "Hackathon added successfully" });
      setDialogOpen(false);
      // Reset form
      setForm({ title: "", organizer: "", mode: "Online", deadline: "", eventDate: "", prizes: "", teamSize: "", skills: "", description: "", registrationLink: "" });
      fetchHackathons();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Hackathons</h1>
          <p className="page-subtitle">Manage hackathons and competitions</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Hackathon</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Hackathon</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">

              {/* Basic Details */}
              <div className="col-span-2">
                <Label>Hackathon Name</Label>
                <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="mt-1" placeholder="e.g. Smart India Hackathon" />
              </div>
              <div>
                <Label>Organizer</Label>
                <Input value={form.organizer} onChange={e => setForm(p => ({ ...p, organizer: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Mode</Label>
                <Select value={form.mode} onValueChange={(v: any) => setForm(p => ({ ...p, mode: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dates */}
              <div>
                <Label>Registration Deadline</Label>
                <Input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Event Date (Start)</Label>
                <Input type="date" value={form.eventDate} onChange={e => setForm(p => ({ ...p, eventDate: e.target.value }))} className="mt-1" />
              </div>

              {/* Specs */}
              <div>
                <Label>Prize Pool</Label>
                <Input value={form.prizes} onChange={e => setForm(p => ({ ...p, prizes: e.target.value }))} className="mt-1" placeholder="e.g. ₹50,000" />
              </div>
              <div>
                <Label>Team Size</Label>
                <Input value={form.teamSize} onChange={e => setForm(p => ({ ...p, teamSize: e.target.value }))} className="mt-1" placeholder="e.g. 1-4 Members" />
              </div>

              <div className="col-span-2">
                <Label>Required Skills (Comma separated)</Label>
                <Input value={form.skills} onChange={e => setForm(p => ({ ...p, skills: e.target.value }))} className="mt-1" placeholder="React, Python, Blockchain..." />
              </div>

              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="mt-1" />
              </div>
              <div className="col-span-2">
                <Label>Registration Link</Label>
                <div className="relative mt-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={form.registrationLink} onChange={e => setForm(p => ({ ...p, registrationLink: e.target.value }))} className="pl-10" placeholder="https://..." />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Add Hackathon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : hackathons.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">No hackathons found.</div>
        ) : (
          hackathons.map(h => (
            <div key={h.id} className="stat-card border bg-card text-card-foreground shadow-sm rounded-xl p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-1">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.organizer}</p>
                </div>
                <Badge variant={h.mode === "Online" ? "secondary" : "outline"}>{h.mode}</Badge>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Deadline: <strong className="text-foreground">{new Date(h.deadline).toLocaleDateString()}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 font-medium">{h.prizes || "TBD"}</span>
                </span>
              </div>

              {h.skills && h.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {h.skills.slice(0, 3).map((skill: string) => (
                    <span key={skill} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {h.team_size || "Any"} size
                </span>
                <Button size="sm" onClick={() => window.open(h.registration_link, "_blank")}>
                  Register
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}