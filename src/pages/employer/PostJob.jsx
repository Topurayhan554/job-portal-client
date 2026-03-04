import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiX, FiSend } from "react-icons/fi";
import { usePostJob } from "../../hooks/useEmployer";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}) => (
  <div>
    <label className="block text-xs font-medium text-theme-muted mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />
  </div>
);

const Select = ({ label, value, onChange, options, required }) => (
  <div>
    <label className="block text-xs font-medium text-theme-muted mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
    >
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

const PostJob = () => {
  const { postJob, loading } = usePostJob();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    benefits: "",
    company: user?.companyName || "",
    location: user?.location || "",
    type: "",
    category: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    status: "Active",
    featured: false,
  });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.type || !form.category) {
      return;
    }
    const job = await postJob({
      ...form,
      skills,
      salaryMin: Number(form.salaryMin) || 0,
      salaryMax: Number(form.salaryMax) || 0,
    });
    if (job) navigate("/employer/jobs");
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">
          Post a New Job
        </h2>
        <p className="text-theme-muted text-sm mt-1">
          Fill in the details to attract the best candidates
        </p>
      </motion.div>

      {/* Basic Info */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-5">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field
              label="Job Title"
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Senior Frontend Developer"
              required
            />
          </div>
          <Field
            label="Company Name"
            value={form.company}
            onChange={set("company")}
            placeholder="Your company name"
            required
          />
          <Field
            label="Location"
            value={form.location}
            onChange={set("location")}
            placeholder="e.g. Dhaka, Bangladesh or Remote"
            required
          />
          <Select
            label="Job Type"
            value={form.type}
            onChange={set("type")}
            required
            options={[
              "Full-time",
              "Part-time",
              "Remote",
              "Freelance",
              "Internship",
            ]}
          />
          <Select
            label="Category"
            value={form.category}
            onChange={set("category")}
            required
            options={[
              "Technology",
              "Design",
              "Marketing",
              "Management",
              "Finance",
              "HR",
              "Sales",
              "Other",
            ]}
          />
          <Select
            label="Experience Level"
            value={form.experience}
            onChange={set("experience")}
            options={[
              "Entry Level",
              "Mid Level",
              "Senior Level",
              "Manager",
              "Director",
            ]}
          />
          <Field
            label="Application Deadline"
            value={form.deadline}
            onChange={set("deadline")}
            type="date"
          />
        </div>
      </motion.div>

      {/* Salary */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-5">
          Salary Range (BDT)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Minimum Salary"
            value={form.salaryMin}
            onChange={set("salaryMin")}
            placeholder="e.g. 30000"
            type="number"
          />
          <Field
            label="Maximum Salary"
            value={form.salaryMax}
            onChange={set("salaryMax")}
            placeholder="e.g. 60000"
            type="number"
          />
        </div>
        {form.salaryMin && form.salaryMax && (
          <p className="text-purple-500 text-sm mt-3 font-medium">
            ৳{Number(form.salaryMin).toLocaleString()} – ৳
            {Number(form.salaryMax).toLocaleString()} / month
          </p>
        )}
      </motion.div>

      {/* Description */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-5">Job Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-theme-muted mb-1.5">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={form.description}
              onChange={set("description")}
              placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
              className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-theme-muted mb-1.5">
              Requirements
            </label>
            <textarea
              rows={4}
              value={form.requirements}
              onChange={set("requirements")}
              placeholder="List the required skills, qualifications, and experience..."
              className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-theme-muted mb-1.5">
              Benefits
            </label>
            <textarea
              rows={3}
              value={form.benefits}
              onChange={set("benefits")}
              placeholder="e.g. Health insurance, flexible hours, annual bonus..."
              className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-4">
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4 min-h-[36px]">
          {skills.length === 0 && (
            <p className="text-theme-muted text-sm">No skills added yet.</p>
          )}
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 bg-purple-500/10 text-purple-500 border border-purple-500/20 text-sm px-3 py-1.5 rounded-xl"
            >
              {skill}
              <button
                onClick={() => setSkills(skills.filter((s) => s !== skill))}
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
            placeholder="Add required skill..."
            className="input-theme border rounded-xl px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addSkill}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Add
          </button>
        </div>
      </motion.div>

      {/* Options */}
      <motion.div
        variants={fadeUp}
        className="card-theme border rounded-2xl p-6"
      >
        <h3 className="font-semibold text-theme-primary mb-4">Job Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Job Status"
            value={form.status}
            onChange={set("status")}
            options={["Active", "Paused"]}
          />
          <div className="flex items-center gap-3 pt-6">
            <button
              onClick={() => setForm({ ...form, featured: !form.featured })}
              className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${form.featured ? "bg-purple-500" : "bg-gray-300 dark:bg-gray-600"}`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${form.featured ? "left-6" : "left-1"}`}
              />
            </button>
            <span className="text-theme-secondary text-sm">
              Featured Job{" "}
              <span className="text-theme-muted text-xs">
                (highlighted in listings)
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp} className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/employer/jobs")}
          className="px-6 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-purple-900/30"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <FiSend className="w-4 h-4" />
              Post Job
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PostJob;
