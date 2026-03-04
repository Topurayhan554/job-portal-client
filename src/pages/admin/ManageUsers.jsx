import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiTrash2,
  FiMail,
  FiShield,
  FiUsers,
  FiSlash,
  FiCheck,
  FiAlertTriangle,
  FiChevronRight,
} from "react-icons/fi";
import { useAdminUsers } from "../../hooks/useAdmin";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
  "from-red-500 to-pink-500",
  "from-indigo-500 to-purple-500",
];

const roleColor = {
  seeker: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  employer: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  admin: "text-red-500 bg-red-500/10 border-red-500/20",
};

const roleOptions = [
  {
    value: "admin",
    label: "Admin",
    desc: "Full access to manage everything",
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/30 hover:border-red-500",
    dot: "bg-red-500",
  },
  {
    value: "employer",
    label: "Employer",
    desc: "Can post and manage jobs",
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500",
    dot: "bg-purple-500",
  },
  {
    value: "seeker",
    label: "Job Seeker",
    desc: "Can browse and apply to jobs",
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500",
    dot: "bg-blue-500",
  },
];

// ── Reusable Modal Backdrop ──────────────────────────────────────────
const ModalBackdrop = ({ onClose, children }) => (
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
      className="relative z-10 w-full max-w-sm"
    >
      {children}
    </motion.div>
  </div>
);

// ── Role Modal ───────────────────────────────────────────────────────
const RoleModal = ({ user, onConfirm, onClose }) => {
  const [selected, setSelected] = useState(user?.role || "seeker");

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="bg-theme-card border border-theme rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          {user?.profilePhoto || user?.photoURL ? (
            <img
              src={user.profilePhoto || user.photoURL}
              alt=""
              className="w-10 h-10 rounded-xl object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="text-theme-primary font-semibold text-sm">
              {user?.name}
            </p>
            <p className="text-theme-muted text-xs">{user?.email}</p>
          </div>
        </div>

        <h3 className="text-theme-primary font-bold mb-1">Change Role</h3>
        <p className="text-theme-muted text-xs mb-4">
          Select a new role for this user
        </p>

        {/* Role Options */}
        <div className="space-y-2 mb-5">
          {roleOptions.map((r) => (
            <button
              key={r.value}
              onClick={() => setSelected(r.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition text-left ${
                selected === r.value
                  ? r.bg
                  : "border-theme hover:border-theme bg-transparent"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  selected === r.value ? r.dot : "bg-theme-muted opacity-30"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold ${selected === r.value ? r.color : "text-theme-secondary"}`}
                >
                  {r.label}
                </p>
                <p className="text-theme-muted text-xs">{r.desc}</p>
              </div>
              {selected === r.value && (
                <FiCheck className={`w-4 h-4 flex-shrink-0 ${r.color}`} />
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selected)}
            disabled={selected === user?.role}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-semibold transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            Update Role <FiChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

// ── Ban Modal ────────────────────────────────────────────────────────
const BanModal = ({ user, onConfirm, onClose }) => {
  const isBanned = user?.isBanned;
  return (
    <ModalBackdrop onClose={onClose}>
      <div className="bg-theme-card border border-theme rounded-2xl p-6 shadow-2xl">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isBanned ? "bg-green-500/10" : "bg-orange-500/10"}`}
        >
          {isBanned ? (
            <FiCheck className="w-6 h-6 text-green-500" />
          ) : (
            <FiSlash className="w-6 h-6 text-orange-500" />
          )}
        </div>
        <h3 className="text-theme-primary font-bold text-center mb-2">
          {isBanned ? "Unban User?" : "Ban User?"}
        </h3>
        <p className="text-theme-muted text-sm text-center mb-1">
          <span className="text-theme-primary font-semibold">{user?.name}</span>
        </p>
        <p className="text-theme-muted text-xs text-center mb-6">
          {isBanned
            ? "This user will regain full access to the platform."
            : "This user will lose access and cannot log in."}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white transition text-sm font-semibold ${
              isBanned
                ? "bg-green-500 hover:bg-green-600"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isBanned ? "Yes, Unban" : "Yes, Ban"}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

// ── Delete Modal ─────────────────────────────────────────────────────
const DeleteModal = ({ user, onConfirm, onClose }) => (
  <ModalBackdrop onClose={onClose}>
    <div className="bg-theme-card border border-theme rounded-2xl p-6 shadow-2xl">
      <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <FiAlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="text-theme-primary font-bold text-center mb-2">
        Delete User?
      </h3>
      <p className="text-theme-muted text-sm text-center mb-1">
        <span className="text-theme-primary font-semibold">{user?.name}</span>
      </p>
      <p className="text-theme-muted text-xs text-center mb-6">
        This action cannot be undone. All data will be permanently removed.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm"
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
    </div>
  </ModalBackdrop>
);

// ── Main Component ───────────────────────────────────────────────────
const ManageUsers = () => {
  const { users, loading, total, fetchUsers, banUser, changeRole, deleteUser } =
    useAdminUsers();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [roleModal, setRoleModal] = useState(null); // user object
  const [banModal, setBanModal] = useState(null); // user object
  const [deleteModal, setDeleteModal] = useState(null); // user object

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchUsers({
      search: e.target.value,
      role: roleFilter,
      status: statusFilter,
    });
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
    fetchUsers({ search, role, status: statusFilter });
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    fetchUsers({ search, role: roleFilter, status });
  };

  const handleRoleConfirm = async (newRole) => {
    await changeRole(roleModal._id, newRole);
    setRoleModal(null);
  };

  const handleBanConfirm = async () => {
    await banUser(banModal._id);
    setBanModal(null);
  };

  const handleDeleteConfirm = async () => {
    await deleteUser(deleteModal._id);
    setDeleteModal(null);
  };

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
            Manage Users
          </h2>
          <p className="text-theme-muted text-sm mt-1">{total} total users</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-4 space-y-3"
      >
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or email..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "seeker", "employer", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => handleRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition ${
                roleFilter === r
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                  : "border border-theme text-theme-secondary hover:text-theme-primary"
              }`}
            >
              {r === "all" ? "All Roles" : r}
            </button>
          ))}
          <div className="w-px bg-theme-border mx-1" />
          {["all", "active", "banned"].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition ${
                statusFilter === s
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                  : "border border-theme text-theme-secondary hover:text-theme-primary"
              }`}
            >
              {s === "all" ? "All Status" : s}
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
                    User
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-theme-muted">
                    Role
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-theme-muted">
                    Status
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-theme-muted">
                    Joined
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-theme-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-theme-muted text-sm"
                    >
                      <FiUsers className="w-8 h-8 mx-auto mb-2" />
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((u, i) => (
                    <tr
                      key={u._id}
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {u.profilePhoto || u.photoURL ? (
                            <img
                              src={u.profilePhoto || u.photoURL}
                              alt=""
                              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-10 h-10 bg-gradient-to-br ${avatarColors[i % 6]} rounded-xl flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="text-white text-sm font-bold">
                                {u.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-theme-primary font-semibold text-sm truncate">
                              {u.name}
                            </p>
                            <p className="text-theme-muted text-xs truncate">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${roleColor[u.role] || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.isBanned ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}
                        >
                          {u.isBanned ? "Banned" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-theme-muted text-xs">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Email */}
                          <a
                            href={`mailto:${u.email}`}
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition"
                            title="Send Email"
                          >
                            <FiMail className="w-3.5 h-3.5" />
                          </a>
                          {/* Change Role */}
                          <button
                            onClick={() => setRoleModal(u)}
                            title="Change Role"
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition"
                          >
                            <FiShield className="w-3.5 h-3.5" />
                          </button>
                          {/* Ban / Unban */}
                          <button
                            onClick={() => setBanModal(u)}
                            title={u.isBanned ? "Unban" : "Ban"}
                            className={`w-8 h-8 flex items-center justify-center rounded-xl border transition ${
                              u.isBanned
                                ? "border-green-500/50 text-green-500 hover:bg-green-500/10"
                                : "border-theme text-theme-muted hover:text-orange-500 hover:border-orange-500/50"
                            }`}
                          >
                            {u.isBanned ? (
                              <FiCheck className="w-3.5 h-3.5" />
                            ) : (
                              <FiSlash className="w-3.5 h-3.5" />
                            )}
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => setDeleteModal(u)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
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

      {/* ── Modals ── */}
      <AnimatePresence>
        {roleModal && (
          <RoleModal
            user={roleModal}
            onConfirm={handleRoleConfirm}
            onClose={() => setRoleModal(null)}
          />
        )}
        {banModal && (
          <BanModal
            user={banModal}
            onConfirm={handleBanConfirm}
            onClose={() => setBanModal(null)}
          />
        )}
        {deleteModal && (
          <DeleteModal
            user={deleteModal}
            onConfirm={handleDeleteConfirm}
            onClose={() => setDeleteModal(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageUsers;
