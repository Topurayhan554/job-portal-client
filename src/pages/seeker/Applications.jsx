import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiSearch,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import { useSeekerApplications } from "../../hooks/useSeeker";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const statusConfig = {
  Interview: "text-green-500 bg-green-500/10",
  "Under Review": "text-yellow-500 bg-yellow-500/10",
  Rejected: "text-red-500 bg-red-500/10",
  Applied: "text-blue-500 bg-blue-500/10",
  Shortlisted: "text-purple-500 bg-purple-500/10",
  Hired: "text-emerald-500 bg-emerald-500/10",
};

const filters = [
  "All",
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Rejected",
];

const Applications = () => {
  const { applications, loading, total, fetchApplications, deleteApplication } =
    useSeekerApplications();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (f) => {
    setFilter(f);
    fetchApplications(f);
  };

  const filtered = applications.filter((app) => {
    const title = app.job?.title || "";
    const company = app.job?.company || "";
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      company.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

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
          <h2 className="text-2xl font-bold text-theme-primary">
            My Applications
          </h2>
          <p className="text-theme-muted text-sm mt-1">
            {total} total applications
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
              onClick={() => handleFilterChange(f)}
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

      {/* List */}
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
          </motion.div>
        ) : (
          filtered.map((app) => (
            <motion.div
              key={app._id}
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
                    {app.job?.title}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[app.status] || "bg-gray-500/10 text-gray-500"}`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-theme-muted">
                  <span className="font-medium text-theme-secondary">
                    {app.job?.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" />
                    {app.job?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {app.job?.type}
                  </span>
                  <span>
                    Applied: {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-purple-500 font-semibold text-sm">
                  ৳
                  {app.job?.salaryMin
                    ? `${(app.job.salaryMin / 1000).toFixed(0)}k`
                    : "N/A"}
                </span>
                <button
                  onClick={() => deleteApplication(app._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                >
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
