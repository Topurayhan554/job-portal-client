import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBriefcase, FaBars, FaTimes } from "react-icons/fa";
import { FiUser, FiLogOut, FiSettings, FiSun, FiMoon } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const profileRef = useRef(null);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/login");
      setShowProfileMenu(false);
      setMenuOpen(false);
    } catch {
      toast.error("Logout failed");
    }
  };

  const getDashboardLink = () => {
    if (user?.role === "seeker") return "/seeker/dashboard";
    if (user?.role === "employer") return "/employer/dashboard";
    if (user?.role === "admin") return "/admin/dashboard";
    return "/";
  };

  //profilePhoto first, photoURL fallback
  const getPhoto = () => user?.profilePhoto || user?.photoURL || null;

  const navLinks = [
    { name: "Browse Jobs", path: "/jobs" },
    ...(user?.role === "employer"
      ? [{ name: "Post a Job", path: "/employer/post-job" }]
      : []),
    ...(user ? [{ name: "Dashboard", path: getDashboardLink() }] : []),
  ];

  const roleColor = {
    seeker: "bg-blue-500",
    employer: "bg-purple-500",
    admin: "bg-red-500",
  };

  // ===== Reusable Avatar =====
  const Avatar = ({ size = "sm", border = "" }) => {
    const dimensions = size === "sm" ? "w-8 h-8" : "w-12 h-12";
    const textSize = size === "sm" ? "text-sm" : "text-lg";
    const rounded = size === "sm" ? "rounded-lg" : "rounded-xl";

    return getPhoto() ? (
      <img
        src={getPhoto()}
        alt={user?.name}
        className={`${dimensions} ${rounded} object-cover ${border}`}
      />
    ) : (
      <div
        className={`${dimensions} bg-gradient-to-br from-purple-500 to-blue-500 ${rounded} flex items-center justify-center ${border}`}
      >
        <span className={`text-white ${textSize} font-bold`}>
          {user?.name?.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "navbar-scrolled" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaBriefcase className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-theme-primary">
              Kaaj<span className="text-purple-500">Khojo</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/30"
                      : "text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-theme bg-black/5 dark:bg-white/5 text-theme-secondary hover:text-theme-primary transition-all duration-300"
            >
              {theme === "dark" ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-theme-secondary hover:text-theme-primary text-sm font-medium px-4 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all shadow-lg shadow-purple-900/30"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 border border-theme bg-black/5 dark:bg-white/5 hover:border-purple-500/50 rounded-xl px-3 py-2 transition-all duration-300 group"
                >
                  {/* Avatar — profilePhoto || photoURL */}
                  {getPhoto() ? (
                    <img
                      src={getPhoto()}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover border-2 border-transparent group-hover:border-purple-500 transition"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="text-left hidden lg:block">
                    <p className="text-theme-primary text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-theme-muted text-xs mt-0.5 capitalize">
                      {user.role}
                    </p>
                  </div>
                </button>

                {/* Dropdown */}
                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-3 w-72 bg-theme-card border border-theme rounded-2xl shadow-2xl overflow-hidden z-50">
                    {/* Dropdown Header */}
                    <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600">
                      <div className="flex items-center gap-3">
                        {/* Dropdown Avatar */}
                        {getPhoto() ? (
                          <img
                            src={getPhoto()}
                            alt={user.name}
                            className="w-12 h-12 rounded-xl border-2 border-white object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white">
                            <span className="text-white text-lg font-bold">
                              {user.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold truncate">
                            {user.name}
                          </h4>
                          <p className="text-blue-100 text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase text-white ${
                            roleColor[user.role] || "bg-gray-500"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </div>

                    {/* Dropdown Links */}
                    <div className="p-2">
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-theme-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-theme-primary transition-all duration-200"
                      >
                        <FiUser className="w-4 h-4" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-theme-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-theme-primary transition-all duration-200"
                      >
                        <FiSettings className="w-4 h-4" />
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                      <div className="border-t border-theme my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-theme bg-black/5 dark:bg-white/5 text-theme-secondary"
            >
              {theme === "dark" ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-theme bg-black/5 dark:bg-white/5 text-theme-secondary hover:text-theme-primary transition"
            >
              {menuOpen ? (
                <FaTimes className="w-4 h-4" />
              ) : (
                <FaBars className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-6 pb-6 pt-2 bg-theme-nav backdrop-blur-lg border-t border-theme">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="border-t border-theme pt-4">
              {!user ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center text-theme-secondary border border-theme py-3 rounded-xl text-sm hover:bg-black/5 dark:hover:bg-white/5 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl text-sm hover:opacity-90 transition"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div>
                  {/* Mobile — profilePhoto || photoURL */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 mb-3">
                    <div className="flex items-center gap-3">
                      {getPhoto() ? (
                        <img
                          src={getPhoto()}
                          alt={user.name}
                          className="w-12 h-12 rounded-xl border-2 border-white object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white">
                          <span className="text-white text-lg font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold truncate">
                          {user.name}
                        </h4>
                        <p className="text-blue-100 text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase text-white ${
                          roleColor[user.role] || "bg-gray-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={getDashboardLink()}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-theme-secondary hover:bg-black/5 dark:hover:bg-white/5 transition mb-2"
                  >
                    <FiUser className="w-4 h-4" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-theme-secondary hover:bg-black/5 dark:hover:bg-white/5 transition mb-2"
                  >
                    <FiSettings className="w-4 h-4" />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold transition active:scale-95"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
