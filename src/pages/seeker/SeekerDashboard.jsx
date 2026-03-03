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
import { useSeekerStats, useRecommendedJobs } from "../../hooks/useSeeker";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const statusColor = {
  Interview: "text-green-500 bg-green-500/10",
  "Under Review": "text-yellow-500 bg-yellow-500/10",
  Rejected: "text-red-500 bg-red-500/10",
  Applied: "text-blue-500 bg-blue-500/10",
  Shortlisted: "text-purple-500 bg-purple-500/10",
  Hired: "text-emerald-500 bg-emerald-500/10",
};

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const SeekerDashboard = () => {
  const { stats, loading } = useSeekerStats();
  const { jobs: recommended, loading: jobsLoading } = useRecommendedJobs();

  if (loading) return <Spinner />;

  const { counts, user, recentApps } = stats;

  const statsCards = [
    {
      label: "Applied Jobs",
      value: counts.applied,
      icon: <FiBriefcase />,
      bg: "bg-purple-500/10",
      text: "text-purple-500",
    },
    {
      label: "Under Review",
      value: counts.underReview,
      icon: <FiClock />,
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
    },
    {
      label: "Interviews",
      value: counts.interview,
      icon: <FiCheckCircle />,
      bg: "bg-green-500/10",
      text: "text-green-500",
    },
    {
      label: "Rejected",
      value: counts.rejected,
      icon: <FiXCircle />,
      bg: "bg-red-500/10",
      text: "text-red-500",
    },
  ];

  const profileTasks = [
    { label: "Add profile photo", done: !!user.profilePhoto },
    { label: "Add your skills", done: (user.skills || []).length > 0 },
    {
      label: "Complete work experience",
      done: (user.experience || []).length > 0,
    },
    { label: "Upload your resume", done: !!user.cvUrl },
    { label: "Write a bio", done: !!user.bio },
  ];
  const profileComplete = Math.round(
    (profileTasks.filter((t) => t.done).length / profileTasks.length) * 100,
  );

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
              <span className="text-blue-100 text-sm">Good morning!</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h2>
            <p className="text-blue-100 text-sm">
              You have{" "}
              <span className="text-white font-semibold">
                {recommended.length} job recommendations
              </span>{" "}
              waiting.
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

      {/* Stats */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statsCards.map((stat, i) => (
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 card-theme border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiFileText className="text-purple-500 w-4 h-4" /> Recent
              Applications
            </h3>
            <Link
              to="/seeker/applications"
              className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentApps.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FiBriefcase className="w-8 h-8 text-theme-muted mx-auto mb-2" />
              <p className="text-theme-muted text-sm">No applications yet</p>
              <Link
                to="/jobs"
                className="text-purple-500 text-sm mt-2 inline-block hover:text-purple-400"
              >
                Browse Jobs →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-theme">
              {recentApps.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBriefcase className="text-purple-500 w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-theme-primary font-medium text-sm truncate">
                      {app.job?.title}
                    </p>
                    <div className="flex items-center gap-2 text-theme-muted text-xs mt-0.5">
                      <span>{app.job?.company}</span>
                      <span>·</span>
                      <FiMapPin className="w-3 h-3" />
                      <span>{app.job?.location}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[app.status] || "bg-gray-500/10 text-gray-500"}`}
                    >
                      {app.status}
                    </span>
                    <p className="text-theme-muted text-xs mt-1">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Profile Strength */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 flex items-center gap-2">
              <FiAward className="text-purple-500 w-4 h-4" /> Profile Strength
            </h3>
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
                    stroke="url(#grad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - profileComplete / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
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
                  {profileComplete < 60
                    ? "Needs work!"
                    : profileComplete < 90
                      ? "Almost there!"
                      : "Looking great!"}
                </p>
                <p className="text-theme-muted text-xs mt-0.5">
                  Complete to get more visibility
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
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                Complete Profile <FiArrowRight className="w-3 h-3" />
              </Link>
            )}
          </motion.div>

          {/* Activity */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-purple-500 w-4 h-4" /> Activity
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Saved Jobs",
                  value: counts.savedJobs,
                  icon: <FiBookmark />,
                  color: "text-yellow-500",
                },
                {
                  label: "Shortlisted",
                  value: counts.shortlisted,
                  icon: <FiStar />,
                  color: "text-purple-500",
                },
                {
                  label: "Total Applied",
                  value: counts.applied,
                  icon: <FiEye />,
                  color: "text-blue-500",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={item.color}>{item.icon}</span>
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

      {/* Recommended Jobs */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
          <h3 className="font-semibold text-theme-primary flex items-center gap-2">
            <FiStar className="text-purple-500 w-4 h-4" /> Recommended For You
          </h3>
          <Link
            to="/seeker/recommended"
            className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
          >
            View all <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {jobsLoading ? (
          <div className="p-8 text-center">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-theme">
            {recommended.slice(0, 3).map((job) => (
              <Link
                key={job._id}
                to={`/jobs`}
                className="group p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center">
                    <FiBriefcase className="text-purple-500 w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">
                    New
                  </span>
                </div>
                <p className="text-theme-primary font-semibold text-sm mb-1 group-hover:text-purple-500 transition">
                  {job.title}
                </p>
                <p className="text-theme-muted text-xs mb-2">{job.company}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-theme-muted text-xs">
                    <FiMapPin className="w-3 h-3" /> {job.location}
                  </div>
                  <span className="text-purple-500 font-semibold text-xs">
                    ৳{(job.salaryMin / 1000).toFixed(0)}k-
                    {(job.salaryMax / 1000).toFixed(0)}k
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SeekerDashboard;
