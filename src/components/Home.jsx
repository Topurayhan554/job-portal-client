import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaSearch,
  FaRocket,
  FaArrowRight,
  FaAppStore,
  FaGooglePlay,
} from "react-icons/fa";
import {
  FiUsers,
  FiCheckCircle,
  FiArrowUpRight,
  FiMapPin,
  FiChevronRight,
} from "react-icons/fi";
import api from "../services/api";
import {
  interviewquestions,
  jobhunters,
  partnerLogos,
  testimonials,
} from "../../public/data";
import JobCardSkeleton from "./common/JobCardSkeleton";
import JobCard from "./common/JobCard";
import LogoCarousel from "./common/LogoCarousel";
import TestimonialCarousel from "./common/TestimonialCarousel";

//  Animations
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
// faster stagger — cards appear quickly
const stagger = { visible: { transition: { staggerChildren: 0.04 } } };
// subtle scale — no jarring pop
const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } },
};

const typeColors = {
  "Full-time": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Part-time": "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  Remote: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Freelance: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Internship: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

const popularTags = [
  "React Developer",
  "UI Designer",
  "Python",
  "Remote Jobs",
  "Node.js",
  "Full-time",
];

const StatSkeleton = () => (
  <div className="animate-pulse card-theme border rounded-2xl p-4">
    <div className="h-7 bg-theme-primary/20 rounded w-20 mb-1" />
    <div className="h-3 bg-theme-primary/10 rounded w-16" />
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [liveJobs, setLiveJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [jobsLoading, setJobsLoading] = useState(true);
  const [liveLoading, setLiveLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Featured jobs
  useEffect(() => {
    const fetch = async () => {
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
    fetch();
  }, []);

  // Live jobs by category
  useEffect(() => {
    const fetch = async () => {
      setLiveLoading(true);
      try {
        const p = activeTab !== "All" ? `&category=${activeTab}` : "";
        const res = await api.get(`/jobs?sort=newest&limit=8${p}`);
        setLiveJobs(res.data.jobs || []);
      } catch {
        setLiveJobs([]);
      } finally {
        setLiveLoading(false);
      }
    };
    fetch();
  }, [activeTab]);

  // Stats
  useEffect(() => {
    const fetch = async () => {
      try {
        const [j, r] = await Promise.all([
          api.get("/jobs?limit=1"),
          api.get("/jobs?limit=1&type=Remote"),
        ]);
        setStats({
          totalJobs: j.data.total || 0,
          remoteJobs: r.data.total || 0,
        });
      } catch {
        setStats({ totalJobs: 0, remoteJobs: 0 });
      } finally {
        setStatsLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      search.trim()
        ? `/jobs?search=${encodeURIComponent(search.trim())}`
        : "/jobs",
    );
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
      {/*  HERO  */}
      <section className="relative overflow-hidden border-b border-theme py-16 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600 opacity-[0.06] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-blue-600 opacity-[0.06] rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase"
              >
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                Bangladesh's #1 Job Portal
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.08 }}
                className="text-4xl sm:text-5xl md:text-[3.8rem] font-extrabold leading-[1.08] tracking-tight mb-5 text-theme-primary"
              >
                Real Jobs,{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Real Salaries
                </span>
                <br />
                For Experienced
                <br />
                Professionals Only
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.14 }}
                className="text-theme-muted text-base mb-8 max-w-lg leading-relaxed"
              >
                Connect with top companies across Bangladesh. Get matched with
                the right opportunity and launch your dream career today.
              </motion.p>

              <motion.form
                onSubmit={handleSearch}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 mb-6 max-w-xl"
              >
                <div className="relative flex-1">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Job title, skill, or company..."
                    className="input-theme w-full border rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:opacity-95 transition shadow-lg shadow-purple-900/25 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <FaSearch className="w-3.5 h-3.5" /> Search
                </button>
              </motion.form>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.26 }}
                className="flex flex-wrap gap-2 items-center"
              >
                <span className="text-theme-muted text-xs font-medium">
                  Popular:
                </span>
                {popularTags.map((tag) => (
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
            </div>

            {/* Right stats card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="card-theme border border-purple-500/20 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl" />
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {statsLoading || !dynamicStats
                    ? [1, 2, 3, 4].map((i) => <StatSkeleton key={i} />)
                    : dynamicStats.map((s, i) => (
                        <div
                          key={i}
                          className="card-theme border rounded-2xl p-4"
                        >
                          <p className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                            {s.value}
                          </p>
                          <p className="text-theme-muted text-xs mt-1">
                            {s.label}
                          </p>
                        </div>
                      ))}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-theme-muted uppercase tracking-wider mb-3">
                    Latest Openings
                  </p>
                  {jobsLoading
                    ? [1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 animate-pulse"
                        >
                          <div className="w-8 h-8 bg-theme-primary/20 rounded-lg flex-shrink-0" />
                          <div className="flex-1 space-y-1">
                            <div className="h-3 bg-theme-primary/20 rounded w-3/4" />
                            <div className="h-2.5 bg-theme-primary/15 rounded w-1/2" />
                          </div>
                        </div>
                      ))
                    : featuredJobs.slice(0, 3).map((job) => (
                        <Link
                          key={job._id}
                          to={`/jobs/${job._id}`}
                          className="flex items-center gap-3 group hover:bg-purple-500/5 p-2 rounded-xl transition"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {job.postedBy?.profilePhoto ? (
                              <img
                                src={job.postedBy.profilePhoto}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaBriefcase className="text-purple-400 w-3.5 h-3.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-theme-primary text-xs font-semibold group-hover:text-purple-400 transition truncate">
                              {job.title}
                            </p>
                            <p className="text-theme-muted text-[11px]">
                              {job.company || job.postedBy?.companyName}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${typeColors[job.type] || "bg-gray-500/10 text-gray-400"}`}
                          >
                            {job.type}
                          </span>
                        </Link>
                      ))}
                  <Link
                    to="/jobs"
                    className="flex items-center justify-center gap-1 text-purple-400 hover:text-purple-300 text-xs font-medium pt-2 transition"
                  >
                    View all jobs <FiChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  PARTNER LOGOS  */}
      <section className="py-10 border-b border-theme bg-theme-secondary">
        <p className="text-xs font-bold text-theme-muted uppercase tracking-widest text-center mb-6">
          Trusted by Top Companies
        </p>
        <LogoCarousel />
      </section>

      {/*  FEATURED JOBS 
           key={featuredJobs.length} — data আসার সাথে সাথে re-animate করে
           animate="visible" — scroll লাগবে না
      */}
      <section className="py-16 px-6 bg-theme-secondary border-y border-theme">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
                Top Picks
              </p>
              <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight">
                Featured Jobs
              </h2>
              <p className="text-theme-muted text-sm mt-1">
                Hand-picked opportunities from verified companies
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center gap-2 text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-500/60 px-4 py-2 rounded-xl transition text-sm font-medium"
            >
              View All <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            key={featuredJobs.length}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {jobsLoading
              ? [1, 2, 3, 4, 5, 6].map((i) => <JobCardSkeleton key={i} />)
              : featuredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={scaleIn}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/*  INTERVIEW PREP  */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
                Ace Your Interview
              </p>
              <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight">
                Interview Prep
              </h2>
              <p className="text-theme-muted text-sm mt-1">
                Real questions with expert answers to help you land the job
              </p>
            </div>
            <Link
              to="/interview-questions"
              className="hidden md:flex items-center gap-2 text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-500/60 px-4 py-2 rounded-xl transition text-sm font-medium"
            >
              See All <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {interviewquestions.map((item, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Link
                  to="/interview-questions"
                  className="group card-theme block border hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-300 hover:bg-purple-500/[0.03]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.emoji}</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${item.color}`}
                    >
                      {item.level}
                    </span>
                  </div>
                  <p className="text-theme-primary font-semibold text-sm leading-relaxed group-hover:text-purple-400 transition mb-4">
                    {item.q}
                  </p>
                  <span className="text-xs text-theme-muted group-hover:text-purple-400 transition flex items-center gap-1 font-medium">
                    View Answer <FiArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-6 md:hidden">
            <Link
              to="/interview-questions"
              className="text-purple-400 hover:text-purple-300 transition text-sm font-medium"
            >
              See all questions →
            </Link>
          </div>
        </div>
      </section>

      {/*  FEATURES  */}
      <section className="py-16 px-6 bg-theme-secondary border-y border-theme">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              Why Us
            </p>
            <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight mb-3">
              Built for Modern Job Hunters
            </h2>
            <p className="text-theme-muted max-w-md mx-auto text-sm">
              Faster, smarter, and more transparent than any other platform.
            </p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {jobhunters.map((f, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-theme border hover:border-purple-500/30 rounded-2xl p-6 transition-all duration-300 group"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${f.accent} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
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

      {/*  TESTIMONIALS  */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              Success Stories
            </p>
            <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-theme-muted text-sm mt-2">
              Real experiences from real job seekers
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/*  HOW IT WORKS  */}
      <section className="py-16 px-6 bg-theme-secondary border-y border-theme">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight mb-3">
              Get Hired in 3 Steps
            </h2>
            <p className="text-theme-muted text-sm">
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
                desc: "Sign up and build your professional profile with skills, experience, and upload your CV.",
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
                desc: "Track your application live and get notified the moment employers respond.",
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

      {/*  APP DOWNLOAD  */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card-theme border border-purple-500/20 rounded-3xl p-10 md:p-12 overflow-hidden relative"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/8 rounded-full blur-2xl" />
              <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage:
                    "radial-gradient(currentColor 1px,transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                  <FaRocket className="w-3 h-3" /> Mobile App
                </div>
                <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight mb-3">
                  Download{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Our App
                  </span>{" "}
                  Now!
                </h2>
                <p className="text-theme-muted text-sm mb-7 leading-relaxed">
                  Find jobs on the go. Get instant notifications, apply with one
                  tap, and manage your career from your pocket.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      icon: <FaAppStore className="w-5 h-5 text-purple-400" />,
                      top: "Download on the",
                      bottom: "App Store",
                    },
                    {
                      icon: (
                        <FaGooglePlay className="w-5 h-5 text-purple-400" />
                      ),
                      top: "Get it on",
                      bottom: "Google Play",
                    },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-3 card-theme border hover:border-purple-500/40 hover:bg-purple-500/5 px-5 py-3 rounded-xl transition"
                    >
                      {btn.icon}
                      <div className="text-left">
                        <p className="text-[10px] text-theme-muted">
                          {btn.top}
                        </p>
                        <p className="text-sm font-bold text-theme-primary">
                          {btn.bottom}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden md:grid grid-cols-3 gap-3">
                {[
                  { label: "5★", sub: "App Rating", emoji: "⭐" },
                  { label: "50k+", sub: "Downloads", emoji: "📥" },
                  { label: "Free", sub: "Forever Plan", emoji: "🎉" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="card-theme border border-purple-500/10 rounded-2xl p-5 text-center"
                  >
                    <span className="text-2xl mb-2 block">{s.emoji}</span>
                    <p className="text-xl font-extrabold text-theme-primary">
                      {s.label}
                    </p>
                    <p className="text-theme-muted text-xs mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/*  CTA  */}
      <section className="py-16 px-6 bg-theme-secondary border-t border-theme">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              <FaRocket className="w-3 h-3" /> Join Thousands of Professionals
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-theme-primary tracking-tight mb-4">
              Looking for Your Ideal Job?
            </h2>
            <p className="text-theme-muted mb-8 max-w-lg mx-auto leading-relaxed text-sm">
              Join job seekers who found their perfect career. Free to get
              started — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-95 transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2"
              >
                Sign Up Now{" "}
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/jobs"
                className="border border-theme text-theme-secondary hover:text-theme-primary hover:border-purple-500/40 px-8 py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                Browse Jobs
              </Link>
            </div>
            <p className="text-theme-muted text-xs mt-6 flex items-center justify-center gap-5 flex-wrap">
              <span className="flex items-center gap-1">
                <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" /> No
                credit card
              </span>
              <span className="flex items-center gap-1">
                <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" /> Free
                forever plan
              </span>
              <span className="flex items-center gap-1">
                <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" />{" "}
                Cancel anytime
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
