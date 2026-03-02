import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const featuredJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    type: "Full-time",
    salary: "৳40k-60k",
    tag: "React",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Remote",
    type: "Part-time",
    salary: "৳30k-45k",
    tag: "Figma",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "StartupXYZ",
    location: "Chittagong",
    type: "Full-time",
    salary: "৳50k-80k",
    tag: "Node.js",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "FinTech Ltd",
    location: "Dhaka",
    type: "Full-time",
    salary: "৳70k-100k",
    tag: "Strategy",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "DataMinds",
    location: "Remote",
    type: "Freelance",
    salary: "৳35k-55k",
    tag: "Python",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudBase",
    location: "Dhaka",
    type: "Full-time",
    salary: "৳60k-90k",
    tag: "AWS",
  },
];

const stats = [
  { value: "10,000+", label: "Jobs Posted" },
  { value: "5,000+", label: "Companies" },
  { value: "50,000+", label: "Job Seekers" },
  { value: "95%", label: "Success Rate" },
];

const features = [
  {
    icon: <FaBrain className="w-6 h-6" />,
    title: "AI-Powered Matching",
    desc: "Our AI matches your skills with the perfect job opportunities automatically.",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: <FaChartLine className="w-6 h-6" />,
    title: "Real-time Tracking",
    desc: "Track your application status in real-time from applied to hired.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <FaRocket className="w-6 h-6" />,
    title: "Smart Resume Analyzer",
    desc: "AI reads your resume and suggests improvements to get more interviews.",
    color: "from-pink-500 to-pink-700",
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Verified Companies",
    desc: "All companies are verified to ensure safe and legitimate job postings.",
    color: "from-green-500 to-green-700",
  },
];

const categories = [
  { label: "Technology", count: "1,200+ jobs", icon: "💻" },
  { label: "Design", count: "800+ jobs", icon: "🎨" },
  { label: "Marketing", count: "600+ jobs", icon: "📢" },
  { label: "Finance", count: "500+ jobs", icon: "💰" },
  { label: "Healthcare", count: "900+ jobs", icon: "🏥" },
  { label: "Education", count: "400+ jobs", icon: "📚" },
  { label: "Engineering", count: "1,100+ jobs", icon: "⚙️" },
  { label: "Remote", count: "2,000+ jobs", icon: "🌍" },
];

const Home = () => {
  return (
    <div className="bg-theme-primary text-theme-primary overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-700 opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700 opacity-10 rounded-full blur-[100px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-500 text-sm px-4 py-2 rounded-full mb-6"
          >
            <FaRocket className="w-3 h-3" />
            AI-Powered Job Portal for Bangladesh
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
            className="text-theme-muted text-xl mb-10 max-w-2xl mx-auto"
          >
            Connect with top companies, get AI-powered job recommendations, and
            land your dream career faster than ever.
          </motion.p>

          {/* Search Bar */}
          <motion.div
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
                placeholder="Job title, skill, or company..."
                className="input-theme w-full border rounded-xl pl-11 pr-4 py-4 focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <Link
              to="/jobs"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Search Jobs <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Popular Searches */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            <span className="text-theme-muted text-sm">Popular:</span>
            {[
              "React Developer",
              "UI Designer",
              "Python",
              "Remote Jobs",
              "Node.js",
            ].map((tag) => (
              <Link
                key={tag}
                to="/jobs"
                className="text-sm text-theme-secondary hover:text-purple-500 border border-theme hover:border-purple-500/50 px-3 py-1 rounded-full transition"
              >
                {tag}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 border-y border-theme bg-theme-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={scaleIn}>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-theme-muted text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
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
            {categories.map((cat, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Link
                  to="/jobs"
                  className="group card-theme flex flex-col items-center gap-3 border hover:border-purple-500/50 rounded-2xl p-6 text-center hover:bg-purple-500/5 transition"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <p className="text-theme-primary font-semibold group-hover:text-purple-500 transition">
                    {cat.label}
                  </p>
                  <p className="text-theme-muted text-xs">{cat.count}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED JOBS ===== */}
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
              View All Jobs <FaArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featuredJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link
                  to="/jobs"
                  className="group card-theme block border hover:border-purple-500/40 rounded-2xl p-6 hover:bg-purple-500/5 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center">
                      <FaBriefcase className="text-purple-500 w-5 h-5" />
                    </div>
                    <span className="text-xs bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-1 rounded-full">
                      {job.tag}
                    </span>
                  </div>

                  <h3 className="text-theme-primary font-semibold text-lg mb-1 group-hover:text-purple-500 transition">
                    {job.title}
                  </h3>
                  <p className="text-theme-secondary text-sm mb-4">
                    {job.company}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-theme-muted">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="w-3 h-3" /> {job.type}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-theme flex items-center justify-between">
                    <span className="text-purple-500 font-semibold text-sm">
                      {job.salary}
                    </span>
                    <span className="text-xs text-theme-muted group-hover:text-purple-500 transition flex items-center gap-1">
                      Apply Now <FaArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
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
              className="text-purple-500 hover:text-purple-400 transition text-sm"
            >
              View all jobs →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
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
              We use cutting-edge AI technology to make your job search faster
              and smarter.
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
                className="card-theme border hover:border-theme rounded-2xl p-6 transition"
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

      {/* ===== CTA ===== */}
      <section className="py-20 px-6 bg-theme-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-theme-primary mb-4">
                Ready to Find Your Dream Job?
              </h2>
              <p className="text-theme-muted mb-8 max-w-xl mx-auto">
                Join 50,000+ job seekers who found their perfect career through
                JobPortal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2"
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
