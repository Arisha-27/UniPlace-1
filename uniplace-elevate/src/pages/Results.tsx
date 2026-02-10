import { useState } from "react";
import { mockResults } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Results() {
  const [results] = useState(mockResults);
  const { toast } = useToast();

  const oaResults = results.filter(r => r.oaStatus !== "-");
  const interviewResults = results.filter(r => r.interviewStatus !== "-" && r.interviewStatus !== "Pending");
  const finalOffers = results.filter(r => r.finalStatus === "Selected");

  const handleEmail = (group: string) => {
    toast({ title: `Emails sent to ${group}` });
  };

  const getStatusBadge = (status: string) => {
    if (status === "Cleared" || status === "Selected") return "badge-approved";
    if (status === "Not Cleared" || status === "Rejected") return "badge-rejected";
    return "badge-pending";
  };

  const ResultTable = ({ data }: { data: typeof results }) => (
    <div className="data-table">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {["Student", "Roll No", "Job", "OA", "Interview", "Final"].map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="px-4 py-3 text-sm font-medium text-foreground">{r.studentName}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{r.rollNo}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{r.job}</td>
              <td className="px-4 py-3"><span className={getStatusBadge(r.oaStatus)}>{r.oaStatus}</span></td>
              <td className="px-4 py-3"><span className={getStatusBadge(r.interviewStatus)}>{r.interviewStatus}</span></td>
              <td className="px-4 py-3"><span className={getStatusBadge(r.finalStatus)}>{r.finalStatus}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Results</h1>
          <p className="page-subtitle">Manage OA, interview, and final offer results</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" /> Upload CSV
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="gap-2" onClick={() => handleEmail("all eligible students")}>
          <Mail className="w-4 h-4" /> Email Eligible
        </Button>
        <Button size="sm" variant="outline" className="gap-2" onClick={() => handleEmail("OA qualified")}>
          <Mail className="w-4 h-4" /> Email OA Qualified
        </Button>
        <Button size="sm" variant="outline" className="gap-2" onClick={() => handleEmail("interview qualified")}>
          <Mail className="w-4 h-4" /> Email Interview Qualified
        </Button>
        <Button size="sm" className="gap-2" onClick={() => handleEmail("final selected students")}>
          <Mail className="w-4 h-4" /> Email Selected
        </Button>
      </div>

      <Tabs defaultValue="oa">
        <TabsList>
          <TabsTrigger value="oa">OA Results</TabsTrigger>
          <TabsTrigger value="interview">Interview Results</TabsTrigger>
          <TabsTrigger value="offers">Final Offers</TabsTrigger>
        </TabsList>
        <TabsContent value="oa" className="mt-4"><ResultTable data={oaResults} /></TabsContent>
        <TabsContent value="interview" className="mt-4"><ResultTable data={interviewResults} /></TabsContent>
        <TabsContent value="offers" className="mt-4"><ResultTable data={finalOffers} /></TabsContent>
      </Tabs>
    </div>
  );
}
