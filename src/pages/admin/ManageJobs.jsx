import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiBriefcase,
  FiMapPin,
  FiTrash2,
  FiCheck,
  FiAlertCircle,
  FiClock,
  FiAlertTriangle,
  FiEye,
  FiX,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiTag,
} from "react-icons/fi";
import { useAdminJobs } from "../../hooks/useAdmin";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const statusConfig = {
  Active: "text-green-500 bg-green-500/10 border-green-500/20",
  Pending: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  Paused: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  Closed: "text-red-500 bg-red-500/10 border-red-500/20",
};

// ── Job Details Modal ─────────────────────────────────────────────────
const JobDetailsModal = ({ job, onClose, onApprove, onDelete }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative bg-theme-card border border-theme rounded-2xl w-full max-w-lg shadow-2xl z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-theme">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiBriefcase className="text-purple-500 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-theme-primary font-bold text-lg leading-tight">
                {job.title}
              </h3>
              <p className="text-theme-muted text-sm">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-theme-primary transition flex-shrink-0"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 px-6 pt-4">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusConfig[job.status] || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
          >
            {job.status}
          </span>
          {job.reported && (
            <span className="flex items-center gap-1 text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-1 rounded-full">
              <FiAlertCircle className="w-3 h-3" /> Reported
            </span>
          )}
          {job.type && (
            <span className="text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2.5 py-1 rounded-full">
              {job.type}
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 px-6 py-4">
          {[
            {
              icon: <FiMapPin className="w-3.5 h-3.5" />,
              label: "Location",
              value: job.location || "N/A",
            },
            {
              icon: <FiUsers className="w-3.5 h-3.5" />,
              label: "Applicants",
              value: job.applicantsCount || 0,
            },
            {
              icon: <FiDollarSign className="w-3.5 h-3.5" />,
              label: "Salary",
              value: job.salary || "Not specified",
            },
            {
              icon: <FiCalendar className="w-3.5 h-3.5" />,
              label: "Posted",
              value: new Date(job.createdAt).toLocaleDateString(),
            },
            {
              icon: <FiTag className="w-3.5 h-3.5" />,
              label: "Category",
              value: job.category || "N/A",
            },
            {
              icon: <FiClock className="w-3.5 h-3.5" />,
              label: "Deadline",
              value: job.deadline
                ? new Date(job.deadline).toLocaleDateString()
                : "N/A",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 bg-theme-secondary rounded-xl p-3"
            >
              <span className="text-theme-muted mt-0.5">{item.icon}</span>
              <div>
                <p className="text-theme-muted text-xs">{item.label}</p>
                <p className="text-theme-primary text-sm font-medium">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        {job.description && (
          <div className="px-6 pb-4">
            <p className="text-theme-muted text-xs mb-1.5">Description</p>
            <p className="text-theme-secondary text-sm leading-relaxed line-clamp-4">
              {job.description}
            </p>
          </div>
        )}

        {/* Requirements */}
        {Array.isArray(job.requirements) && job.requirements.length > 0 && (
          <div className="px-6 pb-4">
            <p className="text-theme-muted text-xs mb-2">Requirements</p>
            <div className="flex flex-wrap gap-1.5">
              {job.requirements.map((req, i) => (
                <span
                  key={i}
                  className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex gap-3 p-6 pt-2 border-t border-theme">
          {job.status === "Pending" && (
            <button
              onClick={() => {
                onApprove(job._id);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition"
            >
              <FiCheck className="w-4 h-4" /> Approve Job
            </button>
          )}
          <button
            onClick={() => {
              onClose();
              onDelete(job._id);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-sm font-semibold transition"
          >
            <FiTrash2 className="w-4 h-4" /> Delete Job
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Delete Confirm Modal ──────────────────────────────────────────────
const DeleteModal = ({ job, onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{ duration: 0.2 }}
      className="relative bg-theme-card border border-theme rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10"
    >
      <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <FiAlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="text-theme-primary font-bold text-center mb-2">
        Delete Job?
      </h3>
      {job && (
        <p className="text-theme-primary text-sm font-semibold text-center mb-1">
          {job.title}
        </p>
      )}
      <p className="text-theme-muted text-xs text-center mb-6">
        This will permanently remove the job listing and all associated data.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary transition text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition text-sm font-semibold"
        >
          Yes, Delete
        </button>
      </div>
    </motion.div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────
const ManageJobs = () => {
  const { jobs, loading, total, fetchJobs, approveJob, deleteJob } =
    useAdminJobs();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [detailsJob, setDetailsJob] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchJobs({
      search: e.target.value,
      status: filter !== "All" ? filter : undefined,
    });
  };

  const handleFilter = (f) => {
    setFilter(f);
    fetchJobs({ search, status: f !== "All" ? f : undefined });
  };

  const jobToDelete = jobs.find((j) => j._id === confirmDelete);

  const handleDeleteConfirm = async () => {
    await deleteJob(confirmDelete);
    setConfirmDelete(null);
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">Manage Jobs</h2>
        <p className="text-theme-muted text-sm mt-1">{total} total jobs</p>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-4 space-y-3"
      >
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search by title or company..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Active", "Pending", "Paused", "Closed"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                filter === f
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                  : "border border-theme text-theme-secondary hover:text-theme-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {jobs.length === 0 ? (
            <motion.div
              variants={fadeUp}
              className="card-theme border rounded-2xl p-12 text-center"
            >
              <FiBriefcase className="w-10 h-10 text-theme-muted mx-auto mb-3" />
              <p className="text-theme-secondary font-medium">No jobs found</p>
            </motion.div>
          ) : (
            jobs.map((job) => (
              <motion.div
                key={job._id}
                variants={fadeUp}
                className="card-theme border hover:border-red-500/20 rounded-2xl p-5 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBriefcase className="text-purple-500 w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-theme-primary font-semibold">
                        {job.title}
                      </h3>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${statusConfig[job.status] || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
                      >
                        {job.status}
                      </span>
                      {job.reported && (
                        <span className="flex items-center gap-1 text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-0.5 rounded-full">
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
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                      <span>{job.applicantsCount || 0} applicants</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Details Button */}
                    <button
                      onClick={() => setDetailsJob(job)}
                      className="flex items-center gap-1.5 text-xs border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 px-3 py-2 rounded-xl transition font-medium"
                    >
                      <FiEye className="w-3.5 h-3.5" /> Details
                    </button>
                    {job.status === "Pending" && (
                      <button
                        onClick={() => approveJob(job._id)}
                        className="flex items-center gap-1.5 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl transition font-medium"
                      >
                        <FiCheck className="w-3.5 h-3.5" /> Approve
                      </button>
                    )}
                    <button
                      onClick={() => setConfirmDelete(job._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {detailsJob && (
          <JobDetailsModal
            job={detailsJob}
            onClose={() => setDetailsJob(null)}
            onApprove={approveJob}
            onDelete={(id) => {
              setDetailsJob(null);
              setConfirmDelete(id);
            }}
          />
        )}
        {confirmDelete && (
          <DeleteModal
            job={jobToDelete}
            onConfirm={handleDeleteConfirm}
            onClose={() => setConfirmDelete(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageJobs;
