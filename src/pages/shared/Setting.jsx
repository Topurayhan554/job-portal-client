import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiBell,
  FiShield,
  FiTrash2,
  FiSave,
  FiEye,
  FiEyeOff,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const tabs = [
  { id: "account", label: "Account", icon: <FiUser /> },
  { id: "password", label: "Password", icon: <FiLock /> },
  { id: "notifications", label: "Notifications", icon: <FiBell /> },
  { id: "privacy", label: "Privacy", icon: <FiShield /> },
  { id: "danger", label: "Danger Zone", icon: <FiTrash2 /> },
];

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${checked ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${checked ? "translate-x-6" : "translate-x-0"}`}
    />
  </button>
);

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [notifSettings, setNotifSettings] = useState({
    emailJobs: true,
    emailApplications: true,
    emailMessages: false,
    pushJobs: true,
    pushApplications: true,
    pushMessages: true,
    newsletter: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    profileSearch: true,
  });

  const toggleNotif = (key) =>
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  const togglePrivacy = (key) =>
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">Settings</h2>
        <p className="text-theme-muted text-sm mt-1">
          Manage your account preferences
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <motion.div variants={fadeUp} className="lg:w-56 flex-shrink-0">
          <div className="card-theme border rounded-2xl p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap w-full ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
                } ${tab.id === "danger" ? "text-red-500 hover:bg-red-500/10" : ""}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={fadeUp} className="flex-1">
          {/* ===== Account ===== */}
          {activeTab === "account" && (
            <div className="card-theme border rounded-2xl p-6 space-y-5">
              <h3 className="font-semibold text-theme-primary border-b border-theme pb-3">
                Account Information
              </h3>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-theme-primary font-semibold">
                    {user?.name}
                  </p>
                  <p className="text-theme-muted text-sm capitalize">
                    {user?.role}
                  </p>
                  <button className="text-purple-500 hover:text-purple-400 text-sm mt-1 transition">
                    Change Photo
                  </button>
                </div>
              </div>

              {[
                { label: "Full Name", defaultValue: user?.name, type: "text" },
                {
                  label: "Email Address",
                  defaultValue: user?.email,
                  type: "email",
                },
                {
                  label: "Phone Number",
                  defaultValue: user?.phone || "",
                  type: "tel",
                },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-theme-secondary mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    defaultValue={field.defaultValue}
                    className="input-theme w-full border rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue="Passionate developer looking for exciting opportunities."
                  className="input-theme w-full border rounded-xl px-4 py-3 text-sm resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                <FiSave className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {/* ===== Password ===== */}
          {activeTab === "password" && (
            <div className="card-theme border rounded-2xl p-6 space-y-5">
              <h3 className="font-semibold text-theme-primary border-b border-theme pb-3">
                Change Password
              </h3>

              {[
                { label: "Current Password", key: "current" },
                { label: "New Password", key: "new" },
                { label: "Confirm New Password", key: "confirm" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-theme-secondary mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={showPass[field.key] ? "text" : "password"}
                      placeholder="••••••••"
                      className="input-theme w-full border rounded-xl px-4 py-3 pr-12 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPass((p) => ({
                          ...p,
                          [field.key]: !p[field.key],
                        }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary transition"
                    >
                      {showPass[field.key] ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-500 text-sm font-medium mb-2">
                  Password Requirements:
                </p>
                <ul className="space-y-1 text-xs text-theme-secondary">
                  {[
                    "At least 8 characters",
                    "One uppercase letter",
                    "One lowercase letter",
                    "One number",
                  ].map((req, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                <FiSave className="w-4 h-4" /> Update Password
              </button>
            </div>
          )}

          {/* ===== Notifications ===== */}
          {activeTab === "notifications" && (
            <div className="card-theme border rounded-2xl p-6 space-y-6">
              <h3 className="font-semibold text-theme-primary border-b border-theme pb-3">
                Notification Preferences
              </h3>

              {[
                {
                  title: "Email Notifications",
                  items: [
                    {
                      key: "emailJobs",
                      label: "New job recommendations",
                      desc: "Get emailed when new jobs match your profile",
                    },
                    {
                      key: "emailApplications",
                      label: "Application updates",
                      desc: "Status changes on your applications",
                    },
                    {
                      key: "emailMessages",
                      label: "New messages",
                      desc: "When you receive a new message",
                    },
                    {
                      key: "newsletter",
                      label: "Newsletter",
                      desc: "Weekly job market insights and tips",
                    },
                  ],
                },
                {
                  title: "Push Notifications",
                  items: [
                    {
                      key: "pushJobs",
                      label: "New job alerts",
                      desc: "Real-time job match notifications",
                    },
                    {
                      key: "pushApplications",
                      label: "Application updates",
                      desc: "Instant updates on your applications",
                    },
                    {
                      key: "pushMessages",
                      label: "Messages",
                      desc: "New message notifications",
                    },
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="text-theme-primary font-medium mb-3 text-sm">
                    {section.title}
                  </h4>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <p className="text-theme-primary text-sm font-medium">
                            {item.label}
                          </p>
                          <p className="text-theme-muted text-xs mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <Toggle
                          checked={notifSettings[item.key]}
                          onChange={() => toggleNotif(item.key)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                <FiSave className="w-4 h-4" /> Save Preferences
              </button>
            </div>
          )}

          {/* ===== Privacy ===== */}
          {activeTab === "privacy" && (
            <div className="card-theme border rounded-2xl p-6 space-y-5">
              <h3 className="font-semibold text-theme-primary border-b border-theme pb-3">
                Privacy Settings
              </h3>

              <div className="space-y-3">
                {[
                  {
                    key: "profilePublic",
                    label: "Public Profile",
                    desc: "Allow anyone to view your profile",
                  },
                  {
                    key: "showEmail",
                    label: "Show Email",
                    desc: "Display your email on your public profile",
                  },
                  {
                    key: "showPhone",
                    label: "Show Phone",
                    desc: "Display your phone number on your profile",
                  },
                  {
                    key: "allowMessages",
                    label: "Allow Messages",
                    desc: "Let employers send you messages",
                  },
                  {
                    key: "profileSearch",
                    label: "Appear in Search",
                    desc: "Allow your profile to appear in search results",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-2 border-b border-theme last:border-0"
                  >
                    <div>
                      <p className="text-theme-primary text-sm font-medium">
                        {item.label}
                      </p>
                      <p className="text-theme-muted text-xs mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <Toggle
                      checked={privacySettings[item.key]}
                      onChange={() => togglePrivacy(item.key)}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                <FiSave className="w-4 h-4" /> Save Settings
              </button>
            </div>
          )}

          {/* ===== Danger Zone ===== */}
          {activeTab === "danger" && (
            <div className="space-y-4">
              <div className="card-theme border border-yellow-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-yellow-500 mb-1">
                  Deactivate Account
                </h3>
                <p className="text-theme-muted text-sm mb-4">
                  Temporarily deactivate your account. You can reactivate it
                  anytime by logging in.
                </p>
                <button className="flex items-center gap-2 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 px-5 py-2.5 rounded-xl text-sm font-medium transition">
                  Deactivate Account
                </button>
              </div>

              <div className="card-theme border border-red-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-red-500 mb-1">
                  Delete Account
                </h3>
                <p className="text-theme-muted text-sm mb-4">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                  <p className="text-red-500 text-xs">
                    ⚠️ This will permanently delete your profile, applications,
                    messages, and all other data.
                  </p>
                </div>
                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
                  <FiTrash2 className="w-4 h-4" /> Delete My Account
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
