import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiUsers,
  FiFileText,
  FiMail,
  FiDownload,
  FiChevronDown,
  FiX,
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiPhone,
  FiGlobe,
  FiLinkedin,
  FiGithub,
  FiEye,
} from "react-icons/fi";
import { useApplicants, useMyJobs } from "../../hooks/useEmployer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const statusConfig = {
  Applied: {
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    next: ["Under Review", "Rejected"],
  },
  "Under Review": {
    color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    next: ["Shortlisted", "Rejected"],
  },
  Shortlisted: {
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    next: ["Interview", "Rejected"],
  },
  Interview: {
    color: "text-green-500 bg-green-500/10 border-green-500/20",
    next: ["Hired", "Rejected"],
  },
  Hired: {
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    next: [],
  },
  Rejected: {
    color: "text-red-500 bg-red-500/10 border-red-500/20",
    next: ["Under Review"],
  },
};

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
  "from-red-500 to-pink-500",
  "from-indigo-500 to-purple-500",
];

// Applicant Details Modal
const ApplicantDetailsModal = ({ app, index, onClose, onStatusChange }) => {
  if (!app) return null;
  const applicant = app.applicant || {};
  const initials = applicant.name?.charAt(0).toUpperCase();

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
        className="relative bg-theme-card border border-theme rounded-2xl w-full max-w-lg shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-theme flex-shrink-0">
          <div className="flex items-center gap-4">
            {applicant.profilePhoto || applicant.photoURL ? (
              <img
                src={applicant.profilePhoto || applicant.photoURL}
                alt=""
                className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
              />
            ) : (
              <div
                className={`w-14 h-14 bg-gradient-to-br ${avatarColors[index % 6]} rounded-2xl flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-white text-xl font-bold">{initials}</span>
              </div>
            )}
            <div>
              <h3 className="text-theme-primary font-bold text-lg leading-tight">
                {applicant.name}
              </h3>
              <p className="text-theme-muted text-sm">{applicant.email}</p>
              <span
                className={`inline-block mt-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusConfig[app.status]?.color || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
              >
                {app.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-theme-primary transition flex-shrink-0"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Applied For */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiBriefcase className="text-purple-500 w-4 h-4" />
            </div>
            <div>
              <p className="text-theme-muted text-xs">Applied For</p>
              <p className="text-theme-primary font-semibold text-sm">
                {app.job?.title}
              </p>
              <p className="text-theme-muted text-xs">
                {app.job?.company} · {app.job?.type}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-theme-muted text-xs">Applied on</p>
              <p className="text-theme-primary text-xs font-medium">
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <FiMapPin className="w-3.5 h-3.5" />,
                label: "Location",
                value: applicant.location || "N/A",
              },
              {
                icon: <FiPhone className="w-3.5 h-3.5" />,
                label: "Phone",
                value: applicant.phone || "N/A",
              },
              {
                icon: <FiCalendar className="w-3.5 h-3.5" />,
                label: "Member Since",
                value: applicant.createdAt
                  ? new Date(applicant.createdAt).toLocaleDateString()
                  : "N/A",
              },
              {
                icon: <FiBriefcase className="w-3.5 h-3.5" />,
                label: "Experience",
                value: applicant.experience || "N/A",
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

          {/* Skills */}
          {Array.isArray(applicant.skills) && applicant.skills.length > 0 && (
            <div>
              <p className="text-theme-muted text-xs mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {applicant.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {applicant.bio && (
            <div>
              <p className="text-theme-muted text-xs mb-1.5">Bio</p>
              <p className="text-theme-secondary text-sm leading-relaxed bg-theme-secondary rounded-xl p-3">
                {applicant.bio}
              </p>
            </div>
          )}

          {/* Cover Letter */}
          {app.coverLetter && (
            <div>
              <p className="text-theme-muted text-xs mb-1.5">Cover Letter</p>
              <p className="text-theme-secondary text-sm leading-relaxed bg-theme-secondary rounded-xl p-3 line-clamp-5">
                {app.coverLetter}
              </p>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {applicant.portfolio && (
              <a
                href={applicant.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 px-3 py-2 rounded-xl transition"
              >
                <FiGlobe className="w-3.5 h-3.5" /> Portfolio
              </a>
            )}
            {applicant.linkedin && (
              <a
                href={applicant.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 px-3 py-2 rounded-xl transition"
              >
                <FiLinkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
            {applicant.github && (
              <a
                href={applicant.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs border border-theme text-theme-muted hover:text-theme-primary hover:border-theme px-3 py-2 rounded-xl transition"
              >
                <FiGithub className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
          </div>

          {/* Status Change */}
          {statusConfig[app.status]?.next?.length > 0 && (
            <div>
              <p className="text-theme-muted text-xs mb-2">
                Move to next stage
              </p>
              <div className="flex flex-wrap gap-2">
                {statusConfig[app.status].next.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(app._id, s);
                      onClose();
                    }}
                    className={`text-xs font-medium px-3 py-2 rounded-xl border transition ${statusConfig[s]?.color || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
                  >
                    → {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4 border-t border-theme flex-shrink-0">
          <a
            href={`mailto:${applicant.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-theme text-theme-secondary hover:text-blue-500 hover:border-blue-500/50 text-sm font-medium transition"
          >
            <FiMail className="w-4 h-4" /> Email
          </a>
          {app.cvUrl && (
            <a
              href={app.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-semibold transition hover:opacity-90"
            >
              <FiDownload className="w-4 h-4" /> Download CV
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Main Component
const Applicants = () => {
  const { applicants, loading, total, fetchApplicants, updateStatus } =
    useApplicants();
  const { jobs } = useMyJobs();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [detailsApp, setDetailsApp] = useState(null);
  const [detailsIndex, setDetailsIndex] = useState(0);

  const handleJobFilter = (jobId) => {
    setJobFilter(jobId);
    fetchApplicants(jobId);
  };

  const filtered = applicants.filter((app) => {
    const name = app.applicant?.name || "";
    const matchSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = applicants.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

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
          <h2 className="text-2xl font-bold text-theme-primary">Applicants</h2>
          <p className="text-theme-muted text-sm mt-1">
            {total} total applicants
          </p>
        </div>
      </motion.div>

      {/* Status Summary */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 sm:grid-cols-6 gap-3"
      >
        {[
          "Applied",
          "Under Review",
          "Shortlisted",
          "Interview",
          "Hired",
          "Rejected",
        ].map((s) => (
          <motion.button
            key={s}
            variants={fadeUp}
            onClick={() => setStatusFilter(statusFilter === s ? "All" : s)}
            className={`card-theme border rounded-xl p-3 text-center transition ${
              statusFilter === s
                ? "border-purple-500/50 bg-purple-500/5"
                : "hover:border-purple-500/20"
            }`}
          >
            <p className="text-xl font-bold text-theme-primary">
              {statusCounts[s] || 0}
            </p>
            <p className="text-theme-muted text-xs mt-0.5 leading-tight">{s}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-4 space-y-3"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applicants..."
              className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
            />
          </div>
          <select
            value={jobFilter}
            onChange={(e) => handleJobFilter(e.target.value)}
            className="input-theme border rounded-xl px-4 py-2.5 text-sm min-w-[180px] appearance-none"
          >
            <option value="">All Jobs</option>
            {jobs.map((j) => (
              <option key={j._id} value={j._id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-theme bg-theme-secondary">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-theme-muted">
                    Applicant
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-theme-muted">
                    Job
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-theme-muted">
                    Status
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-theme-muted">
                    Applied
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-theme-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-theme-muted"
                    >
                      <FiUsers className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No applicants found</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((app, i) => (
                    <tr
                      key={app._id}
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {app.applicant?.profilePhoto ||
                          app.applicant?.photoURL ? (
                            <img
                              src={
                                app.applicant.profilePhoto ||
                                app.applicant.photoURL
                              }
                              alt=""
                              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-10 h-10 bg-gradient-to-br ${avatarColors[i % 6]} rounded-xl flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="text-white text-sm font-bold">
                                {app.applicant?.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-theme-primary font-semibold text-sm truncate">
                              {app.applicant?.name}
                            </p>
                            <p className="text-theme-muted text-xs truncate">
                              {app.applicant?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-theme-primary text-sm font-medium truncate max-w-[140px]">
                          {app.job?.title}
                        </p>
                        <p className="text-theme-muted text-xs">
                          {app.job?.type}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === app._id ? null : app._id,
                              )
                            }
                            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-xl border transition ${statusConfig[app.status]?.color || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
                          >
                            {app.status}
                            {statusConfig[app.status]?.next?.length > 0 && (
                              <FiChevronDown className="w-3 h-3" />
                            )}
                          </button>
                          {openDropdown === app._id &&
                            statusConfig[app.status]?.next?.length > 0 && (
                              <div className="absolute top-full left-0 mt-1 bg-theme-card border border-theme rounded-xl shadow-xl z-20 overflow-hidden min-w-[140px]">
                                {statusConfig[app.status].next.map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => {
                                      updateStatus(app._id, s);
                                      setOpenDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-xs text-theme-secondary hover:bg-black/5 dark:hover:bg-white/5 transition"
                                  >
                                    → {s}
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-theme-muted text-xs">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Details */}
                          <button
                            onClick={() => {
                              setDetailsApp(app);
                              setDetailsIndex(i);
                            }}
                            title="View Details"
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition"
                          >
                            <FiEye className="w-3.5 h-3.5" />
                          </button>
                          {app.cvUrl && (
                            <a
                              href={app.cvUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Download CV"
                              className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition"
                            >
                              <FiDownload className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${app.applicant?.email}`}
                            title="Send Email"
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition"
                          >
                            <FiMail className="w-3.5 h-3.5" />
                          </a>
                          {app.coverLetter && (
                            <button
                              onClick={() => {
                                setDetailsApp(app);
                                setDetailsIndex(i);
                              }}
                              title="View Cover Letter"
                              className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-green-500 hover:border-green-500/50 transition"
                            >
                              <FiFileText className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {detailsApp && (
          <ApplicantDetailsModal
            app={detailsApp}
            index={detailsIndex}
            onClose={() => setDetailsApp(null)}
            onStatusChange={(id, status) => {
              updateStatus(id, status);
              setDetailsApp(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Applicants;
