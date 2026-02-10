import { useState } from "react";
import { useNavigate } from "react-router-dom"; // IMPORT ADDED
import { MainLayout } from "@/components/layout/MainLayout";
import { blogs } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CompanyLogo } from "@/components/CompanyLogo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Clock, ChevronRight, BookOpen, Sparkles } from "lucide-react";

const companies = ["All", "Amazon", "Google", "Microsoft", "Adobe", "Flipkart", "Goldman Sachs"];
const roles = ["All", "SDE", "STEP Intern", "Data Science", "Analyst"];

export default function SeniorBlogs() {
  const navigate = useNavigate(); // HOOK ADDED
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = companyFilter === "All" || blog.company === companyFilter;
    const matchesRole = roleFilter === "All" || blog.role.includes(roleFilter.replace(" Intern", ""));
    return matchesSearch && matchesCompany && matchesRole;
  });

  // Feature the first blog
  const featuredBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  // NAVIGATION HANDLER ADDED
  const handleReadStory = (id: number) => {
    navigate(`/senior-blogs/${id}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Senior Blogs</h1>
            <p className="text-muted-foreground">
              Interview experiences and tips from seniors who cracked top companies
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-40 bg-muted/50">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40 bg-muted/50">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex-1" />

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search blogs or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-muted/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Blog */}
        {featuredBlog && (
          <Card
            className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10 group cursor-pointer hover:shadow-xl transition-all"
            onClick={() => handleReadStory(featuredBlog.id)} // CLICK HANDLER ADDED
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-20 h-20 ring-4 ring-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {featuredBlog.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Badge className="bg-primary text-white border-0 mb-3">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured Story
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {featuredBlog.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-muted-foreground">{featuredBlog.author}</span>
                    <Badge variant="outline" className="bg-white">{featuredBlog.company}</Badge>
                    <Badge variant="secondary">{featuredBlog.role}</Badge>
                    <span className="text-muted-foreground">{featuredBlog.batch}</span>
                  </div>
                  <p className="text-muted-foreground mt-4 line-clamp-2">{featuredBlog.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredBlog.readTime}
                    </span>
                    <Button className="shadow-md">
                      Read Story <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
                <CompanyLogo company={featuredBlog.company} size="xl" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => handleReadStory(blog.id)} // CLICK HANDLER ADDED
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {blog.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {blog.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{blog.batch}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <CompanyLogo company={blog.company} size="sm" />
                  <Badge variant="outline" className="bg-muted/50">{blog.company}</Badge>
                  <Badge variant="secondary" className="text-xs">{blog.role}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary p-0 h-auto group-hover:translate-x-1 transition-transform">
                    Read Story <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground text-lg">No blogs found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}