import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiEye,
  FiLock,
  FiActivity,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const reports = [
  {
    id: 1,
    type: "Spam Job",
    target: "Frontend Developer at FakeCompany",
    reportedBy: "Rahim Uddin",
    date: "Nov 15, 2024",
    status: "pending",
  },
  {
    id: 2,
    type: "Fake Profile",
    target: "User: spammer@fake.com",
    reportedBy: "Sadia Islam",
    date: "Nov 14, 2024",
    status: "pending",
  },
  {
    id: 3,
    type: "Inappropriate Content",
    target: "Job: Suspicious Offer",
    reportedBy: "Karim Hossain",
    date: "Nov 13, 2024",
    status: "resolved",
  },
  {
    id: 4,
    type: "Spam Job",
    target: "Data Entry - Earn ৳1M Daily",
    reportedBy: "Nusrat Jahan",
    date: "Nov 12, 2024",
    status: "dismissed",
  },
];

const loginLogs = [
  {
    id: 1,
    user: "admin@portal.com",
    ip: "192.168.1.1",
    time: "2 hours ago",
    status: "success",
    device: "Chrome / Windows",
  },
  {
    id: 2,
    user: "rahim@mail.com",
    ip: "10.0.0.5",
    time: "5 hours ago",
    status: "success",
    device: "Safari / iPhone",
  },
  {
    id: 3,
    user: "unknown@hack.com",
    ip: "45.33.32.156",
    time: "6 hours ago",
    status: "failed",
    device: "Unknown",
  },
  {
    id: 4,
    user: "sadia@mail.com",
    ip: "192.168.2.10",
    time: "1 day ago",
    status: "success",
    device: "Firefox / Mac",
  },
];

const securityChecks = [
  { label: "SSL Certificate", status: true },
  { label: "Firewall Active", status: true },
  { label: "2FA Enabled", status: false },
  { label: "Last Backup", status: true },
  { label: "Malware Scan", status: true },
];

const statusConfig = {
  pending: "bg-yellow-500/10 text-yellow-500",
  resolved: "bg-green-500/10 text-green-500",
  dismissed: "bg-gray-500/10 text-gray-500",
};

const Security = () => {
  const [reports_, setReports] = useState(reports);

  const resolve = (id) =>
    setReports(
      reports_.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)),
    );
  const dismiss = (id) =>
    setReports(
      reports_.map((r) => (r.id === id ? { ...r, status: "dismissed" } : r)),
    );

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">Security</h2>
        <p className="text-theme-muted text-sm mt-1">
          Monitor and manage platform security
        </p>
      </motion.div>

      {/* Security Status */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {securityChecks.map((check, i) => (
          <div
            key={i}
            className={`card-theme border rounded-2xl p-4 flex items-center gap-3 ${check.status ? "border-green-500/20" : "border-red-500/20"}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${check.status ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
            >
              {check.status ? (
                <FiCheck className="w-4 h-4" />
              ) : (
                <FiX className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-theme-primary text-xs font-medium">
                {check.label}
              </p>
              <p
                className={`text-xs ${check.status ? "text-green-500" : "text-red-500"}`}
              >
                {check.status ? "OK" : "Action Needed"}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-theme flex items-center gap-2">
            <FiAlertCircle className="text-red-500 w-4 h-4" />
            <h3 className="font-semibold text-theme-primary">
              Reported Content
            </h3>
          </div>
          <div className="divide-y divide-theme">
            {reports_.map((report) => (
              <div key={report.id} className="px-6 py-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                        {report.type}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[report.status]}`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <p className="text-theme-primary text-sm font-medium">
                      {report.target}
                    </p>
                    <p className="text-theme-muted text-xs mt-0.5">
                      Reported by {report.reportedBy} · {report.date}
                    </p>
                  </div>
                </div>
                {report.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => resolve(report.id)}
                      className="flex items-center gap-1.5 text-xs bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1.5 rounded-xl hover:bg-green-500/20 transition"
                    >
                      <FiCheck className="w-3 h-3" /> Resolve
                    </button>
                    <button
                      onClick={() => dismiss(report.id)}
                      className="flex items-center gap-1.5 text-xs bg-gray-500/10 text-gray-500 border border-gray-500/20 px-3 py-1.5 rounded-xl hover:bg-gray-500/20 transition"
                    >
                      <FiX className="w-3 h-3" /> Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Login Logs */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-theme flex items-center gap-2">
            <FiActivity className="text-purple-500 w-4 h-4" />
            <h3 className="font-semibold text-theme-primary">
              Recent Login Activity
            </h3>
          </div>
          <div className="divide-y divide-theme">
            {loginLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${log.status === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                >
                  {log.status === "success" ? (
                    <FiCheck className="w-4 h-4" />
                  ) : (
                    <FiX className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-theme-primary text-sm font-medium truncate">
                    {log.user}
                  </p>
                  <p className="text-theme-muted text-xs">
                    {log.device} · IP: {log.ip}
                  </p>
                </div>
                <p className="text-theme-muted text-xs flex-shrink-0">
                  {log.time}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Security;
