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
} from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { signUpFunc, signInGoogle, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { role: "seeker" } });

  const watchPassword = watch("password", "");

  // Password strength
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
    if (strength.score === 0) return "bg-gray-700";
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

  // DB তে User save করো
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
      if (error.response?.status !== 409) {
        console.error("Save user error:", error);
      }
    }
  };

  const handleRegister = async (data) => {
    try {
      // 1. Firebase signup
      const userCredential = await signUpFunc(data.email, data.password);
      const firebaseUser = userCredential.user;

      // 2. Firebase profile update
      await updateUserProfile({
        displayName: data.name,
        photoURL: "",
      });

      // 3. DB তে save করো
      await saveUserToDB(
        { ...firebaseUser, displayName: data.name },
        { name: data.name, phone: data.phone || "", role: data.role },
      );

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
    } catch (error) {
      toast.error("Google login failed. Try again.");
    }
  };

  const inputClass = (error) =>
    `w-full bg-[#12121f] border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${error ? "border-red-500" : "border-gray-700"}`;

  return (
    <div className="min-h-screen flex bg-[#0a0a14]">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1a1040] via-[#0f0f2d] to-[#0a0a14] flex-col items-center justify-center px-16 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-600 opacity-20 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">JobPortal</h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            Start your journey today. Thousands of opportunities are waiting for
            you.
          </p>
          <div className="mt-12 space-y-4 text-left">
            {[
              "AI-powered job matching",
              "Real-time application tracking",
              "Smart resume analyzer",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">JobPortal</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
          <p className="text-gray-400 mb-6">
            Join thousands of job seekers and employers
          </p>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#1e1e30] border border-gray-700 text-white py-3 rounded-xl hover:bg-[#252540] hover:border-gray-500 transition mb-5 font-medium"
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
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-sm">
              Or continue with email
            </span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
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
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" /> {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
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
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
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
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" /> {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
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
                  className={`w-full bg-[#12121f] border rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.password ? "border-red-500" : "border-gray-700"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {watchPassword && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strengthColor()}`}
                        style={{ width: `${(strength.score / 4) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
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
                        className={`flex items-center gap-2 text-xs ${item.check ? "text-green-400" : "text-gray-500"}`}
                      >
                        <FiCheckCircle className="w-3 h-3" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />{" "}
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watchPassword || "Passwords do not match",
                  })}
                  className={`w-full bg-[#12121f] border rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.confirmPassword ? "border-red-500" : "border-gray-700"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />{" "}
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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
                  <div className="flex items-center justify-center gap-2 border border-gray-700 rounded-xl py-3 text-gray-400 peer-checked:border-purple-500 peer-checked:text-purple-400 peer-checked:bg-purple-500/10 hover:border-gray-500 transition">
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
                  <div className="flex items-center justify-center gap-2 border border-gray-700 rounded-xl py-3 text-gray-400 peer-checked:border-purple-500 peer-checked:text-purple-400 peer-checked:bg-purple-500/10 hover:border-gray-500 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Employer
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition shadow-lg shadow-purple-900/30"
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

          <p className="text-center text-gray-500 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 font-semibold hover:text-purple-300 transition"
            >
              Sign in
            </Link>
          </p>
          <p className="text-center text-gray-600 text-xs mt-4 pb-4">
            By registering, you agree to our{" "}
            <span className="text-gray-500 hover:text-white cursor-pointer transition">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-gray-500 hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
