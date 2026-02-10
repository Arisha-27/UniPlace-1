import { MainLayout } from "@/components/layout/MainLayout";
import { resumes, resumeTemplates } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  Star,
  AlertCircle,
  Download,
  MoreHorizontal,
  Sparkles,
  File,
} from "lucide-react";

export default function Resume() {
  const resumeFiles = resumes.filter((r) => r.type === "resume");
  const documentFiles = resumes.filter((r) => r.type === "document");

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resume & Documents</h1>
            <p className="text-muted-foreground">Manage your resumes, documents, and write-ups</p>
          </div>
        </div>

        {/* Resume Templates Section (UPDATED) */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              Build New Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {resumeTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl p-3 hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-primary/50"
                >
                  {/* Image Container */}
                  <div className="aspect-[3/4] bg-muted/20 rounded-lg mb-3 overflow-hidden border border-border/20 relative shadow-inner">
                    <img
                      // Assumes IDs are 1, 2, 3, 4 matching resume1.png, resume2.png...
                      src={`/resume${template.id}.png`}
                      alt={template.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" variant="secondary" className="shadow-lg">
                        Use Template
                      </Button>
                    </div>
                  </div>

                  <h4 className="font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {template.preview}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Resumes Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              My Resume
            </CardTitle>
            <Button className="shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumeFiles.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-xl p-4 flex items-start gap-4 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group bg-white"
                >
                  <div className="w-12 h-14 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-red-500">PDF</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">{file.name}</h4>
                      {file.hasIssue && (
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      )}
                      {file.starred && (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created at {file.createdAt}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Documents Section */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <File className="w-5 h-5 text-blue-500" />
              </div>
              My Documents
            </CardTitle>
            <Button variant="secondary" disabled className="opacity-50">
              <Plus className="w-4 h-4 mr-2" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentFiles.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-xl p-4 flex items-start gap-4 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group bg-white"
                >
                  <div className="w-12 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">{file.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created at {file.createdAt}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}