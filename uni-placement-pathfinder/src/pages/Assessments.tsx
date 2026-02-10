import { MainLayout } from "@/components/layout/MainLayout";
import { assessments } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/CompanyLogo";
import {
  Calendar,
  Clock,
  Play,
  CheckCircle,
  XCircle,
  ClipboardList,
} from "lucide-react";

export default function Assessments() {
  const upcomingAssessments = assessments.filter((a) => a.status === "Upcoming");
  const completedAssessments = assessments.filter((a) => a.status === "Completed");
  const missedAssessments = assessments.filter((a) => a.status === "Missed");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Assessments</h1>
            <p className="text-muted-foreground">Online tests and coding challenges</p>
          </div>
        </div>

        {/* Upcoming Assessments */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            Upcoming
          </h2>
          {upcomingAssessments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAssessments.map((assessment) => (
                <Card key={assessment.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <CompanyLogo company={assessment.company} size="lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{assessment.company}</h3>
                        <p className="text-sm text-muted-foreground">{assessment.title}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {assessment.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Clock className="w-4 h-4" />
                            {assessment.duration}
                          </div>
                        </div>
                        <Button className="shadow-md">
                          <Play className="w-4 h-4 mr-2" />
                          Start Test
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="py-8 text-center">
                <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No upcoming assessments</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Completed Assessments */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            Completed
          </h2>
          <div className="space-y-3">
            {completedAssessments.map((assessment) => (
              <Card key={assessment.id} className="border-0 shadow-md bg-muted/30">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <CompanyLogo company={assessment.company} size="lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{assessment.company}</h3>
                      <p className="text-sm text-muted-foreground">{assessment.title}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {assessment.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Clock className="w-4 h-4" />
                          {assessment.duration}
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Missed Assessments */}
        {missedAssessments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              Missed
            </h2>
            <div className="space-y-3">
              {missedAssessments.map((assessment) => (
                <Card key={assessment.id} className="border-0 shadow-md opacity-60">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <CompanyLogo company={assessment.company} size="lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{assessment.company}</h3>
                        <p className="text-sm text-muted-foreground">{assessment.title}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {assessment.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Clock className="w-4 h-4" />
                            {assessment.duration}
                          </div>
                        </div>
                        <Badge className="bg-destructive/10 text-destructive border-0">
                          <XCircle className="w-3 h-3 mr-1" />
                          Missed
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
