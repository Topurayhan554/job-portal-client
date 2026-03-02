import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiBriefcase,
  FiMapPin,
  FiUsers,
  FiEye,
  FiTrash2,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const allJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    type: "Full-time",
    applicants: 24,
    status: "Active",
    posted: "Nov 15, 2024",
    reported: false,
    salary: "৳40k-60k",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    type: "Part-time",
    applicants: 18,
    status: "Active",
    posted: "Nov 10, 2024",
    reported: true,
    salary: "৳30k-45k",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DevHouse",
    location: "Chittagong",
    type: "Full-time",
    applicants: 31,
    status: "Pending",
    posted: "Nov 5, 2024",
    reported: false,
    salary: "৳50k-70k",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "FinTech Ltd",
    location: "Dhaka",
    type: "Full-time",
    applicants: 12,
    status: "Active",
    posted: "Oct 28, 2024",
    reported: true,
    salary: "৳80k-120k",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudBase",
    location: "Remote",
    type: "Full-time",
    applicants: 9,
    status: "Closed",
    posted: "Oct 20, 2024",
    reported: false,
    salary: "৳60k-90k",
  },
];

const statusConfig = {
  Active: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Closed: "bg-red-500/10 text-red-500",
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState(allJobs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = jobs.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" ||
      (filter === "Reported" ? j.reported : j.status === filter);
    return matchSearch && matchFilter;
  });

  const approveJob = (id) =>
    setJobs(
      jobs.map((j) =>
        j.id === id ? { ...j, status: "Active", reported: false } : j,
      ),
    );
  const deleteJob = (id) => setJobs(jobs.filter((j) => j.id !== id));

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-theme-primary">Manage Jobs</h2>
          <p className="text-theme-muted text-sm mt-1">
            {jobs.length} total job listings
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Active", "Pending", "Closed", "Reported"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition ${filter === f ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "border border-theme text-theme-secondary hover:text-theme-primary"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Jobs List */}
      <motion.div variants={stagger} className="space-y-3">
        {filtered.map((job) => (
          <motion.div
            key={job.id}
            variants={fadeUp}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="card-theme border hover:border-purple-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition"
          >
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiBriefcase className="text-purple-500 w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-theme-primary font-semibold">
                  {job.title}
                </h3>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[job.status]}`}
                >
                  {job.status}
                </span>
                {job.reported && (
                  <span className="flex items-center gap-1 text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                    <FiAlertCircle className="w-3 h-3" /> Reported
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
                <span>{job.type}</span>
                <span className="flex items-center gap-1">
                  <FiUsers className="w-3 h-3" />
                  {job.applicants} applicants
                </span>
                <span>Posted: {job.posted}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-purple-500 font-semibold text-sm">
                {job.salary}
              </span>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition">
                <FiEye className="w-4 h-4" />
              </button>
              {job.status === "Pending" && (
                <button
                  onClick={() => approveJob(job.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-green-500/50 text-green-500 hover:bg-green-500/10 transition"
                >
                  <FiCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => deleteJob(job.id)}
                className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ManageJobs;
