import { MainLayout } from "@/components/layout/MainLayout";
import { interviews } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/CompanyLogo";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Building2,
} from "lucide-react";

export default function Interviews() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interviews</h1>
            <p className="text-muted-foreground">Your scheduled interviews</p>
          </div>
        </div>

        {interviews.length > 0 ? (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <Card key={interview.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <CompanyLogo company={interview.company} size="xl" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{interview.company}</h3>
                        <Badge
                          className={
                            interview.type === "Technical"
                              ? "bg-blue-500/10 text-blue-600 border-0"
                              : interview.type === "HR"
                              ? "bg-primary/10 text-primary border-0"
                              : "bg-amber-500/10 text-amber-600 border-0"
                          }
                        >
                          {interview.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{interview.role}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="font-medium text-foreground">{interview.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Time</p>
                            <p className="font-medium text-foreground">{interview.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            {interview.venue.includes("Video") ? (
                              <Video className="w-4 h-4 text-primary" />
                            ) : (
                              <MapPin className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Venue</p>
                            <p className="font-medium text-foreground">{interview.venue}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground text-lg">No upcoming interviews</h3>
              <p className="text-muted-foreground mt-1">
                Apply to jobs to get interview invites
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
