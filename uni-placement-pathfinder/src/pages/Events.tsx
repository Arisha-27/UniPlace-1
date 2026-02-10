import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Calendar,
  Video,
  BookOpen,
  Loader2,
  ExternalLink,
  Mic,
} from "lucide-react";

// Configuration for styling based on event type
const eventTypeConfig: Record<string, { color: string; icon: any }> = {
  Workshop: { color: "bg-blue-600", icon: BookOpen },
  Webinar: { color: "bg-purple-600", icon: Video },
  Seminar: { color: "bg-amber-600", icon: CalendarDays },
  Hackathon: { color: "bg-orange-600", icon: CalendarDays },
};

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  speaker: string;
  registration_link: string;
  image_url: string;
  created_at: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // Helper to format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Events</h1>
            <p className="text-muted-foreground">Workshops, webinars, and seminars</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No upcoming events found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              // Get style config or default to Seminar style
              const config = eventTypeConfig[event.type] || eventTypeConfig["Seminar"];
              const Icon = config.icon;

              return (
                <Card
                  key={event.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group flex flex-col h-full"
                >
                  {/* Banner Image Section */}
                  {event.image_url ? (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback if image link is broken
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <Badge className={`absolute top-3 left-3 ${config.color} text-white border-0`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {event.type}
                      </Badge>
                    </div>
                  ) : (
                    // Fallback: Colored Header if no image
                    <div className={`h-3 bg-gradient-to-r ${config.color.replace("bg-", "from-")} to-gray-200`} />
                  )}

                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* If no image, show Badge here */}
                        {!event.image_url && (
                          <Badge className={`w-fit ${config.color} text-white border-0 mb-2`}>
                            <Icon className="w-3 h-3 mr-1" />
                            {event.type}
                          </Badge>
                        )}
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        {event.organizer && (
                          <p className="text-xs text-muted-foreground mt-1 font-medium">
                            Organized by {event.organizer}
                          </p>
                        )}
                      </div>

                      {/* Icon Box (Only shown if no image) */}
                      {!event.image_url && (
                        <div className={`w-12 h-12 rounded-xl ${config.color}/10 flex items-center justify-center shrink-0 ml-3`}>
                          <Icon className={`w-6 h-6 ${config.color.replace("bg-", "text-")}`} />
                        </div>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-3 text-sm text-muted-foreground mb-6 flex-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{event.location || "Online"}</span>
                      </div>
                      {event.speaker && (
                        <div className="flex items-center gap-2">
                          <Mic className="w-4 h-4 text-primary shrink-0" />
                          <span className="truncate">{event.speaker}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer / Action Button */}
                    <div className="pt-4 border-t mt-auto flex items-center justify-between">
                      {/* You can replace this registered count with real data later if you add it */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        <span>Open for all</span>
                      </div>

                      {event.registration_link ? (
                        <Button
                          className="shadow-sm gap-2"
                          size="sm"
                          onClick={() => window.open(event.registration_link, "_blank")}
                        >
                          Register Now <ExternalLink className="w-3 h-3" />
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm" disabled>
                          Closed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}