import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiMapPin,
  FiUsers,
  FiEdit2,
  FiTrash2,
  FiPause,
  FiPlay,
  FiSearch,
  FiPlusCircle,
  FiClock,
  FiX,
  FiDollarSign,
  FiAlignLeft,
  FiTag,
  FiStar,
} from "react-icons/fi";
import { useMyJobs, usePostJob } from "../../hooks/useEmployer";

//Animations — instant, no stagger delay =====
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const statusConfig = {
  Active: "text-green-500 bg-green-500/10 border-green-500/20",
  Paused: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  Closed: "text-red-500 bg-red-500/10 border-red-500/20",
  Pending: "text-blue-500 bg-blue-500/10 border-blue-500/20",
};

const jobTypes = [
  "Full-time",
  "Part-time",
  "Remote",
  "Freelance",
  "Internship",
];
const categories = [
  "Technology",
  "Design",
  "Marketing",
  "Management",
  "Finance",
  "HR",
  "Sales",
];
const statusList = ["Active", "Paused", "Closed"];

//Skeleton =====
const JobSkeleton = () => (
  <div className="card-theme border rounded-2xl p-5 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-theme-primary/30 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-theme-primary/30 rounded w-1/2" />
        <div className="h-3 bg-theme-primary/20 rounded w-2/3" />
      </div>
      <div className="h-8 w-24 bg-theme-primary/20 rounded-xl" />
    </div>
  </div>
);

//Edit Modal =====
const EditJobModal = ({ job, onClose, onSave }) => {
  const { updateJob, loading } = usePostJob();

  const [form, setForm] = useState({
    title: job.title || "",
    company: job.company || "",
    location: job.location || "",
    type: job.type || "Full-time",
    category: job.category || "Technology",
    status: job.status || "Active",
    salaryMin: job.salaryMin || "",
    salaryMax: job.salaryMax || "",
    description: job.description || "",
    requirements: job.requirements || "",
    skills: (job.skills || []).join(", "),
    featured: job.featured || false,
  });

  const set = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    const data = {
      ...form,
      salaryMin: Number(form.salaryMin),
      salaryMax: Number(form.salaryMax),
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const updated = await updateJob(job._id, data);
    if (updated) {
      onSave(updated);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="relative bg-theme-card border border-theme rounded-2xl w-full max-w-2xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-xs mb-1">Editing Job</p>
              <h3 className="text-white font-bold text-lg leading-tight truncate max-w-sm">
                {job.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition mt-1 flex-shrink-0"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Title + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-theme-muted mb-1.5 block">
                Job Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-theme-muted mb-1.5 block">
                Company Name
              </label>
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Company name"
                className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          {/* Location + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-theme-muted mb-1.5 block flex items-center gap-1">
                <FiMapPin className="w-3 h-3" /> Location
              </label>
              <input
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. Dhaka, Remote"
                className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-theme-muted mb-1.5 block flex items-center gap-1">
                <FiBriefcase className="w-3 h-3" /> Job Type
              </label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
              >
                {jobTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-theme-muted mb-1.5 block flex items-center gap-1">
                <FiTag className="w-3 h-3" /> Category
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-theme-muted mb-1.5 block">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
              >
                {statusList.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="text-xs font-semibold text-theme-muted mb-1.5 block flex items-center gap-1">
              <FiDollarSign className="w-3 h-3" /> Salary Range (৳)
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={form.salaryMin}
                onChange={(e) => set("salaryMin", e.target.value)}
                placeholder="Min e.g. 30000"
                className="input-theme flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <span className="text-theme-muted self-center">–</span>
              <input
                type="number"
                value={form.salaryMax}
                onChange={(e) => set("salaryMax", e.target.value)}
                placeholder="Max e.g. 60000"
                className="input-theme flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-xs font-semibold text-theme-muted mb-1.5 block">
              Skills <span className="font-normal">(comma separated)</span>
            </label>
            <input
              value={form.skills}
              onChange={(e) => set("skills", e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-theme-muted mb-1.5 block flex items-center gap-1">
              <FiAlignLeft className="w-3 h-3" /> Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the role and responsibilities..."
              className="input-theme w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition leading-relaxed"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="text-xs font-semibold text-theme-muted mb-1.5 block">
              Requirements
            </label>
            <textarea
              rows={3}
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
              placeholder="List the requirements..."
              className="input-theme w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition leading-relaxed"
            />
          </div>

          {/* Featured Toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => set("featured", !form.featured)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                form.featured ? "bg-yellow-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
                  form.featured ? "left-6" : "left-0.5"
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-theme-primary flex items-center gap-1">
                <FiStar className="w-3 h-3 text-yellow-500" /> Featured Job
              </p>
              <p className="text-xs text-theme-muted">
                Featured jobs appear at the top of listings
              </p>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-theme flex-shrink-0 bg-theme-card">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary text-sm hover:text-theme-primary transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !form.title}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-purple-900/20"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                Saving...
              </>
            ) : (
              <>
                <FiEdit2 className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

//Main Component =====
const MyJobs = () => {
  const { jobs, loading, total, fetchJobs, deleteJob, updateJobStatus } =
    useMyJobs();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [localJobs, setLocalJobs] = useState(null); // optimistic update

  const displayJobs = localJobs ?? jobs;

  const handleFilter = (f) => {
    setFilter(f);
    fetchJobs(f);
  };

  const filtered = displayJobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase()),
  );

  // Optimistic update after edit
  const handleSave = (updated) => {
    setLocalJobs((prev) =>
      (prev ?? jobs).map((j) => (j._id === updated._id ? updated : j)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-theme-primary">My Jobs</h2>
          <p className="text-theme-muted text-sm mt-1">
            {total} total jobs posted
          </p>
        </div>
        <Link
          to="/employer/post-job"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/20"
        >
          <FiPlusCircle className="w-4 h-4" /> Post New Job
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="card-theme border rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Active", "Paused", "Closed"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
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

      {/* Jobs List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <JobSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-theme border rounded-2xl p-16 text-center"
        >
          <FiBriefcase className="w-10 h-10 text-theme-muted mx-auto mb-3" />
          <p className="text-theme-secondary font-medium">No jobs found</p>
          <Link
            to="/employer/post-job"
            className="mt-3 inline-flex items-center gap-2 text-purple-500 text-sm hover:text-purple-400 transition"
          >
            <FiPlusCircle className="w-4 h-4" /> Post your first job
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="card-theme border hover:border-purple-500/30 rounded-2xl p-5 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiBriefcase className="text-purple-500 w-5 h-5" />
                </div>

                {/* Info */}
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
                    {job.featured && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-medium">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-theme-muted">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers className="w-3 h-3" />
                      {job.applicantsCount || 0} applicants
                    </span>
                    <span>
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-purple-500 font-semibold text-sm">
                    ৳{(job.salaryMin / 1000).toFixed(0)}k–
                    {(job.salaryMax / 1000).toFixed(0)}k
                  </span>

                  {/* ✅ Edit button */}
                  <button
                    onClick={() => setEditJob(job)}
                    title="Edit Job"
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Pause / Resume */}
                  <button
                    onClick={() =>
                      updateJobStatus(
                        job._id,
                        job.status === "Active" ? "Paused" : "Active",
                      )
                    }
                    title={job.status === "Active" ? "Pause" : "Resume"}
                    className={`w-8 h-8 flex items-center justify-center rounded-xl border transition ${
                      job.status === "Active"
                        ? "border-theme text-theme-muted hover:text-yellow-500 hover:border-yellow-500/50"
                        : "border-green-500/50 text-green-500 hover:bg-green-500/10"
                    }`}
                  >
                    {job.status === "Active" ? (
                      <FiPause className="w-3.5 h-3.5" />
                    ) : (
                      <FiPlay className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setConfirmDelete(job._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/*Edit Modal*/}
      <AnimatePresence>
        {editJob && (
          <EditJobModal
            job={editJob}
            onClose={() => setEditJob(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/*Delete Confirm Modal*/}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setConfirmDelete(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-theme-card border border-theme rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10"
            >
              <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-theme-primary font-bold text-center mb-2">
                Delete Job?
              </h3>
              <p className="text-theme-muted text-sm text-center mb-6">
                This will permanently remove the job listing and all its
                applications.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary text-sm transition"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await deleteJob(confirmDelete);
                    setConfirmDelete(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyJobs;
