import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaGoogle,
  FaBriefcase,
  FaRocket,
  FaShieldAlt,
  FaBrain,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const features = [
  {
    icon: <FaBrain />,
    title: "AI Job Matching",
    desc: "Smart recommendations based on your skills",
  },
  {
    icon: <FaRocket />,
    title: "Fast Apply",
    desc: "One-click apply to thousands of jobs",
  },
  {
    icon: <FaShieldAlt />,
    title: "Verified Jobs",
    desc: "All listings are verified and legitimate",
  },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInFunc, signInGoogle, syncUserWithDatabase } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const getRedirect = (role) => {
    if (role === "seeker") return "/seeker/dashboard";
    if (role === "employer") return "/employer/dashboard";
    if (role === "admin") return "/admin/dashboard";
    return location?.state || "/";
  };

  const handleLogin = async (data) => {
    try {
      const result = await signInFunc(data.email, data.password);
      const token = await result.user.getIdToken();
      const res = await syncUserWithDatabase(result.user);
      toast.success("Welcome back! 👋");
      navigate(getRedirect(res?.role || "seeker"));
    } catch (error) {
      let message = "Login failed. Please try again.";
      if (error.code === "auth/user-not-found")
        message = "No account found with this email.";
      else if (error.code === "auth/wrong-password")
        message = "Incorrect password.";
      else if (error.code === "auth/invalid-credential")
        message = "Invalid email or password.";
      else if (error.code === "auth/too-many-requests")
        message = "Too many attempts. Try again later.";
      toast.error(message);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInGoogle();
      toast.success("Logged in with Google! 🎉");
      navigate(location?.state || "/");
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Google login failed. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-theme-primary">
      {/* ===== Left Panel ===== */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1a0533] via-[#0f0a2e] to-[#0a0a1f] flex-col justify-between px-16 py-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600 opacity-15 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-600 opacity-15 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900 opacity-10 rounded-full blur-[120px]"></div>

        {/* Decorative Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-white">
              Job<span className="text-purple-400">Portal</span>
            </span>
          </Link>
        </div>

        {/* Center Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-4">
              Your Next Career
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Join thousands of professionals who found their dream job through
              our AI-powered platform.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 grid grid-cols-3 gap-4"
        >
          {[
            { value: "50K+", label: "Job Seekers" },
            { value: "5K+", label: "Companies" },
            { value: "95%", label: "Success Rate" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ===== Right Panel ===== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <motion.div
            variants={fadeUp}
            className="flex lg:hidden items-center gap-2 mb-8 justify-center"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-theme-primary">
              Job<span className="text-purple-500">Portal</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="text-3xl font-extrabold text-theme-primary mb-2">
              Welcome back 👋
            </h1>
            <p className="text-theme-muted">
              Sign in to continue your job search journey
            </p>
          </motion.div>

          {/* Google Button */}
          <motion.button
            variants={fadeUp}
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-theme-card border border-theme text-theme-primary py-3.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 hover:border-purple-500/30 transition mb-5 font-medium text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mb-5"
          >
            <div
              className="flex-1 h-px bg-theme-border"
              style={{ backgroundColor: "var(--border-color)" }}
            ></div>
            <span className="text-theme-muted text-sm">
              or sign in with email
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "var(--border-color)" }}
            ></div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`input-theme w-full border rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-theme-secondary">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-purple-500 hover:text-purple-400 transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`input-theme w-full border rounded-xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary transition"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle className="w-3 h-3" />{" "}
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Remember Me */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-4 h-4 border-2 border-gray-400 dark:border-gray-600 rounded peer-checked:bg-purple-500 peer-checked:border-purple-500 transition"></div>
                </div>
                <span className="text-sm text-theme-secondary">
                  Remember me
                </span>
              </label>
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg shadow-purple-900/30 text-sm"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Register Link */}
          <motion.p
            variants={fadeUp}
            className="text-center text-theme-muted text-sm mt-6"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className="text-purple-500 font-semibold hover:text-purple-400 transition"
            >
              Create account
            </Link>
          </motion.p>

          {/* Demo Accounts */}
          <motion.div
            variants={fadeUp}
            className="mt-6 p-4 bg-theme-card border border-theme rounded-2xl"
          >
            <p className="text-theme-muted text-xs font-medium mb-3 text-center">
              🧪 Demo Accounts
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  role: "Seeker",
                  email: "seeker@demo.com",
                  color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
                },
                {
                  role: "Employer",
                  email: "employer@demo.com",
                  color:
                    "text-purple-500 bg-purple-500/10 border-purple-500/20",
                },
                {
                  role: "Admin",
                  email: "admin@demo.com",
                  color: "text-red-500 bg-red-500/10 border-red-500/20",
                },
              ].map((demo) => (
                <div
                  key={demo.role}
                  className={`text-center border rounded-xl p-2.5 ${demo.color}`}
                >
                  <p className="text-xs font-semibold">{demo.role}</p>
                  <p className="text-xs opacity-70 truncate mt-0.5">
                    {demo.email}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-theme-muted text-xs text-center mt-2 opacity-60">
              Password: demo123
            </p>
          </motion.div>

          {/* Terms */}
          <motion.p
            variants={fadeUp}
            className="text-center text-theme-muted text-xs mt-4"
          >
            By signing in, you agree to our{" "}
            <span className="text-purple-500 cursor-pointer hover:text-purple-400 transition">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-purple-500 cursor-pointer hover:text-purple-400 transition">
              Privacy Policy
            </span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
