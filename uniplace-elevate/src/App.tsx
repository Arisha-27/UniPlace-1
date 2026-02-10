import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import JobPostings from "./pages/JobPostings";
import Results from "./pages/Results";
import StudentsDatabase from "./pages/StudentsDatabase";
import CompaniesPOC from "./pages/CompaniesPOC";
import Events from "./pages/Events";
import Hackathons from "./pages/Hackathons";
import BlogsApproval from "./pages/BlogsApproval";
import EmailCenter from "./pages/EmailCenter";
import ReportsExports from "./pages/ReportsExports";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/job-postings" element={<JobPostings />} />
            <Route path="/results" element={<Results />} />
            <Route path="/students" element={<StudentsDatabase />} />
            <Route path="/companies-poc" element={<CompaniesPOC />} />
            <Route path="/events" element={<Events />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/blogs" element={<BlogsApproval />} />
            <Route path="/email" element={<EmailCenter />} />
            <Route path="/reports" element={<ReportsExports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
