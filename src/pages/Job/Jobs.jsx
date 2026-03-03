import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiFilter,
  FiX,
  FiChevronDown,
  FiBookmark,
  FiArrowRight,
  FiStar,
  FiSliders,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

// ===== Data =====
const allJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "NextGen Tech",
    location: "Remote",
    type: "Full-time",
    category: "Technology",
    salary: "৳60k-80k",
    salaryMin: 60000,
    experience: "Senior Level",
    posted: "2 days ago",
    tag: "React",
    featured: true,
    description:
      "Build cutting-edge web applications using React and modern tooling. Work with a talented team on exciting projects.",
    skills: ["React", "TypeScript", "Redux", "Node.js"],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Dhaka",
    type: "Full-time",
    category: "Design",
    salary: "৳40k-60k",
    salaryMin: 40000,
    experience: "Mid Level",
    posted: "3 days ago",
    tag: "Figma",
    featured: true,
    description:
      "Create beautiful and intuitive user interfaces for web and mobile apps.",
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudBase",
    location: "Chittagong",
    type: "Full-time",
    category: "Technology",
    salary: "৳50k-70k",
    salaryMin: 50000,
    experience: "Mid Level",
    posted: "5 days ago",
    tag: "Node.js",
    featured: false,
    description: "Design and build scalable backend APIs and microservices.",
    skills: ["Node.js", "MongoDB", "Docker", "AWS"],
  },
  {
    id: 4,
    title: "Product Manager",
    company: "FinTech Ltd",
    location: "Dhaka",
    type: "Full-time",
    category: "Management",
    salary: "৳80k-120k",
    salaryMin: 80000,
    experience: "Senior Level",
    posted: "1 week ago",
    tag: "Strategy",
    featured: true,
    description:
      "Lead product development from concept to launch, working closely with engineering and design teams.",
    skills: ["Product Strategy", "Agile", "Analytics"],
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "DataMinds",
    location: "Remote",
    type: "Freelance",
    category: "Technology",
    salary: "৳35k-55k",
    salaryMin: 35000,
    experience: "Mid Level",
    posted: "1 week ago",
    tag: "Python",
    featured: false,
    description:
      "Analyze large datasets and provide actionable insights to stakeholders.",
    skills: ["Python", "SQL", "Tableau", "Excel"],
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "SysOps BD",
    location: "Dhaka",
    type: "Full-time",
    category: "Technology",
    salary: "৳65k-90k",
    salaryMin: 65000,
    experience: "Senior Level",
    posted: "1 week ago",
    tag: "AWS",
    featured: false,
    description:
      "Maintain and improve CI/CD pipelines and cloud infrastructure.",
    skills: ["AWS", "Kubernetes", "Terraform", "Linux"],
  },
  {
    id: 7,
    title: "Flutter Developer",
    company: "AppWorks",
    location: "Remote",
    type: "Full-time",
    category: "Technology",
    salary: "৳45k-65k",
    salaryMin: 45000,
    experience: "Mid Level",
    posted: "2 weeks ago",
    tag: "Flutter",
    featured: false,
    description: "Build cross-platform mobile apps using Flutter and Dart.",
    skills: ["Flutter", "Dart", "Firebase", "REST API"],
  },
  {
    id: 8,
    title: "Digital Marketing Specialist",
    company: "GrowthHub",
    location: "Dhaka",
    type: "Full-time",
    category: "Marketing",
    salary: "৳30k-50k",
    salaryMin: 30000,
    experience: "Entry Level",
    posted: "2 weeks ago",
    tag: "SEO",
    featured: false,
    description:
      "Drive organic growth through SEO, social media, and content marketing strategies.",
    skills: ["SEO", "Google Ads", "Social Media", "Analytics"],
  },
  {
    id: 9,
    title: "Full Stack Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    type: "Full-time",
    category: "Technology",
    salary: "৳55k-75k",
    salaryMin: 55000,
    experience: "Mid Level",
    posted: "2 weeks ago",
    tag: "MERN",
    featured: true,
    description: "Work on both frontend and backend of our flagship product.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 10,
    title: "Graphic Designer",
    company: "Creative Studio",
    location: "Chittagong",
    type: "Part-time",
    category: "Design",
    salary: "৳20k-35k",
    salaryMin: 20000,
    experience: "Entry Level",
    posted: "3 weeks ago",
    tag: "Illustrator",
    featured: false,
    description:
      "Create visually stunning graphics for print and digital media.",
    skills: ["Illustrator", "Photoshop", "InDesign"],
  },
  {
    id: 11,
    title: "Machine Learning Engineer",
    company: "AI Labs BD",
    location: "Remote",
    type: "Full-time",
    category: "Technology",
    salary: "৳90k-130k",
    salaryMin: 90000,
    experience: "Senior Level",
    posted: "3 weeks ago",
    tag: "Python",
    featured: true,
    description: "Build and deploy ML models for real-world applications.",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
  },
  {
    id: 12,
    title: "Content Writer",
    company: "MediaHouse",
    location: "Remote",
    type: "Part-time",
    category: "Marketing",
    salary: "৳15k-25k",
    salaryMin: 15000,
    experience: "Entry Level",
    posted: "1 month ago",
    tag: "Writing",
    featured: false,
    description:
      "Create engaging blog posts, articles, and social media content.",
    skills: ["Writing", "SEO", "Research", "Editing"],
  },
];

const categories = [
  "All",
  "Technology",
  "Design",
  "Marketing",
  "Management",
  "Finance",
];
const jobTypes = [
  "Full-time",
  "Part-time",
  "Remote",
  "Freelance",
  "Internship",
];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead"];
const locations = ["All Locations", "Dhaka", "Chittagong", "Remote"];

const typeColors = {
  "Full-time": "bg-blue-500/10 text-blue-500",
  "Part-time": "bg-purple-500/10 text-purple-500",
  Remote: "bg-green-500/10 text-green-500",
  Freelance: "bg-orange-500/10 text-orange-500",
  Internship: "bg-pink-500/10 text-pink-500",
};

const JOBS_PER_PAGE = 6;

// ===== Job Card =====
const JobCard = ({ job, view, saved, onSave }) => {
  const isSaved = saved.includes(job.id);

  if (view === "list") {
    return (
      <motion.div
        variants={fadeUp}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className={`card-theme border hover:border-purple-500/40 rounded-2xl p-5 transition group ${job.featured ? "border-purple-500/20" : ""}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Logo */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-2xl flex items-center justify-center">
              <FiBriefcase className="text-purple-500 w-6 h-6" />
            </div>
            {job.featured && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <FiStar className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-theme-primary font-semibold group-hover:text-purple-500 transition">
                {job.title}
              </h3>
              {job.featured && (
                <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-theme-muted">
              <span className="font-medium text-theme-secondary">
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {job.posted}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[job.type] || "bg-gray-500/10 text-gray-500"}`}
              >
                {job.type}
              </span>
              <span className="text-xs bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-0.5 rounded-full">
                {job.tag}
              </span>
              <span className="text-xs bg-theme-card border border-theme text-theme-muted px-2 py-0.5 rounded-full">
                {job.experience}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex sm:flex-col items-center sm:items-end gap-3">
            <span className="text-purple-500 font-bold text-sm">
              {job.salary}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSave(job.id)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl border transition ${
                  isSaved
                    ? "border-purple-500/50 bg-purple-500/10 text-purple-500"
                    : "border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50"
                }`}
              >
                <FiBookmark
                  className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`}
                />
              </button>
              <Link
                to={`/jobs/${job.id}`}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-2 rounded-xl hover:opacity-90 transition font-medium"
              >
                Apply <FiArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`card-theme border hover:border-purple-500/40 rounded-2xl p-5 flex flex-col transition group ${job.featured ? "border-purple-500/20" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center">
            <FiBriefcase className="text-purple-500 w-5 h-5" />
          </div>
          {job.featured && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <FiStar className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          )}
        </div>
        <button
          onClick={() => onSave(job.id)}
          className={`w-8 h-8 flex items-center justify-center rounded-xl border transition ${
            isSaved
              ? "border-purple-500/50 bg-purple-500/10 text-purple-500"
              : "border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50"
          }`}
        >
          <FiBookmark
            className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`}
          />
        </button>
      </div>

      <h3 className="text-theme-primary font-semibold mb-0.5 group-hover:text-purple-500 transition leading-snug">
        {job.title}
      </h3>
      <p className="text-purple-500 text-sm mb-2">{job.company}</p>
      <p className="text-theme-muted text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-xs bg-theme-card border border-theme text-theme-muted px-2 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="text-xs text-theme-muted">
            +{job.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="flex items-center gap-1 text-theme-muted">
          <FiMapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full font-medium ${typeColors[job.type] || "bg-gray-500/10 text-gray-500"}`}
        >
          {job.type}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-theme">
        <span className="text-purple-500 font-bold text-sm">{job.salary}</span>
        <Link
          to={`/jobs/${job.id}`}
          className="flex items-center gap-1 text-xs text-theme-secondary hover:text-purple-500 transition font-medium"
        >
          Apply Now <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
};

// ===== Main Jobs Page =====
const Jobs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState(0);

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  const toggleExp = (exp) =>
    setSelectedExp((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp],
    );
  const toggleSave = (id) =>
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSelectedTypes([]);
    setSelectedExp([]);
    setSelectedLocation("All Locations");
    setSalaryRange(0);
  };

  const activeFilterCount =
    selectedTypes.length +
    selectedExp.length +
    (selectedLocation !== "All Locations" ? 1 : 0) +
    (salaryRange > 0 ? 1 : 0);

  const filtered = allJobs
    .filter((j) => {
      const matchSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === "All" || j.category === category;
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(j.type);
      const matchExp =
        selectedExp.length === 0 || selectedExp.includes(j.experience);
      const matchLoc =
        selectedLocation === "All Locations" || j.location === selectedLocation;
      const matchSalary = salaryRange === 0 || j.salaryMin >= salaryRange;
      return (
        matchSearch &&
        matchCat &&
        matchType &&
        matchExp &&
        matchLoc &&
        matchSalary
      );
    })
    .sort((a, b) => {
      if (sortBy === "salary") return b.salaryMin - a.salaryMin;
      if (sortBy === "featured") return b.featured - a.featured;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / JOBS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * JOBS_PER_PAGE,
    page * JOBS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [
    search,
    category,
    selectedTypes,
    selectedExp,
    selectedLocation,
    salaryRange,
  ]);

  return (
    <div className="bg-theme-primary min-h-screen">
      {/* ===== Hero Search ===== */}
      <section className="bg-theme-secondary border-b border-theme py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-500 text-sm px-4 py-2 rounded-full mb-4">
              <FaRocket className="w-3 h-3" />
              {allJobs.length} Jobs Available
            </div>
            <h1 className="text-4xl font-extrabold text-theme-primary mb-2">
              Find Your{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Perfect Job
              </span>
            </h1>
            <p className="text-theme-muted mb-6">
              Search from thousands of opportunities
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skill, or company..."
                className="input-theme w-full border rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary transition"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input-theme border rounded-xl px-4 py-4 text-sm sm:w-48 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2">
              <FiSearch className="w-4 h-4" /> Search
            </button>
          </motion.div>

          {/* Popular */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mt-4"
          >
            <span className="text-theme-muted text-xs">Popular:</span>
            {["React", "Node.js", "Python", "Figma", "Remote"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(tag)}
                className="text-xs text-theme-secondary hover:text-purple-500 border border-theme hover:border-purple-500/50 px-3 py-1 rounded-full transition"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* ===== Desktop Filter Sidebar ===== */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-theme-primary flex items-center gap-2">
                  <FiSliders className="text-purple-500 w-4 h-4" /> Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-red-500 hover:text-red-400 transition"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Job Type */}
              <div className="card-theme border rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-theme-primary mb-3">
                  Job Type
                </h4>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        onClick={() => toggleType(type)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition flex-shrink-0 cursor-pointer ${
                          selectedTypes.includes(type)
                            ? "bg-purple-500 border-purple-500"
                            : "border-gray-400 dark:border-gray-600 group-hover:border-purple-400"
                        }`}
                      >
                        {selectedTypes.includes(type) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleType(type)}
                        className="text-sm text-theme-secondary group-hover:text-theme-primary transition cursor-pointer"
                      >
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="card-theme border rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-theme-primary mb-3">
                  Experience Level
                </h4>
                <div className="space-y-2">
                  {experienceLevels.map((exp) => (
                    <label
                      key={exp}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        onClick={() => toggleExp(exp)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition flex-shrink-0 cursor-pointer ${
                          selectedExp.includes(exp)
                            ? "bg-purple-500 border-purple-500"
                            : "border-gray-400 dark:border-gray-600 group-hover:border-purple-400"
                        }`}
                      >
                        {selectedExp.includes(exp) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleExp(exp)}
                        className="text-sm text-theme-secondary group-hover:text-theme-primary transition cursor-pointer"
                      >
                        {exp}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="card-theme border rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-theme-primary mb-3">
                  Min Salary:{" "}
                  {salaryRange > 0
                    ? `৳${(salaryRange / 1000).toFixed(0)}k`
                    : "Any"}
                </h4>
                <input
                  type="range"
                  min={0}
                  max={100000}
                  step={5000}
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-xs text-theme-muted mt-1">
                  <span>Any</span>
                  <span>৳100k</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ===== Jobs Content ===== */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex-shrink-0 ${
                      category === cat
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "border border-theme text-theme-secondary hover:text-theme-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 border border-theme text-theme-secondary px-3 py-2 rounded-xl text-sm hover:text-theme-primary transition"
                >
                  <FiFilter className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-purple-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-theme border rounded-xl px-3 py-2 text-xs pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  >
                    <option value="newest">Newest</option>
                    <option value="salary">Highest Salary</option>
                    <option value="featured">Featured</option>
                  </select>
                  <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted w-3 h-3 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex items-center border border-theme rounded-xl overflow-hidden">
                  <button
                    onClick={() => setView("grid")}
                    className={`w-8 h-8 flex items-center justify-center transition ${view === "grid" ? "bg-purple-500 text-white" : "text-theme-muted hover:text-theme-primary"}`}
                  >
                    <FiGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`w-8 h-8 flex items-center justify-center transition ${view === "list" ? "bg-purple-500 text-white" : "text-theme-muted hover:text-theme-primary"}`}
                  >
                    <FiList className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-theme-muted text-sm mb-4">
              Showing{" "}
              <span className="text-theme-primary font-semibold">
                {filtered.length}
              </span>{" "}
              jobs
              {search && (
                <>
                  {" "}
                  for "<span className="text-purple-500">{search}</span>"
                </>
              )}
            </p>

            {/* Jobs Grid/List */}
            <AnimatePresence mode="wait">
              {paginated.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card-theme border rounded-2xl p-16 text-center"
                >
                  <FiBriefcase className="w-12 h-12 text-theme-muted mx-auto mb-4" />
                  <h3 className="text-theme-primary font-semibold text-lg mb-2">
                    No jobs found
                  </h3>
                  <p className="text-theme-muted text-sm mb-4">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-purple-500 hover:text-purple-400 text-sm font-medium transition"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`${view}-${page}-${category}`}
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                      : "space-y-3"
                  }
                >
                  {paginated.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      view={view}
                      saved={saved}
                      onSave={toggleSave}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 mt-8"
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-sm"
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
                        page === p
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "border border-theme text-theme-secondary hover:text-theme-primary"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-sm"
                >
                  Next →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Mobile Filter Drawer ===== */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-theme-secondary border-l border-theme z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-theme-primary flex items-center gap-2">
                    <FiSliders className="text-purple-500 w-4 h-4" /> Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-theme-muted hover:text-theme-primary transition"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Location */}
                  <div>
                    <h4 className="text-sm font-semibold text-theme-primary mb-3">
                      Location
                    </h4>
                    <div className="space-y-2">
                      {locations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setSelectedLocation(loc)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition ${selectedLocation === loc ? "bg-purple-500/10 text-purple-500 border border-purple-500/20" : "border border-theme text-theme-secondary hover:text-theme-primary"}`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Job Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-theme-primary mb-3">
                      Job Type
                    </h4>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <div
                            onClick={() => toggleType(type)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition cursor-pointer ${selectedTypes.includes(type) ? "bg-purple-500 border-purple-500" : "border-gray-400 dark:border-gray-600"}`}
                          >
                            {selectedTypes.includes(type) && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            onClick={() => toggleType(type)}
                            className="text-sm text-theme-secondary cursor-pointer"
                          >
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="text-sm font-semibold text-theme-primary mb-3">
                      Experience
                    </h4>
                    <div className="space-y-2">
                      {experienceLevels.map((exp) => (
                        <label
                          key={exp}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <div
                            onClick={() => toggleExp(exp)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition cursor-pointer ${selectedExp.includes(exp) ? "bg-purple-500 border-purple-500" : "border-gray-400 dark:border-gray-600"}`}
                          >
                            {selectedExp.includes(exp) && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            onClick={() => toggleExp(exp)}
                            className="text-sm text-theme-secondary cursor-pointer"
                          >
                            {exp}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <h4 className="text-sm font-semibold text-theme-primary mb-3">
                      Min Salary:{" "}
                      {salaryRange > 0
                        ? `৳${(salaryRange / 1000).toFixed(0)}k`
                        : "Any"}
                    </h4>
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      step={5000}
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={clearFilters}
                      className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary text-sm hover:text-theme-primary transition"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobs;
