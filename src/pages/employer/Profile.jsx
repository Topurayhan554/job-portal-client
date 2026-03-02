import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiEdit2,
  FiMapPin,
  FiGlobe,
  FiMail,
  FiPhone,
  FiUsers,
  FiSave,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const EmployerProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const companyInfo = {
    name: "TechCorp BD",
    industry: "Information Technology",
    size: "50-100 employees",
    founded: "2018",
    website: "https://techcorp.com.bd",
    location: "Dhaka, Bangladesh",
    email: user?.email,
    phone: "+880 1700-000000",
    about:
      "TechCorp BD is a leading software company in Bangladesh, specializing in web and mobile app development.",
  };

  const benefits = [
    "Health Insurance",
    "Remote Work",
    "Annual Bonus",
    "Training Budget",
    "Flexible Hours",
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Company Header */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 relative">
          <button className="absolute top-3 right-3 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1.5 rounded-xl transition">
            <FiEdit2 className="w-3 h-3" /> Edit Cover
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl border-4 border-theme shadow-lg flex items-center justify-center">
              <FaBriefcase className="text-purple-500 w-8 h-8" />
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                editing
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "border border-theme text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {editing ? (
                <>
                  <FiSave className="w-4 h-4" /> Save
                </>
              ) : (
                <>
                  <FiEdit2 className="w-4 h-4" /> Edit Profile
                </>
              )}
            </button>
          </div>

          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Company Name", defaultValue: companyInfo.name },
                { label: "Industry", defaultValue: companyInfo.industry },
                { label: "Company Size", defaultValue: companyInfo.size },
                { label: "Founded", defaultValue: companyInfo.founded },
                { label: "Website", defaultValue: companyInfo.website },
                { label: "Location", defaultValue: companyInfo.location },
                { label: "Email", defaultValue: companyInfo.email },
                { label: "Phone", defaultValue: companyInfo.phone },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-theme-muted mb-1">
                    {field.label}
                  </label>
                  <input
                    defaultValue={field.defaultValue}
                    className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-theme-muted mb-1">
                  About
                </label>
                <textarea
                  rows={3}
                  defaultValue={companyInfo.about}
                  className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-theme-primary">
                {companyInfo.name}
              </h2>
              <p className="text-purple-500 text-sm font-medium mt-0.5">
                {companyInfo.industry}
              </p>
              <p className="text-theme-muted text-sm mt-2">
                {companyInfo.about}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-theme-secondary">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="w-4 h-4 text-theme-muted" />
                  {companyInfo.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiGlobe className="w-4 h-4 text-theme-muted" />
                  {companyInfo.website}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiUsers className="w-4 h-4 text-theme-muted" />
                  {companyInfo.size}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMail className="w-4 h-4 text-theme-muted" />
                  {companyInfo.email}
                </span>
              </div>
            </div>
          )}
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
        <div className="flex flex-wrap gap-2 mb-4">
          {benefits.map((b) => (
            <span
              key={b}
              className="flex items-center gap-1.5 bg-green-500/10 text-green-500 border border-green-500/20 text-sm px-3 py-1.5 rounded-xl"
            >
              {b}
            </span>
          ))}
        </div>
        <button className="flex items-center gap-2 text-purple-500 hover:text-purple-400 text-sm transition">
          <FiPlus className="w-4 h-4" /> Add Benefit
        </button>
      </motion.div>
    </motion.div>
  );
};

export default EmployerProfile;
