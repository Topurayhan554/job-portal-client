import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell,
  FiBriefcase,
  FiUser,
  FiMessageSquare,
  FiCheck,
  FiTrash2,
  FiCheckCircle,
  FiX,
  FiUsers,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { useState } from "react";
import useNotifications from "../../hooks/useNotifications";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const typeConfig = {
  new_user: {
    icon: <FiUsers className="w-4 h-4" />,
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  },
  new_job: {
    icon: <FiBriefcase className="w-4 h-4" />,
    bg: "bg-purple-500/10",
    text: "text-purple-500",
  },
  new_application: {
    icon: <FaRocket className="w-4 h-4" />,
    bg: "bg-green-500/10",
    text: "text-green-500",
  },
  status_update: {
    icon: <FiAward className="w-4 h-4" />,
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
  },
  job_approved: {
    icon: <FiTrendingUp className="w-4 h-4" />,
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
  },
  message: {
    icon: <FiMessageSquare className="w-4 h-4" />,
    bg: "bg-pink-500/10",
    text: "text-pink-500",
  },
  profile: {
    icon: <FiUser className="w-4 h-4" />,
    bg: "bg-orange-500/10",
    text: "text-orange-500",
  },
};

const Skeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="card-theme border rounded-2xl p-4 flex gap-4 animate-pulse"
      >
        <div className="w-10 h-10 bg-theme-primary/30 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-theme-primary/30 rounded w-1/2" />
          <div className="h-3 bg-theme-primary/20 rounded w-3/4" />
          <div className="h-3 bg-theme-primary/10 rounded w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

const Notifications = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    loading,
    markRead,
    markAllRead,
    deleteNotif,
    clearAll,
  } = useNotifications();

  const [filter, setFilter] = useState("All");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filtered = notifications.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Read") return n.read;
    return true;
  });

  // Click notification → mark read + navigate
  const handleClick = async (notif) => {
    if (!notif.read) await markRead(notif._id);
    if (notif.link) navigate(notif.link);
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

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
            {unreadCount > 0
              ? `${unreadCount} unread notifications`
              : "All caught up!"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-purple-500 hover:text-purple-400 text-sm font-medium transition"
            >
              <FiCheckCircle className="w-4 h-4" /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-400 text-sm font-medium transition"
            >
              <FiX className="w-4 h-4" /> Clear all
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter Tabs */}
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
            {f === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 bg-purple-500/20 text-purple-400 text-xs px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* List */}
      {loading ? (
        <Skeleton />
      ) : (
        <motion.div variants={stagger} className="space-y-2">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                variants={fadeUp}
                key="empty"
                className="card-theme border rounded-2xl p-16 text-center"
              >
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FiBell className="w-7 h-7 text-purple-500" />
                </div>
                <p className="text-theme-secondary font-medium">
                  No notifications yet
                </p>
                <p className="text-theme-muted text-sm mt-1">
                  {filter === "Unread"
                    ? "You're all caught up!"
                    : "Notifications will appear here"}
                </p>
              </motion.div>
            ) : (
              filtered.map((notif) => {
                const config = typeConfig[notif.type] || typeConfig["message"];
                return (
                  <motion.div
                    key={notif._id}
                    variants={fadeUp}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    onClick={() => handleClick(notif)}
                    className={`card-theme border rounded-2xl p-4 flex items-start gap-4 transition cursor-pointer group ${
                      !notif.read
                        ? "border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40"
                        : "hover:border-purple-500/20"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center ${config.text} flex-shrink-0 mt-0.5`}
                    >
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-theme-primary font-semibold text-sm group-hover:text-purple-500 transition truncate">
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-theme-secondary text-sm leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <p className="text-theme-muted text-xs">
                          {formatTime(notif.createdAt)}
                        </p>
                        {notif.link && (
                          <span className="text-xs text-purple-500 opacity-0 group-hover:opacity-100 transition">
                            Click to view →
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      className="flex items-center gap-1 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!notif.read && (
                        <button
                          onClick={() => markRead(notif._id)}
                          title="Mark as read"
                          className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-green-500 hover:border-green-500/50 transition"
                        >
                          <FiCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotif(notif._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Clear All Confirm Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowClearConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-theme-card border border-theme rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10"
            >
              <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-theme-primary font-bold text-center mb-2">
                Clear All Notifications?
              </h3>
              <p className="text-theme-muted text-sm text-center mb-6">
                This will permanently delete all your notifications.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary text-sm transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearAll();
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Notifications;
