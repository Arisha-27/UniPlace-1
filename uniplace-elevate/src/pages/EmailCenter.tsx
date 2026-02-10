import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockJobPostings } from "@/data/mockData";

export default function EmailCenter() {
  const { toast } = useToast();
  const [form, setForm] = useState({ subject: "", body: "", recipientType: "all", jobFilter: "" });
  const [preview, setPreview] = useState(false);

  const handleSend = () => {
    toast({ title: "Emails sent successfully", description: `Sent to ${form.recipientType} recipients` });
    setForm({ subject: "", body: "", recipientType: "all", jobFilter: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Email Center</h1>
      <p className="page-subtitle">Send targeted emails to students</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Compose Email</h3>
          <div>
            <Label>Recipients</Label>
            <Select value={form.recipientType} onValueChange={v => setForm(p => ({ ...p, recipientType: v }))}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="branch">By Branch</SelectItem>
                <SelectItem value="job">By Job</SelectItem>
                <SelectItem value="eligible">Eligible Only</SelectItem>
                <SelectItem value="placed">Placed Students</SelectItem>
                <SelectItem value="unplaced">Unplaced Students</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.recipientType === "job" && (
            <div>
              <Label>Select Job</Label>
              <Select value={form.jobFilter} onValueChange={v => setForm(p => ({ ...p, jobFilter: v }))}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select job" /></SelectTrigger>
                <SelectContent>
                  {mockJobPostings.map(j => <SelectItem key={j.id} value={j.id}>{j.title} - {j.company}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label>Subject</Label>
            <Input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="mt-1" />
          </div>
          <div>
            <Label>Body</Label>
            <Textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} className="mt-1 min-h-[200px]" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setPreview(true)}><Eye className="w-4 h-4" /> Preview</Button>
            <Button className="gap-2" onClick={handleSend}><Send className="w-4 h-4" /> Send Email</Button>
          </div>
        </div>

        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
          {preview && form.subject ? (
            <div className="border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">To: {form.recipientType} students</p>
              <h4 className="font-semibold text-foreground">{form.subject}</h4>
              <div className="mt-4 text-sm text-foreground whitespace-pre-wrap">{form.body}</div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Compose an email and click Preview to see it here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
