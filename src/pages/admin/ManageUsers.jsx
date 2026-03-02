import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiUsers,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiCheck,
  FiX,
  FiMail,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const allUsers = [
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim@mail.com",
    role: "seeker",
    status: "active",
    joined: "Nov 15, 2024",
    avatar: "R",
    applications: 8,
  },
  {
    id: 2,
    name: "TechCorp BD",
    email: "hr@techcorp.com",
    role: "employer",
    status: "active",
    joined: "Nov 10, 2024",
    avatar: "T",
    applications: 0,
  },
  {
    id: 3,
    name: "Sadia Islam",
    email: "sadia@mail.com",
    role: "seeker",
    status: "banned",
    joined: "Nov 5, 2024",
    avatar: "S",
    applications: 3,
  },
  {
    id: 4,
    name: "DevHouse Ltd",
    email: "info@devhouse.com",
    role: "employer",
    status: "active",
    joined: "Oct 28, 2024",
    avatar: "D",
    applications: 0,
  },
  {
    id: 5,
    name: "Karim Hossain",
    email: "karim@mail.com",
    role: "seeker",
    status: "active",
    joined: "Oct 20, 2024",
    avatar: "K",
    applications: 12,
  },
  {
    id: 6,
    name: "Admin User",
    email: "admin@portal.com",
    role: "admin",
    status: "active",
    joined: "Jan 1, 2024",
    avatar: "A",
    applications: 0,
  },
];

const roleColor = {
  seeker: "bg-blue-500/10 text-blue-500",
  employer: "bg-purple-500/10 text-purple-500",
  admin: "bg-red-500/10 text-red-500",
};

const statusColor = {
  active: "bg-green-500/10 text-green-500",
  banned: "bg-red-500/10 text-red-500",
};

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
  "from-blue-500 to-cyan-500",
  "from-red-500 to-pink-500",
];

const ManageUsers = () => {
  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleBan = (id) =>
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "banned" : "active" }
          : u,
      ),
    );
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const makeAdmin = (id) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, role: "admin" } : u)));

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
          <p className="text-theme-muted text-sm mt-1">
            {users.length} total users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <FiUsers className="text-purple-500 w-4 h-4" />
          </div>
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
            placeholder="Search by name or email..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "seeker", "employer", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition capitalize ${roleFilter === r ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "border border-theme text-theme-secondary hover:text-theme-primary"}`}
            >
              {r}
            </button>
          ))}
          <div className="w-px bg-theme-border"></div>
          {["All", "active", "banned"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition capitalize ${statusFilter === s ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "border border-theme text-theme-secondary hover:text-theme-primary"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-theme text-left">
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {filtered.map((u, idx) => (
                <motion.tr
                  key={u.id}
                  variants={fadeUp}
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white font-bold text-sm">
                          {u.avatar}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-theme-primary font-medium text-sm">
                          {u.name}
                        </p>
                        <p className="text-theme-muted text-xs truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${roleColor[u.role]}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColor[u.status]}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-theme-secondary text-sm">{u.joined}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        title="Send Email"
                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition"
                      >
                        <FiMail className="w-3.5 h-3.5" />
                      </button>
                      {u.role !== "admin" && (
                        <button
                          title="Make Admin"
                          onClick={() => makeAdmin(u.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-yellow-500 hover:border-yellow-500/50 transition"
                        >
                          <FiShield className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        title={
                          u.status === "active" ? "Ban User" : "Unban User"
                        }
                        onClick={() => toggleBan(u.id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-xl border transition ${u.status === "active" ? "border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50" : "border-green-500/50 text-green-500 hover:bg-green-500/10"}`}
                      >
                        {u.status === "active" ? (
                          <FiX className="w-3.5 h-3.5" />
                        ) : (
                          <FiCheck className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        title="Delete"
                        onClick={() => deleteUser(u.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ManageUsers;
