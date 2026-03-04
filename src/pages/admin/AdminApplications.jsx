import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiTrash2,
  FiFileText,
  FiAlertTriangle,
} from "react-icons/fi";
import { useAdminApplications } from "../../hooks/useAdmin";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const statusConfig = {
  Applied: "text-blue-500 bg-blue-500/10",
  "Under Review": "text-yellow-500 bg-yellow-500/10",
  Shortlisted: "text-purple-500 bg-purple-500/10",
  Interview: "text-green-500 bg-green-500/10",
  Rejected: "text-red-500 bg-red-500/10",
  Hired: "text-emerald-500 bg-emerald-500/10",
};

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
  "from-red-500 to-pink-500",
  "from-indigo-500 to-purple-500",
];

const AdminApplications = () => {
  const { applications, loading, total, fetchApplications, deleteApplication } =
    useAdminApplications();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleFilter = (f) => {
    setFilter(f);
    fetchApplications(f);
  };

  const handleDeleteConfirm = async () => {
    await deleteApplication(confirmDelete);
    setConfirmDelete(null);
  };

  const filtered = applications.filter((app) => {
    const name = app.applicant?.name || "";
    const title = app.job?.title || "";
    const company = app.job?.company || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      company.toLowerCase().includes(search.toLowerCase())
    );
  });

  const appToDelete = applications.find((a) => a._id === confirmDelete);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">
          All Applications
        </h2>
        <p className="text-theme-muted text-sm mt-1">
          {total} total applications
        </p>
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicant, job or company..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "All",
            "Applied",
            "Under Review",
            "Shortlisted",
            "Interview",
            "Rejected",
          ].map((f) => (
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

      {/* Table */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
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
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-theme-muted">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-theme-muted text-sm"
                    >
                      <FiFileText className="w-8 h-8 mx-auto mb-2" />
                      No applications found
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
                              className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-9 h-9 bg-gradient-to-br ${avatarColors[i % 6]} rounded-xl flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="text-white text-xs font-bold">
                                {app.applicant?.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-theme-primary font-medium text-sm truncate">
                              {app.applicant?.name}
                            </p>
                            <p className="text-theme-muted text-xs truncate">
                              {app.applicant?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-theme-primary text-sm font-medium truncate max-w-[160px]">
                          {app.job?.title}
                        </p>
                        <p className="text-theme-muted text-xs">
                          {app.job?.company}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[app.status] || "bg-gray-500/10 text-gray-500"}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-theme-muted text-xs">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setConfirmDelete(app._id)}
                          className="w-8 h-8 inline-flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Delete Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setConfirmDelete(null)}
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
                Delete Application?
              </h3>
              {appToDelete && (
                <p className="text-theme-primary text-sm font-semibold text-center mb-1">
                  {appToDelete.applicant?.name} → {appToDelete.job?.title}
                </p>
              )}
              <p className="text-theme-muted text-xs text-center mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition text-sm font-semibold"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminApplications;
