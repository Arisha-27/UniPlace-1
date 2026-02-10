import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Clock,
  Users,
  Gift,
  Building2,
  Code,
  Cpu,
  Rocket,
  Loader2,
  ExternalLink,
} from "lucide-react";

// You can keep your local image import here
// If you don't have it, just use a placeholder URL in the style={{ ... }} below
import hackathonImage from "@/assets/hackathon.jpg";

interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  mode: string;
  deadline: string;
  prizes: string;
  team_size: string;
  registration_link: string;
  skills: string[];
}

export default function Competitions() {
  const [competitions, setCompetitions] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .order('deadline', { ascending: true });

      if (error) {
        console.error("Error fetching competitions:", error);
      } else {
        setCompetitions(data || []);
      }
      setLoading(false);
    };

    fetchCompetitions();
  }, []);

  // Helper: Format Date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Helper: Determine Icon & Category based on Title
  const getCategoryDetails = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("ai") || t.includes("ml") || t.includes("data")) {
      return { label: "Project Competition", icon: Cpu, color: "from-emerald-500 to-teal-500", text: "text-emerald-600", bg: "from-emerald-100 to-teal-100" };
    }
    if (t.includes("code") || t.includes("programming")) {
      return { label: "Competitive Programming", icon: Code, color: "from-orange-500 to-red-500", text: "text-orange-600", bg: "from-orange-100 to-red-100" };
    }
    if (t.includes("hackathon") || t.includes("sih")) {
      return { label: "National Hackathon", icon: Rocket, color: "from-blue-500 to-indigo-500", text: "text-blue-600", bg: "from-blue-100 to-indigo-100" };
    }
    return { label: "Hackathon", icon: Trophy, color: "from-amber-500 to-yellow-500", text: "text-amber-600", bg: "from-amber-100 to-yellow-100" };
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">

        {/* Hero Banner (Preserved) */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${hackathonImage})`,
              // Fallback if image fails to load
              backgroundColor: '#2e1065'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-800/80 to-transparent" />
          <div className="relative px-8 py-12 text-white">
            <Badge className="bg-white/20 text-white border-0 mb-3 backdrop-blur-sm">
              <Trophy className="w-3 h-3 mr-2" />
              Active Competitions
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Competitions & Hackathons</h1>
            <p className="text-white/80 max-w-lg text-lg">
              Showcase your skills, win prizes, and get noticed by top recruiters.
            </p>
          </div>
        </div>

        {/* Competitions Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : competitions.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-muted/30 rounded-xl">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No active competitions found. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competitions.map((comp) => {
              const { label, icon: Icon, color, text, bg } = getCategoryDetails(comp.title);

              return (
                <Card key={comp.id} className="border-0 shadow-lg hover:shadow-xl transition-all group flex flex-col h-full">
                  <CardContent className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <Badge className={`bg-gradient-to-r ${color} text-white border-0 mb-3`}>
                          {label}
                        </Badge>
                        <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {comp.title}
                        </h3>
                      </div>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-7 h-7 ${text}`} />
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-foreground">{comp.organizer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>Deadline: <strong className="text-foreground">{formatDate(comp.deadline)}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-emerald-600 font-bold">{comp.prizes || "TBD"}</span>
                      </div>
                    </div>
                  </CardContent>

                  <div className="px-6 pb-6 pt-0 mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{comp.team_size || "Any Team Size"}</span>
                    </div>

                    {comp.registration_link ? (
                      <Button
                        className={`shadow-md bg-gradient-to-r ${color} hover:opacity-90 transition-opacity gap-2`}
                        onClick={() => window.open(comp.registration_link, "_blank")}
                      >
                        Register <ExternalLink className="w-3 h-3" />
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled>Closed</Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}