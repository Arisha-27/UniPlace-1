// Mock data for UniPlace TnP Admin Dashboard

export const mockCompanies = [
  { id: "1", name: "Amazon", industry: "Technology", location: "PAN India", status: "Active" as const, website: "https://amazon.com", description: "Global technology company", pocName: "Rajesh Kumar", pocEmail: "rajesh@amazon.com", pocPhone: "+91 9876543210", totalOffers: 12 },
  { id: "2", name: "Google", industry: "Technology", location: "Bengaluru", status: "Active" as const, website: "https://google.com", description: "Search and cloud company", pocName: "Priya Sharma", pocEmail: "priya@google.com", pocPhone: "+91 9876543211", totalOffers: 8 },
  { id: "3", name: "Microsoft", industry: "Technology", location: "Hyderabad", status: "Active" as const, website: "https://microsoft.com", description: "Software corporation", pocName: "Amit Singh", pocEmail: "amit@microsoft.com", pocPhone: "+91 9876543212", totalOffers: 15 },
  { id: "4", name: "Goldman Sachs", industry: "Finance", location: "Bengaluru", status: "Active" as const, website: "https://goldmansachs.com", description: "Investment banking", pocName: "Neha Gupta", pocEmail: "neha@gs.com", pocPhone: "+91 9876543213", totalOffers: 5 },
  { id: "5", name: "Adobe", industry: "Technology", location: "Noida", status: "Inactive" as const, website: "https://adobe.com", description: "Creative software company", pocName: "Vikram Patel", pocEmail: "vikram@adobe.com", pocPhone: "+91 9876543214", totalOffers: 3 },
  { id: "6", name: "Flipkart", industry: "E-Commerce", location: "Bengaluru", status: "Active" as const, website: "https://flipkart.com", description: "E-commerce platform", pocName: "Sneha Reddy", pocEmail: "sneha@flipkart.com", pocPhone: "+91 9876543215", totalOffers: 7 },
];

export const mockJobPostings = [
  { id: "1", title: "SDE Intern", company: "Amazon", type: "Intern" as const, ctc: "₹1,10,000/month", deadline: "2026-03-15", status: "Open" as const, location: "PAN India", description: "Software Development Engineer Intern", rounds: ["OA", "Interview", "HR"], minCgpa: 7.0, branches: ["CSE", "IT", "ECE"], batch: "2027" },
  { id: "2", title: "Software Engineer", company: "Google", type: "FTE" as const, ctc: "₹45 LPA", deadline: "2026-03-20", status: "Open" as const, location: "Bengaluru", description: "Full-time Software Engineer role", rounds: ["OA", "Interview"], minCgpa: 8.0, branches: ["CSE", "IT"], batch: "2026" },
  { id: "3", title: "SDE Full Time", company: "Microsoft", type: "FTE" as const, ctc: "₹50 LPA", deadline: "2026-02-28", status: "Open" as const, location: "Hyderabad", description: "SDE role at Microsoft", rounds: ["OA", "Interview", "HR"], minCgpa: 7.5, branches: ["CSE", "IT", "ECE", "EE"], batch: "2026" },
  { id: "4", title: "Summer Analyst", company: "Goldman Sachs", type: "Intern" as const, ctc: "₹80,000/month", deadline: "2026-02-20", status: "Closed" as const, location: "Bengaluru", description: "Summer Analyst Internship", rounds: ["OA", "Interview"], minCgpa: 8.0, branches: ["CSE", "IT", "Math"], batch: "2027" },
  { id: "5", title: "Product Intern", company: "Adobe", type: "Intern" as const, ctc: "₹1,00,000/month", deadline: "2026-03-10", status: "Open" as const, location: "Noida", description: "Product Management Intern", rounds: ["OA", "Interview", "HR"], minCgpa: 7.5, branches: ["CSE", "IT"], batch: "2027" },
  { id: "6", title: "SDE-1", company: "Flipkart", type: "FTE" as const, ctc: "₹35 LPA", deadline: "2026-03-25", status: "Open" as const, location: "Bengaluru", description: "Software Development Engineer", rounds: ["OA", "Interview"], minCgpa: 7.0, branches: ["CSE", "IT", "ECE"], batch: "2026" },
];

export const mockStudents = [
  { id: "1", name: "Ananya Gupta", rollNo: "2022001", branch: "CSE", cgpa: 9.1, email: "ananya@college.edu", phone: "+91 9000000001", gender: "Female", tenth: 95, twelfth: 92, backlogs: 0, internStatus: "Completed", ppoStatus: "Yes", placed: true, company: "Amazon", package: "₹45 LPA" },
  { id: "2", name: "Vaishnavi Singh", rollNo: "2022002", branch: "CSE", cgpa: 8.8, email: "vaishnavi@college.edu", phone: "+91 9000000002", gender: "Female", tenth: 90, twelfth: 88, backlogs: 0, internStatus: "Completed", ppoStatus: "No", placed: true, company: "Google", package: "₹45 LPA" },
  { id: "3", name: "Priya Sharma", rollNo: "2022003", branch: "IT", cgpa: 8.5, email: "priya@college.edu", phone: "+91 9000000003", gender: "Female", tenth: 88, twelfth: 85, backlogs: 0, internStatus: "Ongoing", ppoStatus: "No", placed: false, company: "-", package: "-" },
  { id: "4", name: "Rahul Verma", rollNo: "2022004", branch: "ECE", cgpa: 7.9, email: "rahul@college.edu", phone: "+91 9000000004", gender: "Male", tenth: 85, twelfth: 82, backlogs: 1, internStatus: "Not Started", ppoStatus: "No", placed: false, company: "-", package: "-" },
  { id: "5", name: "Anjali Patel", rollNo: "2022005", branch: "CSE", cgpa: 9.3, email: "anjali@college.edu", phone: "+91 9000000005", gender: "Female", tenth: 96, twelfth: 94, backlogs: 0, internStatus: "Completed", ppoStatus: "Yes", placed: true, company: "Microsoft", package: "₹50 LPA" },
  { id: "6", name: "Sneha Reddy", rollNo: "2022006", branch: "IT", cgpa: 8.2, email: "sneha@college.edu", phone: "+91 9000000006", gender: "Female", tenth: 87, twelfth: 84, backlogs: 0, internStatus: "Completed", ppoStatus: "No", placed: true, company: "Flipkart", package: "₹35 LPA" },
  { id: "7", name: "Arjun Mehta", rollNo: "2022007", branch: "CSE", cgpa: 7.5, email: "arjun@college.edu", phone: "+91 9000000007", gender: "Male", tenth: 80, twelfth: 78, backlogs: 2, internStatus: "Not Started", ppoStatus: "No", placed: false, company: "-", package: "-" },
  { id: "8", name: "Riya Verma", rollNo: "2022008", branch: "ECE", cgpa: 8.7, email: "riya@college.edu", phone: "+91 9000000008", gender: "Female", tenth: 92, twelfth: 90, backlogs: 0, internStatus: "Completed", ppoStatus: "No", placed: true, company: "Goldman Sachs", package: "₹40 LPA" },
];

export const mockEvents = [
  { id: "1", title: "Resume Building Workshop", type: "Workshop" as const, date: "2026-02-10", time: "2:00 PM", location: "Seminar Hall A", description: "Learn how to build an effective resume", registrationLink: "#", registered: 156 },
  { id: "2", title: "Mock Interview Session", type: "Workshop" as const, date: "2026-02-15", time: "10:00 AM", location: "Conference Room 101", description: "Practice interviews with industry experts", registrationLink: "#", registered: 89 },
  { id: "3", title: "LinkedIn Optimization Webinar", type: "Webinar" as const, date: "2026-02-18", time: "4:00 PM", location: "Online (Zoom)", description: "Optimize your LinkedIn profile", registrationLink: "#", registered: 234 },
  { id: "4", title: "Career in Data Science", type: "Seminar" as const, date: "2026-02-22", time: "11:00 AM", location: "Auditorium", description: "Industry seminar on data science careers", registrationLink: "#", registered: 312 },
];

export const mockHackathons = [
  { id: "1", name: "Inter-College Codeathon 2026", organizer: "TechFest Committee", mode: "Offline" as const, deadline: "2026-02-20", rewards: "₹2,00,000", description: "48-hour coding competition", registrationLink: "#", participants: 450 },
  { id: "2", name: "AI/ML Innovation Challenge", organizer: "Google Developer Groups", mode: "Online" as const, deadline: "2026-03-05", rewards: "₹1,50,000 + Internship", description: "AI/ML project competition", registrationLink: "#", participants: 280 },
  { id: "3", name: "CodeChef SnackDown 2026", organizer: "CodeChef", mode: "Online" as const, deadline: "2026-02-28", rewards: "₹5,00,000", description: "Global competitive programming contest", registrationLink: "#", participants: 12000 },
  { id: "4", name: "Smart India Hackathon", organizer: "Ministry of Education", mode: "Offline" as const, deadline: "2026-03-15", rewards: "₹1,00,000 per problem", description: "National level hackathon", registrationLink: "#", participants: 50000 },
];

export const mockBlogs = [
  { id: "1", title: "How I cracked the Amazon SDE Intern Interview", author: "Ananya Gupta", company: "Amazon", status: "Pending" as const, content: "From getting rejected in the OA last year to bagging the offer this time...", tags: ["Amazon", "SDE Intern"], readTime: "8 min" },
  { id: "2", title: "Google STEP Internship Experience", author: "Vaishnavi Singh", company: "Google", status: "Approved" as const, content: "Google STEP is unique because it focuses on potential rather than advanced system design...", tags: ["Google", "STEP Intern"], readTime: "12 min" },
  { id: "3", title: "Microsoft SDE: From Campus to Offer", author: "Priya Sharma", company: "Microsoft", status: "Pending" as const, content: "My experience going through the Microsoft Engage mentorship program...", tags: ["Microsoft", "SDE"], readTime: "10 min" },
  { id: "4", title: "Cracking Adobe: On-Campus Experience", author: "Anjali Patel", company: "Adobe", status: "Rejected" as const, content: "Adobe's process is unique with a heavy focus on Puzzles and Core CS...", tags: ["Adobe", "Product Intern"], readTime: "7 min" },
];

export const mockResults = [
  { id: "1", studentName: "Ananya Gupta", rollNo: "2022001", job: "SDE Intern - Amazon", oaStatus: "Cleared", interviewStatus: "Cleared", finalStatus: "Selected" },
  { id: "2", studentName: "Vaishnavi Singh", rollNo: "2022002", job: "SDE Intern - Amazon", oaStatus: "Cleared", interviewStatus: "Cleared", finalStatus: "Rejected" },
  { id: "3", studentName: "Priya Sharma", rollNo: "2022003", job: "SDE Intern - Amazon", oaStatus: "Cleared", interviewStatus: "Pending", finalStatus: "Pending" },
  { id: "4", studentName: "Anjali Patel", rollNo: "2022005", job: "Software Engineer - Google", oaStatus: "Cleared", interviewStatus: "Cleared", finalStatus: "Selected" },
  { id: "5", studentName: "Rahul Verma", rollNo: "2022004", job: "Software Engineer - Google", oaStatus: "Not Cleared", interviewStatus: "-", finalStatus: "Rejected" },
  { id: "6", studentName: "Sneha Reddy", rollNo: "2022006", job: "SDE-1 - Flipkart", oaStatus: "Cleared", interviewStatus: "Cleared", finalStatus: "Selected" },
];

export const branchWisePlacement = [
  { branch: "CSE", placed: 45, total: 60 },
  { branch: "IT", placed: 30, total: 50 },
  { branch: "ECE", placed: 20, total: 45 },
  { branch: "EE", placed: 15, total: 40 },
  { branch: "ME", placed: 10, total: 35 },
  { branch: "CE", placed: 8, total: 30 },
];

export const companyWiseHiring = [
  { company: "Amazon", hires: 12 },
  { company: "Google", hires: 8 },
  { company: "Microsoft", hires: 15 },
  { company: "Goldman Sachs", hires: 5 },
  { company: "Flipkart", hires: 7 },
  { company: "Adobe", hires: 3 },
];

export const dashboardStats = {
  totalStudents: 260,
  totalCompanies: 24,
  activeJobPostings: 12,
  studentsPlaced: 128,
  studentsUnplaced: 132,
  ppoCount: 18,
  sixMonthInterns: 45,
};
