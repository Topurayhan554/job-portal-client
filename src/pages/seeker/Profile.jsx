import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiSave,
  FiX,
  FiCamera,
  FiCheck,
} from "react-icons/fi";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { useSeekerProfile } from "../../hooks/useSeeker";
import axios from "axios";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const modalAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// ===== Reusable Modal =====
const Modal = ({ title, onClose, onSave, saving, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div
      variants={modalAnim}
      initial="hidden"
      animate="visible"
      className="relative bg-theme-secondary border border-theme rounded-2xl w-full max-w-lg p-6 z-10 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-theme-primary text-lg">{title}</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-theme-primary transition"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
      {children}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
              Saving...
            </>
          ) : (
            <>
              <FiCheck className="w-4 h-4" /> Save
            </>
          )}
        </button>
      </div>
    </motion.div>
  </div>
);

// ===== Input Component =====
const Field = ({
  label,
  value,
  onChange,
  type = "text",
  icon,
  placeholder,
  disabled,
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
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-theme w-full border rounded-xl py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${icon ? "pl-10 pr-4" : "px-4"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </div>
  </div>
);

const SeekerProfile = () => {
  const { profile, loading, updateProfile } = useSeekerProfile();

  // ===== Basic Info =====
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  // ===== Photo Upload =====
  const [photoUploading, setPhotoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  // ===== Skills =====
  const [newSkill, setNewSkill] = useState("");
  const [skillsList, setSkillsList] = useState(null);

  // ===== Experience Modal =====
  const [expModal, setExpModal] = useState(false);
  const [expEdit, setExpEdit] = useState(null); // null = new, index = edit
  const [expForm, setExpForm] = useState({
    role: "",
    company: "",
    duration: "",
    desc: "",
  });
  const [expSaving, setExpSaving] = useState(false);

  // ===== Education Modal =====
  const [eduModal, setEduModal] = useState(false);
  const [eduEdit, setEduEdit] = useState(null);
  const [eduForm, setEduForm] = useState({
    degree: "",
    school: "",
    duration: "",
    grade: "",
  });
  const [eduSaving, setEduSaving] = useState(false);

  // ===== Init form data =====
  if (!loading && profile && formData === null) {
    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
      bio: profile.bio || "",
    });
    setSkillsList(profile.skills || []);
  }

  if (loading || !profile || !formData) return <Spinner />;

  // ===== Upload to imgbb =====
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      fd,
    );
    return res.data.data.url;
  };

  // ===== Profile Photo =====
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setPhotoUploading(true);
    try {
      const url = await uploadImage(file);
      await updateProfile({ profilePhoto: url });
      toast.success("Profile photo updated! ✅");
    } catch {
      toast.error("Upload failed");
    } finally {
      setPhotoUploading(false);
    }
  };

  // ===== Cover Photo =====
  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB");
      return;
    }

    setCoverUploading(true);
    try {
      const url = await uploadImage(file);
      await updateProfile({ coverPhoto: url });
      toast.success("Cover photo updated! ✅");
    } catch {
      toast.error("Upload failed");
    } finally {
      setCoverUploading(false);
    }
  };

  // ===== Save Basic Info =====
  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ ...formData, skills: skillsList });
    setSaving(false);
    setEditing(false);
  };

  // ===== Skills =====
  const addSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const removeSkill = (s) => setSkillsList(skillsList.filter((sk) => sk !== s));
  const saveSkills = () => updateProfile({ skills: skillsList });

  // ===== Experience =====
  const openAddExp = () => {
    setExpForm({ role: "", company: "", duration: "", desc: "" });
    setExpEdit(null);
    setExpModal(true);
  };
  const openEditExp = (idx) => {
    setExpForm({ ...profile.experience[idx] });
    setExpEdit(idx);
    setExpModal(true);
  };
  const saveExp = async () => {
    if (!expForm.role || !expForm.company) {
      toast.error("Role and Company are required");
      return;
    }
    setExpSaving(true);
    const updated = [...(profile.experience || [])];
    if (expEdit === null) updated.push(expForm);
    else updated[expEdit] = expForm;
    await updateProfile({ experience: updated });
    setExpSaving(false);
    setExpModal(false);
  };
  const deleteExp = async (idx) => {
    const updated = (profile.experience || []).filter((_, i) => i !== idx);
    await updateProfile({ experience: updated });
    toast.success("Experience removed");
  };

  // ===== Education =====
  const openAddEdu = () => {
    setEduForm({ degree: "", school: "", duration: "", grade: "" });
    setEduEdit(null);
    setEduModal(true);
  };
  const openEditEdu = (idx) => {
    setEduForm({ ...profile.education[idx] });
    setEduEdit(idx);
    setEduModal(true);
  };
  const saveEdu = async () => {
    if (!eduForm.degree || !eduForm.school) {
      toast.error("Degree and School are required");
      return;
    }
    setEduSaving(true);
    const updated = [...(profile.education || [])];
    if (eduEdit === null) updated.push(eduForm);
    else updated[eduEdit] = eduForm;
    await updateProfile({ education: updated });
    setEduSaving(false);
    setEduModal(false);
  };
  const deleteEdu = async (idx) => {
    const updated = (profile.education || []).filter((_, i) => i !== idx);
    await updateProfile({ education: updated });
    toast.success("Education removed");
  };

  return (
    <>
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
          {/* Cover Photo */}
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
            {/* Cover overlay on hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
            <div className="flex items-end justify-between -mt-12 mb-4">
              {/* Profile Photo */}
              <div className="relative group/photo">
                {profile?.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
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
                {/* Photo overlay */}
                <label className="cursor-pointer absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                  {photoUploading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
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

              {/* Edit/Save button */}
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

            {/* Form / View */}
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
                    placeholder="Your full name"
                  />
                  <Field
                    label="Email"
                    value={profile?.email}
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
                    value={formData.location || ""}
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
                      placeholder="Write a short bio about yourself..."
                      className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                  </div>
                  {/* Cancel */}
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
                    {profile?.name}
                  </h2>
                  <p className="text-purple-500 text-sm font-medium mt-0.5">
                    {(profile?.experience || [])[0]?.role || "Job Seeker"}
                  </p>
                  <p className="text-theme-muted text-sm mt-2 max-w-xl leading-relaxed">
                    {profile?.bio ||
                      "No bio added yet. Click Edit Profile to add one."}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-theme-secondary">
                    <span className="flex items-center gap-1.5">
                      <FiMail className="w-4 h-4 text-theme-muted" />
                      {profile?.email}
                    </span>
                    {profile?.phone && (
                      <span className="flex items-center gap-1.5">
                        <FiPhone className="w-4 h-4 text-theme-muted" />
                        {profile.phone}
                      </span>
                    )}
                    {formData?.location && (
                      <span className="flex items-center gap-1.5">
                        <FiMapPin className="w-4 h-4 text-theme-muted" />
                        {formData.location}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ===== Skills ===== */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-6"
        >
          <h3 className="font-semibold text-theme-primary mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[36px]">
            {skillsList.length === 0 && (
              <p className="text-theme-muted text-sm">No skills added yet.</p>
            )}
            <AnimatePresence>
              {skillsList.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 bg-purple-500/10 text-purple-500 border border-purple-500/20 text-sm px-3 py-1.5 rounded-xl"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
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
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add a skill (press Enter)..."
              className="input-theme border rounded-xl px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addSkill}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" /> Add
            </button>
          </div>
          {skillsList.length > 0 && (
            <button
              onClick={saveSkills}
              className="mt-3 text-xs text-purple-500 hover:text-purple-400 transition flex items-center gap-1"
            >
              <FiSave className="w-3 h-3" /> Save skills
            </button>
          )}
        </motion.div>

        {/* ===== Experience ===== */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FaBriefcase className="text-purple-500 w-4 h-4" /> Experience
            </h3>
            <button
              onClick={openAddExp}
              className="flex items-center gap-1.5 text-purple-500 hover:text-purple-400 text-sm transition border border-purple-500/30 hover:border-purple-500/60 px-3 py-1.5 rounded-xl"
            >
              <FiPlus className="w-3.5 h-3.5" /> Add Experience
            </button>
          </div>

          {(profile?.experience || []).length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-theme rounded-xl">
              <FaBriefcase className="w-8 h-8 text-theme-muted mx-auto mb-2" />
              <p className="text-theme-muted text-sm">
                No experience added yet
              </p>
              <button
                onClick={openAddExp}
                className="mt-2 text-purple-500 text-sm hover:text-purple-400 transition"
              >
                + Add your first experience
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  layout
                  className="flex gap-4 p-4 bg-theme-primary/30 rounded-xl border border-theme hover:border-purple-500/20 transition"
                >
                  <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-purple-500 w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-theme-primary font-semibold text-sm">
                      {exp.role}
                    </p>
                    <p className="text-purple-500 text-xs font-medium">
                      {exp.company}
                    </p>
                    <p className="text-theme-muted text-xs mt-0.5">
                      {exp.duration}
                    </p>
                    {exp.desc && (
                      <p className="text-theme-secondary text-xs mt-1.5 leading-relaxed">
                        {exp.desc}
                      </p>
                    )}
                  </div>
                  <div className="flex items-start gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => openEditExp(i)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition"
                    >
                      <FiEdit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => deleteExp(i)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ===== Education ===== */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FaGraduationCap className="text-purple-500 w-4 h-4" /> Education
            </h3>
            <button
              onClick={openAddEdu}
              className="flex items-center gap-1.5 text-purple-500 hover:text-purple-400 text-sm transition border border-purple-500/30 hover:border-purple-500/60 px-3 py-1.5 rounded-xl"
            >
              <FiPlus className="w-3.5 h-3.5" /> Add Education
            </button>
          </div>

          {(profile?.education || []).length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-theme rounded-xl">
              <FaGraduationCap className="w-8 h-8 text-theme-muted mx-auto mb-2" />
              <p className="text-theme-muted text-sm">No education added yet</p>
              <button
                onClick={openAddEdu}
                className="mt-2 text-purple-500 text-sm hover:text-purple-400 transition"
              >
                + Add your education
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.education.map((edu, i) => (
                <motion.div
                  key={i}
                  layout
                  className="flex gap-4 p-4 bg-theme-primary/30 rounded-xl border border-theme hover:border-blue-500/20 transition"
                >
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="text-blue-500 w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-theme-primary font-semibold text-sm">
                      {edu.degree}
                    </p>
                    <p className="text-blue-500 text-xs font-medium">
                      {edu.school}
                    </p>
                    <p className="text-theme-muted text-xs mt-0.5">
                      {edu.duration} {edu.grade && `· ${edu.grade}`}
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => openEditEdu(i)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-theme text-theme-muted hover:text-purple-500 hover:border-purple-500/50 transition"
                    >
                      <FiEdit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => deleteEdu(i)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ===== Experience Modal ===== */}
      <AnimatePresence>
        {expModal && (
          <Modal
            title={expEdit === null ? "Add Experience" : "Edit Experience"}
            onClose={() => setExpModal(false)}
            onSave={saveExp}
            saving={expSaving}
          >
            <div className="space-y-3">
              <Field
                label="Job Title *"
                value={expForm.role}
                onChange={(e) =>
                  setExpForm({ ...expForm, role: e.target.value })
                }
                placeholder="e.g. Frontend Developer"
              />
              <Field
                label="Company *"
                value={expForm.company}
                onChange={(e) =>
                  setExpForm({ ...expForm, company: e.target.value })
                }
                placeholder="e.g. TechCorp BD"
              />
              <Field
                label="Duration"
                value={expForm.duration}
                onChange={(e) =>
                  setExpForm({ ...expForm, duration: e.target.value })
                }
                placeholder="e.g. Jan 2022 - Present"
              />
              <div>
                <label className="block text-xs font-medium text-theme-muted mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={expForm.desc}
                  onChange={(e) =>
                    setExpForm({ ...expForm, desc: e.target.value })
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ===== Education Modal ===== */}
      <AnimatePresence>
        {eduModal && (
          <Modal
            title={eduEdit === null ? "Add Education" : "Edit Education"}
            onClose={() => setEduModal(false)}
            onSave={saveEdu}
            saving={eduSaving}
          >
            <div className="space-y-3">
              <Field
                label="Degree / Certificate *"
                value={eduForm.degree}
                onChange={(e) =>
                  setEduForm({ ...eduForm, degree: e.target.value })
                }
                placeholder="e.g. B.Sc in Computer Science"
              />
              <Field
                label="School / University *"
                value={eduForm.school}
                onChange={(e) =>
                  setEduForm({ ...eduForm, school: e.target.value })
                }
                placeholder="e.g. BUET"
              />
              <Field
                label="Duration"
                value={eduForm.duration}
                onChange={(e) =>
                  setEduForm({ ...eduForm, duration: e.target.value })
                }
                placeholder="e.g. 2017 - 2021"
              />
              <Field
                label="Grade / Result"
                value={eduForm.grade}
                onChange={(e) =>
                  setEduForm({ ...eduForm, grade: e.target.value })
                }
                placeholder="e.g. CGPA 3.8 / GPA 5.0"
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default SeekerProfile;
