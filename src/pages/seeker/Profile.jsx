import { useState } from "react";
import { motion } from "framer-motion";
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
} from "react-icons/fi";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const SeekerProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState([
    "React",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "MongoDB",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const experiences = [
    {
      role: "Frontend Developer",
      company: "TechCorp BD",
      duration: "Jan 2023 - Present",
      desc: "Built responsive web apps using React and Tailwind CSS.",
    },
    {
      role: "Junior Developer",
      company: "SoftGen Ltd",
      duration: "Jun 2021 - Dec 2022",
      desc: "Worked on client projects with Vue.js and REST APIs.",
    },
  ];

  const educations = [
    {
      degree: "B.Sc in Computer Science",
      school: "BUET",
      duration: "2017 - 2021",
      grade: "CGPA 3.8",
    },
    {
      degree: "HSC - Science",
      school: "Dhaka College",
      duration: "2015 - 2017",
      grade: "GPA 5.0",
    },
  ];

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
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 relative">
          <button className="absolute top-3 right-3 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1.5 rounded-xl transition">
            <FiEdit2 className="w-3 h-3" /> Edit Cover
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-20 h-20 rounded-2xl border-4 border-theme object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl border-4 border-theme flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center text-white hover:bg-purple-600 transition">
                <FiEdit2 className="w-3 h-3" />
              </button>
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

          {/* Info */}
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Full Name",
                  defaultValue: user?.name,
                  icon: <FiUser />,
                },
                { label: "Email", defaultValue: user?.email, icon: <FiMail /> },
                {
                  label: "Phone",
                  defaultValue: user?.phone || "",
                  icon: <FiPhone />,
                },
                {
                  label: "Location",
                  defaultValue: "Dhaka, Bangladesh",
                  icon: <FiMapPin />,
                },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-theme-muted mb-1">
                    {field.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted">
                      {field.icon}
                    </span>
                    <input
                      defaultValue={field.defaultValue}
                      className="input-theme w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm"
                    />
                  </div>
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-theme-muted mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue="Passionate Frontend Developer with 3+ years of experience building modern web applications."
                  className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-theme-primary">
                {user?.name}
              </h2>
              <p className="text-purple-500 text-sm font-medium mt-0.5">
                Frontend Developer
              </p>
              <p className="text-theme-muted text-sm mt-2 max-w-xl">
                Passionate Frontend Developer with 3+ years of experience
                building modern web applications.
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-theme-secondary">
                <span className="flex items-center gap-1">
                  <FiMail className="w-4 h-4 text-theme-muted" />
                  {user?.email}
                </span>
                <span className="flex items-center gap-1">
                  <FiPhone className="w-4 h-4 text-theme-muted" />
                  {user?.phone || "+880 1700-000000"}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-4 h-4 text-theme-muted" />
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ===== Skills ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 bg-purple-500/10 text-purple-500 border border-purple-500/20 text-sm px-3 py-1.5 rounded-xl"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-red-400 transition"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            placeholder="Add a skill..."
            className="input-theme border rounded-xl px-4 py-2.5 text-sm flex-1"
          />
          <button
            onClick={addSkill}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Add
          </button>
        </div>
      </motion.div>

      {/* ===== Experience ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-theme-primary flex items-center gap-2">
            <FaBriefcase className="text-purple-500 w-4 h-4" /> Experience
          </h3>
          <button className="flex items-center gap-1.5 text-purple-500 hover:text-purple-400 text-sm transition">
            <FiPlus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaBriefcase className="text-purple-500 w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-theme-primary font-semibold text-sm">
                      {exp.role}
                    </p>
                    <p className="text-purple-500 text-xs">{exp.company}</p>
                    <p className="text-theme-muted text-xs mt-0.5">
                      {exp.duration}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-theme-muted hover:text-purple-500 transition">
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-theme-muted hover:text-red-500 transition">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-theme-secondary text-xs mt-1 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== Education ===== */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-theme-primary flex items-center gap-2">
            <FaGraduationCap className="text-purple-500 w-4 h-4" /> Education
          </h3>
          <button className="flex items-center gap-1.5 text-purple-500 hover:text-purple-400 text-sm transition">
            <FiPlus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-5">
          {educations.map((edu, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaGraduationCap className="text-blue-500 w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-theme-primary font-semibold text-sm">
                      {edu.degree}
                    </p>
                    <p className="text-blue-500 text-xs">{edu.school}</p>
                    <p className="text-theme-muted text-xs mt-0.5">
                      {edu.duration} · {edu.grade}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-theme-muted hover:text-purple-500 transition">
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-theme-muted hover:text-red-500 transition">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SeekerProfile;
