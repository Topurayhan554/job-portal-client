import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiBookmark,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../services/api";

export const typeColors = {
  "Full-time": "bg-blue-500/10 text-blue-500",
  "Part-time": "bg-purple-500/10 text-purple-500",
  Remote: "bg-green-500/10 text-green-500",
  Freelance: "bg-orange-500/10 text-orange-500",
  Internship: "bg-pink-500/10 text-pink-500",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const JobCard = ({ job, view = "grid", savedIds = [], onSave, user }) => {
  const isSaved = savedIds.includes(job._id);
  const navigate = useNavigate();

  const salary =
    job.salaryMin && job.salaryMax
      ? `৳${(job.salaryMin / 1000).toFixed(0)}k–${(job.salaryMax / 1000).toFixed(0)}k`
      : job.salaryMin
        ? `৳${(job.salaryMin / 1000).toFixed(0)}k+`
        : "Negotiable";

  const handleSave = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Login to save jobs");
      navigate("/login");
      return;
    }
    if (user.role !== "seeker") {
      toast.error("Only seekers can save jobs");
      return;
    }
    onSave?.(job._id, isSaved);
  };

  /*  LIST VIEW  */
  if (view === "list") {
    return (
      <motion.div
        variants={fadeUp}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className={`card-theme border hover:border-purple-500/40 rounded-2xl p-5 transition group ${job.featured ? "border-purple-500/20" : ""}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Logo */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-2xl flex items-center justify-center overflow-hidden">
              {job.postedBy?.profilePhoto ? (
                <img
                  src={job.postedBy.profilePhoto}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <FiBriefcase className="text-purple-500 w-6 h-6" />
              )}
            </div>
            {job.featured && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <FiStar className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-theme-primary font-semibold group-hover:text-purple-500 transition">
                {job.title}
              </h3>
              {job.featured && (
                <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-theme-muted">
              <span className="font-medium text-theme-secondary">
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[job.type] || "bg-gray-500/10 text-gray-500"}`}
              >
                {job.type}
              </span>
              {job.experience && (
                <span className="text-xs bg-theme-card border border-theme text-theme-muted px-2 py-0.5 rounded-full">
                  {job.experience}
                </span>
              )}
              {(job.skills || []).slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="text-xs bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex sm:flex-col items-center sm:items-end gap-3">
            <span className="text-purple-500 font-bold text-sm">{salary}</span>
            <div className="flex items-center gap-2">
              {onSave && (
                <button
                  onClick={handleSave}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl border transition ${isSaved ? "border-purple-500/50 bg-purple-500/10 text-purple-500" : "border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50"}`}
                >
                  <FiBookmark
                    className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`}
                  />
                </button>
              )}
              <Link
                to={`/jobs/${job._id}`}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-2 rounded-xl hover:opacity-90 transition font-medium"
              >
                Apply <FiArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  /*  GRID VIEW (default)  */
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`card-theme border hover:border-purple-500/40 rounded-2xl p-5 flex flex-col transition group ${job.featured ? "border-purple-500/20" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center overflow-hidden">
            {job.postedBy?.profilePhoto ? (
              <img
                src={job.postedBy.profilePhoto}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <FiBriefcase className="text-purple-500 w-5 h-5" />
            )}
          </div>
          {job.featured && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <FiStar className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          )}
        </div>
        {onSave && (
          <button
            onClick={handleSave}
            className={`w-8 h-8 flex items-center justify-center rounded-xl border transition ${isSaved ? "border-purple-500/50 bg-purple-500/10 text-purple-500" : "border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50"}`}
          >
            <FiBookmark
              className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`}
            />
          </button>
        )}
      </div>

      <h3 className="text-theme-primary font-semibold mb-0.5 group-hover:text-purple-500 transition leading-snug">
        {job.title}
      </h3>
      <p className="text-purple-500 text-sm mb-2">
        {job.company || job.postedBy?.companyName}
      </p>
      <p className="text-theme-muted text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(job.skills || []).slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-xs bg-theme-card border border-theme text-theme-muted px-2 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
        {(job.skills || []).length > 3 && (
          <span className="text-xs text-theme-muted">
            +{job.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="flex items-center gap-1 text-theme-muted">
          <FiMapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full font-medium ${typeColors[job.type] || "bg-gray-500/10 text-gray-500"}`}
        >
          {job.type}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-theme">
        <span className="text-purple-500 font-bold text-sm">{salary}</span>
        <Link
          to={`/jobs/${job._id}`}
          className="flex items-center gap-1 text-xs text-theme-secondary hover:text-purple-500 transition font-medium"
        >
          Apply Now <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
