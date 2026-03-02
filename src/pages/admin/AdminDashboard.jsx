import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiTrendingUp,
  FiArrowRight,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiMapPin,
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const stats = [
  {
    label: "Total Users",
    value: "2,540",
    icon: <FiUsers />,
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    change: "+12% this month",
  },
  {
    label: "Active Jobs",
    value: "348",
    icon: <FiBriefcase />,
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    change: "+8% this month",
  },
  {
    label: "Applications",
    value: "5,820",
    icon: <FiFileText />,
    bg: "bg-green-500/10",
    text: "text-green-500",
    change: "+23% this month",
  },
  {
    label: "Revenue",
    value: "৳1.2M",
    icon: <FiTrendingUp />,
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    change: "+5% this month",
  },
];

const recentUsers = [
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim@mail.com",
    role: "seeker",
    status: "active",
    joined: "2 hours ago",
    avatar: "R",
  },
  {
    id: 2,
    name: "TechCorp BD",
    email: "hr@techcorp.com",
    role: "employer",
    status: "active",
    joined: "5 hours ago",
    avatar: "T",
  },
  {
    id: 3,
    name: "Sadia Islam",
    email: "sadia@mail.com",
    role: "seeker",
    status: "banned",
    joined: "1 day ago",
    avatar: "S",
  },
  {
    id: 4,
    name: "DevHouse Ltd",
    email: "info@devhouse.com",
    role: "employer",
    status: "active",
    joined: "2 days ago",
    avatar: "D",
  },
];

const recentJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    status: "Active",
    reported: false,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    status: "Active",
    reported: true,
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DevHouse",
    location: "Chittagong",
    status: "Pending",
    reported: false,
  },
];

const alerts = [
  {
    type: "warning",
    msg: "3 jobs flagged for review",
    icon: <FiAlertCircle />,
  },
  { type: "error", msg: "2 users reported for spam", icon: <FiShield /> },
  { type: "success", msg: "System backup completed", icon: <FiCheckCircle /> },
];

const roleColor = {
  seeker: "bg-blue-500/10 text-blue-500",
  employer: "bg-purple-500/10 text-purple-500",
  admin: "bg-red-500/10 text-red-500",
};

const alertColor = {
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
  error: "bg-red-500/10 border-red-500/20 text-red-500",
  success: "bg-green-500/10 border-green-500/20 text-green-500",
};

const weekData = [120, 180, 95, 220, 160, 280, 195];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...weekData);

const AdminDashboard = () => {
  const { user } = useAuth();

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
        className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaRocket className="text-yellow-300 w-4 h-4" />
              <span className="text-blue-100 text-sm">Admin Panel</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h2>
            <p className="text-blue-100 text-sm">
              <span className="text-white font-semibold">5 new reports</span>{" "}
              need your attention today.
            </p>
          </div>
          <Link
            to="/admin/users"
            className="flex-shrink-0 flex items-center gap-2 bg-white text-purple-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shadow-lg"
          >
            <FiUsers className="w-4 h-4" /> Manage Users
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card-theme border rounded-2xl p-5"
          >
            <div
              className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.text} mb-4`}
            >
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-theme-primary mb-1">
              {stat.value}
            </p>
            <p className="text-theme-muted text-sm">{stat.label}</p>
            <p className="text-green-500 text-xs mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Alerts */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${alertColor[alert.type]}`}
          >
            <span className="text-lg">{alert.icon}</span>
            <p className="text-sm font-medium">{alert.msg}</p>
          </div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 card-theme border rounded-2xl p-6"
        >
          <h3 className="font-semibold text-theme-primary mb-6">
            User Registrations This Week
          </h3>
          <div className="flex items-end gap-3 h-40">
            {weekData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-theme-muted">{val}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxVal) * 100}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg min-h-2"
                />
                <span className="text-xs text-theme-muted">{days[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-5"
        >
          <h3 className="font-semibold text-theme-primary mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {[
              {
                label: "Manage Users",
                to: "/admin/users",
                icon: <FiUsers />,
                color: "text-purple-500 bg-purple-500/10",
              },
              {
                label: "Manage Jobs",
                to: "/admin/jobs",
                icon: <FiBriefcase />,
                color: "text-blue-500 bg-blue-500/10",
              },
              {
                label: "Applications",
                to: "/admin/applications",
                icon: <FiFileText />,
                color: "text-green-500 bg-green-500/10",
              },
              {
                label: "Security",
                to: "/admin/security",
                icon: <FiShield />,
                color: "text-red-500 bg-red-500/10",
              },
            ].map((action, i) => (
              <Link
                key={i}
                to={action.to}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition group"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}
                >
                  {action.icon}
                </div>
                <span className="text-theme-secondary text-sm font-medium group-hover:text-theme-primary transition">
                  {action.label}
                </span>
                <FiArrowRight className="w-3 h-3 text-theme-muted ml-auto group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiUsers className="text-purple-500 w-4 h-4" /> Recent Users
            </h3>
            <Link
              to="/admin/users"
              className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-theme">
            {recentUsers.map((u, idx) => (
              <div
                key={u.id}
                className="flex items-center gap-3 px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {u.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-theme-primary font-medium text-sm truncate">
                    {u.name}
                  </p>
                  <p className="text-theme-muted text-xs truncate">{u.email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColor[u.role]}`}
                  >
                    {u.role}
                  </span>
                  <p className="text-theme-muted text-xs mt-0.5">{u.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Jobs */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiBriefcase className="text-purple-500 w-4 h-4" /> Recent Jobs
            </h3>
            <Link
              to="/admin/jobs"
              className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-theme">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-3 px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="w-9 h-9 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiBriefcase className="text-purple-500 w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-theme-primary font-medium text-sm truncate">
                      {job.title}
                    </p>
                    {job.reported && (
                      <span className="text-xs bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded-full">
                        Reported
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-theme-muted">
                    <span>{job.company}</span>
                    <span>·</span>
                    <FiMapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                    job.status === "Active"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
