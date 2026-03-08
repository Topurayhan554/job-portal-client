import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiUsers,
  FiTarget,
  FiHeart,
  FiArrowRight,
  FiCheckCircle,
  FiGlobe,
  FiZap,
} from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import { team, values } from "../../../public/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const stats = [
  { value: "10,000+", label: "Job Listings", icon: <FiBriefcase /> },
  { value: "25,000+", label: "Job Seekers", icon: <FiUsers /> },
  { value: "1,500+", label: "Companies", icon: <FiGlobe /> },
  { value: "8,000+", label: "Placements Made", icon: <FiZap /> },
];

const About = () => {
  return (
    <div className="min-h-screen bg-theme-primary">
      {/*  Hero  */}
      <section className="relative overflow-hidden py-24 px-6">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-purple-600/10 to-transparent rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest"
          >
            <FaBriefcase className="w-3 h-3" /> Our Story
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-6xl font-extrabold text-theme-primary tracking-tight leading-tight mb-6"
          >
            We're on a mission to{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                connect talent
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
            </span>{" "}
            with opportunity
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-theme-muted text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            KaajKhojo was born in Dhaka with a simple idea — finding a job in
            Bangladesh shouldn't be frustrating. We built the platform we wished
            existed when we were job seekers ourselves.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              to="/jobs"
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-purple-900/20"
            >
              Browse Jobs <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 border border-theme text-theme-secondary px-6 py-3 rounded-xl font-semibold text-sm hover:text-theme-primary hover:border-purple-500/40 transition"
            >
              Join KaajKhojo
            </Link>
          </motion.div>
        </div>
      </section>

      {/*  Stats  */}
      <section className="py-16 px-6 border-y border-theme bg-theme-secondary">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="text-center"
            >
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mx-auto mb-3">
                {s.icon}
              </div>
              <p className="text-3xl font-extrabold text-theme-primary tracking-tight">
                {s.value}
              </p>
              <p className="text-theme-muted text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/*  Story  */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
              How It Started
            </p>
            <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight mb-5">
              From a frustrating job search to Bangladesh's #1 platform
            </h2>
            <div className="space-y-4 text-theme-muted text-sm leading-relaxed">
              <p>
                In 2023, our founders spent weeks sending CVs into the void — no
                responses, outdated listings, and job boards cluttered with
                spam. They knew there had to be a better way.
              </p>
              <p>
                KaajKhojo launched in early 2024 with a small team and a big
                dream. Within 6 months, thousands of job seekers had found their
                next opportunity through our platform, and hundreds of employers
                had discovered reliable local talent.
              </p>
              <p>
                Today, KaajKhojo is the fastest-growing job portal in Bangladesh
                — powered by AI, built for humans, and rooted in a deep
                understanding of our local job market.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="space-y-4"
          >
            {[
              "Verified employers only — no fake listings",
              "AI-powered CV analyzer to help you stand out",
              "Real-time job alerts for your skills",
              "Free forever for job seekers",
              "Dedicated support team based in Dhaka",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 card-theme border rounded-2xl p-4"
              >
                <div className="w-6 h-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-theme-secondary text-sm font-medium">
                  {item}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/*  Values  */}
      <section className="py-20 px-6 bg-theme-secondary border-y border-theme">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
              What We Believe
            </p>
            <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                className="card-theme border rounded-2xl p-6 hover:border-purple-500/30 transition group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="text-theme-primary font-bold text-base mb-2">
                  {v.title}
                </h3>
                <p className="text-theme-muted text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  Team  */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
              The People Behind It
            </p>
            <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight">
              Meet the Team
            </h2>
            <p className="text-theme-muted text-sm mt-3">
              A small team with a big mission, based in Dhaka.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.2}
                className="text-center group"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-lg overflow-hidden`}
                >
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // image না পেলে initial দেখাবে
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span
                    className="text-white text-2xl font-extrabold w-full h-full items-center justify-center"
                    style={{ display: t.image ? "none" : "flex" }}
                  >
                    {t.initial}
                  </span>
                </div>
                <h4 className="text-theme-primary font-bold text-sm">
                  {t.name}
                </h4>
                <p className="text-theme-muted text-xs mt-1">{t.role}</p>
              </motion.div>
            ))}
            ```
          </div>
        </div>
      </section>

      {/*  CTA  */}
      <section className="py-20 px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center card-theme border rounded-3xl p-12 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-600/10 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-theme-primary tracking-tight mb-4">
              Ready to find your next job?
            </h2>
            <p className="text-theme-muted text-sm mb-8">
              Join thousands of professionals who found their dream career
              through KaajKhojo.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-purple-900/20"
            >
              Get Started — It's Free <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
