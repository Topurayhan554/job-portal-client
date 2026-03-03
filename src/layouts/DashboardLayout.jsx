import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaBars, FaTimes } from "react-icons/fa";
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
import toast from "react-hot-toast";

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
    {
      label: "Recommended Jobs",
      path: "/seeker/recommended",
      icon: <FiStar />,
    },
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

const DashboardLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = sidebarLinks[role] || [];
  const profileComplete = 98;

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-theme flex-shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <FaBriefcase className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-theme-primary">
            Job<span className="text-purple-500">Portal</span>
          </span>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-5 py-5 border-b border-theme flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg leading-none">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-theme-primary font-semibold text-sm truncate">
                {user?.name}
              </p>
              <span className="text-purple-500 text-xs">✎</span>
            </div>
          </div>
        </div>

        {/* Profile Complete Bar */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl px-3 py-2">
          <p className="text-white text-xs font-semibold mb-1">
            {profileComplete}% Profile Complete
          </p>
          <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${profileComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/30"
                  : "text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-theme flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
        <p className="text-theme-muted text-xs text-center mt-4">
          © {new Date().getFullYear()} qIS Lab. All Rights Reserved <br />
          <span className="hover:text-purple-500 cursor-pointer">
            Privacy Policy
          </span>
          {" · "}
          <span className="hover:text-purple-500 cursor-pointer">
            Terms of Service
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-theme-primary overflow-hidden">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden lg:flex flex-col w-64 bg-theme-secondary border-r border-theme flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* ===== Mobile Sidebar Overlay ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
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

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-6 h-16 border-b border-theme bg-theme-secondary flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary"
          >
            <FaBars className="w-4 h-4" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white w-3 h-3" />
            </div>
            <span className="font-bold text-theme-primary">
              Job<span className="text-purple-500">Portal</span>
            </span>
          </Link>

          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold leading-none">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Desktop Top Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4  border-b border-theme bg-theme-secondary flex-shrink-0">
          <h1 className="text-xl font-bold text-theme-primary leading-none">
            {links.find((item) => location.pathname === item.path)?.label ||
              "Dashboard"}
          </h1>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary hover:text-theme-primary transition flex-shrink-0">
              <FiBell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {/* Settings */}
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary hover:text-theme-primary transition flex-shrink-0">
              <FiSettings className="w-4 h-4" />
            </button>
            {/* Avatar */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-9 h-9 rounded-xl object-cover border-2 border-purple-500 flex-shrink-0"
              />
            ) : (
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold leading-none">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
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
