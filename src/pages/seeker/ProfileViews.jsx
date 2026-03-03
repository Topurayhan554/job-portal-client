import { motion } from "framer-motion";
import { FiEye, FiTrendingUp, FiBriefcase } from "react-icons/fi";
import { useSeekerProfile } from "../../hooks/useSeeker";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

// Static for now — profile views tracking needs a separate model
const weekData = [0, 0, 0, 0, 0, 0, 0];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...weekData);

const ProfileViews = () => {
  const { profile, loading } = useSeekerProfile();

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const viewStats = [
    {
      label: "Total Views",
      value: 1,
      icon: <FiEye />,
      bg: "bg-purple-500/10",
      text: "text-purple-500",
    },
    {
      label: "This Week",
      value: weekData.reduce((a, b) => a + b, 0),
      icon: <FiTrendingUp />,
      bg: "bg-blue-500/10",
      text: "text-blue-500",
    },
    {
      label: "Saved Jobs",
      value: (profile?.savedJobs || []).length,
      icon: <FiBriefcase />,
      bg: "bg-green-500/10",
      text: "text-green-500",
    },
  ];

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
          See how your profile is performing
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
              />
              <span className="text-xs text-theme-muted">{days[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Profile completion note */}
      <motion.div
        variants={fadeUp}
        className="card-theme border border-purple-500/20 rounded-2xl p-5 bg-purple-500/5"
      >
        <h3 className="font-semibold text-theme-primary mb-2">
          🚀 Boost Your Visibility
        </h3>
        <ul className="space-y-1.5 text-sm text-theme-secondary">
          {[
            !profile?.bio && "Add a bio to your profile",
            !(profile?.skills || []).length && "Add skills to match more jobs",
            !profile?.cvUrl && "Upload your CV",
            !(profile?.experience || []).length && "Add work experience",
          ]
            .filter(Boolean)
            .map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></span>
                {tip}
              </li>
            ))}
          {[
            profile?.bio,
            (profile?.skills || []).length,
            profile?.cvUrl,
            (profile?.experience || []).length,
          ].every(Boolean) && (
            <li className="text-green-500 font-medium">
              ✅ Profile fully complete!
            </li>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ProfileViews;
