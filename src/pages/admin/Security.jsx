import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiAlertTriangle,
  FiLock,
  FiWifi,
  FiDatabase,
} from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { useAdminUsers } from "../../hooks/useAdmin";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

// Static security data (real implementation needs separate security model)
const securityChecks = [
  {
    label: "SSL Certificate",
    status: "ok",
    icon: <FiLock />,
    desc: "Valid until Dec 2025",
  },
  {
    label: "Firewall Active",
    status: "ok",
    icon: <FiShield />,
    desc: "All rules up to date",
  },
  {
    label: "2FA Enforcement",
    status: "warning",
    icon: <FiAlertTriangle />,
    desc: "Not enforced for all admins",
  },
  {
    label: "Last Backup",
    status: "ok",
    icon: <FiDatabase />,
    desc: "2 hours ago",
  },
  {
    label: "API Rate Limiting",
    status: "ok",
    icon: <FiWifi />,
    desc: "100 req/min per user",
  },
  {
    label: "Malware Scan",
    status: "ok",
    icon: <FiCheck />,
    desc: "Last scan: today 6AM",
  },
];

const reportedContent = [
  {
    id: 1,
    type: "Spam Job",
    target: "Frontend Dev at FakeCompany",
    reporter: "user@example.com",
    date: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "Fake Profile",
    target: "John Doe (employer)",
    reporter: "seeker@example.com",
    date: "5 hours ago",
    status: "pending",
  },
  {
    id: 3,
    type: "Inappropriate",
    target: "Backend Engineer listing",
    reporter: "test@example.com",
    date: "1 day ago",
    status: "resolved",
  },
  {
    id: 4,
    type: "Spam Job",
    target: "Remote Job at XYZ",
    reporter: "user2@example.com",
    date: "2 days ago",
    status: "dismissed",
  },
];

const loginLogs = [
  {
    user: "admin@portal.com",
    ip: "192.168.1.1",
    device: "Chrome / Windows",
    time: "5 min ago",
    status: "success",
  },
  {
    user: "unknown@hacker.com",
    ip: "45.33.32.156",
    device: "curl / Linux",
    time: "2 hours ago",
    status: "failed",
  },
  {
    user: "admin@portal.com",
    ip: "192.168.1.1",
    device: "Chrome / Mac",
    time: "6 hours ago",
    status: "success",
  },
  {
    user: "staff@portal.com",
    ip: "10.0.0.5",
    device: "Firefox / Windows",
    time: "1 day ago",
    status: "success",
  },
  {
    user: "unknown@spam.ru",
    ip: "89.99.12.33",
    device: "Python / Linux",
    time: "1 day ago",
    status: "failed",
  },
];

const reportTypeColor = {
  "Spam Job": "text-orange-500 bg-orange-500/10 border-orange-500/20",
  "Fake Profile": "text-red-500 bg-red-500/10 border-red-500/20",
  Inappropriate: "text-pink-500 bg-pink-500/10 border-pink-500/20",
};

const Security = () => {
  const { users } = useAdminUsers();
  const [reports, setReports] = useState(reportedContent);

  const resolveReport = (id) =>
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)),
    );
  const dismissReport = (id) =>
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "dismissed" } : r)),
    );

  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const failedLogins = loginLogs.filter((l) => l.status === "failed").length;
  const checksOk = securityChecks.filter((c) => c.status === "ok").length;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-theme-primary flex items-center gap-2">
            <FaShieldAlt className="text-red-500 w-6 h-6" /> Security Center
          </h2>
          <p className="text-theme-muted text-sm mt-1">
            Monitor and manage platform security
          </p>
        </div>
      </motion.div>

      {/* Security overview cards */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Checks Passed",
            value: `${checksOk}/${securityChecks.length}`,
            icon: <FiShield />,
            color: "text-green-500 bg-green-500/10",
          },
          {
            label: "Pending Reports",
            value: pendingCount,
            icon: <FiAlertCircle />,
            color: "text-orange-500 bg-orange-500/10",
          },
          {
            label: "Failed Logins",
            value: failedLogins,
            icon: <FiX />,
            color: "text-red-500 bg-red-500/10",
          },
          {
            label: "Active Users",
            value: users.filter((u) => !u.isBanned).length,
            icon: <FiCheck />,
            color: "text-blue-500 bg-blue-500/10",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="card-theme border rounded-2xl p-5"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}
            >
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-theme-primary">
              {card.value}
            </p>
            <p className="text-theme-muted text-sm mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Security Checks */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-5 flex items-center gap-2">
          <FiShield className="text-red-500 w-4 h-4" /> Security Checks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityChecks.map((check, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl border transition ${
                check.status === "ok"
                  ? "bg-green-500/5 border-green-500/20"
                  : "bg-yellow-500/5 border-yellow-500/20"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  check.status === "ok"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {check.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-theme-primary font-medium text-sm">
                  {check.label}
                </p>
                <p className="text-theme-muted text-xs mt-0.5">{check.desc}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  check.status === "ok" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {check.status === "ok" ? (
                  <FiCheck className="w-3.5 h-3.5 text-white" />
                ) : (
                  <FiAlertTriangle className="w-3.5 h-3.5 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reports + Login Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reported Content */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-theme flex items-center justify-between">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiAlertCircle className="text-red-500 w-4 h-4" /> Reported
              Content
            </h3>
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {pendingCount} pending
              </span>
            )}
          </div>
          <div className="divide-y divide-theme">
            {reports.map((report) => (
              <div key={report.id} className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs border px-2.5 py-0.5 rounded-full font-medium ${reportTypeColor[report.type] || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
                    >
                      {report.type}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        report.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : report.status === "resolved"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-500/10 text-gray-500"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <span className="text-theme-muted text-xs flex-shrink-0">
                    {report.date}
                  </span>
                </div>
                <p className="text-theme-primary text-sm font-medium">
                  {report.target}
                </p>
                <p className="text-theme-muted text-xs mt-0.5">
                  Reported by: {report.reporter}
                </p>
                {report.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => resolveReport(report.id)}
                      className="flex items-center gap-1.5 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-xl transition"
                    >
                      <FiCheck className="w-3 h-3" /> Resolve
                    </button>
                    <button
                      onClick={() => dismissReport(report.id)}
                      className="flex items-center gap-1.5 text-xs border border-theme text-theme-secondary hover:text-theme-primary px-3 py-1.5 rounded-xl transition"
                    >
                      <FiX className="w-3 h-3" /> Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Login Activity */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-theme">
            <h3 className="font-semibold text-theme-primary flex items-center gap-2">
              <FiLock className="text-red-500 w-4 h-4" /> Recent Login Activity
            </h3>
          </div>
          <div className="divide-y divide-theme">
            {loginLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    log.status === "success"
                      ? "bg-green-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {log.status === "success" ? (
                    <FiCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <FiX className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-theme-primary text-sm font-medium truncate">
                    {log.user}
                  </p>
                  <p className="text-theme-muted text-xs mt-0.5">
                    {log.ip} · {log.device}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      log.status === "success"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {log.status}
                  </span>
                  <p className="text-theme-muted text-xs mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Security;
