import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import {
  Clock,
  Search,
  CheckCircle,
  XCircle,
  ChevronRight,
  FileText,
  Users,
  BookOpen,
  Banknote,
  GraduationCap,
  Loader2,
  MapPin,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns"; // Optional: You might need to install date-fns or use simple JS date formatting

// Interface matching your Supabase Table
interface JobPosting {
  id: string;
  title: string;
  company: string;
  company_website?: string;
  logo_url?: string;
  type: string;
  location: string;
  ctc: string;
  description: string;
  created_at: string;
  deadline?: string;
  status: string;
  rounds: string[];
  min_cgpa: number;
  active_backlogs: boolean;
  dead_backlogs: boolean;
  branches: string[];
  degrees: string[];
  batch: string;
}

export default function JobProfiles() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  // Fetch Data from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data || []);
        if (data && data.length > 0) {
          setSelectedJob(data[0]);
        }
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  // Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === "all" || job.type.toLowerCase().includes(typeFilter.toLowerCase()) || (typeFilter === "fulltime" && job.type === "FTE");

    return matchesSearch && matchesStatus && matchesType;
  });

  // Helper for Logo (The "Magic" Logic)
  const renderLogo = (job: JobPosting, size: "md" | "lg" = "md") => {
    const sizeClasses = size === "lg" ? "w-16 h-16 p-2" : "w-10 h-10 p-1";
    return (
      <div className={`${sizeClasses} shrink-0 overflow-hidden rounded-md border bg-white flex items-center justify-center`}>
        <img
          src={
            job.logo_url ||
            `https://www.google.com/s2/favicons?domain=${job.company_website || job.company + '.com'}&sz=128`
          }
          alt={job.company}
          className="h-full w-full object-contain"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&color=fff&bold=true`;
            e.currentTarget.className = "h-full w-full object-cover";
          }}
        />
      </div>
    );
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
  };

  return (
    <MainLayout>
      <div className="space-y-4 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h1 className="text-2xl font-bold text-foreground">Job Profiles</h1>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-36 bg-muted/50">
                    <SelectValue placeholder="Position Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="intern">Internship</SelectItem>
                    <SelectItem value="fulltime">Full Time</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-28 bg-muted/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => {
                setStatusFilter("all");
                setTypeFilter("all");
                setSearchQuery("");
              }}>
                Clear all filters
              </Button>

              <div className="flex-1" />

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by job title or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-72 bg-muted/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Job List */}
          <div className="lg:col-span-2 space-y-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full bg-muted/50">
                <TabsTrigger value="all" className="flex-1">All Jobs</TabsTrigger>
                <TabsTrigger value="applied" className="flex-1">Applied Jobs</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin pr-1">
              {loading ? (
                <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No jobs found matching your filters.</div>
              ) : (
                filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-lg ${selectedJob?.id === job.id
                        ? "ring-2 ring-primary shadow-lg bg-primary/5"
                        : "hover:bg-muted/30"
                      }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {renderLogo(job, "md")}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-1">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company} • {job.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Posted {formatDate(job.created_at)}
                          </p>
                        </div>
                        <Badge
                          className={
                            job.status === "Open"
                              ? "bg-green-100 text-green-700 hover:bg-green-100 border-0"
                              : "bg-red-100 text-red-700 hover:bg-red-100 border-0"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Job Details */}
          {selectedJob && (
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-lg overflow-hidden h-full">
                {/* Header with Dynamic Gradient */}
                <div
                  className="p-6 text-white bg-gradient-to-r from-slate-800 to-slate-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-white rounded-xl flex items-center justify-center p-1">
                        {renderLogo(selectedJob, "lg")}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                        <div className="flex items-center gap-2 text-white/90 mt-1">
                          <span>{selectedJob.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedJob.location}</span>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-white/80 text-sm">
                          <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                            <Banknote className="w-4 h-4" />
                            {selectedJob.ctc}
                          </span>
                          <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                            <GraduationCap className="w-4 h-4" />
                            {selectedJob.batch}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Placeholder for Eligibility Status Check */}
                    <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      View Criteria
                    </Badge>
                  </div>
                </div>

                {selectedJob.status === "Closed" && (
                  <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-sm text-red-600">
                    <Clock className="w-4 h-4" />
                    Applications are now closed for this position.
                  </div>
                )}

                <CardContent className="p-0">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0 px-6">
                      <TabsTrigger value="description" className="tab-trigger px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">
                        <FileText className="w-4 h-4 mr-2" /> Description
                      </TabsTrigger>
                      <TabsTrigger value="workflow" className="tab-trigger px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">
                        <Users className="w-4 h-4 mr-2" /> Workflow
                      </TabsTrigger>
                      <TabsTrigger value="eligibility" className="tab-trigger px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">
                        <GraduationCap className="w-4 h-4 mr-2" /> Eligibility
                      </TabsTrigger>
                    </TabsList>

                    <div className="p-6 max-h-[600px] overflow-y-auto scrollbar-thin">
                      <TabsContent value="description" className="mt-0 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-muted/30 border">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Type</span>
                            <p className="font-medium text-foreground mt-1">{selectedJob.type}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-muted/30 border">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Deadline</span>
                            <p className="font-medium text-foreground mt-1">{selectedJob.deadline ? formatDate(selectedJob.deadline) : "ASAP"}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-muted/30 border">
                            <span className="text-xs font-medium text-muted-foreground uppercase">CTC / Stipend</span>
                            <p className="font-medium text-primary mt-1">{selectedJob.ctc}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-muted/30 border">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Location</span>
                            <p className="font-medium text-foreground mt-1">{selectedJob.location}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Job Description</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {selectedJob.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Allowed Branches</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedJob.branches && selectedJob.branches.length > 0 ? (
                              selectedJob.branches.map((branch) => (
                                <Badge key={branch} variant="secondary">
                                  {branch}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="secondary">All Branches</Badge>
                            )}
                          </div>
                        </div>

                        {selectedJob.status === "Open" && (
                          <div className="pt-4">
                            <Button
                              size="lg"
                              className="w-full shadow-lg"
                              onClick={() => setApplicationModalOpen(true)}
                            >
                              Apply Now
                            </Button>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="workflow" className="mt-0">
                        <h4 className="font-semibold text-foreground mb-6">Selection Process</h4>
                        <div className="space-y-4">
                          {selectedJob.rounds && selectedJob.rounds.length > 0 ? (
                            selectedJob.rounds.map((step, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg border">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                                  {index + 1}
                                </div>
                                <span className="font-medium">{step}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-sm">No specific rounds details provided.</p>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="eligibility" className="mt-0">
                        <h4 className="font-semibold text-foreground mb-4">Eligibility Criteria</h4>
                        <div className="space-y-3">
                          {/* Dynamically rendering eligibility based on DB fields */}
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-foreground">Min CGPA: <strong>{selectedJob.min_cgpa}</strong></span>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border">
                            {selectedJob.active_backlogs ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className="text-foreground">Active Backlogs: <strong>{selectedJob.active_backlogs ? "Allowed" : "Not Allowed"}</strong></span>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border">
                            {selectedJob.dead_backlogs ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className="text-foreground">Dead Backlogs: <strong>{selectedJob.dead_backlogs ? "Allowed" : "Not Allowed"}</strong></span>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-foreground">Target Batch: <strong>{selectedJob.batch}</strong></span>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-foreground">Degrees: <strong>{selectedJob.degrees?.join(", ") || "All"}</strong></span>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="insights" className="mt-0">
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">
                            No senior experiences available for {selectedJob.company} yet.
                          </p>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Placeholder for the modal - assuming you have this component or will build it later */}
      {/* <ApplicationModal isOpen={applicationModalOpen} onClose={() => setApplicationModalOpen(false)} job={selectedJob} /> */}
    </MainLayout>
  );
}