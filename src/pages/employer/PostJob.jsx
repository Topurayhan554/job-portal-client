import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const PostJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const removeSkill = (s) => setSkills(skills.filter((sk) => sk !== s));

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1500));
    console.log({ ...data, skills });
    toast.success("Job posted successfully! 🎉");
    reset();
    setSkills([]);
  };

  const inputClass = (err) =>
    `input-theme w-full border rounded-xl px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${err ? "border-red-500" : ""}`;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-3xl mx-auto"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">
          Post a New Job
        </h2>
        <p className="text-theme-muted text-sm mt-1">
          Fill in the details to attract the right candidates
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Job Title */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-theme-primary border-b border-theme pb-3">
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Job Title *
            </label>
            <div className="relative">
              <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
              <input
                {...register("title", { required: "Job title is required" })}
                placeholder="e.g. Senior React Developer"
                className={`${inputClass(errors.title)} pl-11`}
              />
            </div>
            {errors.title && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Job Type *
              </label>
              <select
                {...register("type", { required: true })}
                className={inputClass(errors.type)}
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Category *
              </label>
              <select
                {...register("category", { required: true })}
                className={inputClass(errors.category)}
              >
                <option value="">Select category</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Location *
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
              <input
                {...register("location", { required: "Location is required" })}
                placeholder="e.g. Dhaka, Bangladesh or Remote"
                className={`${inputClass(errors.location)} pl-11`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Min Salary (BDT)
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  {...register("salaryMin")}
                  type="number"
                  placeholder="e.g. 40000"
                  className={`${inputClass()} pl-11`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Max Salary (BDT)
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  {...register("salaryMax")}
                  type="number"
                  placeholder="e.g. 60000"
                  className={`${inputClass()} pl-11`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Experience Level *
            </label>
            <select
              {...register("experience", { required: true })}
              className={inputClass(errors.experience)}
            >
              <option value="">Select experience</option>
              <option value="Entry Level">Entry Level (0-1 years)</option>
              <option value="Mid Level">Mid Level (2-4 years)</option>
              <option value="Senior Level">Senior Level (5+ years)</option>
              <option value="Lead">Lead / Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("deadline")}
              className={inputClass()}
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-theme-primary border-b border-theme pb-3">
            Job Details
          </h3>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Job Description *
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: { value: 100, message: "At least 100 characters" },
              })}
              rows={5}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              className={`${inputClass(errors.description)} resize-none`}
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Requirements
            </label>
            <textarea
              {...register("requirements")}
              rows={4}
              placeholder="List the key requirements and qualifications..."
              className={`${inputClass()} resize-none`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Benefits & Perks
            </label>
            <textarea
              {...register("benefits")}
              rows={3}
              placeholder="Health insurance, remote work, annual bonus..."
              className={`${inputClass()} resize-none`}
            />
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={fadeUp}
          className="card-theme border rounded-2xl p-6"
        >
          <h3 className="font-semibold text-theme-primary border-b border-theme pb-3 mb-4">
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 bg-purple-500/10 text-purple-500 border border-purple-500/20 text-sm px-3 py-1.5 rounded-xl"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeSkill(s)}
                  className="hover:text-red-400 transition"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSkill())
              }
              placeholder="Add required skill..."
              className="input-theme border rounded-xl px-4 py-2.5 text-sm flex-1"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
            >
              Add
            </button>
          </div>
        </motion.div>

        {/* Submit */}
        <motion.div variants={fadeUp} className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-purple-900/30"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>{" "}
                Posting...
              </>
            ) : (
              "Post Job 🚀"
            )}
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5 transition font-medium"
          >
            Save Draft
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PostJob;
