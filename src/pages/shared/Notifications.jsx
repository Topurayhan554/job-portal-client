import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiBriefcase,
  FiUser,
  FiMessageSquare,
  FiCheck,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const allNotifications = [
  {
    id: 1,
    type: "application",
    title: "Application Viewed",
    msg: "TechCorp BD viewed your application for Frontend Developer.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "job",
    title: "New Job Match",
    msg: "A new job matching your skills: Senior React Developer at NextGen Tech.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    msg: "You have a new message from PixelCraft HR.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "application",
    title: "Shortlisted!",
    msg: "Congratulations! You've been shortlisted for UI/UX Designer at Creative Studio.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "job",
    title: "Job Recommendation",
    msg: "Based on your profile: Full Stack Engineer at CloudBase.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 6,
    type: "profile",
    title: "Profile Viewed",
    msg: "Your profile was viewed by 5 employers this week.",
    time: "5 days ago",
    read: true,
  },
];

const typeConfig = {
  application: {
    icon: <FiBriefcase className="w-4 h-4" />,
    bg: "bg-purple-500/10",
    text: "text-purple-500",
  },
  job: {
    icon: <FiBriefcase className="w-4 h-4" />,
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  },
  message: {
    icon: <FiMessageSquare className="w-4 h-4" />,
    bg: "bg-green-500/10",
    text: "text-green-500",
  },
  profile: {
    icon: <FiUser className="w-4 h-4" />,
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
  },
};

const Notifications = () => {
  const [notifs, setNotifs] = useState(allNotifications);
  const [filter, setFilter] = useState("All");

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markRead = (id) =>
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () =>
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  const deleteNotif = (id) => setNotifs(notifs.filter((n) => n.id !== id));

  const filtered = notifs.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Read") return n.read;
    return true;
  });

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-theme-primary flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-theme-muted text-sm mt-1">
            {unreadCount} unread notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-purple-500 hover:text-purple-400 text-sm font-medium transition"
          >
            <FiCheckCircle className="w-4 h-4" /> Mark all read
          </button>
        )}
      </motion.div>

      {/* Filter */}
      <motion.div variants={fadeUp} className="flex gap-2">
        {["All", "Unread", "Read"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === f
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border border-theme text-theme-secondary hover:text-theme-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Notifications List */}
      <motion.div variants={stagger} className="space-y-3">
        {filtered.length === 0 ? (
          <motion.div
            variants={fadeUp}
            className="card-theme border rounded-2xl p-16 text-center"
          >
            <FiBell className="w-10 h-10 text-theme-muted mx-auto mb-3" />
            <p className="text-theme-secondary font-medium">No notifications</p>
          </motion.div>
        ) : (
          filtered.map((notif) => {
            const config = typeConfig[notif.type];
            return (
              <motion.div
                key={notif.id}
                variants={fadeUp}
                className={`card-theme border rounded-2xl p-4 flex items-start gap-4 transition ${
                  !notif.read ? "border-purple-500/20 bg-purple-500/5" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center ${config.text} flex-shrink-0 mt-0.5`}
                >
                  {config.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-theme-primary font-semibold text-sm">
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm leading-relaxed">
                    {notif.msg}
                  </p>
                  <p className="text-theme-muted text-xs mt-1">{notif.time}</p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notif.read && (
                    <button
                      onClick={() => markRead(notif.id)}
                      title="Mark as read"
                      className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-green-500 hover:border-green-500/50 transition"
                    >
                      <FiCheck className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotif(notif.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </motion.div>
  );
};

export default Notifications;
