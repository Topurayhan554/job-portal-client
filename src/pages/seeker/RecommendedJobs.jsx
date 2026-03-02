import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const recommended = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "NextGen Tech",
    location: "Remote",
    type: "Full-time",
    salary: "৳60k-80k",
    match: 95,
    tag: "React",
    desc: "We are looking for a skilled React developer to join our growing team.",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "PixelCraft",
    location: "Dhaka",
    type: "Full-time",
    salary: "৳45k-65k",
    match: 88,
    tag: "Vue.js",
    desc: "Build beautiful and performant UI components for our design system.",
  },
  {
    id: 3,
    title: "JavaScript Developer",
    company: "DevHouse",
    location: "Remote",
    type: "Freelance",
    salary: "৳50k-70k",
    match: 82,
    tag: "Node.js",
    desc: "Work on exciting projects with our international client base.",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "CloudBase",
    location: "Dhaka",
    type: "Full-time",
    salary: "৳70k-100k",
    match: 78,
    tag: "MERN",
    desc: "Join our core engineering team and work on large-scale applications.",
  },
  {
    id: 5,
    title: "TypeScript Developer",
    company: "TechPro",
    location: "Remote",
    type: "Full-time",
    salary: "৳65k-85k",
    match: 75,
    tag: "TypeScript",
    desc: "Help us build robust, type-safe applications at scale.",
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Dhaka",
    type: "Full-time",
    salary: "৳55k-75k",
    match: 70,
    tag: "React Native",
    desc: "Create cross-platform mobile apps for our growing user base.",
  },
];

const matchColor = (match) => {
  if (match >= 90) return "bg-green-500/10 text-green-500";
  if (match >= 80) return "bg-yellow-500/10 text-yellow-500";
  return "bg-blue-500/10 text-blue-500";
};

const RecommendedJobs = () => {
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
          <h2 className="text-2xl font-bold text-theme-primary">
            Recommended Jobs
          </h2>
          <p className="text-theme-muted text-sm mt-1">
            Based on your skills and profile
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {recommended.map((job) => (
          <motion.div
            key={job.id}
            variants={fadeUp}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card-theme border hover:border-purple-500/30 rounded-2xl p-5 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-theme rounded-xl flex items-center justify-center">
                <FiBriefcase className="text-purple-500 w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${matchColor(job.match)}`}
                >
                  <FiStar className="w-3 h-3" /> {job.match}% Match
                </span>
              </div>
            </div>

            <h3 className="text-theme-primary font-semibold mb-0.5">
              {job.title}
            </h3>
            <p className="text-purple-500 text-sm mb-2">{job.company}</p>
            <p className="text-theme-muted text-xs mb-3 leading-relaxed">
              {job.desc}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-theme-muted mb-4">
              <span className="flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {job.type}
              </span>
              <span className="bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded-full">
                {job.tag}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-theme">
              <span className="text-purple-500 font-semibold text-sm">
                {job.salary}
              </span>
              <Link
                to="/jobs"
                className="flex items-center gap-1 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-xl hover:opacity-90 transition"
              >
                Apply Now <FiArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecommendedJobs;
