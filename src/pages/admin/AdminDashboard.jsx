import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiAlertCircle,
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { useAdminStats } from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const statusColor = {
  Applied: "text-blue-500 bg-blue-500/10",
  "Under Review": "text-yellow-500 bg-yellow-500/10",
  Shortlisted: "text-purple-500 bg-purple-500/10",
  Interview: "text-green-500 bg-green-500/10",
  Rejected: "text-red-500 bg-red-500/10",
  Hired: "text-emerald-500 bg-emerald-500/10",
};

const roleColor = {
  seeker: "text-blue-500 bg-blue-500/10",
  employer: "text-purple-500 bg-purple-500/10",
  admin: "text-red-500 bg-red-500/10",
};

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
  "from-red-500 to-pink-500",
];

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const weekData = [30, 55, 40, 70, 45, 85, 60];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...weekData);

const AdminDashboard = () => {
  const { stats, loading } = useAdminStats();
  const { user } = useAuth();

  if (loading) return <Spinner />;

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FiUsers />,
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      change: "+12%",
    },
    {
      label: "Active Jobs",
      value: stats?.activeJobs || 0,
      icon: <FiBriefcase />,
      bg: "bg-purple-500/10",
      text: "text-purple-500",
      change: "+8%",
    },
    {
      label: "Applications",
      value: stats?.totalApplications || 0,
      icon: <FiFileText />,
      bg: "bg-green-500/10",
      text: "text-green-500",
      change: "+23%",
    },
    {
      label: "Reports",
      value: 5,
      icon: <FiAlertCircle />,
      bg: "bg-red-500/10",
      text: "text-red-500",
      change: "-2",
    },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={fadeUp}
        className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl p-6 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaShieldAlt className="text-yellow-300 w-4 h-4" />
              <span className="text-red-100 text-sm font-medium">
                Admin Panel
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome, {user?.name?.split(" ")[0]} 👋
            </h2>
            <p className="text-red-100 text-sm">
              <span className="text-white font-semibold">5 reports</span> need
              your attention today.
            </p>
          </div>
          <Link
            to="/admin/users"
            className="flex-shrink-0 flex items-center gap-2 bg-white text-red-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-red-50 transition text-sm shadow-lg"
          >
            Manage Users <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card-theme border rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.text}`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith("+")
                    ? "text-green-500 bg-green-500/10"
                    : "text-red-500 bg-red-500/10"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-theme-primary mb-1">
              {stat.value.toLocaleString()}
            </p>
            <p className="text-theme-muted text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 card-theme border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiUsers className="text-red-500 w-4 h-4" /> Recent Users
            </h3>
            <Link
              to="/admin/users"
              className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {(stats?.recentUsers || []).length === 0 ? (
            <div className="px-6 py-10 text-center text-theme-muted text-sm">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-theme">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-theme-muted">
                      User
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-theme-muted">
                      Role
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-theme-muted">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-theme-muted">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme">
                  {stats.recentUsers.map((u, i) => (
                    <tr
                      key={u._id}
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          {u.profilePhoto || u.photoURL ? (
                            <img
                              src={u.profilePhoto || u.photoURL}
                              alt=""
                              className="w-8 h-8 rounded-xl object-cover flex-shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-8 h-8 bg-gradient-to-br ${avatarColors[i % 5]} rounded-xl flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="text-white text-xs font-bold">
                                {u.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-theme-primary font-medium text-sm truncate">
                              {u.name}
                            </p>
                            <p className="text-theme-muted text-xs truncate">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${roleColor[u.role] || "bg-gray-500/10 text-gray-500"}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            u.isBanned
                              ? "text-red-500 bg-red-500/10"
                              : "text-green-500 bg-green-500/10"
                          }`}
                        >
                          {u.isBanned ? "Banned" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-theme-muted text-xs">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions + Chart */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-red-500 w-4 h-4" /> Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                {
                  label: "Manage Users",
                  path: "/admin/users",
                  icon: <FiUsers />,
                  color: "text-blue-500",
                },
                {
                  label: "Manage Jobs",
                  path: "/admin/jobs",
                  icon: <FiBriefcase />,
                  color: "text-purple-500",
                },
                {
                  label: "Applications",
                  path: "/admin/applications",
                  icon: <FiFileText />,
                  color: "text-green-500",
                },
                {
                  label: "Security",
                  path: "/admin/security",
                  icon: <FiShield />,
                  color: "text-red-500",
                },
              ].map((action, i) => (
                <Link
                  key={i}
                  to={action.path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-theme hover:border-red-500/30 hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className={action.color}>{action.icon}</span>
                  <span className="text-theme-secondary text-sm font-medium">
                    {action.label}
                  </span>
                  <FiArrowRight className="w-3 h-3 text-theme-muted ml-auto" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Mini Chart */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 text-sm">
              New Users This Week
            </h3>
            <div className="flex items-end gap-1.5 h-24">
              {weekData.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxVal) * 100}%` }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    className="w-full bg-gradient-to-t from-red-600 to-orange-400 rounded-t-md min-h-1"
                  />
                  <span className="text-theme-muted text-xs">
                    {days[i].charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Jobs */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
          <h3 className="font-semibold text-theme-primary flex items-center gap-2">
            <FiBriefcase className="text-red-500 w-4 h-4" /> Recent Jobs
          </h3>
          <Link
            to="/admin/jobs"
            className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
          >
            View all <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-theme">
          {(stats?.recentJobs || []).slice(0, 4).map((job) => (
            <div
              key={job._id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiBriefcase className="text-purple-500 w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-theme-primary font-medium text-sm truncate">
                  {job.title}
                </p>
                <p className="text-theme-muted text-xs">
                  {job.company} · {job.location}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {job.reported && (
                  <span className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3" /> Reported
                  </span>
                )}
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    job.status === "Active"
                      ? "bg-green-500/10 text-green-500"
                      : job.status === "Pending"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
