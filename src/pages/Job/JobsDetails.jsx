import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiArrowLeft,
  FiBookmark,
  FiShare2,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiX,
  FiExternalLink,
  FiGlobe,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import { FaRocket, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const typeColors = {
  "Full-time": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Part-time": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Remote: "bg-green-500/10 text-green-500 border-green-500/20",
  Freelance: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Internship: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

// Skeleton
const Skeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="card-theme border rounded-2xl p-8">
      <div className="flex items-start gap-6 mb-6">
        <div className="w-20 h-20 bg-theme-primary/30 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-theme-primary/30 rounded-lg w-3/4" />
          <div className="h-4 bg-theme-primary/20 rounded-lg w-1/2" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-20 bg-theme-primary/20 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-12 bg-theme-primary/20 rounded-xl" />
    </div>
    <div className="card-theme border rounded-2xl p-8 space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-4 bg-theme-primary/20 rounded-lg"
          style={{ width: `${70 + i * 7}%` }}
        />
      ))}
    </div>
  </div>
);

// Apply Modal
const ApplyModal = ({ job, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [coverLetter, setCoverLetter] = useState("");
  const [useCv, setUseCv] = useState(!!user?.cvUrl);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.post("/applications", {
        jobId: job._id,
        coverLetter,
        cvUrl: useCv ? user.cvUrl : "",
      });
      toast.success("Application submitted! 🎉");
      onSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "Application failed";
      if (msg === "Already applied to this job") {
        toast.error("You've already applied to this job");
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-theme-card border border-theme rounded-2xl w-full max-w-lg shadow-2xl z-10 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                <FaRocket className="w-3 h-3" /> Applying for
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">
                {job.title}
              </h3>
              <p className="text-blue-100 text-sm">{job.company}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition mt-1"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* CV Section */}
          <div>
            <label className="block text-sm font-semibold text-theme-primary mb-3">
              Your CV / Resume
            </label>
            {user?.cvUrl ? (
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <FiCheckCircle className="text-green-500 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-theme-primary">
                      CV uploaded
                    </p>
                    <p className="text-xs text-theme-muted">
                      From your profile
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setUseCv(!useCv)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                    useCv
                      ? "bg-green-500 text-white"
                      : "border border-theme text-theme-muted hover:text-theme-primary"
                  }`}
                >
                  {useCv ? "✓ Attached" : "Attach"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <FiAlertCircle className="text-yellow-500 w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-theme-secondary">
                    No CV uploaded yet
                  </p>
                  <Link
                    to="/seeker/cv-manager"
                    onClick={onClose}
                    className="text-xs text-purple-500 hover:text-purple-400 transition"
                  >
                    Upload CV →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-theme-primary mb-2">
              Cover Letter{" "}
              <span className="text-theme-muted font-normal">(optional)</span>
            </label>
            <textarea
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder={`Dear Hiring Manager,\n\nI am excited to apply for the ${job.title} position at ${job.company}...`}
              className="input-theme w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition leading-relaxed"
            />
            <p className="text-xs text-theme-muted mt-1 text-right">
              {coverLetter.length}/1000
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Location",
                value: job.location,
                icon: <FiMapPin className="w-3.5 h-3.5" />,
              },
              {
                label: "Type",
                value: job.type,
                icon: <FiBriefcase className="w-3.5 h-3.5" />,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 p-2.5 bg-theme-primary/30 rounded-xl border border-theme"
              >
                <span className="text-purple-500">{item.icon}</span>
                <div>
                  <p className="text-xs text-theme-muted">{item.label}</p>
                  <p className="text-xs font-medium text-theme-primary">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-purple-900/20"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);

  // Fetch job
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.job);

        // Check if already applied
        if (user?.role === "seeker") {
          try {
            const appRes = await api.get("/applications/my");
            const already = appRes.data.applications.some(
              (a) => a.job?._id === id || a.job?._id?.toString() === id,
            );
            setApplied(already);
          } catch {}
        }

        // Check if saved
        if (user?.savedJobs) {
          setSaved(user.savedJobs.map((s) => s.toString()).includes(id));
        }

        // Fetch similar jobs
        const cat = res.data.job.category;
        const simRes = await api.get(`/jobs?category=${cat}&limit=3`);
        setSimilarJobs(
          simRes.data.jobs.filter((j) => j._id !== id).slice(0, 3),
        );
      } catch (err) {
        if (err.response?.status === 404) setNotFound(true);
        else toast.error("Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, user]);

  // Save/Unsave
  const handleSave = async () => {
    if (!user) {
      toast.error("Login to save jobs");
      navigate("/login");
      return;
    }
    if (user.role !== "seeker") {
      toast.error("Only seekers can save jobs");
      return;
    }
    setSaving(true);
    try {
      const current = user?.savedJobs?.map((s) => s.toString()) || [];
      const updated = saved
        ? current.filter((s) => s !== id)
        : [...current, id];
      await api.put("/users/me", { savedJobs: updated });
      setSaved(!saved);
      toast.success(saved ? "Removed from saved" : "Job saved! ✅");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied! 📋");
  };

  const handleApplyClick = () => {
    if (!user) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    if (user.role !== "seeker") {
      toast.error("Only job seekers can apply");
      return;
    }
    if (applied) {
      toast("You've already applied!", { icon: "ℹ️" });
      return;
    }
    setShowApply(true);
  };

  const salary =
    job?.salaryMin && job?.salaryMax
      ? `৳${(job.salaryMin / 1000).toFixed(0)}k – ৳${(job.salaryMax / 1000).toFixed(0)}k/month`
      : job?.salaryMin
        ? `৳${(job.salaryMin / 1000).toFixed(0)}k+/month`
        : "Negotiable";

  const deadline = job?.deadline
    ? new Date(job.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const isExpired = job?.deadline && new Date(job.deadline) < new Date();

  // Not Found
  if (notFound)
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-theme-primary mb-2">
            Job Not Found
          </h2>
          <p className="text-theme-muted mb-6">
            This job may have been removed or expired.
          </p>
          <Link
            to="/jobs"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    );

  return (
    <div className="bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-theme-muted hover:text-theme-primary text-sm mb-6 transition group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </button>
        </motion.div>

        {loading ? (
          <Skeleton />
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left — Main Content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Job Header Card */}
              <motion.div
                variants={fadeUp}
                className="card-theme border rounded-2xl overflow-hidden"
              >
                {/* Top gradient accent */}
                <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600" />

                <div className="p-8">
                  {/* Company + Title */}
                  <div className="flex flex-col sm:flex-row gap-5 mb-6">
                    <div className="w-20 h-20 rounded-2xl border border-theme bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {job?.postedBy?.profilePhoto ? (
                        <img
                          src={job.postedBy.profilePhoto}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiBriefcase className="text-purple-500 w-8 h-8" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start gap-2 mb-2">
                        <h1 className="text-2xl font-bold text-theme-primary leading-tight">
                          {job?.title}
                        </h1>
                        {job?.featured && (
                          <span className="flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2.5 py-1 rounded-full font-semibold">
                            <FaStar className="w-2.5 h-2.5 fill-current" />{" "}
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-theme-secondary">
                        <span className="font-semibold text-purple-500">
                          {job?.company}
                        </span>
                        {job?.postedBy?.companyWebsite && (
                          <a
                            href={job.postedBy.companyWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-theme-muted hover:text-purple-500 transition text-xs"
                          >
                            <FiGlobe className="w-3 h-3" /> Website
                            <FiExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tags Row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl border font-medium ${typeColors[job?.type] || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
                    >
                      <FiBriefcase className="w-3.5 h-3.5" /> {job?.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl border border-theme text-theme-secondary">
                      <FiMapPin className="w-3.5 h-3.5 text-purple-500" />{" "}
                      {job?.location}
                    </span>
                    {job?.experience && (
                      <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl border border-theme text-theme-secondary">
                        <FiAward className="w-3.5 h-3.5 text-blue-500" />{" "}
                        {job?.experience}
                      </span>
                    )}
                    {job?.category && (
                      <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500">
                        <FiTrendingUp className="w-3.5 h-3.5" /> {job?.category}
                      </span>
                    )}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 bg-theme-primary/30 rounded-2xl border border-theme">
                    {[
                      {
                        icon: (
                          <FiDollarSign className="w-4 h-4 text-green-500" />
                        ),
                        label: "Salary",
                        value: salary,
                      },
                      {
                        icon: <FiUsers className="w-4 h-4 text-blue-500" />,
                        label: "Applicants",
                        value: `${job?.applicantsCount || 0} applied`,
                      },
                      {
                        icon: <FiClock className="w-4 h-4 text-yellow-500" />,
                        label: "Posted",
                        value: new Date(job?.createdAt).toLocaleDateString(),
                      },
                      {
                        icon: <FiCalendar className="w-4 h-4 text-red-500" />,
                        label: "Deadline",
                        value: deadline || "Open",
                      },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          {stat.icon}
                        </div>
                        <p className="text-theme-muted text-xs mb-0.5">
                          {stat.label}
                        </p>
                        <p
                          className={`text-xs font-semibold ${stat.label === "Deadline" && isExpired ? "text-red-500" : "text-theme-primary"}`}
                        >
                          {stat.label === "Deadline" && isExpired
                            ? "Expired"
                            : stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleApplyClick}
                      disabled={applied || isExpired}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition shadow-lg ${
                        applied
                          ? "bg-green-500/10 text-green-500 border border-green-500/30 cursor-default"
                          : isExpired
                            ? "bg-red-500/10 text-red-500 border border-red-500/30 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 shadow-purple-900/20"
                      }`}
                    >
                      {applied ? (
                        <>
                          <FiCheckCircle className="w-4 h-4" /> Applied
                        </>
                      ) : isExpired ? (
                        <>
                          <FiAlertCircle className="w-4 h-4" /> Deadline Passed
                        </>
                      ) : (
                        <>
                          <FiSend className="w-4 h-4" /> Apply Now
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-medium transition ${
                        saved
                          ? "border-purple-500/50 bg-purple-500/10 text-purple-500"
                          : "border-theme text-theme-secondary hover:text-purple-500 hover:border-purple-500/50"
                      }`}
                    >
                      <FiBookmark
                        className={`w-4 h-4 ${saved ? "fill-current" : ""}`}
                      />
                      {saved ? "Saved" : "Save"}
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary text-sm font-medium transition"
                    >
                      <FiShare2 className="w-4 h-4" /> Share
                    </button>
                  </div>

                  {/* Already applied banner */}
                  {applied && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-3 p-3.5 bg-green-500/10 border border-green-500/20 rounded-xl"
                    >
                      <FiCheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-green-500 font-medium text-sm">
                          Application Submitted!
                        </p>
                        <p className="text-theme-muted text-xs mt-0.5">
                          Track your status in{" "}
                          <Link
                            to="/seeker/applications"
                            className="text-purple-500 hover:text-purple-400 transition"
                          >
                            My Applications →
                          </Link>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={fadeUp}
                className="card-theme border rounded-2xl p-8"
              >
                <h2 className="text-lg font-bold text-theme-primary mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                  Job Description
                </h2>
                <div className="text-theme-secondary text-sm leading-relaxed whitespace-pre-line">
                  {job?.description}
                </div>
              </motion.div>

              {/* Requirements */}
              {job?.requirements && (
                <motion.div
                  variants={fadeUp}
                  className="card-theme border rounded-2xl p-8"
                >
                  <h2 className="text-lg font-bold text-theme-primary mb-5 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                    Requirements
                  </h2>
                  <div className="text-theme-secondary text-sm leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </div>
                </motion.div>
              )}

              {/* Benefits */}
              {job?.benefits && (
                <motion.div
                  variants={fadeUp}
                  className="card-theme border rounded-2xl p-8"
                >
                  <h2 className="text-lg font-bold text-theme-primary mb-5 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                    What We Offer
                  </h2>
                  <div className="text-theme-secondary text-sm leading-relaxed whitespace-pre-line">
                    {job.benefits}
                  </div>
                </motion.div>
              )}

              {/* Skills */}
              {(job?.skills || []).length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="card-theme border rounded-2xl p-8"
                >
                  <h2 className="text-lg font-bold text-theme-primary mb-5 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full" />
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-purple-500/10 text-purple-500 border border-purple-500/20 text-sm px-4 py-2 rounded-xl font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Company Card */}
              <motion.div
                variants={fadeUp}
                className="card-theme border rounded-2xl overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-purple-600 to-blue-600" />
                <div className="p-6">
                  <h3 className="font-semibold text-theme-primary mb-4">
                    About Company
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl border border-theme bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {job?.postedBy?.profilePhoto ? (
                        <img
                          src={job.postedBy.profilePhoto}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-purple-500 text-xl font-bold">
                          {job?.company?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-theme-primary">
                        {job?.company}
                      </p>
                      {job?.postedBy?.companySize && (
                        <p className="text-theme-muted text-xs flex items-center gap-1 mt-0.5">
                          <FiUsers className="w-3 h-3" />{" "}
                          {job.postedBy.companySize} employees
                        </p>
                      )}
                    </div>
                  </div>

                  {job?.postedBy?.companyBio && (
                    <p className="text-theme-muted text-xs leading-relaxed mb-4 line-clamp-4">
                      {job.postedBy.companyBio}
                    </p>
                  )}

                  <div className="space-y-2.5 text-sm">
                    {job?.location && (
                      <div className="flex items-center gap-2 text-theme-secondary">
                        <FiMapPin className="w-4 h-4 text-theme-muted flex-shrink-0" />{" "}
                        {job.location}
                      </div>
                    )}
                    {job?.postedBy?.companyWebsite && (
                      <a
                        href={job.postedBy.companyWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition text-sm"
                      >
                        <FiGlobe className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">
                          {job.postedBy.companyWebsite}
                        </span>
                        <FiExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Job Summary Card */}
              <motion.div
                variants={fadeUp}
                className="card-theme border rounded-2xl p-6"
              >
                <h3 className="font-semibold text-theme-primary mb-4">
                  Job Summary
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <FiDollarSign className="w-4 h-4 text-green-500" />,
                      label: "Salary",
                      value: salary,
                    },
                    {
                      icon: <FiBriefcase className="w-4 h-4 text-blue-500" />,
                      label: "Job Type",
                      value: job?.type,
                    },
                    {
                      icon: <FiMapPin className="w-4 h-4 text-purple-500" />,
                      label: "Location",
                      value: job?.location,
                    },
                    {
                      icon: <FiAward className="w-4 h-4 text-orange-500" />,
                      label: "Experience",
                      value: job?.experience || "Not specified",
                    },
                    {
                      icon: <FiUsers className="w-4 h-4 text-pink-500" />,
                      label: "Applicants",
                      value: `${job?.applicantsCount || 0} people applied`,
                    },
                    {
                      icon: <FiCalendar className="w-4 h-4 text-red-500" />,
                      label: "Deadline",
                      value: deadline || "Open",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-theme-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-theme-muted text-xs">{item.label}</p>
                        <p
                          className={`text-sm font-medium mt-0.5 ${item.label === "Deadline" && isExpired ? "text-red-500" : "text-theme-primary"}`}
                        >
                          {item.label === "Deadline" && isExpired
                            ? `${item.value} (Expired)`
                            : item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Apply CTA (sticky feel) */}
              <motion.div
                variants={fadeUp}
                className="card-theme border border-purple-500/20 rounded-2xl p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5"
              >
                <p className="text-theme-secondary text-sm text-center mb-4 font-medium">
                  {applied ? "You've applied for this job" : "Ready to apply?"}
                </p>
                <button
                  onClick={handleApplyClick}
                  disabled={applied || isExpired}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition ${
                    applied
                      ? "bg-green-500/10 text-green-500 border border-green-500/30 cursor-default"
                      : isExpired
                        ? "bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 shadow-lg shadow-purple-900/20"
                  }`}
                >
                  {applied
                    ? "✓ Applied"
                    : isExpired
                      ? "Deadline Passed"
                      : "Apply Now →"}
                </button>
              </motion.div>

              {/* Similar Jobs */}
              {similarJobs.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="card-theme border rounded-2xl overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-theme flex items-center justify-between">
                    <h3 className="font-semibold text-theme-primary text-sm">
                      Similar Jobs
                    </h3>
                    <Link
                      to="/jobs"
                      className="text-purple-500 text-xs hover:text-purple-400 transition"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="divide-y divide-theme">
                    {similarJobs.map((sj) => (
                      <Link
                        key={sj._id}
                        to={`/jobs/${sj._id}`}
                        className="flex items-start gap-3 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center flex-shrink-0">
                          <FiBriefcase className="text-purple-500 w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-theme-primary font-medium text-sm truncate group-hover:text-purple-500 transition">
                            {sj.title}
                          </p>
                          <p className="text-theme-muted text-xs truncate">
                            {sj.company}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-purple-500 font-semibold text-xs">
                              ৳{(sj.salaryMin / 1000).toFixed(0)}k–
                              {(sj.salaryMax / 1000).toFixed(0)}k
                            </span>
                            <span className="text-theme-muted text-xs">·</span>
                            <span className="text-theme-muted text-xs">
                              {sj.location}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApply && job && (
          <ApplyModal
            job={job}
            onClose={() => setShowApply(false)}
            onSuccess={() => setApplied(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobDetails;
