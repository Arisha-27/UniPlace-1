import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Clock, MapPin, Users, Mic, Image as ImageIcon, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    type: "Workshop",
    date: "",
    time: "",
    location: "",
    description: "",
    organizer: "",
    speaker: "",
    registrationLink: "",
    imageUrl: ""
  });

  // Fetch Events from Supabase
  const fetchEvents = async () => {
    setLoading(true);
    // We explicitly filter out Hackathons from this view if any exist in the DB
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .neq('type', 'Hackathon')
      .order('date', { ascending: true });

    if (error) {
      toast({ variant: "destructive", title: "Error fetching events", description: error.message });
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Save Event to Supabase
  const handleSave = async () => {
    if (!form.title || !form.date) {
      toast({ variant: "destructive", title: "Missing fields", description: "Title and Date are required." });
      return;
    }

    const { error } = await supabase
      .from('events')
      .insert([{
        title: form.title,
        type: form.type,
        date: form.date,
        time: form.time,
        location: form.location,
        description: form.description,
        organizer: form.organizer,
        speaker: form.speaker,
        registration_link: form.registrationLink,
        image_url: form.imageUrl
      }]);

    if (error) {
      toast({ variant: "destructive", title: "Failed to create event", description: error.message });
    } else {
      toast({ title: "Event created successfully" });
      setDialogOpen(false);
      setForm({ title: "", type: "Workshop", date: "", time: "", location: "", description: "", organizer: "", speaker: "", registrationLink: "", imageUrl: "" });
      fetchEvents();
    }
  };

  // Helper for Badge Colors
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Workshop": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Webinar": return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      default: return "bg-green-100 text-green-700 hover:bg-green-100"; // Seminar
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Workshops, webinars, and seminars</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Event</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Title & Type */}
              <div className="col-span-2">
                <Label>Event Title</Label>
                <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="mt-1" placeholder="e.g. Intro to AI" />
              </div>
              <div>
                <Label>Event Type</Label>
                <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Organizer / Club</Label>
                <Input value={form.organizer} onChange={e => setForm(p => ({ ...p, organizer: e.target.value }))} className="mt-1" placeholder="e.g. Coding Club" />
              </div>

              {/* Date & Time */}
              <div>
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className="mt-1" />
              </div>

              {/* Location & Speaker */}
              <div>
                <Label>Location / Link</Label>
                <Input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className="mt-1" placeholder="Hall A or Zoom Link" />
              </div>
              <div>
                <Label>Speaker Name</Label>
                <Input value={form.speaker} onChange={e => setForm(p => ({ ...p, speaker: e.target.value }))} className="mt-1" placeholder="e.g. Dr. A. Kumar" />
              </div>

              {/* Banner Image */}
              <div className="col-span-2">
                <Label>Banner Image URL</Label>
                <div className="relative mt-1">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={form.imageUrl}
                    onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
                    className="pl-10"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              {/* Description & Link */}
              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  className="mt-1"
                  placeholder="What is this event about?"
                />
              </div>
              <div className="col-span-2">
                <Label>Registration Link</Label>
                <Input value={form.registrationLink} onChange={e => setForm(p => ({ ...p, registrationLink: e.target.value }))} className="mt-1" placeholder="https://forms.google.com/..." />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : events.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">No upcoming events found.</div>
        ) : (
          events.map(event => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all border-0 shadow-md flex flex-col h-full">
              {/* Banner Image */}
              <div className="h-32 bg-muted relative">
                <img
                  src={event.image_url || `https://source.unsplash.com/random/800x600/?${event.type.toLowerCase()},technology`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800"; // Fallback
                  }}
                />
                <Badge className={`absolute top-3 left-3 border-0 ${getTypeColor(event.type)}`}>
                  {event.type}
                </Badge>
              </div>

              <CardHeader className="p-4 pb-2">
                <h3 className="text-lg font-bold line-clamp-1 text-foreground" title={event.title}>{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  {event.organizer && <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.organizer}</span>}
                  {event.speaker && <span className="flex items-center gap-1">• <Mic className="w-3 h-3" /> {event.speaker}</span>}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {event.description || "No description provided."}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Clock className="w-4 h-4 text-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <MapPin className="w-4 h-4 text-primary" />
                    {event.location}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                {event.registration_link ? (
                  <Button className="w-full gap-2" asChild>
                    <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                      Register Now <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>Registration Closed</Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}