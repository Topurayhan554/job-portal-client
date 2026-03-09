import { FiCheckCircle, FiHeart, FiTarget, FiZap } from "react-icons/fi";

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
