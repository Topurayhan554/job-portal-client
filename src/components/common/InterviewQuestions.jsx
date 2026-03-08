import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiBookmark,
  FiShare2,
  FiCode,
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiCpu,
} from "react-icons/fi";
import { questions } from "../../../public/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

const categories = [
  { id: "all", label: "All", icon: <FiStar /> },
  { id: "tech", label: "Tech & Dev", icon: <FiCode /> },
  { id: "hr", label: "HR & Behavioral", icon: <FiUsers /> },
  { id: "management", label: "Management", icon: <FiBriefcase /> },
  { id: "marketing", label: "Marketing", icon: <FiTrendingUp /> },
  { id: "ai", label: "AI & Data", icon: <FiCpu /> },
];

const levelColor = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-blue-500/10    text-blue-400    border-blue-500/20",
  Advanced: "bg-purple-500/10  text-purple-400  border-purple-500/20",
  Common: "bg-amber-500/10   text-amber-400   border-amber-500/20",
  Behavioral: "bg-pink-500/10    text-pink-400    border-pink-500/20",
};

const QuestionCard = ({ q, index }) => {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.05}
      className="card-theme border rounded-2xl overflow-hidden hover:border-purple-500/20 transition group"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${levelColor[q.level] || levelColor.Common}`}
            >
              {q.level}
            </span>
          </div>
          <p className="text-theme-primary font-semibold text-sm leading-relaxed pr-4">
            {q.question}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1 text-theme-muted group-hover:text-purple-400 transition"
        >
          <FiChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-theme pt-4 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
                  Answer
                </p>
                <p className="text-theme-secondary text-sm leading-relaxed">
                  {q.answer}
                </p>
              </div>
              {q.tip && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5 flex gap-2.5">
                  <span className="text-amber-400 text-xs mt-0.5">💡</span>
                  <p className="text-amber-400/90 text-xs leading-relaxed">
                    <span className="font-bold">Pro Tip: </span>
                    {q.tip}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${
                    saved
                      ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                      : "border-theme text-theme-muted hover:text-purple-400"
                  }`}
                >
                  <FiBookmark className="w-3.5 h-3.5" />
                  {saved ? "Saved" : "Save"}
                </button>
                <button
                  onClick={() => navigator.clipboard?.writeText(q.question)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-theme text-theme-muted hover:text-purple-400 transition"
                >
                  <FiShare2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InterviewQuestions = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = questions.filter((q) => {
    const matchCat = activeCategory === "all" || q.category === activeCategory;
    const matchSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-theme">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-600/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest"
          >
            🎯 Ace Your Next Interview
          </motion.div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight mb-4"
          >
            Interview Questions
            <span className="block text-2xl md:text-3xl mt-2 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              With Expert Answers
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-theme-muted text-base mb-8"
          >
            {questions.length}+ real interview questions from top Bangladeshi
            companies — with detailed answers and pro tips.
          </motion.p>

          {/* Search */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="relative max-w-xl mx-auto"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="input-theme w-full border rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition border ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-900/20"
                    : "border-theme text-theme-secondary hover:text-theme-primary hover:border-purple-500/30"
                }`}
              >
                {cat.icon} {cat.label}
                {cat.id !== "all" && (
                  <span className="bg-black/10 dark:bg-white/10 text-xs px-1.5 py-0.5 rounded-md">
                    {questions.filter((q) => q.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-theme-muted text-xs mb-6">
            Showing{" "}
            <span className="text-purple-400 font-semibold">
              {filtered.length}
            </span>{" "}
            questions
            {search && ` for "${search}"`}
          </p>

          {/* Questions */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🤔</p>
              <p className="text-theme-primary font-bold mb-2">
                No questions found
              </p>
              <p className="text-theme-muted text-sm">
                Try a different search or category
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((q, i) => (
                <QuestionCard key={q.id} q={q} index={i} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 text-center card-theme border rounded-3xl p-10 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative">
              <p className="text-2xl font-extrabold text-theme-primary mb-3">
                Ready to apply?
              </p>
              <p className="text-theme-muted text-sm mb-6">
                Browse thousands of jobs and put your interview skills to use.
              </p>
              <a
                href="/jobs"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-7 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/20"
              >
                Browse Jobs <FiSearch className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InterviewQuestions;
