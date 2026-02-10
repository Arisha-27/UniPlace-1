import { useState } from "react";
import { mockBlogs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Check, X, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BlogsApproval() {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [selectedBlog, setSelectedBlog] = useState<typeof mockBlogs[0] | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const { toast } = useToast();

  const updateStatus = (id: string, status: "Approved" | "Rejected") => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    toast({ title: `Blog ${status.toLowerCase()}` });
  };

  const handleEdit = (blog: typeof mockBlogs[0]) => {
    setEditTitle(blog.title);
    setEditContent(blog.content);
    setSelectedBlog(blog);
    setEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (selectedBlog) {
      setBlogs(prev => prev.map(b => b.id === selectedBlog.id ? { ...b, title: editTitle, content: editContent } : b));
      toast({ title: "Blog updated" });
      setEditDialog(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Blogs Approval</h1>
      <p className="page-subtitle">Review and approve student blog submissions</p>

      <div className="data-table">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Title", "Author", "Company", "Status", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blogs.map(b => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{b.title}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.author}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.company}</td>
                <td className="px-4 py-3">
                  <span className={b.status === "Approved" ? "badge-approved" : b.status === "Rejected" ? "badge-rejected" : "badge-pending"}>{b.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => { setSelectedBlog(b); }} className="p-1.5 rounded hover:bg-muted"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => handleEdit(b)} className="p-1.5 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => updateStatus(b.id, "Approved")} className="p-1.5 rounded hover:bg-primary/10"><Check className="w-4 h-4 text-primary" /></button>
                    <button onClick={() => updateStatus(b.id, "Rejected")} className="p-1.5 rounded hover:bg-destructive/10"><X className="w-4 h-4 text-destructive" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Dialog */}
      <Dialog open={!!selectedBlog && !editDialog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selectedBlog?.title}</DialogTitle></DialogHeader>
          <div className="space-y-2 mt-2">
            <p className="text-sm text-muted-foreground">By {selectedBlog?.author} • {selectedBlog?.company} • {selectedBlog?.readTime} read</p>
            <div className="flex gap-2">{selectedBlog?.tags.map(t => <span key={t} className="badge-active">{t}</span>)}</div>
            <p className="text-sm text-foreground mt-4">{selectedBlog?.content}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Blog</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div><Label>Title</Label><Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="mt-1" /></div>
            <div><Label>Content</Label><Textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="mt-1 min-h-[200px]" /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
