import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiPlusCircle,
  FiEye,
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { useApplicants } from "../../hooks/useEmployer";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const statusColor = {
  Interview: "text-green-500 bg-green-500/10",
  "Under Review": "text-yellow-500 bg-yellow-500/10",
  Rejected: "text-red-500 bg-red-500/10",
  Applied: "text-blue-500 bg-blue-500/10",
  Shortlisted: "text-purple-500 bg-purple-500/10",
  Hired: "text-emerald-500 bg-emerald-500/10",
};

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
];

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const EmployerDashboard = () => {
  const { fetchStats } = useApplicants();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats().then((s) => {
      setStats(s);
      setLoading(false);
    });
  }, [fetchStats]);

  if (loading) return <Spinner />;

  const statCards = [
    {
      label: "Total Jobs",
      value: stats?.totalJobs || 0,
      icon: <FiBriefcase />,
      bg: "bg-purple-500/10",
      text: "text-purple-500",
    },
    {
      label: "Active Jobs",
      value: stats?.activeJobs || 0,
      icon: <FiTrendingUp />,
      bg: "bg-green-500/10",
      text: "text-green-500",
    },
    {
      label: "Total Applicants",
      value: stats?.totalApplicants || 0,
      icon: <FiUsers />,
      bg: "bg-blue-500/10",
      text: "text-blue-500",
    },
    {
      label: "Hired",
      value: stats?.hired || 0,
      icon: <FiAward />,
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
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
        className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaRocket className="text-yellow-300 w-4 h-4" />
              <span className="text-blue-100 text-sm">Employer Panel</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome, {user?.name?.split(" ")[0]} 👋
            </h2>
            <p className="text-blue-100 text-sm">
              <span className="text-white font-semibold">
                {stats?.totalApplicants || 0} applicants
              </span>{" "}
              are waiting for your review.
            </p>
          </div>
          <Link
            to="/employer/post-job"
            className="flex-shrink-0 flex items-center gap-2 bg-white text-purple-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shadow-lg"
          >
            <FiPlusCircle className="w-4 h-4" /> Post a Job
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applicants */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 card-theme border rounded-2xl overflow-hidden"
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

          {(stats?.recentApps || []).length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FiUsers className="w-8 h-8 text-theme-muted mx-auto mb-2" />
              <p className="text-theme-muted text-sm">No applicants yet</p>
            </div>
          ) : (
            <div className="divide-y divide-theme">
              {stats.recentApps.map((app, i) => (
                <div
                  key={app._id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  {app.applicant?.profilePhoto || app.applicant?.photoURL ? (
                    <img
                      src={app.applicant.profilePhoto || app.applicant.photoURL}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${avatarColors[i % 4]} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-sm font-bold">
                        {app.applicant?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-theme-primary font-semibold text-sm truncate">
                      {app.applicant?.name}
                    </p>
                    <p className="text-theme-muted text-xs truncate">
                      Applied for:{" "}
                      <span className="text-theme-secondary">
                        {app.job?.title}
                      </span>
                    </p>
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

        {/* Right Column */}
        <div className="space-y-5">
          {/* Pipeline */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-purple-500 w-4 h-4" /> Hiring
              Pipeline
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Applied",
                  value: stats?.totalApplicants || 0,
                  color: "bg-blue-500",
                },
                {
                  label: "Shortlisted",
                  value: stats?.shortlisted || 0,
                  color: "bg-purple-500",
                },
                {
                  label: "Interviewed",
                  value: stats?.interviewed || 0,
                  color: "bg-yellow-500",
                },
                {
                  label: "Hired",
                  value: stats?.hired || 0,
                  color: "bg-green-500",
                },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-theme-secondary">{item.label}</span>
                    <span className="text-theme-primary font-semibold">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-theme-primary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: stats?.totalApplicants
                          ? `${(item.value / stats.totalApplicants) * 100}%`
                          : "0%",
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Jobs */}
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <h3 className="font-semibold text-theme-primary mb-4 flex items-center gap-2">
              <FiBriefcase className="text-purple-500 w-4 h-4" /> My Jobs
            </h3>
            {(stats?.recentJobs || []).length === 0 ? (
              <p className="text-theme-muted text-sm text-center py-4">
                No jobs posted yet
              </p>
            ) : (
              <div className="space-y-3">
                {stats.recentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex items-start gap-3 p-3 bg-theme-primary/30 rounded-xl border border-theme hover:border-purple-500/20 transition"
                  >
                    <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiBriefcase className="text-purple-500 w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-theme-primary font-medium text-xs truncate">
                        {job.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-0.5 text-theme-muted text-xs">
                          <FiMapPin className="w-2.5 h-2.5" />
                          {job.location}
                        </span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                            job.status === "Active"
                              ? "text-green-500 bg-green-500/10"
                              : job.status === "Paused"
                                ? "text-yellow-500 bg-yellow-500/10"
                                : "text-red-500 bg-red-500/10"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-theme-muted flex-shrink-0">
                      <FiEye className="w-3 h-3" />
                      {job.applicantsCount || 0}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/employer/jobs"
              className="mt-3 flex items-center justify-center gap-1 text-purple-500 text-xs hover:text-purple-400 transition"
            >
              View all jobs <FiArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployerDashboard;
