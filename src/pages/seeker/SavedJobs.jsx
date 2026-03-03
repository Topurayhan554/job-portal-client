import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiTrash2,
  FiArrowRight,
  FiBookmark,
} from "react-icons/fi";
import { useSavedJobs } from "../../hooks/useSeeker";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const SavedJobs = () => {
  const { savedJobs, loading, unsaveJob } = useSavedJobs();

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
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-theme-primary">Saved Jobs</h2>
          <p className="text-theme-muted text-sm mt-1">
            {savedJobs.length} saved jobs
          </p>
        </div>
      </motion.div>

      {savedJobs.length === 0 ? (
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-16 text-center"
        >
          <FiBookmark className="w-10 h-10 text-theme-muted mx-auto mb-3" />
          <p className="text-theme-secondary font-medium">No saved jobs yet</p>
          <Link
            to="/jobs"
            className="mt-3 inline-flex items-center gap-2 text-purple-500 text-sm hover:text-purple-400 transition"
          >
            Browse Jobs <FiArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {savedJobs.map((job) => (
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
                <button
                  onClick={() => unsaveJob(job._id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-theme-muted hover:text-red-500 hover:bg-red-500/10 transition"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-theme-primary font-semibold mb-1">
                {job.title}
              </h3>
              <p className="text-theme-muted text-sm mb-3">{job.company}</p>

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
                  to={`/jobs`}
                  className="flex items-center gap-1 text-sm text-theme-secondary hover:text-purple-500 transition"
                >
                  Apply Now <FiArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SavedJobs;
