import { motion } from "framer-motion";
import {
  FiEye,
  FiTrendingUp,
  FiUser,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const viewStats = [
  {
    label: "Total Views",
    value: 248,
    icon: <FiEye />,
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-500/10",
    text: "text-purple-500",
  },
  {
    label: "This Week",
    value: 48,
    icon: <FiTrendingUp />,
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  },
  {
    label: "From Employers",
    value: 31,
    icon: <FiBriefcase />,
    color: "from-green-500 to-green-700",
    bg: "bg-green-500/10",
    text: "text-green-500",
  },
];

const recentViewers = [
  {
    id: 1,
    company: "TechCorp BD",
    role: "HR Manager",
    location: "Dhaka",
    time: "2 hours ago",
    avatar: "T",
  },
  {
    id: 2,
    company: "NextGen Tech",
    role: "Recruiter",
    location: "Remote",
    time: "5 hours ago",
    avatar: "N",
  },
  {
    id: 3,
    company: "PixelCraft",
    role: "CTO",
    location: "Chittagong",
    time: "1 day ago",
    avatar: "P",
  },
  {
    id: 4,
    company: "CloudBase",
    role: "HR Lead",
    location: "Dhaka",
    time: "2 days ago",
    avatar: "C",
  },
  {
    id: 5,
    company: "DevHouse",
    role: "Team Lead",
    location: "Remote",
    time: "3 days ago",
    avatar: "D",
  },
];

const weekData = [40, 65, 35, 80, 55, 90, 48];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...weekData);

const ProfileViews = () => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">Profile Views</h2>
        <p className="text-theme-muted text-sm mt-1">
          See who viewed your profile
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {viewStats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <div
              className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.text} mb-3`}
            >
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-theme-primary">
              {stat.value}
            </p>
            <p className="text-theme-muted text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-6">
          Views This Week
        </h3>
        <div className="flex items-end gap-3 h-40">
          {weekData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-theme-muted">{val}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(val / maxVal) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg min-h-2"
                style={{ maxHeight: "100%" }}
              />
              <span className="text-xs text-theme-muted">{days[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Viewers */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-theme">
          <h3 className="font-semibold text-theme-primary">Recent Viewers</h3>
        </div>
        <div className="divide-y divide-theme">
          {recentViewers.map((viewer) => (
            <div
              key={viewer.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {viewer.avatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-theme-primary font-medium text-sm">
                  {viewer.company}
                </p>
                <div className="flex items-center gap-2 text-xs text-theme-muted mt-0.5">
                  <span>{viewer.role}</span>
                  <span>·</span>
                  <FiMapPin className="w-3 h-3" />
                  <span>{viewer.location}</span>
                </div>
              </div>
              <p className="text-theme-muted text-xs flex-shrink-0">
                {viewer.time}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileViews;
