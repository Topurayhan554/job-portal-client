import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiCheck,
  FiShield,
  FiActivity,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Field = ({
  label,
  value,
  onChange,
  icon,
  placeholder,
  disabled,
  type = "text",
}) => (
  <div>
    <label className="block text-xs font-medium text-theme-muted mb-1.5">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-theme w-full border rounded-xl py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition
          ${icon ? "pl-10 pr-4" : "px-4"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </div>
  </div>
);

const AdminProfile = () => {
  const { user, refreshUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      fd,
    );
    return res.data.data.url;
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max 2MB");
      return;
    }

    setPhotoUploading(true);
    try {
      const url = await uploadImage(file);
      await api.put("/users/me", { profilePhoto: url });
      await refreshUser();
      toast.success("Profile photo updated! ✅");
    } catch {
      toast.error("Upload failed");
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Max 3MB");
      return;
    }

    setCoverUploading(true);
    try {
      const url = await uploadImage(file);
      await api.put("/users/me", { coverPhoto: url });
      await refreshUser();
      toast.success("Cover photo updated! ✅");
    } catch {
      toast.error("Upload failed");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/users/me", formData);
      await refreshUser();
      toast.success("Profile updated! ✅");
      setEditing(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const getPhoto = () => user?.profilePhoto || user?.photoURL || null;

  const adminStats = [
    {
      label: "Role",
      value: "Administrator",
      icon: <FaShieldAlt />,
      color: "text-red-500 bg-red-500/10",
    },
    {
      label: "Status",
      value: "Active",
      icon: <FiActivity />,
      color: "text-green-500 bg-green-500/10",
    },
    {
      label: "Access Level",
      value: "Full Access",
      icon: <FiShield />,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      label: "Member Since",
      value: new Date(user?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
      icon: <FiUsers />,
      color: "text-blue-500 bg-blue-500/10",
    },
  ];

  const adminPermissions = [
    { label: "Manage Users", desc: "Ban, unban, change roles", enabled: true },
    {
      label: "Manage Jobs",
      desc: "Approve, reject, delete listings",
      enabled: true,
    },
    {
      label: "View Applications",
      desc: "Access all applications",
      enabled: true,
    },
    { label: "Security Monitor", desc: "View logs and reports", enabled: true },
    {
      label: "System Settings",
      desc: "Configure platform settings",
      enabled: true,
    },
    {
      label: "Analytics Access",
      desc: "View all platform analytics",
      enabled: true,
    },
  ];

  if (!user) return <Spinner />;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* ===== Profile Header ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        {/* Cover */}
        <div className="relative h-40 group">
          {user?.coverPhoto ? (
            <img
              src={user.coverPhoto}
              alt="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500" />
          )}
          {/* Cover pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl transition backdrop-blur-sm">
              {coverUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiCamera className="w-4 h-4" />
              )}
              {coverUploading ? "Uploading..." : "Change Cover"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </label>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 mb-5">
            {/* Profile Photo */}
            <div className="relative group/photo">
              {getPhoto() ? (
                <img
                  src={getPhoto()}
                  alt="profile"
                  className="w-24 h-24 rounded-2xl border-4 border-theme object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl border-4 border-theme flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <label className="cursor-pointer absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                {photoUploading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiCamera className="w-6 h-6 text-white" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
              {/* Admin badge */}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center border-2 border-theme">
                <FaShieldAlt className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Edit / Save */}
            <button
              onClick={() => (editing ? handleSave() : setEditing(true))}
              disabled={saving}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                editing
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "border border-theme text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                  Saving...
                </>
              ) : editing ? (
                <>
                  <FiSave className="w-4 h-4" /> Save Changes
                </>
              ) : (
                <>
                  <FiEdit2 className="w-4 h-4" /> Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Info / Form */}
          <AnimatePresence mode="wait">
            {editing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Field
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  icon={<FiUser />}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  value={user?.email}
                  disabled
                  icon={<FiMail />}
                />
                <Field
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  icon={<FiPhone />}
                  placeholder="+880 1700-000000"
                />
                <Field
                  label="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  icon={<FiMapPin />}
                  placeholder="City, Country"
                />
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-theme-muted mb-1.5">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Write something about yourself..."
                    className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1.5 text-theme-muted hover:text-theme-primary text-sm transition"
                  >
                    <FiX className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-theme-primary">
                    {user?.name}
                  </h2>
                  <span className="flex items-center gap-1.5 bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <FaShieldAlt className="w-3 h-3" /> Admin
                  </span>
                </div>
                <p className="text-theme-muted text-sm leading-relaxed max-w-xl">
                  {user?.bio ||
                    "No bio added yet. Click Edit Profile to add one."}
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-theme-secondary">
                  <span className="flex items-center gap-1.5">
                    <FiMail className="w-4 h-4 text-theme-muted" />
                    {user?.email}
                  </span>
                  {user?.phone && (
                    <span className="flex items-center gap-1.5">
                      <FiPhone className="w-4 h-4 text-theme-muted" />
                      {user.phone}
                    </span>
                  )}
                  {user?.location && (
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="w-4 h-4 text-theme-muted" />
                      {user.location}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ===== Admin Stats ===== */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {adminStats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="card-theme border rounded-2xl p-4"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <p className="text-theme-primary font-semibold text-sm">
              {stat.value}
            </p>
            <p className="text-theme-muted text-xs mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Permissions ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-5 flex items-center gap-2">
          <FiShield className="text-red-500 w-4 h-4" /> Admin Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {adminPermissions.map((perm, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 bg-theme-primary/30 border border-theme rounded-xl hover:border-red-500/20 transition"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  perm.enabled ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <FiCheck className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-theme-primary text-sm font-medium">
                  {perm.label}
                </p>
                <p className="text-theme-muted text-xs mt-0.5">{perm.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== Account Info ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-5 flex items-center gap-2">
          <FiUser className="text-red-500 w-4 h-4" /> Account Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Account ID", value: user?._id },
            { label: "Email", value: user?.email },
            { label: "Role", value: "Administrator" },
            { label: "Status", value: user?.status || "Active" },
            {
              label: "Joined",
              value: new Date(user?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            },
            { label: "Last Active", value: "Just now" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="text-theme-muted text-xs font-medium">
                {item.label}
              </p>
              <p
                className={`text-theme-primary text-sm font-medium truncate ${
                  item.label === "Account ID"
                    ? "font-mono text-xs text-theme-muted"
                    : ""
                }`}
              >
                {item.label === "Status" ? (
                  <span className="inline-flex items-center gap-1.5 text-green-500 bg-green-500/10 px-2.5 py-0.5 rounded-full text-xs">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== Danger Zone ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border border-red-500/20 rounded-2xl p-6 bg-red-500/5"
      >
        <h3 className="font-semibold text-red-500 mb-1 flex items-center gap-2">
          <FiShield className="w-4 h-4" /> Security Notice
        </h3>
        <p className="text-theme-muted text-sm mb-4">
          As an administrator, your account has elevated privileges. Keep your
          credentials secure and never share your access.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 text-sm border border-red-500/30 text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-xl transition">
            Change Password
          </button>
          <button className="flex items-center gap-2 text-sm border border-theme text-theme-secondary hover:text-theme-primary px-4 py-2 rounded-xl transition">
            View Login History
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminProfile;
