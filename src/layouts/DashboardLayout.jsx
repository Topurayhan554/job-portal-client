import { useState, useCallback } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaBars } from "react-icons/fa";
import {
  FiHome,
  FiUser,
  FiMessageSquare,
  FiFileText,
  FiSearch,
  FiBookmark,
  FiStar,
  FiFile,
  FiEye,
  FiBell,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiGrid,
  FiPlusCircle,
  FiClipboard,
  FiShield,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useNotifications from "../hooks/useNotifications";
import toast from "react-hot-toast";

//  Sidebar Links
const sidebarLinks = {
  seeker: [
    { label: "Dashboard", path: "/seeker/dashboard", icon: <FiHome /> },
    { label: "Profile", path: "/seeker/profile", icon: <FiUser /> },
    { label: "Messages", path: "/seeker/messages", icon: <FiMessageSquare /> },
    {
      label: "Applied Jobs",
      path: "/seeker/applications",
      icon: <FiFileText />,
    },
    { label: "Find Jobs", path: "/jobs", icon: <FiSearch /> },
    { label: "Saved Jobs", path: "/seeker/saved", icon: <FiBookmark /> },
    { label: "Recommended", path: "/seeker/recommended", icon: <FiStar /> },
    { label: "CV Manager", path: "/seeker/cv", icon: <FiFile /> },

    { label: "Profile Views", path: "/seeker/views", icon: <FiEye /> },
    { label: "Notifications", path: "/seeker/notifications", icon: <FiBell /> },
    { label: "Settings", path: "/seeker/settings", icon: <FiSettings /> },
  ],
  employer: [
    { label: "Dashboard", path: "/employer/dashboard", icon: <FiHome /> },
    { label: "Profile", path: "/employer/profile", icon: <FiUser /> },
    { label: "Post a Job", path: "/employer/post-job", icon: <FiPlusCircle /> },
    { label: "My Jobs", path: "/employer/jobs", icon: <FaBriefcase /> },
    { label: "Applicants", path: "/employer/applicants", icon: <FiUsers /> },
    {
      label: "Messages",
      path: "/employer/messages",
      icon: <FiMessageSquare />,
    },
    {
      label: "Notifications",
      path: "/employer/notifications",
      icon: <FiBell />,
    },
    { label: "Settings", path: "/employer/settings", icon: <FiSettings /> },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { label: "Profile", path: "/admin/profile", icon: <FiUser /> },
    { label: "Manage Users", path: "/admin/users", icon: <FiUsers /> },
    { label: "Manage Jobs", path: "/admin/jobs", icon: <FiClipboard /> },
    {
      label: "Applications",
      path: "/admin/applications",
      icon: <FiFileText />,
    },
    { label: "Messages", path: "/admin/messages", icon: <FiMessageSquare /> },
    { label: "Notifications", path: "/admin/notifications", icon: <FiBell /> },
    { label: "Settings", path: "/admin/settings", icon: <FiSettings /> },
    { label: "Security", path: "/admin/security", icon: <FiShield /> },
  ],
};

//  Profile Completion
const calcProfileComplete = (user) => {
  if (!user) return 0;
  const checks = [
    !!user.profilePhoto,
    !!user.phone,
    !!user.bio,
    !!user.location,
  ];
  if (user.role === "seeker") {
    checks.push(
      (user.skills || []).length > 0,
      (user.experience || []).length > 0,
      (user.education || []).length > 0,
      !!user.cvUrl,
    );
  } else if (user.role === "employer") {
    checks.push(!!user.companyName, !!user.companyWebsite, !!user.companyBio);
  } else if (user.role === "admin") {
    checks.push(!!user.name);
  }
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

const getNotifPath = (role) => `/${role}/notifications`;
const getSettingsPath = (role) => `/${role}/settings`;

//  Avatar
const Avatar = ({ user, size = "sm", className = "" }) => {
  const photo = user?.profilePhoto || user?.photoURL;
  const dims = size === "sm" ? "w-9 h-9" : "w-12 h-12";
  const text = size === "sm" ? "text-sm" : "text-lg";
  const rounded = size === "sm" ? "rounded-xl" : "rounded-full";

  return photo ? (
    <img
      src={photo}
      alt={user?.name}
      className={`${dims} ${rounded} object-cover flex-shrink-0 ${className}`}
    />
  ) : (
    <div
      className={`${dims} bg-gradient-to-br from-purple-500 to-blue-500 ${rounded} flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <span className={`text-white font-bold ${text} leading-none`}>
        {user?.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

//  Main Component
const DashboardLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Real notification count
  const { unreadCount } = useNotifications();

  const links = sidebarLinks[role] || [];
  const profileComplete = calcProfileComplete(user);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  //  Sidebar Content
  const SidebarContent = useCallback(
    () => (
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-theme flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaBriefcase className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-theme-primary">
              Kaaj<span className="text-purple-500">Khojo</span>
            </span>
          </Link>
        </div>

        {/* User Info */}
        <div className="px-5 py-4 border-b border-theme flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <Avatar user={user} size="lg" />
            <div className="flex-1 min-w-0">
              <p className="text-theme-primary font-semibold text-sm truncate">
                {user?.name}
              </p>
              <p className="text-theme-muted text-xs capitalize mt-0.5">
                {user?.role}
              </p>
            </div>
          </div>

          {/* Profile Complete Bar */}
          <Link
            to={`/${role}/profile`}
            className="block bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl px-3 py-2 hover:opacity-90 transition"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-white text-xs font-semibold">
                Profile Complete
              </p>
              <p className="text-white text-xs font-bold">{profileComplete}%</p>
            </div>
            <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profileComplete}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
            {profileComplete < 100 && (
              <p className="text-blue-100 text-xs mt-1">
                {100 - profileComplete}% left — complete now →
              </p>
            )}
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const isNotif = link.path.includes("notifications");

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/20"
                    : "text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  {link.icon}
                </span>
                {link.label}

                {/* Real unread badge in sidebar */}
                {isNotif && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout + Footer */}
        <div className="px-3 py-4 border-t border-theme flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
          >
            <FiLogOut className="w-4 h-4" /> Sign Out
          </button>
          <p className="text-theme-muted text-xs text-center mt-3 leading-relaxed">
            © {new Date().getFullYear()} JobPortal. All rights reserved. <br />
            <span className="hover:text-purple-500 cursor-pointer transition">
              Privacy
            </span>
            {" · "}
            <span className="hover:text-purple-500 cursor-pointer transition">
              Terms
            </span>
          </p>
        </div>
      </div>
    ),
    [user, location.pathname, profileComplete, unreadCount],
  );

  const pageTitle =
    links.find((item) => location.pathname === item.path)?.label || "Dashboard";

  return (
    <div className="flex h-screen bg-theme-primary overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-theme-secondary border-r border-theme flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-theme-secondary border-r border-theme z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-16 border-b border-theme bg-theme-secondary flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary hover:text-theme-primary transition"
          >
            <FaBars className="w-4 h-4" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white w-3 h-3" />
            </div>
            <span className="font-bold text-theme-primary text-sm">
              Job<span className="text-purple-500">Portal</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Mobile notification bell — real count */}
            <button
              onClick={() => navigate(getNotifPath(role))}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary hover:text-theme-primary transition"
            >
              <FiBell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
            <Avatar
              user={user}
              size="sm"
              className="border-2 border-purple-500/50"
            />
          </div>
        </header>

        {/* Desktop Top Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-theme bg-theme-secondary flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-theme-primary leading-none">
              {pageTitle}
            </h1>
            <p className="text-theme-muted text-xs mt-0.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop notification bell — real count + animate */}
            <button
              onClick={() => navigate(getNotifPath(role))}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary hover:text-theme-primary hover:border-purple-500/50 transition"
              title="Notifications"
            >
              <FiBell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate(getSettingsPath(role))}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary hover:text-theme-primary hover:border-purple-500/50 transition"
              title="Settings"
            >
              <FiSettings className="w-4 h-4" />
            </button>

            {/* Avatar */}
            <button
              onClick={() => navigate(`/${role}/profile`)}
              className="flex items-center gap-2 border border-theme bg-theme-card hover:border-purple-500/50 rounded-xl px-2.5 py-1.5 transition group"
              title="My Profile"
            >
              <Avatar
                user={user}
                size="sm"
                className="border-2 border-transparent group-hover:border-purple-500 transition rounded-lg"
              />
              <div className="hidden xl:block text-left">
                <p className="text-theme-primary text-xs font-semibold leading-none truncate max-w-[100px]">
                  {user?.name}
                </p>
                <p className="text-theme-muted text-xs mt-0.5 capitalize">
                  {user?.role}
                </p>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
