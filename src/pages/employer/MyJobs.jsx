import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiMapPin,
  FiUsers,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPlus,
  FiSearch,
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
    location: "Dhaka",
    type: "Full-time",
    applicants: 24,
    status: "Active",
    posted: "Nov 15, 2024",
    salary: "৳40k-60k",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    location: "Remote",
    type: "Part-time",
    applicants: 18,
    status: "Active",
    posted: "Nov 10, 2024",
    salary: "৳30k-45k",
  },
  {
    id: 3,
    title: "Backend Engineer",
    location: "Chittagong",
    type: "Full-time",
    applicants: 31,
    status: "Paused",
    posted: "Nov 5, 2024",
    salary: "৳50k-70k",
  },
  {
    id: 4,
    title: "Product Manager",
    location: "Dhaka",
    type: "Full-time",
    applicants: 12,
    status: "Closed",
    posted: "Oct 28, 2024",
    salary: "৳80k-120k",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    applicants: 9,
    status: "Active",
    posted: "Oct 20, 2024",
    salary: "৳60k-90k",
  },
];

const statusConfig = {
  Active: "bg-green-500/10 text-green-500",
  Paused: "bg-yellow-500/10 text-yellow-500",
  Closed: "bg-red-500/10 text-red-500",
};

const MyJobs = () => {
  const [jobs, setJobs] = useState(allJobs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || j.status === filter;
    return matchSearch && matchFilter;
  });

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
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-theme-primary">My Jobs</h2>
          <p className="text-theme-muted text-sm mt-1">
            {jobs.length} total job listings
          </p>
        </div>
        <Link
          to="/employer/post-job"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
        >
          <FiPlus className="w-4 h-4" /> Post New Job
        </Link>
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
            placeholder="Search jobs..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Paused", "Closed"].map((f) => (
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
              <div className="flex flex-wrap items-start gap-2 mb-1">
                <h3 className="text-theme-primary font-semibold">
                  {job.title}
                </h3>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[job.status]}`}
                >
                  {job.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-theme-muted">
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
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-purple-500 font-semibold text-sm">
                {job.salary}
              </span>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition">
                <FiEye className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition">
                <FiEdit2 className="w-4 h-4" />
              </button>
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

export default MyJobs;
