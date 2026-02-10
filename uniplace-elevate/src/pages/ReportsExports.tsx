import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const exportOptions = [
  { title: "Complete Student Database", description: "All students with placement details", icon: FileSpreadsheet },
  { title: "Job-wise Applicant Data", description: "Applicants grouped by job posting", icon: FileSpreadsheet },
  { title: "Placed Students List", description: "All placed students with offers", icon: FileSpreadsheet },
  { title: "Company-wise Results", description: "Hiring results per company", icon: FileSpreadsheet },
  { title: "Branch-wise Statistics", description: "Placement stats by branch", icon: FileSpreadsheet },
  { title: "PPO & Intern Report", description: "PPO holders and internship data", icon: FileSpreadsheet },
];

export default function ReportsExports() {
  const { toast } = useToast();

  const handleDownload = (title: string, format: string) => {
    toast({ title: `Downloading ${title}`, description: `Format: ${format}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Reports & Exports</h1>
      <p className="page-subtitle">Download placement data and reports</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exportOptions.map(opt => (
          <div key={opt.title} className="stat-card">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <opt.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{opt.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="gap-1 flex-1" onClick={() => handleDownload(opt.title, "xlsx")}>
                <Download className="w-3 h-3" /> Excel
              </Button>
              <Button size="sm" variant="outline" className="gap-1 flex-1" onClick={() => handleDownload(opt.title, "csv")}>
                <Download className="w-3 h-3" /> CSV
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
