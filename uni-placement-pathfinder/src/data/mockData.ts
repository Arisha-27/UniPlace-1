// Mock data for UniPlace - Campus Placement Portal

export interface Job {
  id: string;
  company: string;
  logo: string;
  title: string;
  location: string;
  type: 'Internship' | 'Full Time';
  ctc: string;
  postedAt: string;
  status: 'Open' | 'Closed' | 'Applied';
  eligibleCourses: string[];
  description: string;
  skills: string[];
  workflow: string[];
  eligibility: { criteria: string; met: boolean }[];
}

// UPDATED INTERFACE TO SUPPORT DETAILED BLOGS
export interface Blog {
  id: number; // Changed to number to match BlogPost.tsx logic
  title: string;
  author: string;
  batch: string;
  company: string;
  role: string;
  avatar: string;
  excerpt: string;
  readTime: string;
  date: string;
  // Added fields for detailed view
  rounds: {
    name: string;
    details: string;
  }[];
  preparation: string;
  advice: string[];
}

export interface Event {
  id: string;
  title: string;
  type: 'Workshop' | 'Webinar' | 'Seminar';
  date: string;
  time: string;
  venue: string;
  registrations: number;
}

export interface Competition {
  id: string;
  title: string;
  organizer: string;
  type: string;
  deadline: string;
  prize: string;
  participants: number;
}

export interface Interview {
  id: string;
  company: string;
  role: string;
  date: string;
  time: string;
  venue: string;
  type: 'Technical' | 'HR' | 'Group Discussion';
}

export interface Assessment {
  id: string;
  company: string;
  title: string;
  date: string;
  duration: string;
  status: 'Upcoming' | 'Completed' | 'Missed';
}

export interface Resume {
  id: string;
  name: string;
  type: 'resume' | 'document' | 'writeup';
  createdAt: string;
  starred: boolean;
  hasIssue?: boolean;
}

export const userProfile = {
  name: "Arisha Rizwan",
  rollNo: "08201032023",
  email: "arisha082btit23@igdtuw.ac.in",
  phone: "+91 98765 43210",
  institution: "Indira Gandhi Delhi Technical University for Women, Delhi",
  department: "Information Technology",
  program: "B.Tech",
  branch: "Information Technology",
  currentSemester: "6th",
  passoutBatch: "2027",
  cgpa: 9.11,
  percentage: 91.1,
  avatar: "AR",
  semesterScores: [
    { semester: 1, cgpa: 8.91, sgpa: 8.91, ongoingBacklogs: 0, totalBacklogs: 0 },
    { semester: 2, cgpa: 9.14, sgpa: 9.36, ongoingBacklogs: 0, totalBacklogs: 0 },
    { semester: 3, cgpa: 8.93, sgpa: 8.52, ongoingBacklogs: 0, totalBacklogs: 0 },
    { semester: 4, cgpa: 9.08, sgpa: 9.55, ongoingBacklogs: 0, totalBacklogs: 0 },
    { semester: 5, cgpa: 9.11, sgpa: 9.23, ongoingBacklogs: 0, totalBacklogs: 0 },
  ],
};

export const jobs: Job[] = [
  {
    id: "1",
    company: "Amazon",
    logo: "A",
    title: "SDE Intern",
    location: "PAN India",
    type: "Internship",
    ctc: "₹1,10,000/month",
    postedAt: "2 days ago",
    status: "Open",
    eligibleCourses: ["B.Tech CSE", "B.Tech ECE", "M.Tech CS"],
    description: "We are looking for talented software developers to join our team. You will be working on building scalable systems that handle millions of requests per day. The role involves designing, developing, and maintaining software applications.",
    skills: ["Data Structures", "Algorithms", "Java/C++", "System Design", "AWS (Preferred)"],
    workflow: ["Application Submitted", "Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Round", "Offer"],
    eligibility: [
      { criteria: "CGPA ≥ 7.0", met: true },
      { criteria: "No Active Backlogs", met: true },
      { criteria: "B.Tech/M.Tech in CS/IT/ECE", met: true },
      { criteria: "Batch: 2026/2027", met: true },
    ],
  },
  {
    id: "2",
    company: "Google",
    logo: "G",
    title: "Software Engineer",
    location: "Bengaluru",
    type: "Full Time",
    ctc: "₹45 LPA",
    postedAt: "5 days ago",
    status: "Open",
    eligibleCourses: ["B.Tech CSE", "M.Tech CS", "PhD CS"],
    description: "Join Google to work on products that impact billions of users. We're looking for engineers who can solve complex problems and build innovative solutions.",
    skills: ["Algorithms", "Data Structures", "Python/Go/Java", "Distributed Systems"],
    workflow: ["Application", "Phone Screen", "Technical Interview 1", "Technical Interview 2", "Hiring Committee", "Offer"],
    eligibility: [
      { criteria: "CGPA ≥ 8.0", met: false },
      { criteria: "No Backlogs (Current or Past)", met: true },
      { criteria: "Strong Coding Skills", met: true },
      { criteria: "B.Tech/M.Tech/PhD", met: true },
    ],
  },
  {
    id: "3",
    company: "Microsoft",
    logo: "M",
    title: "SDE Full Time",
    location: "Hyderabad",
    type: "Full Time",
    ctc: "₹50 LPA",
    postedAt: "1 week ago",
    status: "Open",
    eligibleCourses: ["B.Tech CSE", "M.Tech CS"],
    description: "Microsoft is looking for passionate developers to build cloud solutions on Azure platform.",
    skills: ["C#/.NET", "Azure", "System Design", "Algorithms"],
    workflow: ["Application", "Online Assessment", "Technical Interview 1", "Technical Interview 2", "Technical Interview 3", "HR", "Offer"],
    eligibility: [
      { criteria: "CGPA ≥ 7.5", met: true },
      { criteria: "No Active Backlogs", met: true },
      { criteria: "Strong Problem Solving", met: true },
    ],
  },
  {
    id: "4",
    company: "Goldman Sachs",
    logo: "GS",
    title: "Summer Analyst",
    location: "Bengaluru",
    type: "Internship",
    ctc: "₹1,00,000/month",
    postedAt: "4 days ago",
    status: "Open",
    eligibleCourses: ["B.Tech All Branches"],
    description: "Join our Engineering division to build high-performance systems for global financial markets.",
    skills: ["Java/C++", "Data Structures", "Quantitative Aptitude"],
    workflow: ["Application", "Aptitude Test", "CoderPad Interview", "Super Day", "Offer"],
    eligibility: [
      { criteria: "CGPA ≥ 7.0", met: true },
      { criteria: "Strong Mathematical Skills", met: true },
    ],
  },
  {
    id: "5",
    company: "Flipkart",
    logo: "F",
    title: "SDE-1",
    location: "Bengaluru",
    type: "Full Time",
    ctc: "₹32 LPA",
    postedAt: "1 week ago",
    status: "Open",
    eligibleCourses: ["B.Tech CSE", "B.Tech IT"],
    description: "Flipkart is India's leading e-commerce marketplace. We are looking for engineers to solve complex supply chain problems.",
    skills: ["Java", "Distributed Systems", "Low Level Design", "Kafka"],
    workflow: ["Resume Shortlist", "Machine Coding Round", "PS/DS Round", "Hiring Manager Round"],
    eligibility: [
      { criteria: "CGPA ≥ 7.5", met: true },
      { criteria: "Experience with System Design", met: false },
    ],
  },
  {
    id: "6",
    company: "Adobe",
    logo: "Ad",
    title: "Product Intern",
    location: "Noida",
    type: "Internship",
    ctc: "₹1,00,000/month",
    postedAt: "3 days ago",
    status: "Open",
    eligibleCourses: ["B.Tech CSE", "B.Tech ECE"],
    description: "Work on Adobe's creative cloud products. Looking for strong C++ developers.",
    skills: ["C++", "OOPS", "OS Concepts", "Puzzles"],
    workflow: ["Application", "Online Assessment", "Technical Interview", "Director Round"],
    eligibility: [
      { criteria: "CGPA ≥ 7.0", met: true },
      { criteria: "Strong C++ Fundamentals", met: true },
    ],
  },
  {
    id: "7",
    company: "Rippling",
    logo: "R",
    title: "Software Engineer - New Grad",
    location: "Bengaluru",
    type: "Full Time",
    ctc: "₹40 LPA",
    postedAt: "2 days ago",
    status: "Open",
    eligibleCourses: ["B.Tech CSE", "B.Tech IT"],
    description: "Rippling is the first way for businesses to manage all of their HR & IT. We are hiring for our core engineering team.",
    skills: ["Python/Django", "React", "MongoDB", "High Agency"],
    workflow: ["Application", "Take Home Assignment", "Technical Interview", "Founder Round"],
    eligibility: [
      { criteria: "CGPA ≥ 8.0", met: false },
      { criteria: "Open Source Contributions", met: true },
    ],
  },
  {
    id: "8",
    company: "VISA",
    logo: "V",
    title: "Software Engineering Intern",
    location: "Bengaluru",
    type: "Internship",
    ctc: "₹1,00,000/month",
    postedAt: "2 months ago",
    status: "Closed",
    eligibleCourses: ["B.Tech CSE", "B.Tech IT"],
    description: "Visa is the world's leader in digital payments. Join our team to work on payment infrastructure serving billions.",
    skills: ["Java", "Spring Boot", "Microservices", "REST APIs"],
    workflow: ["Application", "Online Assessment", "Technical Interview 1", "Technical Interview 2", "Offer"],
    eligibility: [
      { criteria: "CGPA ≥ 7.5", met: true },
      { criteria: "No Active Backlogs", met: true },
      { criteria: "Strong Backend Skills", met: true },
    ],
  },
  {
    id: "9",
    company: "Uber",
    logo: "U",
    title: "SDE-1",
    location: "Hyderabad",
    type: "Full Time",
    ctc: "₹38 LPA",
    postedAt: "4 days ago",
    status: "Open",
    eligibleCourses: ["B.Tech CSE", "M.Tech CS"],
    description: "Uber is reimagining the way the world moves for the better. Join us to solve challenging problems in real-time logistics.",
    skills: ["Go/Java", "Microservices", "System Design", "Algorithms"],
    workflow: ["Application", "Online Assessment", "Technical Rounds (3)", "Bar Raiser", "Offer"],
    eligibility: [
      { criteria: "CGPA ≥ 7.5", met: true },
      { criteria: "No Active Backlogs", met: true },
    ],
  }
];
// REPLACED WITH FEMALE-ONLY SENIOR BLOGS
export const blogs: Blog[] = [
  {
    id: 1,
    title: "How I cracked the Amazon SDE Intern Interview",
    author: "Ananya Gupta",
    role: "SDE Intern",
    company: "Amazon",
    batch: "Class of 2025",
    avatar: "AG",
    excerpt: "From getting rejected in the OA last year to bagging the offer this time. A deep dive into my preparation strategy for DSA and the critical Bar Raiser round.",
    readTime: "8 min read",
    date: "2 days ago",
    rounds: [
      {
        name: "Round 1: Online Assessment (90 Mins)",
        details: "The assessment was hosted on HackerRank. I was extremely nervous because speed is key here. The first question was 'Rotting Oranges' (a standard BFS Grid problem). I solved it in 20 minutes but spent another 10 checking for edge cases like empty grids. The second question was a variation of 'Critical Connections', involving bridges in a graph. I used Tarjan's algorithm. It took me a while to handle the large input constraints, but I eventually passed all test cases.",
      },
      {
        name: "Round 2: Technical Interview",
        details: "This round started with a 5-minute discussion on my resume projects. Then, we jumped into coding. The interviewer asked a Tree problem: 'Find the Lowest Common Ancestor,' but with a constraint to optimize space complexity to O(1) without using parent pointers. I struggled initially but spoke my thought process out loud, and he gave me a subtle hint. After coding, he grilled me on OS concepts, specifically how Deadlocks occur and the 'Banker's Algorithm' for avoidance.",
      },
      {
        name: "Round 3: Bar Raiser (Tech + LP)",
        details: "This is the make-or-break round. It wasn't just about code; it was about 'Amazonian' fit. We spent 25 minutes discussing the Scalability aspects of my E-commerce project (Database sharding, caching). Then came the Leadership Principles. He asked, 'Tell me a time you disagreed with a manager.' I used the STAR method to explain a conflict during a hackathon, focusing on data-driven persuasion rather than emotional argument. It felt more like a conversation than an interrogation.",
      },
    ],
    preparation: "I didn't just solve random questions. I strictly followed the 'Blind 75' list on LeetCode and solved about 350 problems in total. For the Leadership Principles (LPs), I actually wrote down scripts for all 14 principles so I wouldn't freeze during the behavioral questions.",
    advice: [
      "Do not underestimate the Leadership Principles. They are the tie-breaker between a hire and no-hire.",
      "Always clarify constraints (input size, memory limit) before you write a single line of code.",
      "Think out loud. The interviewer wants to see your thought process, not just the final syntax.",
    ],
  },
  {
    id: 2,
    title: "Google STEP Internship Experience (2nd Year)",
    author: "Vaishnavi Singh",
    role: "STEP Intern",
    company: "Google",
    batch: "Class of 2026",
    avatar: "VS",
    excerpt: "Google STEP is unique because it focuses on potential rather than advanced system design. Here is how I prepared as a sophomore with limited experience.",
    readTime: "12 min read",
    date: "5 days ago",
    rounds: [
      {
        name: "Round 1: Resume Shortlisting",
        details: "Since STEP is specifically for first and second-year students, the resume shortlisting is brutal. I made sure to highlight my Google Summer of Code (GSoC) contributions and a 1st rank in an inter-college hackathon. They look for passion, open-source involvement, and community impact more than just high GPA.",
      },
      {
        name: "Round 2: Technical Interview 1",
        details: "This interview was pure Data Structures and completely language agnostic. The interviewer was super friendly and asked a question involving String manipulation and HashMaps. It was similar to 'Longest Substring Without Repeating Characters'. I started with a brute force O(N^2) approach, and she guided me toward the O(N) sliding window solution. She cared a lot about variable naming.",
      },
      {
        name: "Round 3: Technical Interview 2",
        details: "My second round was graph-heavy. The problem was framed as a 'Course Schedule' issue, which essentially boiled down to detecting a cycle in a directed graph. I used DFS with a recursion stack. I got stuck on an edge case regarding disconnected components, but the interviewer gave a subtle hint that put me back on track. We also discussed time complexity in depth.",
      },
    ],
    preparation: "Since I am only in my second year, I focused on mastering the basics: Arrays, Linked Lists, and Stacks/Queues. I didn't spend time on Dynamic Programming or System Design as STEP rarely asks those. I did clear a lot of LeetCode Mediums.",
    advice: [
      "Write clean, production-quality code. Google cares about variable naming and indentation even on a Google Doc.",
      "If you are stuck, ask for a hint. It shows collaboration skills, which is a key part of 'Googliness'.",
      "Focus on your resume projects; be ready to explain every single line of code you wrote.",
    ],
  },
  {
    id: 3,
    title: "Microsoft SDE: From Campus to Offer",
    author: "Priya Sharma",
    role: "SDE",
    company: "Microsoft",
    batch: "Class of 2024",
    avatar: "PS",
    excerpt: "My experience going through the Microsoft Engage mentorship program and converting it into a PPO (Pre-Placement Offer) via the direct interview loop.",
    readTime: "10 min read",
    date: "1 week ago",
    rounds: [
      {
        name: "Round 1: Codility Test",
        details: "The initial screening was on Codility. There were 3 questions to be solved in 90 minutes. The first was a simple Array manipulation task to warm up. The second was a Greedy algorithm for merging intervals. The third was a hard Dynamic Programming problem on a Grid (Pathfinding with obstacles). I managed to solve 2 completely and the 3rd partially, which was enough to shortlist me.",
      },
      {
        name: "Round 2: Technical Interview",
        details: "The interviewer jumped straight into High-Level Design logic before coding. I was asked to implement an LRU Cache from scratch (using HashMap + Doubly Linked List). It was tricky to handle the pointers correctly. After that, he gave me a LinkedList problem (Reverse nodes in k-Group) to check my raw coding speed.",
      },
      {
        name: "Round 3: AA (As Appropriate) Round",
        details: "This is Microsoft's unique 'Culture Fit' round, usually taken by a senior manager. We discussed my Engage mentorship project (a Face Recognition App) for 20 minutes. He then asked me to draw the Low Level Design (LLD) of a Parking Lot system on the whiteboard. The focus was on Object-Oriented principles like inheritance, encapsulation, and scalability.",
      },
    ],
    preparation: "I practiced the 'Top 50 Microsoft Questions' on GeeksForGeeks religiously. For System Design, I watched Gaurav Sen's playlist on YouTube to understand the basics of scaling, load balancers, and caching.",
    advice: [
      "Code modularity is key. Don't write everything in the main function; separate your logic into helper functions.",
      "Learn basic Object Oriented Design (SOLID principles). Microsoft loves OOPS concepts.",
      "Be prepared to explain 'Why Microsoft?' with a genuine answer, not just 'it's a big tech company'.",
    ],
  },
  {
    id: 4,
    title: "Cracking Adobe: On-Campus Experience",
    author: "Anjali Patel",
    role: "Product Intern",
    company: "Adobe",
    batch: "Class of 2025",
    avatar: "AP",
    excerpt: "Adobe's process is unique with a heavy focus on Puzzles and Core CS concepts like OOPS and OS rather than just competitive coding.",
    readTime: "7 min read",
    date: "2 weeks ago",
    rounds: [
      {
        name: "Round 1: Online Assessment",
        details: "This wasn't your typical coding test. It had a mix of Aptitude, Logical Reasoning, and 2 Coding questions. The aptitude section was surprisingly tricky and had a sectional cutoff—many good coders got eliminated here. The coding questions involved Matrix manipulation and basic DP, but speed was the deciding factor.",
      },
      {
        name: "Round 2: Technical Interview",
        details: "Unlike other companies that ask pure DSA, Adobe drilled down into Core CS concepts. I was asked detailed questions on C++ Virtual Functions, the Diamond Problem in inheritance, and Memory Management. Then came the puzzles—I was asked the classic 'Egg Dropping Puzzle' and a probability question involving coins.",
      },
      {
        name: "Round 3: HR / Director Round",
        details: "This was a conversational round. The Director asked about my background, why I chose my branch, and my willingness to relocate to Noida or Bangalore. We also discussed Adobe's recent products like Firefly. It was crucial to show enthusiasm for the product side of things.",
      },
    ],
    preparation: "I revised C++ STL and OOPS concepts thoroughly using 'GeeksforGeeks'. Adobe loves puzzles, so I went through the 'Top 20 Interview Puzzles' list. I also brushed up on OS concepts like Paging and Semaphores.",
    advice: [
      "Master one Object Oriented Language (C++ or Java) inside out. Knowing Python isn't enough for the OOPS questions.",
      "Don't panic on Puzzles; they check your approach, not just the final answer.",
      "Read about the company's recent products. It helps in the HR round.",
    ],
  },
  {
    id: 5,
    title: "Flipkart GRiD 6.0 Winner's Journey",
    author: "Sneha Reddy",
    role: "SDE Intern",
    company: "Flipkart",
    batch: "Class of 2026",
    avatar: "SR",
    excerpt: "How our team won Flipkart GRiD and converted it into a full-time SDE offer. A story of sleepless nights, robotics, and teamwork.",
    readTime: "15 min read",
    date: "3 days ago",
    rounds: [
      {
        name: "Round 1: The Quiz",
        details: "This was a speed test. 30 MCQs in 30 minutes covering CS Fundamentals, E-commerce trends, and simple output questions. We divided the topics among our 3 team members—one focused on Tech, one on Aptitude, and one on E-commerce trivia.",
      },
      {
        name: "Round 2: Prototype Submission",
        details: "We chose the 'Smart Warehousing' track. We had to build a simulation for sorting robots. We spent 2 weeks building a working prototype using Python and PyGame for simulation. We submitted a detailed PDF report and a 2-minute video walkthrough. The key here was not just the code, but the feasibility of the idea.",
      },
      {
        name: "Round 3: National Finale",
        details: "We were flown to the Bengaluru office! Presenting live to the Flipkart Engineering heads was terrifying. They didn't ask basic questions; they asked about edge cases—'What if a robot fails?', 'How do you handle collision efficiently?'. Our live demo worked perfectly (thankfully!), which impressed them the most.",
      },
      {
        name: "Round 4: HR Interview",
        details: "Since we won the track, we skipped the standard technical interviews. The HR round was a formality to discuss the offer rollout, joining dates, and team preferences. It was the happiest moment of my college life.",
      },
    ],
    preparation: "We didn't do LeetCode for this. We built things. We learned Git, worked on system integration, and focused on creating a working product rather than just solving algorithms.",
    advice: [
      "Participate in Hackathons like GRiD; they are the best shortcut to top companies.",
      "Teamwork is crucial. Pick teammates who have complementary skills (e.g., one Backend, one Frontend, one Presenter).",
      "Focus on the 'Business Value' of your solution, not just the tech stack.",
    ],
  },
  {
    id: 6,
    title: "Goldman Sachs: Math + Code",
    author: "Riya Verma",
    role: "Analyst",
    company: "Goldman Sachs",
    batch: "Class of 2024",
    avatar: "RV",
    excerpt: "Finance + Tech: How to prepare for Goldman Sachs engineering roles and why you need to brush up on your High School Math.",
    readTime: "9 min read",
    date: "1 month ago",
    rounds: [
      {
        name: "Round 1: Aptitude Test (The Filter)",
        details: "This is the hardest elimination round. It had a very tough Quant section covering Probability, Permutations & Combinations, and Linear Algebra. The coding section was easy, but the Math section eliminated 80% of candidates. You cannot ignore Math for GS.",
      },
      {
        name: "Round 2: CoderPad Interview",
        details: "This was a 'pair programming' round on CoderPad. The interviewer could see my keystrokes. He asked the 'Trapping Rain Water' problem. I started coding, but he stopped me midway to ask why I chose a specific variable name. He then gave me a custom problem on String Parsing related to financial logs.",
      },
      {
        name: "Round 3: Super Day (The Marathon)",
        details: "Goldman conducts a 'Super Day' where you have 3 back-to-back interviews. 1. Advanced DSA (Dynamic Programming on Strings). 2. Project Deep Dive (He asked about the DB schema of my project). 3. Puzzles and Resume. By the end of it, I was exhausted, but you have to keep your energy up.",
      },
    ],
    preparation: "I went back to my JEE notes for Probability and Statistics. I solved the 'Top 50 Goldman Sachs Questions' on GFG, which usually repeats questions like 'Trapping Rain Water' and 'Median of Stream'.",
    advice: [
      "Brush up on your Math/Quant skills. It is the biggest differentiator for Fintech companies.",
      "Dynamic Programming is their favorite topic. Master it.",
      "In the CoderPad round, run your code frequently to show that you are debugging as you go.",
    ],
  },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Resume Building Workshop",
    type: "Workshop",
    date: "Feb 10, 2026",
    time: "2:00 PM",
    venue: "Seminar Hall A",
    registrations: 156,
  },
  {
    id: "2",
    title: "Mock Interview Session with Industry Experts",
    type: "Workshop",
    date: "Feb 15, 2026",
    time: "10:00 AM",
    venue: "Conference Room 101",
    registrations: 89,
  },
  {
    id: "3",
    title: "LinkedIn Profile Optimization Webinar",
    type: "Webinar",
    date: "Feb 18, 2026",
    time: "4:00 PM",
    venue: "Online (Zoom)",
    registrations: 234,
  },
  {
    id: "4",
    title: "Career in Data Science - Industry Seminar",
    type: "Seminar",
    date: "Feb 22, 2026",
    time: "11:00 AM",
    venue: "Auditorium",
    registrations: 312,
  },
];

export const competitions: Competition[] = [
  {
    id: "1",
    title: "Inter-College Codeathon 2026",
    organizer: "TechFest Committee",
    type: "Hackathon",
    deadline: "Feb 20, 2026",
    prize: "₹2,00,000",
    participants: 450,
  },
  {
    id: "2",
    title: "AI/ML Innovation Challenge",
    organizer: "Google Developer Groups",
    type: "Project Competition",
    deadline: "Mar 5, 2026",
    prize: "₹1,50,000 + Internship Opportunity",
    participants: 280,
  },
  {
    id: "3",
    title: "CodeChef SnackDown 2026",
    organizer: "CodeChef",
    type: "Competitive Programming",
    deadline: "Feb 28, 2026",
    prize: "₹5,00,000",
    participants: 12000,
  },
  {
    id: "4",
    title: "Smart India Hackathon (SIH) 2026",
    organizer: "Ministry of Education",
    type: "National Hackathon",
    deadline: "Mar 15, 2026",
    prize: "₹1,00,000 per problem statement",
    participants: 50000,
  },
];

export const interviews: Interview[] = [
  {
    id: "1",
    company: "Amazon",
    role: "SDE Intern",
    date: "Feb 12, 2026",
    time: "10:00 AM",
    venue: "Video Call (Chime)",
    type: "Technical",
  },
  {
    id: "2",
    company: "Microsoft",
    role: "SDE Full Time",
    date: "Feb 14, 2026",
    time: "2:00 PM",
    venue: "Campus - Interview Room 3",
    type: "Technical",
  },
];

export const assessments: Assessment[] = [
  {
    id: "1",
    company: "Amazon",
    title: "Online Assessment - Coding + Workstyles",
    date: "Feb 8, 2026",
    duration: "90 minutes",
    status: "Upcoming",
  },
  {
    id: "2",
    company: "Google",
    title: "Online Coding Challenge",
    date: "Feb 5, 2026",
    duration: "60 minutes",
    status: "Completed",
  },
  {
    id: "3",
    company: "Microsoft",
    title: "Technical Assessment",
    date: "Jan 28, 2026",
    duration: "120 minutes",
    status: "Completed",
  },
  {
    id: "4",
    company: "Goldman Sachs",
    title: "HackerRank Challenge",
    date: "Jan 20, 2026",
    duration: "90 minutes",
    status: "Missed",
  },
];

export const resumes: Resume[] = [
  {
    id: "1",
    name: "Resume_Arisha_SDE_v2.pdf",
    type: "resume",
    createdAt: "23:06 14 Jul 2025",
    starred: true,
    hasIssue: true,
  },
  {
    id: "2",
    name: "Resume_Arisha_DataScience.pdf",
    type: "resume",
    createdAt: "18:30 10 Jul 2025",
    starred: false,
  },
  {
    id: "3",
    name: "Aadhar Card",
    type: "document",
    createdAt: "00:21 03 Jul 2025",
    starred: false,
  },
  {
    id: "4",
    name: "Cover_Letter_Amazon.docx",
    type: "document",
    createdAt: "14:15 01 Jul 2025",
    starred: false,
  },
];

export const stats = {
  jobsApplied: 5,
  shortlisted: 1,
  upcomingInterviews: 2,
  assessmentsPending: 1,
};

export const goldenPoints = {
  amazon: ["Data Structures & Algorithms", "React/Node.js Experience", "AWS Knowledge", "Previous Internship", "System Design Basics"],
  google: ["Strong DSA", "Problem Solving", "Python/Java Proficiency", "Open Source Contributions", "Competitive Programming"],
  microsoft: ["C#/.NET Experience", "Azure Cloud", "System Design", "Leadership Experience", "Good Communication"],
};

export const resumeTemplates = [
  { id: "1", name: "Standard", preview: "Clean and professional layout" },
  { id: "2", name: "Modern", preview: "Contemporary design with sidebar" },
  { id: "3", name: "Minimal", preview: "Simple and elegant single column" },
  { id: "4", name: "Creative", preview: "Stand out with unique design elements" },
];