import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUpload,
  FiFile,
  FiTrash2,
  FiDownload,
  FiCheck,
} from "react-icons/fi";
import { useSeekerProfile } from "../../hooks/useSeeker";
import axios from "axios";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const CvManager = () => {
  const { profile, loading, updateProfile } = useSeekerProfile();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData,
    );
    return res.data.data.url;
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF and Word files allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      await updateProfile({ cvUrl: url });
      toast.success("CV uploaded! ✅");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const removeCV = async () => {
    await updateProfile({ cvUrl: "" });
    toast.success("CV removed");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-3xl mx-auto"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">CV Manager</h2>
        <p className="text-theme-muted text-sm mt-1">
          Upload and manage your resume
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        variants={fadeUp}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
          dragging
            ? "border-purple-500 bg-purple-500/5"
            : "border-theme hover:border-purple-500/50 bg-theme-card"
        }`}
      >
        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          {uploading ? (
            <div className="w-7 h-7 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiUpload className="w-7 h-7 text-purple-500" />
          )}
        </div>
        <h3 className="text-theme-primary font-semibold mb-2">
          {uploading ? "Uploading..." : "Drag & drop your CV here"}
        </h3>
        <p className="text-theme-muted text-sm mb-4">
          Supports PDF, DOC, DOCX up to 5MB
        </p>
        {!uploading && (
          <label className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
            Browse File
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </label>
        )}
      </motion.div>

      {/* Current CV */}
      {profile?.cvUrl && (
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary">Uploaded CV</h3>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiFile className="text-red-500 w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-theme-primary font-medium text-sm truncate">
                resume.pdf
              </p>
              <p className="text-theme-muted text-xs mt-0.5">Active CV</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-500 px-2.5 py-1 rounded-full">
                <FiCheck className="w-3 h-3" /> Active
              </span>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-green-500 hover:border-green-500/50 transition"
              >
                <FiDownload className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={removeCV}
                className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-5"
      >
        <h3 className="font-semibold text-theme-primary mb-3">💡 CV Tips</h3>
        <ul className="space-y-2 text-sm text-theme-secondary">
          {[
            "Keep your CV concise — 1-2 pages is ideal",
            "Use keywords from job descriptions",
            "Always upload PDF format for best compatibility",
            "Update your CV regularly with new skills and experience",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CvManager;
