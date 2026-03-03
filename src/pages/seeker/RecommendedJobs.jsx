import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import { useRecommendedJobs } from "../../hooks/useSeeker";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const RecommendedJobs = () => {
  const { jobs, loading } = useRecommendedJobs();

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">
          Recommended Jobs
        </h2>
        <p className="text-theme-muted text-sm mt-1">
          Based on your skills and profile
        </p>
      </motion.div>

      {jobs.length === 0 ? (
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-16 text-center"
        >
          <FiStar className="w-10 h-10 text-theme-muted mx-auto mb-3" />
          <p className="text-theme-secondary font-medium">
            No recommendations yet
          </p>
          <p className="text-theme-muted text-sm mt-1">
            Add skills to your profile to get recommendations
          </p>
          <Link
            to="/seeker/profile"
            className="mt-3 inline-flex items-center gap-2 text-purple-500 text-sm hover:text-purple-400 transition"
          >
            Update Profile <FiArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              variants={fadeUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="card-theme border hover:border-purple-500/30 rounded-2xl p-5 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center">
                  <FiBriefcase className="text-purple-500 w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 flex items-center gap-1">
                  <FiStar className="w-3 h-3" /> Match
                </span>
              </div>

              <h3 className="text-theme-primary font-semibold mb-0.5">
                {job.title}
              </h3>
              <p className="text-purple-500 text-sm mb-2">{job.company}</p>
              <p className="text-theme-muted text-xs mb-3 leading-relaxed line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {(job.skills || []).slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="bg-purple-500/10 text-purple-500 text-xs px-2 py-0.5 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-theme-muted mb-4">
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {job.type}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-theme">
                <span className="text-purple-500 font-semibold text-sm">
                  ৳{(job.salaryMin / 1000).toFixed(0)}k - ৳
                  {(job.salaryMax / 1000).toFixed(0)}k
                </span>
                <Link
                  to="/jobs"
                  className="flex items-center gap-1 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-xl hover:opacity-90 transition"
                >
                  Apply <FiArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecommendedJobs;
