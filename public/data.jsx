import {
  FaBrain,
  FaBriefcase,
  FaChartLine,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import {
  FiCheckCircle,
  FiHeart,
  FiTarget,
  FiZap,
  FiHome,
  FiUser,
  FiMessageSquare,
  FiFileText,
  FiSearch,
  FiBookmark,
  FiStar,
  FiFile,
  FiEye,
  FiBell,
  FiSettings,
  FiUsers,
  FiGrid,
  FiPlusCircle,
  FiClipboard,
  FiShield,
} from "react-icons/fi";

export const questions = [
  // ── Tech ──
  {
    id: 1,
    category: "tech",
    level: "Beginner",
    question:
      "What is the difference between `var`, `let`, and `const` in JavaScript?",
    answer:
      "`var` is function-scoped and hoisted, making it prone to bugs. `let` is block-scoped and can be reassigned. `const` is block-scoped and cannot be reassigned after declaration. In modern JavaScript, prefer `const` by default, use `let` when you need to reassign, and avoid `var` entirely.",
    tip: "Mention hoisting and temporal dead zone to impress interviewers.",
  },
  {
    id: 2,
    category: "tech",
    level: "Intermediate",
    question: "Explain the difference between REST and GraphQL APIs.",
    answer:
      "REST uses multiple endpoints (e.g., /users, /posts) with fixed data structures, often causing over-fetching or under-fetching. GraphQL uses a single endpoint where the client specifies exactly what data it needs in the query, eliminating these problems. GraphQL also supports real-time data via subscriptions. REST is simpler to set up; GraphQL is more flexible for complex apps.",
    tip: "Give a real-world example of when you'd choose one over the other.",
  },
  {
    id: 3,
    category: "tech",
    level: "Advanced",
    question: "How does React's Virtual DOM improve performance?",
    answer:
      "React creates a lightweight in-memory copy of the real DOM called the Virtual DOM. When state changes, React re-renders the Virtual DOM, compares it to the previous version using a diffing algorithm, and applies only the minimal set of real DOM changes needed. This batching and minimization of real DOM operations significantly improves performance over directly manipulating the DOM on every change.",
    tip: "Mention reconciliation and React Fiber for bonus points.",
  },
  {
    id: 4,
    category: "tech",
    level: "Intermediate",
    question: "What is the event loop in Node.js and how does it work?",
    answer:
      "Node.js runs on a single thread but handles concurrency through the event loop. When an async operation (like I/O) is initiated, it's offloaded to the system and Node continues executing other code. When the operation completes, its callback is added to the event queue. The event loop continuously checks the call stack — when it's empty, it picks callbacks from the queue and executes them one by one.",
    tip: "Draw a diagram during the interview if possible — it shows you really understand it.",
  },
  {
    id: 5,
    category: "tech",
    level: "Beginner",
    question: "What is the difference between SQL and NoSQL databases?",
    answer:
      "SQL databases (MySQL, PostgreSQL) store data in structured tables with predefined schemas and use SQL for querying. They're great for relational data and ACID compliance. NoSQL databases (MongoDB, Redis) store data in flexible formats like documents, key-value pairs, or graphs. They scale horizontally more easily and are better for unstructured or rapidly changing data. Choose based on your data model and scalability needs.",
    tip: "Mention when you'd use each type with a real example.",
  },
  // ── HR & Behavioral ──
  {
    id: 6,
    category: "hr",
    level: "Common",
    question: "Tell me about yourself.",
    answer:
      "Structure your answer using the Present-Past-Future formula. Start with your current role and key skills, briefly mention relevant past experience, and end with why you're excited about this specific opportunity. Keep it to 90 seconds. Example: 'I'm currently a frontend developer at [Company] where I build React applications. Before that I studied CSE at [University] where I built [project]. I'm excited about this role because...'",
    tip: "Practice this out loud — it should sound natural, not memorized.",
  },
  {
    id: 7,
    category: "hr",
    level: "Common",
    question: "What is your greatest weakness?",
    answer:
      "Choose a real weakness that you've already taken steps to improve. Avoid clichés like 'I work too hard.' Structure: (1) Name the weakness honestly, (2) Show self-awareness about its impact, (3) Explain the specific steps you've taken to improve. Example: 'I used to struggle with delegating tasks. I realized I was bottlenecking my team, so I've been intentionally assigning work and trusting my teammates, which has improved our delivery speed.'",
    tip: "Never say 'I'm a perfectionist' — interviewers have heard it a thousand times.",
  },
  {
    id: 8,
    category: "hr",
    level: "Common",
    question: "Where do you see yourself in 5 years?",
    answer:
      "Show ambition while aligning with the company's growth. Be honest but strategic. Mention: (1) Skills you want to develop, (2) Responsibilities you hope to take on, (3) How this role is a step in that direction. Example: 'I want to grow into a senior/lead role where I can mentor junior team members and contribute to technical architecture decisions. This role gives me the foundation to get there.'",
    tip: "Research the company's growth trajectory and align your answer to it.",
  },
  {
    id: 9,
    category: "hr",
    level: "Behavioral",
    question: "Tell me about a time you handled a conflict with a coworker.",
    answer:
      "Use the STAR method: Situation (briefly describe the conflict context), Task (your role in resolving it), Action (specific steps you took — emphasize empathy, communication, finding common ground), Result (positive outcome). Focus on professional disagreements, not personal ones. Show that you can handle conflict maturely and constructively.",
    tip: "Never blame the other person. Frame it as a team problem you solved together.",
  },
  {
    id: 10,
    category: "hr",
    level: "Behavioral",
    question: "Describe a situation where you had to meet a tight deadline.",
    answer:
      "Use STAR. Choose a real example where you successfully delivered under pressure. Include: how you prioritized tasks, how you communicated with stakeholders about progress, what you sacrificed or negotiated, and how you maintained quality. End with the positive result and what you learned about working under pressure.",
    tip: "Quantify the result if possible — 'delivered 2 days early' is more impactful than 'delivered on time'.",
  },
  // ── Management ──
  {
    id: 11,
    category: "management",
    level: "Common",
    question: "How do you prioritize tasks when everything seems urgent?",
    answer:
      "Use the Eisenhower Matrix: categorize tasks by urgency and importance. Focus first on tasks that are both urgent AND important. Delegate urgent-but-not-important tasks. Schedule important-but-not-urgent tasks. Eliminate the rest. Communicate with stakeholders when priorities conflict — don't silently absorb impossible workloads. Tools like Trello, Jira, or even a simple daily list help maintain clarity.",
    tip: "Mention a specific framework or tool you actually use.",
  },
  {
    id: 12,
    category: "management",
    level: "Intermediate",
    question: "How do you handle an underperforming team member?",
    answer:
      "Start with empathy — understand if there are personal or professional blockers. Have a private, honest conversation focused on specific behaviours and outcomes, not the person. Set clear expectations and measurable goals with a timeline. Provide the support and resources they need. Follow up regularly. If performance doesn't improve despite support, escalate through proper HR channels. Document everything.",
    tip: "Show that your first instinct is to support and develop, not punish.",
  },
  // ── Marketing ──
  {
    id: 13,
    category: "marketing",
    level: "Common",
    question: "How would you market a new product with zero budget?",
    answer:
      "Focus on organic channels: (1) Content marketing — create valuable blog posts, videos, or reels that solve your target audience's problems. (2) Community building — be active in relevant Facebook groups, LinkedIn, Reddit. (3) Influencer partnerships — offer free product in exchange for honest reviews. (4) Referral programs — incentivize existing users. (5) PR outreach — get featured in local news or industry blogs. (6) SEO — target long-tail keywords for free organic traffic.",
    tip: "Show creativity and resourcefulness — these traits matter more than budget in marketing.",
  },
  {
    id: 14,
    category: "marketing",
    level: "Intermediate",
    question:
      "What metrics do you use to measure a successful marketing campaign?",
    answer:
      "Depends on the goal. For awareness: reach, impressions, share of voice. For engagement: CTR, time on page, comments, shares. For conversion: conversion rate, cost per acquisition (CPA), return on ad spend (ROAS). For retention: customer lifetime value (CLV), churn rate, NPS. Always tie metrics back to the business objective — vanity metrics like follower count mean nothing without context.",
    tip: "Mention a specific tool you use (Google Analytics, Meta Ads Manager, HubSpot).",
  },
  // ── AI & Data ──
  {
    id: 15,
    category: "ai",
    level: "Beginner",
    question:
      "What is the difference between supervised and unsupervised learning?",
    answer:
      "Supervised learning trains a model on labeled data — you provide input-output pairs and the model learns the mapping (e.g., spam detection, image classification). Unsupervised learning finds patterns in data without labels — the model groups or structures data on its own (e.g., customer segmentation, anomaly detection). There's also semi-supervised (mix of both) and reinforcement learning (reward-based).",
    tip: "Give a real-world example of each type to make it concrete.",
  },
  {
    id: 16,
    category: "ai",
    level: "Intermediate",
    question:
      "How would you handle imbalanced datasets in a machine learning project?",
    answer:
      "Several approaches: (1) Resampling — oversample the minority class (SMOTE) or undersample the majority class. (2) Class weights — penalize the model more for misclassifying the minority class. (3) Choose the right evaluation metric — accuracy is misleading for imbalanced data; use F1-score, precision-recall, or AUC-ROC instead. (4) Ensemble methods like Random Forest or XGBoost handle imbalance better than single models.",
    tip: "Always start by understanding WHY the dataset is imbalanced — it often reveals important domain knowledge.",
  },
];

export const values = [
  {
    icon: <FiTarget className="w-6 h-6" />,
    title: "Mission-Driven",
    desc: "We exist to close the gap between talented Bangladeshi professionals and the opportunities they deserve — locally and globally.",
  },
  {
    icon: <FiHeart className="w-6 h-6" />,
    title: "People First",
    desc: "Every feature we build starts with a simple question: does this make life easier for job seekers and employers?",
  },
  {
    icon: <FiZap className="w-6 h-6" />,
    title: "Built for Bangladesh",
    desc: "We understand the local job market deeply — the culture, the industries, and what employers in Bangladesh truly look for.",
  },
  {
    icon: <FiCheckCircle className="w-6 h-6" />,
    title: "Trust & Transparency",
    desc: "Every employer on KaajKhojo is verified. No fake listings, no spam — just real opportunities from real companies.",
  },
];

export const team = [
  {
    name: "Topu Rayhan",
    role: "Co-Founder & CEO",
    initial: "T",
    color: "from-violet-600 to-blue-600",
    image: "/team/topu.png",
  },
  {
    name: "Nusrat Jahan",
    role: "Co-Founder & CTO",
    initial: "N",
    color: "from-pink-500 to-rose-500",
    image: "/team/nusrat.jpg",
  },
  {
    name: "Tariq Hossain",
    role: "Head of Product",
    initial: "T",
    color: "from-emerald-500 to-cyan-500",
    image: "/team/tariq.jpg",
  },
  {
    name: "Sabrina Akter",
    role: "Head of Marketing",
    initial: "S",
    color: "from-amber-500 to-orange-500",
    image: "/team/sabrina.jpg",
  },
];
export const partnerLogos = [
  {
    name: "bKash",
    image: "/partners/bkash.png",
    bg: "bg-pink-50    dark:bg-pink-950/40",
    border: "border-pink-200    dark:border-pink-800/40",
  },
  {
    name: "Pathao",
    image: "/partners/pathao.png",
    bg: "bg-orange-50  dark:bg-orange-950/40",
    border: "border-orange-200  dark:border-orange-800/40",
  },
  {
    name: "ShajGoj",
    image: "/partners/shajgoj.png",
    bg: "bg-teal-50    dark:bg-teal-950/40",
    border: "border-teal-200    dark:border-teal-800/40",
  },
  {
    name: "Chaldal",
    image: "/partners/chaldal.png",
    bg: "bg-green-50   dark:bg-green-950/40",
    border: "border-green-200   dark:border-green-800/40",
  },
  {
    name: "Shikho",
    image: "/partners/shikho.png",
    bg: "bg-violet-50  dark:bg-violet-950/40",
    border: "border-violet-200  dark:border-violet-800/40",
  },
  {
    name: "10 Minute School",
    image: "/partners/10minuteschool.png",
    bg: "bg-blue-50    dark:bg-blue-950/40",
    border: "border-blue-200    dark:border-blue-800/40",
  },
  {
    name: "Augmedix",
    image: "/partners/augmedix.png",
    bg: "bg-red-50     dark:bg-red-950/40",
    border: "border-red-200     dark:border-red-800/40",
  },
  {
    name: "CMED Health",
    image: "/partners/CMDHealth.png",
    bg: "bg-sky-50     dark:bg-sky-950/40",
    border: "border-sky-200     dark:border-sky-800/40",
  },
  {
    name: "Khaas Food",
    image: "/partners/khaasfood.png",
    bg: "bg-lime-50    dark:bg-lime-950/40",
    border: "border-lime-200    dark:border-lime-800/40",
  },
  {
    name: "Shohoz",
    image: "/partners/shohoz.png",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
    border: "border-fuchsia-200 dark:border-fuchsia-800/40",
  },
];
export const testimonials = [
  {
    name: "Rafiq Ahmed",
    role: "Software Engineer",
    company: "Pathao",
    text: "This platform is a complete help for the job market in Bangladesh. Found my dream job within 2 weeks of signing up. Highly recommended!",
    avatar: "R",
    color: "from-violet-600 to-blue-600",
    rating: 5,
    image: "/testimonials/rafiq.jpg",
  },
  {
    name: "Nadia Islam",
    role: "Product Designer",
    company: "bKash",
    text: "I got three job offers after registering here. The interview prep section was incredibly helpful and the company quality is outstanding.",
    avatar: "N",
    color: "from-pink-500 to-rose-500",
    rating: 5,
    image: "/testimonials/nadia.jpg",
  },
  {
    name: "Mizanur Rahman",
    role: "Marketing Manager",
    company: "Shikho",
    text: "As an experienced professional, I was skeptical — but the quality of listings here is genuinely better than anywhere else. Got hired in a month!",
    avatar: "M",
    color: "from-emerald-500 to-teal-500",
    rating: 5,
    image: "/testimonials/mizanur.jpg",
  },
  {
    name: "Sadia Akter",
    role: "HR Executive",
    company: "Augmedix",
    text: "The best job platform for Bangladesh. The filters are excellent and company verification gives real confidence. Highly recommend.",
    avatar: "S",
    color: "from-amber-500 to-orange-500",
    rating: 5,
    image: "/testimonials/sadia.jpg",
  },
  {
    name: "Tanvir Hossain",
    role: "Full Stack Developer",
    company: "Chaldal",
    text: "Applied to 5 jobs, got 3 interviews, accepted 1 amazing offer. The process was smooth and the platform is beautifully designed!",
    avatar: "T",
    color: "from-cyan-500 to-blue-500",
    rating: 5,
    image: "/testimonials/tanvir.jpg",
  },
];
export const jobhunters = [
  {
    icon: <FaBrain className="w-5 h-5" />,
    title: "AI-Powered Matching",
    desc: "Smart algorithm matches your skills with the perfect opportunities in real time.",
    accent: "from-violet-500 to-purple-700",
  },
  {
    icon: <FaChartLine className="w-5 h-5" />,
    title: "Real-time Tracking",
    desc: "Track your application status live — from Applied to Hired instantly.",
    accent: "from-blue-500 to-cyan-600",
  },
  {
    icon: <FaRocket className="w-5 h-5" />,
    title: "Fast Applications",
    desc: "One-click apply with your saved CV. No repetitive form filling.",
    accent: "from-rose-500 to-pink-700",
  },
  {
    icon: <FaShieldAlt className="w-5 h-5" />,
    title: "Verified Companies",
    desc: "Every employer is verified to ensure safe, legitimate listings.",
    accent: "from-emerald-500 to-teal-700",
  },
];
export const interviewquestions = [
  {
    level: "Beginner",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    emoji: "💻",
    q: "What is the difference between var, let, and const in JavaScript?",
  },
  {
    level: "Common",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    emoji: "🤝",
    q: "Tell me about yourself.",
  },
  {
    level: "Intermediate",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emoji: "📊",
    q: "How do you prioritize tasks when everything seems urgent?",
  },
];
//  Sidebar Links
export const sidebarLinks = {
  seeker: [
    { label: "Dashboard", path: "/seeker/dashboard", icon: <FiHome /> },
    { label: "Profile", path: "/seeker/profile", icon: <FiUser /> },
    { label: "Messages", path: "/seeker/messages", icon: <FiMessageSquare /> },
    {
      label: "Applied Jobs",
      path: "/seeker/applications",
      icon: <FiFileText />,
    },
    { label: "Find Jobs", path: "/jobs", icon: <FiSearch /> },
    { label: "Saved Jobs", path: "/seeker/saved", icon: <FiBookmark /> },
    { label: "Recommended", path: "/seeker/recommended", icon: <FiStar /> },
    { label: "CV Manager", path: "/seeker/cv", icon: <FiFile /> },

    { label: "Profile Views", path: "/seeker/views", icon: <FiEye /> },
    { label: "Notifications", path: "/seeker/notifications", icon: <FiBell /> },
    { label: "Settings", path: "/seeker/settings", icon: <FiSettings /> },
  ],
  employer: [
    { label: "Dashboard", path: "/employer/dashboard", icon: <FiHome /> },
    { label: "Profile", path: "/employer/profile", icon: <FiUser /> },
    { label: "Post a Job", path: "/employer/post-job", icon: <FiPlusCircle /> },
    { label: "My Jobs", path: "/employer/jobs", icon: <FaBriefcase /> },
    { label: "Applicants", path: "/employer/applicants", icon: <FiUsers /> },
    {
      label: "Messages",
      path: "/employer/messages",
      icon: <FiMessageSquare />,
    },
    {
      label: "Notifications",
      path: "/employer/notifications",
      icon: <FiBell />,
    },
    { label: "Settings", path: "/employer/settings", icon: <FiSettings /> },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { label: "Profile", path: "/admin/profile", icon: <FiUser /> },
    { label: "Manage Users", path: "/admin/users", icon: <FiUsers /> },
    { label: "Manage Jobs", path: "/admin/jobs", icon: <FiClipboard /> },
    {
      label: "Applications",
      path: "/admin/applications",
      icon: <FiFileText />,
    },
    { label: "Messages", path: "/admin/messages", icon: <FiMessageSquare /> },
    { label: "Notifications", path: "/admin/notifications", icon: <FiBell /> },
    { label: "Settings", path: "/admin/settings", icon: <FiSettings /> },
    { label: "Security", path: "/admin/security", icon: <FiShield /> },
  ],
};
