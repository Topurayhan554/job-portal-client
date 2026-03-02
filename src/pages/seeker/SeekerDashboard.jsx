import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiFileText,
  FiEye,
  FiBookmark,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiMapPin,
  FiStar,
  FiAward,
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// Fake Data
const stats = [
  {
    label: "Applied Jobs",
    value: 12,
    icon: <FiBriefcase />,
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-500/10",
    text: "text-purple-500",
  },
  {
    label: "Under Review",
    value: 5,
    icon: <FiClock />,
    color: "from-yellow-500 to-yellow-700",
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
  },
  {
    label: "Interviews",
    value: 3,
    icon: <FiCheckCircle />,
    color: "from-green-500 to-green-700",
    bg: "bg-green-500/10",
    text: "text-green-500",
  },
  {
    label: "Rejected",
    value: 2,
    icon: <FiXCircle />,
    color: "from-red-500 to-red-700",
    bg: "bg-red-500/10",
    text: "text-red-500",
  },
];

const recentApplications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    status: "Interview",
    date: "2 days ago",
    statusColor: "text-green-500 bg-green-500/10",
  },
  {
    id: 2,
    title: "React Developer",
    company: "SoftGen Ltd",
    location: "Remote",
    status: "Under Review",
    date: "5 days ago",
    statusColor: "text-yellow-500 bg-yellow-500/10",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Chittagong",
    status: "Rejected",
    date: "1 week ago",
    statusColor: "text-red-500 bg-red-500/10",
  },
  {
    id: 4,
    title: "Full Stack Engineer",
    company: "CloudBase",
    location: "Dhaka",
    status: "Applied",
    date: "1 week ago",
    statusColor: "text-blue-500 bg-blue-500/10",
  },
];

const recommendedJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "NextGen Tech",
    location: "Remote",
    salary: "৳60k-80k",
    match: 95,
    tag: "React",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "PixelCraft",
    location: "Dhaka",
    salary: "৳45k-65k",
    match: 88,
    tag: "Vue.js",
  },
  {
    id: 3,
    title: "JavaScript Developer",
    company: "DevHouse",
    location: "Remote",
    salary: "৳50k-70k",
    match: 82,
    tag: "Node.js",
  },
];

const profileTasks = [
  { label: "Upload your resume", done: true },
  { label: "Add your skills", done: true },
  { label: "Complete work experience", done: true },
  { label: "Add profile photo", done: false },
  { label: "Write a bio", done: false },
];

const profileComplete = Math.round(
  (profileTasks.filter((t) => t.done).length / profileTasks.length) * 100,
);

const SeekerDashboard = () => {
  const { user } = useAuth();

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ===== Welcome Banner ===== */}
      <motion.div
        variants={fadeUp}
        className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 blur-xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaRocket className="text-yellow-300 w-4 h-4" />
              <span className="text-blue-100 text-sm">Good morning!</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h2>
            <p className="text-blue-100 text-sm">
              You have{" "}
              <span className="text-white font-semibold">
                3 new job recommendations
              </span>{" "}
              waiting for you.
            </p>
          </div>
          <Link
            to="/jobs"
            className="flex-shrink-0 flex items-center gap-2 bg-white text-purple-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shadow-lg"
          >
            Find Jobs <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* ===== Stats ===== */}
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
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Main Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== Recent Applications ===== */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 card-theme border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiFileText className="text-purple-500 w-4 h-4" />
              Recent Applications
            </h3>
            <Link
              to="/seeker/applications"
              className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-theme">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiBriefcase className="text-purple-500 w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-theme-primary font-medium text-sm truncate">
                    {app.title}
                  </p>
                  <div className="flex items-center gap-2 text-theme-muted text-xs mt-0.5">
                    <span>{app.company}</span>
                    <span>·</span>
                    <FiMapPin className="w-3 h-3" />
                    <span>{app.location}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${app.statusColor}`}
                  >
                    {app.status}
                  </span>
                  <p className="text-theme-muted text-xs mt-1">{app.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== Right Column ===== */}
        <div className="space-y-6">
          {/* Profile Complete */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 flex items-center gap-2">
              <FiAward className="text-purple-500 w-4 h-4" />
              Profile Strength
            </h3>

            {/* Circle Progress */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - profileComplete / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-theme-primary">
                  {profileComplete}%
                </span>
              </div>
              <div>
                <p className="text-theme-primary font-medium text-sm">
                  {profileComplete < 80 ? "Almost there!" : "Looking great!"}
                </p>
                <p className="text-theme-muted text-xs mt-0.5">
                  Complete your profile to get more visibility
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {profileTasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${task.done ? "bg-green-500" : "border-2 border-gray-300 dark:border-gray-600"}`}
                  >
                    {task.done && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-xs ${task.done ? "text-theme-muted line-through" : "text-theme-secondary"}`}
                  >
                    {task.label}
                  </span>
                </div>
              ))}
            </div>

            {profileComplete < 100 && (
              <Link
                to="/seeker/profile"
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition"
              >
                Complete Profile <FiArrowRight className="w-3 h-3" />
              </Link>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-purple-500 w-4 h-4" />
              Activity
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Profile Views",
                  value: 48,
                  icon: <FiEye />,
                  color: "text-blue-500",
                },
                {
                  label: "Saved Jobs",
                  value: 7,
                  icon: <FiBookmark />,
                  color: "text-yellow-500",
                },
                {
                  label: "Job Matches",
                  value: 23,
                  icon: <FiStar />,
                  color: "text-purple-500",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`${item.color}`}>{item.icon}</span>
                    <span className="text-theme-secondary text-sm">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-theme-primary font-semibold text-sm">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Recommended Jobs ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
          <h3 className="font-semibold text-theme-primary flex items-center gap-2">
            <FiStar className="text-purple-500 w-4 h-4" />
            Recommended For You
          </h3>
          <Link
            to="/seeker/recommended"
            className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
          >
            View all <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-theme">
          {recommendedJobs.map((job) => (
            <Link
              key={job.id}
              to="/jobs"
              className="group p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center">
                  <FiBriefcase className="text-purple-500 w-4 h-4" />
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    job.match >= 90
                      ? "bg-green-500/10 text-green-500"
                      : job.match >= 80
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-500"
                  }`}
                >
                  {job.match}% Match
                </span>
              </div>

              <p className="text-theme-primary font-semibold text-sm mb-1 group-hover:text-purple-500 transition">
                {job.title}
              </p>
              <p className="text-theme-muted text-xs mb-2">{job.company}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-theme-muted text-xs">
                  <FiMapPin className="w-3 h-3" />
                  {job.location}
                </div>
                <span className="text-purple-500 font-semibold text-xs">
                  {job.salary}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SeekerDashboard;
