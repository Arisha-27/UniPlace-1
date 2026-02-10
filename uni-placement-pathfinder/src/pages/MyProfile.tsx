import { MainLayout } from "@/components/layout/MainLayout";
import { userProfile } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  CheckCircle,
  Edit,
  Upload,
  BookOpen,
  Building2,
  Calendar,
  Code,
  Award,
  Mail,
  Phone,
} from "lucide-react";

export default function MyProfile() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="border-0 shadow-lg overflow-hidden">
          {/* Background Banner */}
          <div className="h-24 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />

          {/* Content */}
          <CardContent className="relative p-6 pt-0">
            <div className="flex items-end justify-between -mt-12">

              <div className="flex items-end gap-6">
                <Avatar className="w-24 h-24 ring-4 ring-white shadow-xl z-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                    {userProfile.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="pb-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">
                      {userProfile.name}
                    </h1>
                    <Badge className="bg-primary/10 text-primary border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mt-1">
                    {userProfile.branch}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {userProfile.program} • {userProfile.currentSemester} Semester • Batch {userProfile.passoutBatch}
                  </p>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>


        {/* Academic Details */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Education Details</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {userProfile.institution}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase font-medium">Department</p>
                <p className="font-medium text-foreground mt-1 text-sm">{userProfile.department}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase font-medium">Program</p>
                <p className="font-medium text-foreground mt-1 text-sm">{userProfile.program}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase font-medium">Roll Number</p>
                <p className="font-medium text-foreground mt-1 text-sm">{userProfile.rollNo}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase font-medium">Batch</p>
                <p className="font-medium text-foreground mt-1 text-sm">{userProfile.passoutBatch}</p>
              </div>
            </div>

            {/* Semester wise scores table */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                Semester wise Scores
              </h4>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Semester</th>
                      {userProfile.semesterScores.map((sem) => (
                        <th key={sem.semester} className="px-4 py-3 text-center font-medium text-muted-foreground">{sem.semester}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">CGPA</td>
                      {userProfile.semesterScores.map((sem) => (
                        <td key={sem.semester} className="px-4 py-3 text-center text-primary font-semibold">
                          {sem.cgpa}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t bg-muted/30">
                      <td className="px-4 py-3 font-medium">SGPA</td>
                      {userProfile.semesterScores.map((sem) => (
                        <td key={sem.semester} className="px-4 py-3 text-center">{sem.sgpa}</td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Ongoing Backlogs</td>
                      {userProfile.semesterScores.map((sem) => (
                        <td key={sem.semester} className="px-4 py-3 text-center">
                          <Badge variant="outline" className={sem.ongoingBacklogs === 0 ? "bg-primary/10 text-primary border-0" : "bg-destructive/10 text-destructive border-0"}>
                            {sem.ongoingBacklogs}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t bg-muted/30">
                      <td className="px-4 py-3 font-medium">Total Backlogs</td>
                      {userProfile.semesterScores.map((sem) => (
                        <td key={sem.semester} className="px-4 py-3 text-center">{sem.totalBacklogs}</td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Documents</td>
                      {userProfile.semesterScores.map((sem) => (
                        <td key={sem.semester} className="px-4 py-3 text-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                            <Upload className="w-4 h-4 text-primary" />
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-500" />
                </div>
                Internship & Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <Building2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No experiences added yet</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Add Experience
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="w-4 h-4 text-primary" />
                </div>
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "React", "Python", "Data Structures", "Algorithms", "SQL", "Git", "Node.js"].map((skill) => (
                  <Badge key={skill} className="bg-primary/10 text-primary border-0 font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-primary">
                + Add More
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                </div>
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <h5 className="font-medium text-foreground">E-commerce Platform</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Built a full-stack e-commerce platform using MERN stack
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">React</Badge>
                    <Badge variant="outline" className="text-xs">Node.js</Badge>
                    <Badge variant="outline" className="text-xs">MongoDB</Badge>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <h5 className="font-medium text-foreground">ML Image Classifier</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Deep learning model for image classification using TensorFlow
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Python</Badge>
                    <Badge variant="outline" className="text-xs">TensorFlow</Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-primary">
                + Add Project
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-rose-500" />
                </div>
                Positions of Responsibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-muted/50">
                  <h5 className="font-medium text-foreground">Technical Lead - Coding Club</h5>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    2024 - Present
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-primary">
                + Add Position
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
