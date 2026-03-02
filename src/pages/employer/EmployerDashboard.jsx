import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiUsers,
  FiEye,
  FiTrendingUp,
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiPlus,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
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
    label: "Active Jobs",
    value: 8,
    icon: <FiBriefcase />,
    bg: "bg-purple-500/10",
    text: "text-purple-500",
  },
  {
    label: "Total Applicants",
    value: 142,
    icon: <FiUsers />,
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  },
  {
    label: "Profile Views",
    value: 1240,
    icon: <FiEye />,
    bg: "bg-green-500/10",
    text: "text-green-500",
  },
  {
    label: "Hired This Month",
    value: 5,
    icon: <FiTrendingUp />,
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
  },
];

const recentJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Dhaka",
    type: "Full-time",
    applicants: 24,
    status: "Active",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    location: "Remote",
    type: "Part-time",
    applicants: 18,
    status: "Active",
    posted: "5 days ago",
  },
  {
    id: 3,
    title: "Backend Engineer",
    location: "Chittagong",
    type: "Full-time",
    applicants: 31,
    status: "Paused",
    posted: "1 week ago",
  },
  {
    id: 4,
    title: "Product Manager",
    location: "Dhaka",
    type: "Full-time",
    applicants: 12,
    status: "Closed",
    posted: "2 weeks ago",
  },
];

const recentApplicants = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Frontend Developer",
    match: 92,
    status: "Shortlisted",
    avatar: "R",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Sadia Islam",
    role: "UI/UX Designer",
    match: 88,
    status: "Under Review",
    avatar: "S",
    time: "5 hours ago",
  },
  {
    id: 3,
    name: "Karim Hossain",
    role: "Backend Engineer",
    match: 75,
    status: "Applied",
    avatar: "K",
    time: "1 day ago",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Frontend Developer",
    match: 85,
    status: "Interview",
    avatar: "N",
    time: "2 days ago",
  },
];

const statusConfig = {
  Active: "bg-green-500/10 text-green-500",
  Paused: "bg-yellow-500/10 text-yellow-500",
  Closed: "bg-red-500/10 text-red-500",
  Shortlisted: "bg-purple-500/10 text-purple-500",
  "Under Review": "bg-yellow-500/10 text-yellow-500",
  Applied: "bg-blue-500/10 text-blue-500",
  Interview: "bg-green-500/10 text-green-500",
};

const EmployerDashboard = () => {
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
              <span className="text-blue-100 text-sm">Employer Dashboard</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h2>
            <p className="text-blue-100 text-sm">
              You have{" "}
              <span className="text-white font-semibold">
                12 new applicants
              </span>{" "}
              since your last visit.
            </p>
          </div>
          <Link
            to="/employer/post-job"
            className="flex-shrink-0 flex items-center gap-2 bg-white text-purple-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shadow-lg"
          >
            <FiPlus className="w-4 h-4" /> Post a Job
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
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiBriefcase className="text-purple-500 w-4 h-4" /> Active Jobs
            </h3>
            <Link
              to="/employer/jobs"
              className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-theme">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiBriefcase className="text-purple-500 w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-theme-primary font-medium text-sm">
                    {job.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-theme-muted mt-0.5">
                    <FiMapPin className="w-3 h-3" />
                    {job.location}
                    <span>·</span>
                    <FiClock className="w-3 h-3" />
                    {job.type}
                    <span>·</span>
                    <FiUsers className="w-3 h-3" />
                    {job.applicants} applicants
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${statusConfig[job.status]}`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applicants */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiUsers className="text-purple-500 w-4 h-4" /> Recent Applicants
            </h3>
            <Link
              to="/employer/applicants"
              className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-theme">
            {recentApplicants.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {app.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-theme-primary font-medium text-sm">
                    {app.name}
                  </p>
                  <p className="text-theme-muted text-xs mt-0.5">
                    {app.role} · {app.time}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[app.status]}`}
                  >
                    {app.status}
                  </span>
                  <p className="text-xs text-theme-muted mt-1">
                    {app.match}% match
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {
            label: "Post New Job",
            desc: "Create a new job listing",
            icon: <FiPlus />,
            to: "/employer/post-job",
            color: "from-purple-600 to-blue-600",
          },
          {
            label: "View Applicants",
            desc: "Review all applications",
            icon: <FiUsers />,
            to: "/employer/applicants",
            color: "from-blue-600 to-cyan-600",
          },
          {
            label: "Manage Jobs",
            desc: "Edit or close listings",
            icon: <FiBriefcase />,
            to: "/employer/jobs",
            color: "from-green-600 to-teal-600",
          },
        ].map((action, i) => (
          <Link
            key={i}
            to={action.to}
            className="group card-theme border hover:border-purple-500/30 rounded-2xl p-5 flex items-center gap-4 transition hover:bg-purple-500/5"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
            >
              {action.icon}
            </div>
            <div>
              <p className="text-theme-primary font-semibold text-sm">
                {action.label}
              </p>
              <p className="text-theme-muted text-xs mt-0.5">{action.desc}</p>
            </div>
            <FiArrowRight className="w-4 h-4 text-theme-muted ml-auto group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EmployerDashboard;
