import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUpload,
  FiFile,
  FiTrash2,
  FiDownload,
  FiEye,
  FiPlus,
  FiCheck,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const cvFiles = [
  {
    id: 1,
    name: "Resume_v3.pdf",
    size: "245 KB",
    uploaded: "Nov 10, 2024",
    active: true,
  },
  {
    id: 2,
    name: "Resume_v2.pdf",
    size: "198 KB",
    uploaded: "Oct 5, 2024",
    active: false,
  },
];

const CvManager = () => {
  const [files, setFiles] = useState(cvFiles);
  const [dragging, setDragging] = useState(false);

  const setActive = (id) =>
    setFiles(files.map((f) => ({ ...f, active: f.id === id })));
  const deleteFile = (id) => setFiles(files.filter((f) => f.id !== id));

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
          Manage and upload your resumes
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
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
          dragging
            ? "border-purple-500 bg-purple-500/5"
            : "border-theme hover:border-purple-500/50 bg-theme-card"
        }`}
      >
        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiUpload className="w-7 h-7 text-purple-500" />
        </div>
        <h3 className="text-theme-primary font-semibold mb-2">
          Drag & drop your CV here
        </h3>
        <p className="text-theme-muted text-sm mb-4">
          Supports PDF, DOC, DOCX up to 5MB
        </p>
        <label className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
          <FiPlus className="w-4 h-4" /> Upload CV
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
        </label>
      </motion.div>

      {/* CV List */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-theme">
          <h3 className="font-semibold text-theme-primary">Uploaded CVs</h3>
        </div>
        <div className="divide-y divide-theme">
          {files.map((file) => (
            <div key={file.id} className="flex items-center gap-4 px-6 py-4">
              <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiFile className="text-red-500 w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-theme-primary font-medium text-sm">
                  {file.name}
                </p>
                <p className="text-theme-muted text-xs mt-0.5">
                  {file.size} · Uploaded {file.uploaded}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {file.active ? (
                  <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-500 px-2.5 py-1 rounded-full">
                    <FiCheck className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <button
                    onClick={() => setActive(file.id)}
                    className="text-xs border border-theme text-theme-secondary hover:text-purple-500 hover:border-purple-500/50 px-2.5 py-1 rounded-full transition"
                  >
                    Set Active
                  </button>
                )}
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-blue-500 hover:border-blue-500/50 transition">
                  <FiEye className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-green-500 hover:border-green-500/50 transition">
                  <FiDownload className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-red-500 hover:border-red-500/50 transition"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

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
