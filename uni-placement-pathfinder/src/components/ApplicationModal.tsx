import { useState, useCallback } from "react";
import { Job } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  Loader2,
} from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export function ApplicationModal({ isOpen, onClose, job }: ApplicationModalProps) {
  const [stage, setStage] = useState<"upload" | "analyzing" | "results">("upload");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [score, setScore] = useState(0);

  const goldenPoints = [
    "Data Structures & Algorithms",
    "React/Node.js Experience",
    "Previous Internship",
    "System Design Basics",
    "Problem Solving Skills",
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    setUploadedFile(file.name);
    setStage("analyzing");
    
    // Simulate AI analysis
    setTimeout(() => {
      setScore(85);
      setStage("results");
    }, 2500);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const simulateUpload = () => {
    setUploadedFile("Resume_Rahul_SDE_v2.pdf");
    setStage("analyzing");
    
    setTimeout(() => {
      setScore(85);
      setStage("results");
    }, 2500);
  };

  const resetModal = () => {
    setStage("upload");
    setUploadedFile(null);
    setScore(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="block">Apply to {job.company}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {job.title}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Golden Points */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <h4 className="font-medium text-foreground">Key Requirements (Golden Points)</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {goldenPoints.map((point) => (
                <Badge key={point} variant="outline" className="bg-accent/50">
                  {point}
                </Badge>
              ))}
            </div>
          </div>

          {/* Upload Stage */}
          {stage === "upload" && (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium text-foreground mb-1">Upload Your Resume</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your resume here, or click to browse
              </p>
              <div className="flex justify-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                  onChange={handleFileInput}
                />
                <label htmlFor="resume-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
                <Button onClick={simulateUpload}>
                  Use Existing Resume
                </Button>
              </div>
            </div>
          )}

          {/* Analyzing Stage */}
          {stage === "analyzing" && (
            <div className="text-center py-8">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-muted" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse-gentle" />
                </div>
              </div>
              <h4 className="font-medium text-foreground mb-2">Analyzing Your Resume</h4>
              <p className="text-sm text-muted-foreground">
                Our AI is comparing your resume against the job requirements...
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                {uploadedFile}
              </div>
            </div>
          )}

          {/* Results Stage */}
          {stage === "results" && (
            <div className="space-y-6">
              {/* Score Meter */}
              <div className="bg-accent/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">AI Match Score</h4>
                  <span className="text-3xl font-bold text-primary">{score}%</span>
                </div>
                <div className="score-meter">
                  <div
                    className="score-meter-fill"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h5 className="font-medium text-foreground">Strengths</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your resume highlights <strong>React</strong> and <strong>Data Structures</strong> well. 
                      Previous internship experience is a plus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h5 className="font-medium text-foreground">Suggestions</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider adding <strong>Unit Testing</strong> and <strong>AWS experience</strong> to 
                      improve your match score for this role.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={resetModal}>
                  Cancel
                </Button>
                <Button className="flex-1">
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
