import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiBriefcase,
  FiMapPin,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const allApplications = [
  {
    id: 1,
    applicant: "Rahim Uddin",
    job: "Frontend Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    status: "Interview",
    date: "Nov 15, 2024",
    avatar: "R",
  },
  {
    id: 2,
    applicant: "Sadia Islam",
    job: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    status: "Under Review",
    date: "Nov 14, 2024",
    avatar: "S",
  },
  {
    id: 3,
    applicant: "Karim Hossain",
    job: "Backend Engineer",
    company: "DevHouse",
    location: "Chittagong",
    status: "Applied",
    date: "Nov 13, 2024",
    avatar: "K",
  },
  {
    id: 4,
    applicant: "Nusrat Jahan",
    job: "Product Manager",
    company: "FinTech Ltd",
    location: "Dhaka",
    status: "Shortlisted",
    date: "Nov 12, 2024",
    avatar: "N",
  },
  {
    id: 5,
    applicant: "Tanvir Ahmed",
    job: "DevOps Engineer",
    company: "CloudBase",
    location: "Remote",
    status: "Rejected",
    date: "Nov 10, 2024",
    avatar: "T",
  },
];

const statusConfig = {
  Interview: "bg-green-500/10 text-green-500",
  "Under Review": "bg-yellow-500/10 text-yellow-500",
  Applied: "bg-blue-500/10 text-blue-500",
  Shortlisted: "bg-purple-500/10 text-purple-500",
  Rejected: "bg-red-500/10 text-red-500",
};

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-yellow-500",
  "from-blue-500 to-cyan-500",
];

const AdminApplications = () => {
  const [applications, setApplications] = useState(allApplications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.applicant.toLowerCase().includes(search.toLowerCase()) ||
      a.job.toLowerCase().includes(search.toLowerCase());
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
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">
          All Applications
        </h2>
        <p className="text-theme-muted text-sm mt-1">
          {applications.length} total applications
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
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

      {/* Table */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-theme text-left">
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase">
                  Applicant
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase">
                  Job
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-theme-muted uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {filtered.map((app, idx) => (
                <tr
                  key={app.id}
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white font-bold text-sm">
                          {app.avatar}
                        </span>
                      </div>
                      <p className="text-theme-primary font-medium text-sm">
                        {app.applicant}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-theme-primary text-sm font-medium">
                      {app.job}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-theme-muted mt-0.5">
                      {app.company} · <FiMapPin className="w-3 h-3" />{" "}
                      {app.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-theme-secondary text-sm">{app.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition">
                        <FiEye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setApplications(
                            applications.filter((a) => a.id !== app.id),
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminApplications;
