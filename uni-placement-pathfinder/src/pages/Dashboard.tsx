import { MainLayout } from "@/components/layout/MainLayout";
import { stats, jobs, blogs } from "@/data/mockData";
import { CompanyLogo } from "@/components/CompanyLogo";
import heroImage from "@/assets/hero-placement.jpg";
import {
  Briefcase,
  CheckCircle,
  Calendar,
  ClipboardList,
  ArrowRight,
  Clock,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const statItems = [
  { label: "Jobs Applied", value: stats.jobsApplied, icon: Briefcase, lightBg: "bg-blue-50", color: "text-blue-600" },
  { label: "Shortlisted", value: stats.shortlisted, icon: CheckCircle, lightBg: "bg-primary/10", color: "text-primary" },
  { label: "Upcoming Interviews", value: stats.upcomingInterviews, icon: Calendar, lightBg: "bg-amber-50", color: "text-amber-600" },
  { label: "Pending Assessments", value: stats.assessmentsPending, icon: ClipboardList, lightBg: "bg-rose-50", color: "text-rose-600" },
];

export default function Dashboard() {
  const openJobs = jobs.filter((job) => job.status === "Open");
  const latestBlogs = blogs.slice(0, 3);

  return (
    <MainLayout>
      <div className="space-y-6">

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
          <div className="relative px-8 py-10 text-white">
            <div className="max-w-2xl">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Placement Season 2026
              </Badge>
              <h1 className="text-3xl font-bold mb-2">Welcome to UniPlace</h1>
              <p className="text-white/90 text-lg">
                Your gateway to top tech companies. Explore opportunities, track applications, and land your dream job.
              </p>
              <div className="flex gap-3 mt-6">
                <Link to="/jobs">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                    Browse Jobs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button size="lg" className="bg-white/90 text-primary hover:bg-white font-semibold">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-md">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.lightBg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Open Applications */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-xl font-bold">Open for Applications</h2>
              </div>
              <Link to="/jobs">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {openJobs.map((job) => (
              <Card key={job.id} className="border-0 shadow-md hover:shadow-xl transition">
                <CardContent className="p-5 flex gap-4">
                  <CompanyLogo company={job.company} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • {job.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" /> {job.postedAt}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{job.ctc}</p>
                    <Link to={`/jobs?id=${job.id}`}>
                      <Button size="sm" className="mt-2">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* College Header */}
            <div className="flex items-center gap-6 bg-card rounded-xl p-6 shadow-sm">
              <img
                src="/college-logo.png"
                alt="IGDTUW"
                className="w-24 h-25 object-contain"
              />

              <div className="flex flex-col justify-center">
                {/* Line 1: University Name - Bold & Black */}
                <h2 className="text-xl font-bold text-foreground leading-tight">
                  Indira Gandhi Delhi Technical University for Women
                </h2>

                {/* Line 2: Delhi - Gray */}
                <p className="text-base text-muted-foreground font-medium mt-1">
                  Delhi
                </p>
              </div>
            </div>



            {/* Latest Blogs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  <h2 className="text-lg font-bold">Latest Blogs</h2>
                </div>
                <Link to="/blogs">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </Link>
              </div>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4 space-y-4">
                  {latestBlogs.map((blog) => (
                    <div key={blog.id} className="flex gap-3 border-b pb-4 last:border-0 last:pb-0">
                      <CompanyLogo company={blog.company} size="md" />
                      <div>
                        <p className="text-sm font-medium">{blog.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {blog.author} • {blog.batch}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/resume">
                  <Button variant="outline" className="w-full justify-start bg-white">
                    Update Resume
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" className="w-full justify-start bg-white">
                    Complete Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
