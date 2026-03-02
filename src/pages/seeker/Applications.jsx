import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiSearch,
  FiFilter,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const allApplications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    type: "Full-time",
    appliedDate: "Nov 15, 2024",
    status: "Interview",
    salary: "৳40k-60k",
  },
  {
    id: 2,
    title: "React Developer",
    company: "SoftGen Ltd",
    location: "Remote",
    type: "Full-time",
    appliedDate: "Nov 10, 2024",
    status: "Under Review",
    salary: "৳45k-65k",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Chittagong",
    type: "Part-time",
    appliedDate: "Nov 5, 2024",
    status: "Rejected",
    salary: "৳30k-45k",
  },
  {
    id: 4,
    title: "Full Stack Engineer",
    company: "CloudBase",
    location: "Dhaka",
    type: "Full-time",
    appliedDate: "Oct 28, 2024",
    status: "Applied",
    salary: "৳60k-80k",
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "DevHouse",
    location: "Remote",
    type: "Freelance",
    appliedDate: "Oct 20, 2024",
    status: "Shortlisted",
    salary: "৳50k-70k",
  },
];

const statusConfig = {
  Interview: "bg-green-500/10 text-green-500",
  "Under Review": "bg-yellow-500/10 text-yellow-500",
  Rejected: "bg-red-500/10 text-red-500",
  Applied: "bg-blue-500/10 text-blue-500",
  Shortlisted: "bg-purple-500/10 text-purple-500",
};

const Applications = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = [
    "All",
    "Applied",
    "Under Review",
    "Interview",
    "Shortlisted",
    "Rejected",
  ];

  const filtered = allApplications.filter((app) => {
    const matchSearch =
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || app.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-theme-primary">
            My Applications
          </h2>
          <p className="text-theme-muted text-sm mt-1">
            {allApplications.length} total applications
          </p>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition ${
                filter === f
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "border border-theme text-theme-secondary hover:text-theme-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Applications List */}
      <motion.div variants={stagger} className="space-y-3">
        {filtered.length === 0 ? (
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-12 text-center"
          >
            <FiBriefcase className="w-10 h-10 text-theme-muted mx-auto mb-3" />
            <p className="text-theme-secondary font-medium">
              No applications found
            </p>
            <p className="text-theme-muted text-sm mt-1">
              Try adjusting your search or filter
            </p>
          </motion.div>
        ) : (
          filtered.map((app) => (
            <motion.div
              key={app.id}
              variants={fadeUp}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="card-theme border hover:border-purple-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center flex-shrink-0">
                <FiBriefcase className="text-purple-500 w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2 mb-1">
                  <h3 className="text-theme-primary font-semibold">
                    {app.title}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[app.status]}`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-theme-muted">
                  <span className="font-medium text-theme-secondary">
                    {app.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" />
                    {app.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {app.type}
                  </span>
                  <span>Applied: {app.appliedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-purple-500 font-semibold text-sm">
                  {app.salary}
                </span>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition">
                  <FiEye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default Applications;
