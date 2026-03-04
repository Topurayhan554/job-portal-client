import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiGlobe,
  FiPhone,
  FiMapPin,
  FiUsers,
  FiPlus,
  FiTrash2,
  FiBriefcase,
} from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import { useEmployerProfile, uploadImage } from "../../hooks/useEmployer";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

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
        className={`input-theme w-full border rounded-xl py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition
          ${icon ? "pl-10 pr-4" : "px-4"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </div>
  </div>
);

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const EmployerProfile = () => {
  const { profile, loading, updateProfile } = useEmployerProfile();
  const { refreshUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [newBenefit, setNewBenefit] = useState("");
  const [benefits, setBenefits] = useState([]);

  if (!loading && profile && formData === null) {
    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
      location: profile.location || "",
      companyName: profile.companyName || "",
      companyWebsite: profile.companyWebsite || "",
      companySize: profile.companySize || "",
      companyBio: profile.companyBio || "",
    });
    setBenefits(profile.benefits || []);
  }

  const getPhoto = () => profile?.profilePhoto || profile?.photoURL || null;

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    setPhotoUploading(true);
    try {
      const url = await uploadImage(file);
      await updateProfile({ profilePhoto: url });
      await refreshUser();
      toast.success("Photo updated! ✅");
    } catch {
      toast.error("Upload failed");
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverUploading(true);
    try {
      const url = await uploadImage(file);
      await updateProfile({ coverPhoto: url });
      await refreshUser();
      toast.success("Cover updated! ✅");
    } catch {
      toast.error("Upload failed");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ ...formData, benefits });
    await refreshUser();
    setSaving(false);
    setEditing(false);
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

  if (loading || !profile || !formData) return <Spinner />;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Header Card */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        {/* Cover */}
        <div className="relative h-40 group">
          {profile?.coverPhoto ? (
            <img
              src={profile.coverPhoto}
              alt="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600" />
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl backdrop-blur-sm transition">
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
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl border-4 border-theme flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {profile?.name?.charAt(0).toUpperCase()}
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
            </div>

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
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : editing ? (
                <>
                  <FiSave className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <FiEdit2 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

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
                  label="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  icon={<FiBriefcase />}
                  placeholder="Full name"
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
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  icon={<FaBriefcase />}
                  placeholder="Company Ltd."
                />
                <Field
                  label="Website"
                  value={formData.companyWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, companyWebsite: e.target.value })
                  }
                  icon={<FiGlobe />}
                  placeholder="https://company.com"
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
                <div>
                  <label className="block text-xs font-medium text-theme-muted mb-1.5">
                    Company Size
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {companySizes.map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setFormData({ ...formData, companySize: s })
                        }
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition border ${
                          formData.companySize === s
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent"
                            : "border-theme text-theme-secondary hover:text-theme-primary"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-theme-muted mb-1.5">
                    Company Bio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.companyBio}
                    onChange={(e) =>
                      setFormData({ ...formData, companyBio: e.target.value })
                    }
                    placeholder="Describe your company..."
                    className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
                <h2 className="text-xl font-bold text-theme-primary">
                  {profile?.companyName || profile?.name}
                </h2>
                <p className="text-purple-500 text-sm font-medium mt-0.5">
                  {profile?.name} · Employer
                </p>
                <p className="text-theme-muted text-sm mt-2 max-w-xl leading-relaxed">
                  {profile?.companyBio || "No company bio added yet."}
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-theme-secondary">
                  {profile?.companyWebsite && (
                    <a
                      href={profile.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-purple-500 hover:text-purple-400 transition"
                    >
                      <FiGlobe className="w-4 h-4" />
                      {profile.companyWebsite}
                    </a>
                  )}
                  {profile?.location && (
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="w-4 h-4 text-theme-muted" />
                      {profile.location}
                    </span>
                  )}
                  {profile?.companySize && (
                    <span className="flex items-center gap-1.5">
                      <FiUsers className="w-4 h-4 text-theme-muted" />
                      {profile.companySize} employees
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-4">
          Company Benefits
        </h3>
        <div className="flex flex-wrap gap-2 mb-4 min-h-[36px]">
          {benefits.length === 0 && (
            <p className="text-theme-muted text-sm">No benefits added yet.</p>
          )}
          <AnimatePresence>
            {benefits.map((b) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5 bg-purple-500/10 text-purple-500 border border-purple-500/20 text-sm px-3 py-1.5 rounded-xl"
              >
                {b}
                <button
                  onClick={() => setBenefits(benefits.filter((x) => x !== b))}
                  className="hover:text-red-400 transition"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <input
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addBenefit()}
            placeholder="Add a benefit (e.g. Health Insurance)..."
            className="input-theme border rounded-xl px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addBenefit}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Add
          </button>
        </div>
        {benefits.length > 0 && (
          <button
            onClick={() => updateProfile({ benefits })}
            className="mt-3 text-xs text-purple-500 hover:text-purple-400 transition flex items-center gap-1"
          >
            <FiSave className="w-3 h-3" /> Save benefits
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EmployerProfile;
