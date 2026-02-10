import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { blogs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CompanyLogo } from "@/components/CompanyLogo";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, CheckCircle2 } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog from mockData
  // We use Number(id) because the ID in the URL is a string, but mockData IDs are numbers
  const blog = blogs.find((b) => b.id === Number(id));

  // If blog is not found (invalid ID)
  if (!blog) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold">Blog not found</h2>
          <p className="text-muted-foreground mt-2">The story you are looking for does not exist.</p>
          {/* FIXED ROUTE HERE */}
          <Button onClick={() => navigate("/senior-blogs")} className="mt-4">
            Back to Blogs
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto pb-20">

        {/* Navigation Bar */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md py-4 border-b mb-8 flex items-center justify-between">
          {/* FIXED ROUTE HERE */}
          <Button
            variant="ghost"
            onClick={() => navigate("/senior-blogs")}
            className="gap-2 pl-0 hover:bg-transparent hover:text-primary cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Blogs
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Blog Header */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-sm bg-muted text-muted-foreground hover:bg-muted">
              {blog.role}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm border-primary/20 text-primary bg-primary/5">
              {blog.company} Experience
            </Badge>
          </div>

          {/* LOGO ADDED TO LEFT OF HEADING */}
          <div className="flex items-start gap-6">
            <div className="mt-1 hidden sm:block shrink-0">
              <CompanyLogo company={blog.company} size="xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {blog.title}
            </h1>
          </div>

          <div className="flex items-center justify-between border-y py-6 mt-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 ring-2 ring-background shadow-sm">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                  {blog.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground text-lg">{blog.author}</p>
                <p className="text-sm text-muted-foreground">{blog.batch} • Placed at {blog.company}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" /> Posted {blog.date}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 justify-end">
                <Clock className="w-4 h-4" /> {blog.readTime}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Blog Content from Mock Data */}
        <article className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">

          <p className="text-xl leading-relaxed mb-8 font-medium text-foreground/80">
            {blog.excerpt}
          </p>

          {/* Rounds Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-foreground mb-6">The Selection Process</h3>
            <div className="space-y-6">
              {blog.rounds.map((round, index) => (
                <div key={index} className="bg-muted/30 border border-border/50 rounded-xl p-5 hover:bg-muted/50 transition-colors">
                  <h4 className="text-lg font-bold text-primary mb-2">{round.name}</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {round.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Strategy */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-foreground mb-4">Preparation Strategy</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {blog.preparation}
            </p>
          </div>

          {/* Key Advice */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              Key Advice for Juniors
            </h3>
            <ul className="space-y-3">
              {blog.advice.map((tip, index) => (
                <li key={index} className="flex gap-3 text-foreground/80">
                  <span className="text-primary font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </article>

        {/* Footer Card */}
        <div className="mt-16 bg-muted/30 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border">
          <div className="shrink-0">
            <CompanyLogo company={blog.company} size="lg" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold mb-2">Want to work at {blog.company}?</h4>
            <p className="text-muted-foreground mb-4">
              {blog.company} is hiring for multiple roles. Check the Job Profiles section to see if you are eligible.
            </p>
            <Button variant="default" onClick={() => navigate("/job-profiles")}>
              View Open Jobs at {blog.company}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}