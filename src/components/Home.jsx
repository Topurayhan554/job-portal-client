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
  FaClock,
  FaStar,
} from "react-icons/fa";
import {
  FiUsers,
  FiTrendingUp,
  FiBookmark,
  FiCheckCircle,
} from "react-icons/fi";
import api from "../services/api";

//Animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const typeColors = {
  "Full-time": "bg-blue-500/10 text-blue-500",
  "Part-time": "bg-purple-500/10 text-purple-500",
  Remote: "bg-green-500/10 text-green-500",
  Freelance: "bg-orange-500/10 text-orange-500",
  Internship: "bg-pink-500/10 text-pink-500",
};

const features = [
  {
    icon: <FaBrain className="w-6 h-6" />,
    title: "AI-Powered Matching",
    desc: "Smart algorithm matches your skills with the perfect job opportunities.",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: <FaChartLine className="w-6 h-6" />,
    title: "Real-time Tracking",
    desc: "Track your application status live — from Applied to Hired.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <FaRocket className="w-6 h-6" />,
    title: "Fast Applications",
    desc: "One-click apply with your saved CV and cover letter template.",
    color: "from-pink-500 to-pink-700",
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Verified Companies",
    desc: "Every employer is verified to ensure safe, legitimate job listings.",
    color: "from-green-500 to-green-700",
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

//Skeleton
const JobCardSkeleton = () => (
  <div className="card-theme border rounded-2xl p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-theme-primary/30 rounded-xl" />
      <div className="w-16 h-6 bg-theme-primary/20 rounded-full" />
    </div>
    <div className="h-5 bg-theme-primary/30 rounded w-3/4 mb-2" />
    <div className="h-4 bg-theme-primary/20 rounded w-1/2 mb-4" />
    <div className="flex gap-3 mb-4">
      <div className="h-3 bg-theme-primary/20 rounded w-20" />
      <div className="h-3 bg-theme-primary/20 rounded w-16" />
    </div>
    <div className="border-t border-theme pt-4 flex justify-between">
      <div className="h-4 bg-theme-primary/20 rounded w-24" />
      <div className="h-4 bg-theme-primary/20 rounded w-16" />
    </div>
  </div>
);

const StatSkeleton = () => (
  <div className="animate-pulse text-center">
    <div className="h-10 bg-white/20 rounded-lg w-28 mx-auto mb-2" />
    <div className="h-4 bg-white/10 rounded w-20 mx-auto" />
  </div>
);

//Home Component
const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // API data
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [catCounts, setCatCounts] = useState({});

  // Fetch featured jobs
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/jobs?featured=true&limit=6&sort=featured");
        let jobs = res.data.jobs || [];
        // If not enough featured, fill with newest
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

  // Fetch stats
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

        // Fetch per-category counts
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
      {/*HERO*/}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-700 opacity-10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700 opacity-10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-500 text-sm px-4 py-2 rounded-full mb-6"
          >
            <FaRocket className="w-3 h-3" />
            Bangladesh's #1 Job Portal
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-theme-primary"
          >
            Find Your{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Dream Job
            </span>{" "}
            Today
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-theme-muted text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with top companies across Bangladesh. Get matched with the
            right opportunities and land your dream career.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10"
          >
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skill, or company..."
                className="input-theme w-full border rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Search Jobs <FaArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          {/* Popular Tags */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            <span className="text-theme-muted text-sm self-center">
              Popular:
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
                className="text-sm text-theme-secondary hover:text-purple-500 border border-theme hover:border-purple-500/50 px-3 py-1 rounded-full transition"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Quick trust signals */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-theme-muted"
          >
            {[
              {
                icon: <FiCheckCircle className="text-green-500 w-4 h-4" />,
                label: "Verified Employers",
              },
              {
                icon: <FiUsers className="text-blue-500 w-4 h-4" />,
                label: "50,000+ Job Seekers",
              },
              {
                icon: <FiBookmark className="text-purple-500 w-4 h-4" />,
                label: "Save Jobs Easily",
              },
              {
                icon: <FiTrendingUp className="text-orange-500 w-4 h-4" />,
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

      {/*STATS*/}
      <section className="py-16 border-y border-theme bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-purple-900/30">
        <div className="max-w-5xl mx-auto px-6">
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
                  <motion.div key={i} variants={scaleIn}>
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-theme-muted text-sm mt-2">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/*CATEGORIES*/}
      <section className="py-20 px-6 bg-theme-primary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-theme-primary mb-4">
              Browse by Category
            </h2>
            <p className="text-theme-muted">
              Explore thousands of jobs across different industries
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
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
                    className="group card-theme flex flex-col items-center gap-3 border hover:border-purple-500/50 rounded-2xl p-6 text-center hover:bg-purple-500/5 transition"
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <p className="text-theme-primary font-semibold group-hover:text-purple-500 transition">
                      {cat.label}
                    </p>
                    <p className="text-theme-muted text-xs">
                      {statsLoading ? (
                        <span className="inline-block w-12 h-3 bg-theme-primary/20 rounded animate-pulse" />
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

      {/*FEATURED JOBS*/}
      <section className="py-20 px-6 bg-theme-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-theme-primary mb-2">
                Featured Jobs
              </h2>
              <p className="text-theme-muted">
                Hand-picked opportunities from top companies
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center gap-2 text-purple-500 hover:text-purple-400 border border-purple-500/30 hover:border-purple-500 px-4 py-2 rounded-xl transition text-sm"
            >
              View All <FaArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {jobsLoading
              ? [1, 2, 3, 4, 5, 6].map((i) => <JobCardSkeleton key={i} />)
              : featuredJobs.map((job, i) => {
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
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Link
                        to={`/jobs/${job._id}`}
                        className="group card-theme block border hover:border-purple-500/40 rounded-2xl p-6 hover:bg-purple-500/5 transition h-full"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center overflow-hidden">
                            {job.postedBy?.profilePhoto ? (
                              <img
                                src={job.postedBy.profilePhoto}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaBriefcase className="text-purple-500 w-5 h-5" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            {job.featured && (
                              <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <FaStar className="w-2 h-2 fill-current" />{" "}
                                Featured
                              </span>
                            )}
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[job.type] || "bg-gray-500/10 text-gray-500"}`}
                            >
                              {job.type}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-theme-primary font-semibold text-lg mb-1 group-hover:text-purple-500 transition leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-purple-500 text-sm mb-3 font-medium">
                          {job.company || job.postedBy?.companyName}
                        </p>

                        {(job.skills || []).length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {job.skills.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="text-xs bg-theme-card border border-theme text-theme-muted px-2 py-0.5 rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-theme-muted mb-4">
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

                        <div className="pt-4 border-t border-theme flex items-center justify-between">
                          <span className="text-purple-500 font-bold text-sm">
                            {salary}
                          </span>
                          <span className="text-xs text-theme-muted group-hover:text-purple-500 transition flex items-center gap-1">
                            Apply Now <FaArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
          </motion.div>

          {/* Mobile view all */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-8 md:hidden"
          >
            <Link
              to="/jobs"
              className="text-purple-500 hover:text-purple-400 transition text-sm"
            >
              View all jobs →
            </Link>
          </motion.div>
        </div>
      </section>

      {/*FEATURES*/}
      <section className="py-20 px-6 bg-theme-primary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-theme-primary mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-theme-muted max-w-xl mx-auto">
              We make job hunting faster, smarter, and more transparent for
              everyone.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="card-theme border hover:border-purple-500/30 rounded-2xl p-6 transition"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center text-white mb-4`}
                >
                  {f.icon}
                </div>
                <h3 className="text-theme-primary font-semibold mb-2">
                  {f.title}
                </h3>
                <p className="text-theme-muted text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/*HOW IT WORKS*/}
      <section className="py-20 px-6 bg-theme-secondary">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-theme-primary mb-4">
              How It Works
            </h2>
            <p className="text-theme-muted">Get hired in 3 simple steps</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Create Your Profile",
                desc: "Sign up and build your professional profile with skills, experience, and upload your CV.",
                icon: <FiUsers className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Find & Apply",
                desc: "Search thousands of jobs with smart filters. Apply in one click with your saved profile.",
                icon: <FaSearch className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Get Hired",
                desc: "Track your application status in real-time and get notified when employers respond.",
                icon: <FaBriefcase className="w-6 h-6" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-purple-900/20">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-purple-500 mb-2">
                  {item.step}
                </div>
                <h3 className="text-theme-primary font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-theme-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/*CTA*/}
      <section className="py-20 px-6 bg-theme-primary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600 opacity-20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs px-3 py-1.5 rounded-full mb-4">
                <FaRocket className="w-3 h-3" /> Join Thousands of Professionals
              </div>
              <h2 className="text-4xl font-bold text-theme-primary mb-4">
                Ready to Find Your Dream Job?
              </h2>
              <p className="text-theme-muted mb-8 max-w-xl mx-auto">
                Join job seekers who found their perfect career through
                JobPortal. It's free to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2"
                >
                  Get Started Free <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/jobs"
                  className="border border-theme text-theme-secondary hover:text-theme-primary hover:border-purple-500/50 px-8 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
