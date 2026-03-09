import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiImage,
} from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Register = () => {
  const { signUpFunc, signInGoogle, updateUserProfile, syncUserWithDatabase } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { role: "seeker" } });

  const watchPassword = watch("password", "");

  const getStrength = () => {
    const hasUpper = /[A-Z]/.test(watchPassword);
    const hasLower = /[a-z]/.test(watchPassword);
    const hasNumber = /[0-9]/.test(watchPassword);
    const hasMinLength = watchPassword.length >= 6;
    const score = [hasUpper, hasLower, hasNumber, hasMinLength].filter(
      Boolean,
    ).length;
    return { score, hasUpper, hasLower, hasNumber, hasMinLength };
  };
  const strength = getStrength();

  const strengthColor = () => {
    if (strength.score === 0) return "bg-gray-300 dark:bg-gray-700";
    if (strength.score <= 2) return "bg-red-500";
    if (strength.score === 3) return "bg-yellow-500";
    return "bg-green-500";
  };
  const strengthText = () => {
    if (strength.score === 0) return "";
    if (strength.score <= 2) return "Weak";
    if (strength.score === 3) return "Medium";
    return "Strong";
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData,
    );
    return res.data.data.url;
  };

  const saveUserToDB = async (firebaseUser, extraData = {}) => {
    try {
      await api.post("/users", {
        name: firebaseUser.displayName || extraData.name || "",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "",
        uid: firebaseUser.uid,
        phone: extraData.phone || "",
        role: extraData.role || "seeker",
      });
    } catch (error) {
      if (error.response?.status !== 409)
        console.error("Save user error:", error);
    }
  };

  const handleRegister = async (data) => {
    try {
      const profileImg = data.photo?.[0];
      const userCredential = await signUpFunc(data.email, data.password);
      const firebaseUser = userCredential.user;
      let photoURL = "";
      if (profileImg) {
        try {
          photoURL = await uploadToImgbb(profileImg);
        } catch {
          toast.error("Photo upload failed, continuing without photo");
        }
      }
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL || "",
      });
      await saveUserToDB(
        { ...firebaseUser, displayName: data.name, photoURL },
        { name: data.name, phone: data.phone || "", role: data.role },
      );
      await syncUserWithDatabase({
        ...firebaseUser,
        displayName: data.name,
        photoURL,
      });
      toast.success("Account created successfully! 🎉");
      navigate(location?.state || "/");
    } catch (error) {
      let message = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use")
        message = "This email is already registered.";
      else if (error.code === "auth/weak-password")
        message = "Password should be at least 6 characters.";
      else if (error.code === "auth/invalid-email")
        message = "Invalid email address.";
      toast.error(message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInGoogle();
      toast.success("Logged in with Google!");
      navigate(location?.state || "/");
    } catch {
      toast.error("Google login failed. Try again.");
    }
  };

  // ── input class — theme-aware ──
  const inputClass = (error) =>
    `w-full input-theme border rounded-xl pl-11 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
      error ? "border-red-500" : "border-theme"
    }`;

  const stats = [
    { value: "10,000+", label: "Active Jobs" },
    { value: "25,000+", label: "Job Seekers" },
    { value: "1,500+", label: "Top Companies" },
  ];
  const features = [
    {
      emoji: "🤖",
      title: "AI-Powered Matching",
      desc: "Get matched to jobs that fit your exact skills and experience.",
    },
    {
      emoji: "📊",
      title: "Smart CV Analyzer",
      desc: "Instantly see how your resume scores against job requirements.",
    },
    {
      emoji: "🔔",
      title: "Real-Time Alerts",
      desc: "Be the first to know when a perfect job opens up for you.",
    },
    {
      emoji: "✅",
      title: "Verified Employers Only",
      desc: "Every company is vetted — no spam, no fake listings.",
    },
  ];

  return (
    <div className="min-h-screen flex bg-theme-primary">
      {/* ══════════════════════════
          LEFT — always dark
      ══════════════════════════ */}
      <div className="hidden lg:flex w-[52%] relative overflow-hidden flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0820] via-[#100b2e] to-[#07071a]" />
        <div className="absolute top-[-80px] left-[-80px]   w-[420px] h-[420px] bg-violet-700 opacity-[0.18] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[360px] h-[360px] bg-blue-600  opacity-[0.15] rounded-full blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-purple-800 opacity-[0.08] rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-28 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute top-0 right-56 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10  to-transparent" />

        <div className="relative z-10 flex flex-col h-full px-14 py-12">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-900/40 group-hover:scale-110 transition-transform">
              <FaBriefcase className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Kaaj<span className="text-purple-400">Khojo</span>
            </span>
          </Link>

          <div className="mt-auto mb-auto pt-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              🇧🇩 Bangladesh's #1 Job Platform
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Your next big
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  career move
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                >
                  <path
                    d="M0 5 Q50 0 100 4 Q150 8 200 3"
                    stroke="url(#ul)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="ul"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#7c3aed" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              starts here.
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-xs mt-6">
              Join thousands of professionals who found their dream job through
              KaajKhojo — built for Bangladesh.
            </p>
            <div className="flex gap-6 mt-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-white text-xl font-extrabold">{s.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.06] hover:border-purple-500/20 transition"
                >
                  <div className="text-xl mb-2">{f.emoji}</div>
                  <p className="text-white text-xs font-semibold mb-1">
                    {f.title}
                  </p>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-white/[0.06] pt-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                R
              </div>
              <div>
                <p className="text-gray-300 text-xs leading-relaxed italic">
                  "Found my dream job within 2 weeks of signing up. The AI
                  matching is incredibly accurate."
                </p>
                <p className="text-gray-500 text-xs mt-1.5 font-medium">
                  Rahim — Software Engineer, Dhaka
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          RIGHT — light/dark aware
      ══════════════════════════ */}
      <div className="w-full lg:w-[48%] flex items-center justify-center px-6 py-12 overflow-y-auto bg-theme-primary">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-theme-primary">
              Kaaj<span className="text-purple-500">Khojo</span>
            </span>
          </div>

          <h2 className="text-3xl font-bold text-theme-primary mb-2">
            Create account
          </h2>
          <p className="text-theme-muted mb-6">
            Join thousands of job seekers and employers
          </p>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 card-theme border border-theme text-theme-primary py-3 rounded-xl hover:border-purple-500/40 transition mb-5 font-medium"
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
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-theme-muted/30" />
            <span className="text-theme-muted text-sm">
              Or continue with email
            </span>
            <div className="flex-1 h-px bg-theme-muted/30" />
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className={inputClass(errors.name)}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" /> {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={inputClass(errors.email)}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Phone Number{" "}
                <span className="text-theme-muted font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  autoComplete="tel"
                  {...register("phone", {
                    pattern: {
                      value: /^[+]?[\d\s\-().]{7,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className={inputClass(errors.phone)}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" /> {errors.phone.message}
                </p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Profile Photo{" "}
                <span className="text-theme-muted font-normal">(Optional)</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden input-theme border border-theme flex items-center justify-center flex-shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-6 h-6 text-theme-muted" />
                  )}
                </div>
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 input-theme border border-theme border-dashed rounded-xl px-4 py-3 hover:border-purple-500 hover:bg-purple-500/5 transition">
                    <FiImage className="w-4 h-4 text-theme-muted" />
                    <span className="text-theme-muted text-sm">
                      {photoPreview ? "Change photo" : "Upload photo"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("photo")}
                    onChange={(e) => {
                      register("photo").onChange(e);
                      handlePhotoChange(e);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: {
                      hasUpper: (v) =>
                        /[A-Z]/.test(v) || "Must contain an uppercase letter",
                      hasLower: (v) =>
                        /[a-z]/.test(v) || "Must contain a lowercase letter",
                    },
                  })}
                  className={`w-full input-theme border rounded-xl pl-11 pr-12 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.password ? "border-red-500" : "border-theme"}`}
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

              {watchPassword && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-theme-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strengthColor()}`}
                        style={{ width: `${(strength.score / 4) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-theme-muted font-medium">
                      {strengthText()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {[
                      {
                        check: strength.hasMinLength,
                        text: "At least 6 characters",
                      },
                      {
                        check: strength.hasUpper,
                        text: "One uppercase letter",
                      },
                      {
                        check: strength.hasLower,
                        text: "One lowercase letter",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 text-xs ${item.check ? "text-green-500" : "text-theme-muted"}`}
                      >
                        <FiCheckCircle className="w-3 h-3" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />{" "}
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watchPassword || "Passwords do not match",
                  })}
                  className={`w-full input-theme border rounded-xl pl-11 pr-12 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.confirmPassword ? "border-red-500" : "border-theme"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary transition"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />{" "}
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="seeker"
                    {...register("role")}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 border border-theme rounded-xl py-3 text-theme-muted peer-checked:border-purple-500 peer-checked:text-purple-500 peer-checked:bg-purple-500/10 hover:border-purple-500/40 transition">
                    <FiUser className="w-4 h-4" /> Job Seeker
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="employer"
                    {...register("role")}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 border border-theme rounded-xl py-3 text-theme-muted peer-checked:border-purple-500 peer-checked:text-purple-500 peer-checked:bg-purple-500/10 hover:border-purple-500/40 transition">
                    <FaBriefcase className="w-4 h-4" /> Employer
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition shadow-lg shadow-purple-900/20"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-theme-muted mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-500 font-semibold hover:text-purple-400 transition"
            >
              Sign in
            </Link>
          </p>
          <p className="text-center text-theme-muted text-xs mt-4 pb-4">
            By registering, you agree to our{" "}
            <span className="hover:text-theme-primary cursor-pointer transition">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="hover:text-theme-primary cursor-pointer transition">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
