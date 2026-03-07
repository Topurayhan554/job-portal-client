import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUpload,
  FiFile,
  FiTrash2,
  FiDownload,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiZap,
  FiSearch,
  FiStar,
  FiList,
  FiTarget,
  FiArrowRight,
  FiAward,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import { useSeekerProfile } from "../../hooks/useSeeker";
import axios from "axios";
import api from "../../services/api";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const priorityConfig = {
  high: {
    color: "text-red-500 bg-red-500/10 border-red-500/20",
    label: "High Priority",
  },
  medium: {
    color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    label: "Medium",
  },
  low: {
    color: "text-green-500 bg-green-500/10 border-green-500/20",
    label: "Low",
  },
};

// Score Ring
const ScoreRing = ({ score, size = 120 }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
        ? "#a855f7"
        : score >= 40
          ? "#f59e0b"
          : "#ef4444";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-theme-primary/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-extrabold text-theme-primary leading-none"
        >
          {score}
        </motion.p>
        <p className="text-xs text-theme-muted">/100</p>
      </div>
    </div>
  );
};

// Section Bar
const SectionBar = ({ label, score, feedback }) => {
  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 60
        ? "bg-purple-500"
        : score >= 40
          ? "bg-yellow-500"
          : "bg-red-500";
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-sm font-medium text-theme-primary capitalize">
          {label}
        </p>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            score >= 80
              ? "text-green-500 bg-green-500/10"
              : score >= 60
                ? "text-purple-500 bg-purple-500/10"
                : score >= 40
                  ? "text-yellow-500 bg-yellow-500/10"
                  : "text-red-500 bg-red-500/10"
          }`}
        >
          {score}/100
        </span>
      </div>
      <div className="w-full h-2 bg-theme-primary/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {feedback && (
        <p className="text-xs text-theme-muted mt-1 leading-relaxed">
          {feedback}
        </p>
      )}
    </div>
  );
};

//  Main Component
const CvManager = () => {
  const { profile, loading, updateProfile } = useSeekerProfile();

  // Upload state
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Analyzer state
  const analyzeFileRef = useRef(null);
  const [analyzeOpen, setAnalyzeOpen] = useState(false);
  const [analyzeFile, setAnalyzeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const progressSteps = [
    "Reading your CV...",
    "Analyzing content...",
    "Checking ATS compatibility...",
    "Generating recommendations...",
    "Finalizing report...",
  ];

  //  CV Upload (imgbb — for storage/display only)
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
    setAnalysis(null);
    setAnalyzeFile(null);
    setAnalyzeOpen(false);
    toast.success("CV removed");
  };

  //  AI Analyze — always needs fresh PDF upload
  // imgbb corrupts PDFs, so we never fetch from cvUrl for analysis
  const handleAnalyzeFile = (f) => {
    if (!f) return;
    if (!f.type.includes("pdf")) {
      toast.error("Please upload a PDF file");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }
    setAnalyzeFile(f);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!analyzeFile) {
      toast.error("Please upload your PDF to analyze");
      analyzeFileRef.current?.click();
      return;
    }

    setAnalyzing(true);
    setProgress(0);
    setAnalysis(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(Math.min(step * 18, 90));
      setProgressMsg(
        progressSteps[Math.min(step - 1, progressSteps.length - 1)],
      );
      if (step >= 5) clearInterval(interval);
    }, 800);

    try {
      // Convert fresh file to base64 — never fetch from imgbb
      const cvBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = () => reject(new Error("File read failed"));
        reader.readAsDataURL(analyzeFile);
      });

      const res = await api.post("/ai/analyze-cv", { cvBase64, jobTitle });

      clearInterval(interval);
      setProgress(100);
      setProgressMsg("Analysis complete! ✅");

      setTimeout(() => {
        setAnalysis(res.data.analysis);
        setAnalyzing(false);
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setAnalyzing(false);
      toast.error(err.response?.data?.message || "Analysis failed. Try again.");
    }
  };

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <FiStar className="w-3.5 h-3.5" />,
    },
    {
      id: "sections",
      label: "Sections",
      icon: <FiList className="w-3.5 h-3.5" />,
    },
    {
      id: "improvements",
      label: "Improvements",
      icon: <FiZap className="w-3.5 h-3.5" />,
    },
    {
      id: "ats",
      label: "ATS Score",
      icon: <FiSearch className="w-3.5 h-3.5" />,
    },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">CV Manager</h2>
        <p className="text-theme-muted text-sm mt-1">
          Upload and manage your resume
        </p>
      </motion.div>

      {/* Upload Drop Zone */}
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

      {/* Uploaded CV Card */}
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

          {/* Analyze Toggle Button */}
          <div className="px-6 pb-4">
            <button
              onClick={() => {
                setAnalyzeOpen((v) => !v);
                if (analyzeOpen) {
                  setAnalysis(null);
                  setAnalyzeFile(null);
                }
              }}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition border ${
                analyzeOpen
                  ? "border-purple-500/40 bg-purple-500/10 text-purple-400"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 border-transparent shadow-lg shadow-purple-900/20"
              }`}
            >
              <FaBrain className="w-4 h-4" />
              {analyzeOpen ? "Close Analyzer" : "Analyze with AI"}
              {analyzeOpen ? (
                <FiChevronUp className="w-4 h-4 ml-auto" />
              ) : (
                <FiChevronDown className="w-4 h-4 ml-auto" />
              )}
            </button>
          </div>

          {/* Inline Analyzer Panel */}
          <AnimatePresence>
            {analyzeOpen && (
              <motion.div
                key="analyzer-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden border-t border-theme"
              >
                <div className="px-6 py-5 space-y-4">
                  {/* Panel header */}
                  <div className="flex items-center gap-2">
                    <FaBrain className="text-purple-500 w-4 h-4" />
                    <p className="text-theme-primary font-semibold text-sm">
                      AI CV Analyzer
                    </p>
                    <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                      Beta
                    </span>
                  </div>

                  {!analysis && (
                    <>
                      {/* ⚠️ Always require fresh PDF upload — imgbb corrupts PDFs */}
                      <div
                        onClick={() =>
                          !analyzeFile && analyzeFileRef.current?.click()
                        }
                        className={`border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer ${
                          analyzeFile
                            ? "border-purple-500/50 bg-purple-500/5 cursor-default"
                            : "border-theme hover:border-purple-500/50 hover:bg-purple-500/5"
                        }`}
                      >
                        <input
                          ref={analyzeFileRef}
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => handleAnalyzeFile(e.target.files[0])}
                        />

                        {analyzeFile ? (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                              <FiFile className="text-purple-500 w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <p className="text-theme-primary font-medium text-sm truncate">
                                {analyzeFile.name}
                              </p>
                              <p className="text-theme-muted text-xs">
                                {(analyzeFile.size / 1024).toFixed(0)} KB · PDF
                                ready
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnalyzeFile(null);
                              }}
                              className="text-theme-muted hover:text-red-500 transition flex-shrink-0"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <FiUpload className="text-purple-500 w-5 h-5" />
                            </div>
                            <p className="text-theme-primary text-sm font-medium">
                              Upload PDF to analyze
                            </p>
                            <p className="text-theme-muted text-xs mt-1">
                              Click or drag your CV here · PDF only
                            </p>
                          </>
                        )}
                      </div>

                      {/* Notice */}
                      {!analyzeFile && (
                        <div className="flex items-start gap-2 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                          <FiAlertCircle className="text-yellow-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-theme-muted">
                            A fresh PDF upload is needed for analysis — your
                            storage link cannot be used for AI parsing.
                          </p>
                        </div>
                      )}

                      {/* Target job */}
                      <div>
                        <label className="text-xs font-semibold text-theme-muted mb-1.5 flex items-center gap-1">
                          <FiTarget className="w-3 h-3" /> Target Job Title
                          <span className="font-normal">(optional)</span>
                        </label>
                        <input
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="e.g. Frontend Developer, Product Manager"
                          className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                      </div>

                      {/* Analyze button */}
                      <button
                        onClick={handleAnalyze}
                        disabled={analyzing || !analyzeFile}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-purple-900/20"
                      >
                        {analyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <FaBrain className="w-4 h-4" /> Start Analysis
                          </>
                        )}
                      </button>
                    </>
                  )}

                  {/* Progress */}
                  <AnimatePresence>
                    {analyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-theme-primary text-xs font-semibold">
                            {progressMsg}
                          </p>
                          <span className="text-purple-500 font-bold text-xs">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-theme-primary/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {progressSteps.map((step, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded-full border transition ${
                                progress >= (i + 1) * 18
                                  ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                  : "border-theme text-theme-muted"
                              }`}
                            >
                              {progress >= (i + 1) * 18 ? "✓ " : ""}
                              {step.replace("...", "")}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Analysis Results */}
                  <AnimatePresence>
                    {analysis && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-theme-primary">
                            Analysis Results
                          </p>
                          <button
                            onClick={() => {
                              setAnalysis(null);
                              setAnalyzeFile(null);
                            }}
                            className="text-xs text-purple-500 hover:text-purple-400 flex items-center gap-1 transition"
                          >
                            <FiUpload className="w-3 h-3" /> Re-analyze
                          </button>
                        </div>

                        {/* Score Card */}
                        <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-purple-500/20 flex flex-col sm:flex-row items-center gap-5">
                          <ScoreRing score={analysis.overallScore} size={110} />
                          <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                              <span
                                className={`text-base font-extrabold ${
                                  analysis.overallScore >= 80
                                    ? "text-green-500"
                                    : analysis.overallScore >= 60
                                      ? "text-purple-500"
                                      : analysis.overallScore >= 40
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                }`}
                              >
                                {analysis.scoreLabel}
                              </span>
                              <FiAward
                                className={`w-4 h-4 ${analysis.overallScore >= 80 ? "text-green-500" : "text-purple-500"}`}
                              />
                            </div>
                            <p className="text-theme-secondary text-xs leading-relaxed mb-3">
                              {analysis.summary}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {(analysis.jobMatches || []).map((job) => (
                                <span
                                  key={job}
                                  className="text-xs bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2.5 py-0.5 rounded-full"
                                >
                                  {job}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex-shrink-0 ${
                                activeTab === tab.id
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                  : "border border-theme text-theme-secondary hover:text-theme-primary"
                              }`}
                            >
                              {tab.icon} {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                          {activeTab === "overview" && (
                            <motion.div
                              key="overview"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                            >
                              <div className="card-theme border rounded-2xl p-4">
                                <h4 className="font-semibold text-theme-primary mb-3 flex items-center gap-2 text-sm">
                                  <FiCheck className="text-green-500 w-4 h-4" />{" "}
                                  Strengths
                                </h4>
                                <div className="space-y-1.5">
                                  {(analysis.strengths || []).map((s, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-green-500 mt-0.5 flex-shrink-0 text-xs">
                                        ✓
                                      </span>
                                      <p className="text-theme-secondary text-xs leading-relaxed">
                                        {s}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="card-theme border rounded-2xl p-4">
                                <h4 className="font-semibold text-theme-primary mb-3 flex items-center gap-2 text-sm">
                                  <FiAlertCircle className="text-red-500 w-4 h-4" />{" "}
                                  To Improve
                                </h4>
                                <div className="space-y-1.5">
                                  {(analysis.weaknesses || []).map((w, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-red-500 mt-0.5 flex-shrink-0 text-xs">
                                        !
                                      </span>
                                      <p className="text-theme-secondary text-xs leading-relaxed">
                                        {w}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="card-theme border rounded-2xl p-4">
                                <h4 className="font-semibold text-theme-primary mb-2 text-xs">
                                  Skills Found
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {(analysis.skills?.found || []).map((s) => (
                                    <span
                                      key={s}
                                      className="text-xs bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-0.5 rounded-full"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="card-theme border rounded-2xl p-4">
                                <h4 className="font-semibold text-theme-primary mb-2 text-xs">
                                  Suggested to Add
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {(analysis.skills?.missing || []).map((s) => (
                                    <span
                                      key={s}
                                      className="text-xs bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded-full"
                                    >
                                      + {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {activeTab === "sections" && (
                            <motion.div
                              key="sections"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="card-theme border rounded-2xl p-5"
                            >
                              <h4 className="font-semibold text-theme-primary mb-4 text-sm">
                                Section-by-Section
                              </h4>
                              {Object.entries(analysis.sections || {}).map(
                                ([key, val]) => (
                                  <SectionBar
                                    key={key}
                                    label={key}
                                    score={val.score}
                                    feedback={val.feedback}
                                  />
                                ),
                              )}
                            </motion.div>
                          )}

                          {activeTab === "improvements" && (
                            <motion.div
                              key="improvements"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="space-y-2"
                            >
                              {(analysis.improvements || []).map((item, i) => {
                                const cfg =
                                  priorityConfig[item.priority] ||
                                  priorityConfig.medium;
                                return (
                                  <div
                                    key={i}
                                    className="card-theme border rounded-2xl p-4"
                                  >
                                    <div className="flex items-start gap-3">
                                      <span
                                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${cfg.color}`}
                                      >
                                        {cfg.label}
                                      </span>
                                      <div>
                                        <p className="text-theme-primary font-semibold text-xs mb-0.5">
                                          {item.title}
                                        </p>
                                        <p className="text-theme-secondary text-xs leading-relaxed">
                                          {item.detail}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}

                          {activeTab === "ats" && (
                            <motion.div
                              key="ats"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="card-theme border rounded-2xl p-5"
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <ScoreRing
                                  score={analysis.atsScore}
                                  size={90}
                                />
                                <div>
                                  <h4 className="font-bold text-theme-primary text-sm">
                                    ATS Compatibility
                                  </h4>
                                  <p className="text-theme-muted text-xs mt-1">
                                    {analysis.atsScore >= 70
                                      ? "Well-optimized for Applicant Tracking Systems."
                                      : "Needs improvement to pass ATS filters."}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                {(analysis.atsTips || []).map((tip, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl"
                                  >
                                    <FiArrowRight className="text-blue-500 w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                    <p className="text-theme-secondary text-xs leading-relaxed">
                                      {tip}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* CV Tips */}
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
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CvManager;
