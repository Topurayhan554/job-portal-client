import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiDownload,
  FiMail,
  FiEye,
  FiCheck,
  FiX,
  FiMapPin,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const allApplicants = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Frontend Developer",
    location: "Dhaka",
    match: 92,
    status: "Shortlisted",
    appliedDate: "Nov 15, 2024",
    avatar: "R",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    name: "Sadia Islam",
    role: "UI/UX Designer",
    location: "Chittagong",
    match: 88,
    status: "Under Review",
    appliedDate: "Nov 14, 2024",
    avatar: "S",
    skills: ["Figma", "Adobe XD"],
  },
  {
    id: 3,
    name: "Karim Hossain",
    role: "Backend Engineer",
    location: "Dhaka",
    match: 75,
    status: "Applied",
    appliedDate: "Nov 13, 2024",
    avatar: "K",
    skills: ["Node.js", "MongoDB"],
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Frontend Developer",
    location: "Remote",
    match: 85,
    status: "Interview",
    appliedDate: "Nov 12, 2024",
    avatar: "N",
    skills: ["Vue.js", "React"],
  },
  {
    id: 5,
    name: "Tanvir Ahmed",
    role: "DevOps Engineer",
    location: "Dhaka",
    match: 70,
    status: "Rejected",
    appliedDate: "Nov 10, 2024",
    avatar: "T",
    skills: ["AWS", "Docker"],
  },
];

const statusConfig = {
  Shortlisted: "bg-purple-500/10 text-purple-500",
  "Under Review": "bg-yellow-500/10 text-yellow-500",
  Applied: "bg-blue-500/10 text-blue-500",
  Interview: "bg-green-500/10 text-green-500",
  Rejected: "bg-red-500/10 text-red-500",
};

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
  "from-blue-500 to-cyan-500",
];

const Applicants = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = allApplicants.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

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
          <h2 className="text-2xl font-bold text-theme-primary">Applicants</h2>
          <p className="text-theme-muted text-sm mt-1">
            {allApplicants.length} total applicants
          </p>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicants..."
            className="input-theme w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "All",
            "Applied",
            "Under Review",
            "Shortlisted",
            "Interview",
            "Rejected",
          ].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition ${filter === f ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "border border-theme text-theme-secondary hover:text-theme-primary"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Applicants List */}
      <motion.div variants={stagger} className="space-y-3">
        {filtered.map((app, idx) => (
          <motion.div
            key={app.id}
            variants={fadeUp}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="card-theme border hover:border-purple-500/30 rounded-2xl p-5 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-white font-bold text-lg">
                  {app.avatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-theme-primary font-semibold">
                    {app.name}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[app.status]}`}
                  >
                    {app.status}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${app.match >= 90 ? "bg-green-500/10 text-green-500" : app.match >= 80 ? "bg-yellow-500/10 text-yellow-500" : "bg-blue-500/10 text-blue-500"}`}
                  >
                    {app.match}% match
                  </span>
                </div>
                <p className="text-purple-500 text-sm">{app.role}</p>
                <div className="flex flex-wrap gap-3 text-xs text-theme-muted mt-1">
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" />
                    {app.location}
                  </span>
                  <span>Applied: {app.appliedDate}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {app.skills.map((s) => (
                    <span
                      key={s}
                      className="bg-purple-500/10 text-purple-500 text-xs px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition">
                  <FiEye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition">
                  <FiMail className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-green-500 hover:border-green-500/50 transition">
                  <FiCheck className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition">
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Applicants;
