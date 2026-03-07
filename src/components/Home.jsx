import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaSearch,
  FaRocket,
  FaBrain,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import {
  FiUsers,
  FiTrendingUp,
  FiBookmark,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";
import api from "../services/api";

//  Animations
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const typeColors = {
  "Full-time": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Part-time": "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  Remote: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Freelance: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Internship: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

const features = [
  {
    icon: <FaBrain className="w-5 h-5" />,
    title: "AI-Powered Matching",
    desc: "Smart algorithm matches your skills with the perfect job opportunities in real time.",
    accent: "from-violet-500 to-purple-700",
    glow: "shadow-violet-500/20",
  },
  {
    icon: <FaChartLine className="w-5 h-5" />,
    title: "Real-time Tracking",
    desc: "Track your application status live — from Applied to Hired with instant notifications.",
    accent: "from-blue-500 to-cyan-600",
    glow: "shadow-blue-500/20",
  },
  {
    icon: <FaRocket className="w-5 h-5" />,
    title: "Fast Applications",
    desc: "One-click apply with your saved CV and cover letter template. No forms to fill.",
    accent: "from-rose-500 to-pink-700",
    glow: "shadow-rose-500/20",
  },
  {
    icon: <FaShieldAlt className="w-5 h-5" />,
    title: "Verified Companies",
    desc: "Every employer is verified to ensure safe, legitimate job listings on our platform.",
    accent: "from-emerald-500 to-teal-700",
    glow: "shadow-emerald-500/20",
  },
];

const categories = [
  { label: "Technology", icon: "💻", query: "Technology" },
  { label: "Design", icon: "🎨", query: "Design" },
  { label: "Marketing", icon: "📢", query: "Marketing" },
  { label: "Finance", icon: "💰", query: "Finance" },
  { label: "Management", icon: "📊", query: "Management" },
  { label: "HR", icon: "🤝", query: "HR" },
  { label: "Sales", icon: "🏆", query: "Sales" },
  { label: "Remote", icon: "🌍", query: "" },
];

//  Skeletons
const JobCardSkeleton = () => (
  <div className="card-theme border rounded-2xl p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-11 h-11 bg-theme-primary/20 rounded-xl" />
      <div className="w-16 h-5 bg-theme-primary/15 rounded-full" />
    </div>
    <div className="h-5 bg-theme-primary/25 rounded-lg w-3/4 mb-2" />
    <div className="h-4 bg-theme-primary/15 rounded-lg w-1/2 mb-4" />
    <div className="flex gap-2 mb-4">
      <div className="h-5 bg-theme-primary/15 rounded-full w-16" />
      <div className="h-5 bg-theme-primary/15 rounded-full w-20" />
    </div>
    <div className="border-t border-theme pt-4 flex justify-between">
      <div className="h-4 bg-theme-primary/20 rounded w-20" />
      <div className="h-4 bg-theme-primary/15 rounded w-14" />
    </div>
  </div>
);

const StatSkeleton = () => (
  <div className="animate-pulse text-center">
    <div className="h-9 bg-white/15 rounded-xl w-24 mx-auto mb-2" />
    <div className="h-3.5 bg-white/10 rounded w-20 mx-auto" />
  </div>
);

//  Home ─
const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [catCounts, setCatCounts] = useState({});

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/jobs?featured=true&limit=6&sort=featured");
        let jobs = res.data.jobs || [];
        if (jobs.length < 6) {
          const fill = await api.get(
            `/jobs?limit=${6 - jobs.length}&sort=newest`,
          );
          const extra = (fill.data.jobs || []).filter(
            (j) => !jobs.find((fj) => fj._id === j._id),
          );
          jobs = [...jobs, ...extra].slice(0, 6);
        }
        setFeaturedJobs(jobs);
      } catch {
        setFeaturedJobs([]);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsRes, usersRes] = await Promise.all([
          api.get("/jobs?limit=1"),
          api.get("/jobs?limit=1&type=Remote"),
        ]);
        setStats({
          totalJobs: jobsRes.data.total || 0,
          remoteJobs: usersRes.data.total || 0,
        });
        const cats = [
          "Technology",
          "Design",
          "Marketing",
          "Finance",
          "Management",
          "HR",
          "Sales",
        ];
        const counts = {};
        await Promise.all(
          cats.map(async (cat) => {
            try {
              const r = await api.get(`/jobs?category=${cat}&limit=1`);
              counts[cat] = r.data.total || 0;
            } catch {
              counts[cat] = 0;
            }
          }),
        );
        setCatCounts(counts);
      } catch {
        setStats({ totalJobs: 0, remoteJobs: 0 });
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim())
      navigate(`/jobs?search=${encodeURIComponent(search.trim())}`);
    else navigate("/jobs");
  };

  const dynamicStats = stats
    ? [
        {
          value:
            stats.totalJobs > 0 ? `${stats.totalJobs.toLocaleString()}+` : "—",
          label: "Jobs Available",
        },
        { value: "500+", label: "Companies Hiring" },
        {
          value: stats.remoteJobs > 0 ? `${stats.remoteJobs}+` : "0",
          label: "Remote Jobs",
        },
        { value: "95%", label: "Success Rate" },
      ]
    : null;

  return (
    <div className="bg-theme-primary text-theme-primary overflow-x-hidden">
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
        {/* Background mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600 opacity-[0.07] rounded-full blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600 opacity-[0.07] rounded-full blur-[120px]" />
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-violet-500 opacity-[0.04] rounded-full blur-[90px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase"
          >
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            Bangladesh's #1 Job Portal
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight mb-6 text-theme-primary"
          >
            Find Your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Dream Job
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 to-blue-500 rounded-full origin-left"
              />
            </span>{" "}
            Today
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-theme-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with top companies across Bangladesh. Get matched with the
            right opportunities and launch your dream career.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.22 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skill, or company..."
                className="input-theme w-full border rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition placeholder:text-theme-muted/50"
              />
            </div>
            <button
              type="submit"
              className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-95 transition shadow-xl shadow-purple-900/25 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-2">
                Search Jobs{" "}
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </motion.form>

          {/* Popular Tags */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.28 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            <span className="text-theme-muted text-xs self-center font-medium uppercase tracking-wider">
              Trending:
            </span>
            {[
              "React Developer",
              "UI Designer",
              "Python",
              "Remote Jobs",
              "Node.js",
              "Full-time",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  navigate(`/jobs?search=${encodeURIComponent(tag)}`)
                }
                className="text-xs text-theme-secondary hover:text-purple-400 bg-theme-card border border-theme hover:border-purple-500/40 px-3 py-1.5 rounded-full transition"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.34 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-theme-muted"
          >
            {[
              {
                icon: (
                  <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" />
                ),
                label: "Verified Employers",
              },
              {
                icon: <FiUsers className="text-blue-400 w-3.5 h-3.5" />,
                label: "50,000+ Job Seekers",
              },
              {
                icon: <FiBookmark className="text-violet-400 w-3.5 h-3.5" />,
                label: "Save Jobs Easily",
              },
              {
                icon: <FiTrendingUp className="text-amber-400 w-3.5 h-3.5" />,
                label: "Real-time Tracking",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════ */}
      <section className="py-16 border-y border-theme relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/15 via-blue-900/10 to-violet-900/15" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {statsLoading || !dynamicStats
              ? [1, 2, 3, 4].map((i) => <StatSkeleton key={i} />)
              : dynamicStats.map((stat, i) => (
                  <motion.div key={i} variants={scaleIn} className="group">
                    <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </p>
                    <p className="text-theme-muted text-xs md:text-sm font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CATEGORIES ═════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">
              Explore Opportunities
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-theme-primary mb-4 tracking-tight">
              Browse by Category
            </h2>
            <p className="text-theme-muted max-w-md mx-auto">
              Thousands of jobs across every industry, curated for you
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3.5"
          >
            {categories.map((cat, i) => {
              const count = catCounts[cat.label];
              return (
                <motion.div key={i} variants={scaleIn}>
                  <Link
                    to={
                      cat.query
                        ? `/jobs?category=${cat.query}`
                        : `/jobs?type=Remote`
                    }
                    className="group card-theme flex flex-col items-center gap-3 border hover:border-purple-500/40 rounded-2xl p-6 text-center hover:bg-purple-500/5 transition-all duration-300"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </span>
                    <p className="text-theme-primary font-semibold text-sm group-hover:text-purple-400 transition-colors">
                      {cat.label}
                    </p>
                    <p className="text-theme-muted text-xs">
                      {statsLoading ? (
                        <span className="inline-block w-10 h-3 bg-theme-primary/15 rounded animate-pulse" />
                      ) : count !== undefined ? (
                        `${count}+ jobs`
                      ) : (
                        "—"
                      )}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURED JOBS ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-theme-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">
                Top Picks
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight mb-2">
                Featured Jobs
              </h2>
              <p className="text-theme-muted">
                Hand-picked opportunities from top companies
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center gap-2 text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-500/60 px-5 py-2.5 rounded-xl transition text-sm font-medium"
            >
              View All <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {jobsLoading
              ? [1, 2, 3, 4, 5, 6].map((i) => <JobCardSkeleton key={i} />)
              : featuredJobs.map((job) => {
                  const salary =
                    job.salaryMin && job.salaryMax
                      ? `৳${(job.salaryMin / 1000).toFixed(0)}k–${(job.salaryMax / 1000).toFixed(0)}k`
                      : job.salaryMin
                        ? `৳${(job.salaryMin / 1000).toFixed(0)}k+`
                        : "Negotiable";

                  return (
                    <motion.div
                      key={job._id}
                      variants={fadeUp}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <Link
                        to={`/jobs/${job._id}`}
                        className="group card-theme block border hover:border-purple-500/40 rounded-2xl p-5 hover:bg-purple-500/[0.03] transition-all duration-300 h-full"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-11 h-11 bg-gradient-to-br from-purple-500/15 to-blue-500/15 border border-theme rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                            {job.postedBy?.profilePhoto ? (
                              <img
                                src={job.postedBy.profilePhoto}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaBriefcase className="text-purple-400 w-4 h-4" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            {job.featured && (
                              <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <FaStar className="w-2 h-2 fill-current" />{" "}
                                Featured
                              </span>
                            )}
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${typeColors[job.type] || "bg-gray-500/10 text-gray-400 border border-gray-500/20"}`}
                            >
                              {job.type}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-theme-primary font-bold text-base mb-1 group-hover:text-purple-400 transition-colors leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-purple-400 text-xs mb-3 font-semibold">
                          {job.company || job.postedBy?.companyName}
                        </p>

                        {(job.skills || []).length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {job.skills.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="text-xs bg-theme-card border border-theme text-theme-muted px-2.5 py-0.5 rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-theme-muted mb-0">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="w-3 h-3" />{" "}
                            {job.location}
                          </span>
                          {job.applicantsCount > 0 && (
                            <span className="flex items-center gap-1">
                              <FiUsers className="w-3 h-3" />{" "}
                              {job.applicantsCount} applied
                            </span>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-theme flex items-center justify-between">
                          <span className="text-purple-400 font-bold text-sm">
                            {salary}
                          </span>
                          <span className="text-xs text-theme-muted group-hover:text-purple-400 transition flex items-center gap-1 font-medium">
                            Apply Now <FiArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-8 md:hidden"
          >
            <Link
              to="/jobs"
              className="text-purple-400 hover:text-purple-300 transition text-sm font-medium"
            >
              View all jobs →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">
              Why Us
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight mb-4">
              Built for Modern Job Hunters
            </h2>
            <p className="text-theme-muted max-w-md mx-auto">
              Faster, smarter, and more transparent than any other platform.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="card-theme border hover:border-purple-500/30 rounded-2xl p-6 transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 bg-gradient-to-br ${f.accent} rounded-xl flex items-center justify-center text-white mb-5 shadow-lg ${f.glow} group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="text-theme-primary font-bold mb-2 text-sm">
                  {f.title}
                </h3>
                <p className="text-theme-muted text-xs leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-theme-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight mb-4">
              Get Hired in 3 Steps
            </h2>
            <p className="text-theme-muted">
              From signup to offer letter — we make it effortless
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                step: "01",
                title: "Create Your Profile",
                desc: "Sign up and build your professional profile with skills, experience, and upload your CV in minutes.",
                icon: <FiUsers className="w-5 h-5" />,
              },
              {
                step: "02",
                title: "Find & Apply",
                desc: "Search thousands of jobs with smart filters. Apply in one click — no repetitive form filling.",
                icon: <FaSearch className="w-5 h-5" />,
              },
              {
                step: "03",
                title: "Get Hired",
                desc: "Track your application live and get notified the moment employers respond to you.",
                icon: <FaBriefcase className="w-5 h-5" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative text-center group"
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-7 left-[62%] w-[76%] h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
                )}
                <div className="relative mx-auto w-14 h-14 mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-theme-card border border-theme rounded-full flex items-center justify-center">
                    <span className="text-[9px] font-black text-purple-400">
                      {item.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-theme-primary font-bold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-theme-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-blue-900/30 border border-purple-500/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            {/* BG effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-64 bg-purple-600 opacity-[0.15] rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600 opacity-[0.1] rounded-full blur-2xl" />
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                <FaRocket className="w-3 h-3" /> Join Thousands of Professionals
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight mb-4">
                Ready to Start?
              </h2>
              <p className="text-theme-muted mb-10 max-w-lg mx-auto leading-relaxed">
                Join job seekers who found their perfect career through
                JobPortal. Free to get started — no credit card required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="group bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-95 transition shadow-xl shadow-purple-900/30 flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/jobs"
                  className="border border-theme text-theme-secondary hover:text-theme-primary hover:border-purple-500/40 px-8 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  Browse Jobs
                </Link>
              </div>

              {/* Small trust line */}
              <p className="text-theme-muted text-xs mt-8 flex items-center justify-center gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" /> No
                  credit card
                </span>
                <span className="flex items-center gap-1">
                  <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" />{" "}
                  Free forever plan
                </span>
                <span className="flex items-center gap-1">
                  <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" />{" "}
                  Cancel anytime
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
