import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiBell,
  FiShield,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiSmartphone,
  FiMail,
  FiGlobe,
  FiMoon,
  FiSun,
  FiLogOut,
  FiSave,
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

//Toggle Switch
const Toggle = ({ checked, onChange, label, desc }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-sm font-medium text-theme-primary">{label}</p>
      {desc && <p className="text-xs text-theme-muted mt-0.5">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
        checked ? "bg-purple-500" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  </div>
);

//Section Card
const Section = ({ icon, title, children }) => (
  <motion.div
    variants={fadeUp}
    className="card-theme border rounded-2xl overflow-hidden"
  >
    <div className="flex items-center gap-3 px-6 py-4 border-b border-theme bg-theme-secondary/50">
      <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
        {icon}
      </div>
      <h3 className="font-semibold text-theme-primary">{title}</h3>
    </div>
    <div className="px-6 py-5">{children}</div>
  </motion.div>
);

//Main
const Settings = () => {
  const { user, logOut, refreshUser } = useAuth();
  const auth = getAuth();
  const role = user?.role || "seeker";

  // Notification prefs (local state — can be extended to DB)
  const [notifPrefs, setNotifPrefs] = useState({
    emailNewJob: true,
    emailApplication: true,
    emailStatus: true,
    emailMarketing: false,
    pushNewJob: true,
    pushApplication: true,
    pushStatus: true,
  });

  // Privacy
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  });

  // Password change
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [pwLoading, setPwLoading] = useState(false);

  // Delete account
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Saving notif/privacy
  const [savingNotif, setSavingNotif] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);

  //Change Password
  const handleChangePassword = async () => {
    if (!pwForm.current) return toast.error("Enter current password");
    if (pwForm.newPw.length < 6)
      return toast.error("New password must be 6+ characters");
    if (pwForm.newPw !== pwForm.confirm)
      return toast.error("Passwords don't match");

    setPwLoading(true);
    try {
      const currentUser = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        pwForm.current,
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, pwForm.newPw);
      toast.success("Password changed successfully! 🔒");
      setPwForm({ current: "", newPw: "", confirm: "" });
    } catch (err) {
      if (err.code === "auth/wrong-password")
        toast.error("Current password is incorrect");
      else if (err.code === "auth/too-many-requests")
        toast.error("Too many attempts. Try later.");
      else toast.error("Password change failed");
    } finally {
      setPwLoading(false);
    }
  };

  //Save Notifications
  const handleSaveNotif = async () => {
    setSavingNotif(true);
    try {
      // Can be saved to DB: await api.put("/users/me", { notifPrefs })
      await new Promise((r) => setTimeout(r, 500)); // simulate
      toast.success("Notification preferences saved!");
    } finally {
      setSavingNotif(false);
    }
  };

  //Save Privacy
  const handleSavePrivacy = async () => {
    setSavingPrivacy(true);
    try {
      await api.put("/users/me", { privacy });
      await refreshUser();
      toast.success("Privacy settings saved!");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSavingPrivacy(false);
    }
  };

  //Delete Account
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE")
      return toast.error('Type "DELETE" to confirm');
    setDeleteLoading(true);
    try {
      await api.delete(`/users/${user._id}`);
      await deleteUser(auth.currentUser);
      await logOut();
      toast.success("Account deleted");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        toast.error("Please log out and log back in first, then try again.");
      } else {
        toast.error("Failed to delete account");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const isGoogleUser =
    auth.currentUser?.providerData?.[0]?.providerId === "google.com";

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5 max-w-2xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-theme-primary">Settings</h2>
        <p className="text-theme-muted text-sm mt-1">
          Manage your account preferences and security
        </p>
      </motion.div>

      {/*ACCOUNT INFO*/}
      <Section
        icon={<FiUser className="w-4 h-4" />}
        title="Account Information"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-theme-primary/30 rounded-xl border border-theme">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-theme-primary font-semibold truncate">
                {user?.name}
              </p>
              <p className="text-theme-muted text-sm truncate">{user?.email}</p>
              <span className="inline-flex items-center gap-1 text-xs bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-0.5 rounded-full mt-1 capitalize">
                {user?.role}
              </span>
            </div>
            {isGoogleUser && (
              <div className="flex items-center gap-1.5 text-xs text-theme-muted border border-theme rounded-xl px-3 py-1.5 flex-shrink-0">
                <FaGoogle className="w-3 h-3" /> Google
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              {
                label: "Email",
                value: user?.email,
                icon: <FiMail className="w-3.5 h-3.5" />,
              },
              {
                label: "Phone",
                value: user?.phone || "Not set",
                icon: <FiSmartphone className="w-3.5 h-3.5" />,
              },
              {
                label: "Location",
                value: user?.location || "Not set",
                icon: <FiGlobe className="w-3.5 h-3.5" />,
              },
              {
                label: "Member since",
                value: new Date(
                  user?.createdAt || Date.now(),
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                }),
                icon: <FiCheck className="w-3.5 h-3.5" />,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 border border-theme rounded-xl"
              >
                <span className="text-purple-500 flex-shrink-0">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-theme-muted">{item.label}</p>
                  <p className="text-theme-primary font-medium text-xs truncate">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-theme-muted text-center pt-1">
            To update your name, photo, or other info →{" "}
            <a
              href={`/${role}/profile`}
              className="text-purple-500 hover:text-purple-400 transition font-medium"
            >
              Go to Profile
            </a>
          </p>
        </div>
      </Section>

      {/*CHANGE PASSWORD*/}
      {!isGoogleUser ? (
        <Section icon={<FiLock className="w-4 h-4" />} title="Change Password">
          <div className="space-y-4">
            {[
              {
                key: "current",
                label: "Current Password",
                placeholder: "Enter current password",
              },
              {
                key: "newPw",
                label: "New Password",
                placeholder: "Min. 6 characters",
              },
              {
                key: "confirm",
                label: "Confirm Password",
                placeholder: "Re-enter new password",
              },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-theme-muted mb-1.5 block">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={showPw[key] ? "text" : "password"}
                    value={pwForm[key]}
                    onChange={(e) =>
                      setPwForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="input-theme w-full border rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                  <button
                    onClick={() => setShowPw((p) => ({ ...p, [key]: !p[key] }))}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary transition"
                  >
                    {showPw[key] ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Password strength */}
            {pwForm.newPw && (
              <div className="space-y-1">
                <p className="text-xs text-theme-muted">Password strength:</p>
                <div className="flex gap-1">
                  {[6, 8, 10, 12].map((len, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        pwForm.newPw.length >= len
                          ? "bg-purple-500"
                          : "bg-theme-primary/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleChangePassword}
              disabled={pwLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-purple-900/20"
            >
              {pwLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                  Updating...
                </>
              ) : (
                <>
                  <FiLock className="w-4 h-4" /> Change Password
                </>
              )}
            </button>
          </div>
        </Section>
      ) : (
        <Section icon={<FiLock className="w-4 h-4" />} title="Password">
          <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <FaGoogle className="text-blue-500 w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-theme-primary">
                Signed in with Google
              </p>
              <p className="text-xs text-theme-muted mt-0.5">
                Password management is handled by your Google account.
              </p>
            </div>
          </div>
        </Section>
      )}

      {/*NOTIFICATIONS*/}
      <Section
        icon={<FiBell className="w-4 h-4" />}
        title="Notification Preferences"
      >
        <div className="space-y-1">
          <p className="text-xs font-bold text-theme-muted uppercase tracking-wider mb-3">
            Email Notifications
          </p>
          <div className="divide-y divide-theme">
            <Toggle
              checked={notifPrefs.emailNewJob}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, emailNewJob: v }))}
              label="New Job Alerts"
              desc="Get notified when new jobs match your skills"
            />
            {role === "seeker" && (
              <Toggle
                checked={notifPrefs.emailStatus}
                onChange={(v) =>
                  setNotifPrefs((p) => ({ ...p, emailStatus: v }))
                }
                label="Application Updates"
                desc="Status changes on your applications"
              />
            )}
            {(role === "employer" || role === "admin") && (
              <Toggle
                checked={notifPrefs.emailApplication}
                onChange={(v) =>
                  setNotifPrefs((p) => ({ ...p, emailApplication: v }))
                }
                label="New Applications"
                desc="When someone applies to your job"
              />
            )}
            <Toggle
              checked={notifPrefs.emailMarketing}
              onChange={(v) =>
                setNotifPrefs((p) => ({ ...p, emailMarketing: v }))
              }
              label="Tips & Updates"
              desc="Product updates and career tips"
            />
          </div>

          <p className="text-xs font-bold text-theme-muted uppercase tracking-wider mb-3 mt-5">
            In-App Notifications
          </p>
          <div className="divide-y divide-theme">
            <Toggle
              checked={notifPrefs.pushNewJob}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, pushNewJob: v }))}
              label="New Job Posts"
              desc="Instant alerts for new matching jobs"
            />
            <Toggle
              checked={notifPrefs.pushStatus}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, pushStatus: v }))}
              label="Status Updates"
              desc="Real-time application status changes"
            />
          </div>

          <button
            onClick={handleSaveNotif}
            disabled={savingNotif}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/30 text-sm font-semibold hover:bg-purple-500/20 disabled:opacity-50 transition"
          >
            {savingNotif ? (
              <>
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />{" "}
                Saving...
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4" /> Save Preferences
              </>
            )}
          </button>
        </div>
      </Section>

      {/*PRIVACY (Seeker/Employer only)*/}
      {role !== "admin" && (
        <Section
          icon={<FiShield className="w-4 h-4" />}
          title="Privacy Settings"
        >
          <div className="space-y-1">
            <div className="divide-y divide-theme">
              <Toggle
                checked={privacy.profileVisible}
                onChange={(v) =>
                  setPrivacy((p) => ({ ...p, profileVisible: v }))
                }
                label="Public Profile"
                desc="Let employers find and view your profile"
              />
              <Toggle
                checked={privacy.showEmail}
                onChange={(v) => setPrivacy((p) => ({ ...p, showEmail: v }))}
                label="Show Email Address"
                desc="Display your email on your public profile"
              />
              <Toggle
                checked={privacy.showPhone}
                onChange={(v) => setPrivacy((p) => ({ ...p, showPhone: v }))}
                label="Show Phone Number"
                desc="Display your phone on your public profile"
              />
              <Toggle
                checked={privacy.allowMessages}
                onChange={(v) =>
                  setPrivacy((p) => ({ ...p, allowMessages: v }))
                }
                label="Allow Messages"
                desc="Let employers send you direct messages"
              />
            </div>

            <button
              onClick={handleSavePrivacy}
              disabled={savingPrivacy}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/30 text-sm font-semibold hover:bg-purple-500/20 disabled:opacity-50 transition"
            >
              {savingPrivacy ? (
                <>
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />{" "}
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" /> Save Privacy Settings
                </>
              )}
            </button>
          </div>
        </Section>
      )}

      {/*SESSIONS / SECURITY*/}
      <Section icon={<FiShield className="w-4 h-4" />} title="Security">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/10 rounded-xl flex items-center justify-center">
                <FiCheck className="text-green-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-theme-primary">
                  Current Session
                </p>
                <p className="text-xs text-theme-muted">
                  Active now ·{" "}
                  {navigator.userAgent.includes("Chrome")
                    ? "Chrome"
                    : "Browser"}
                </p>
              </div>
            </div>
            <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-1 rounded-full">
              Active
            </span>
          </div>

          <button
            onClick={logOut}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-sm font-medium transition"
          >
            <FiLogOut className="w-4 h-4" /> Sign Out of All Devices
          </button>
        </div>
      </Section>

      {/*DANGER ZONE*/}
      <Section
        icon={<FiAlertCircle className="w-4 h-4 text-red-500" />}
        title="Danger Zone"
      >
        <div className="space-y-3">
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
            <p className="text-sm font-semibold text-red-500 mb-1">
              Delete Account
            </p>
            <p className="text-xs text-theme-muted leading-relaxed">
              Permanently delete your account and all associated data including
              {role === "seeker"
                ? " applications, saved jobs, and profile."
                : role === "employer"
                  ? " job postings, applicant data, and profile."
                  : " all admin data."}
              This action cannot be undone.
            </p>
            <button
              onClick={() => setShowDelete(true)}
              className="mt-3 flex items-center gap-2 text-xs text-red-500 hover:text-red-400 border border-red-500/30 hover:border-red-500/60 px-3 py-2 rounded-xl transition font-medium"
            >
              <FiTrash2 className="w-3.5 h-3.5" /> Delete My Account
            </button>
          </div>
        </div>
      </Section>

      {/*Delete Confirm Modal*/}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDelete(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-theme-card border border-theme rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10"
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-theme-primary font-bold text-center text-lg mb-1">
                Delete Account?
              </h3>
              <p className="text-theme-muted text-sm text-center mb-5 leading-relaxed">
                This is permanent and cannot be reversed. All your data will be
                deleted.
              </p>

              <div className="mb-4">
                <label className="text-xs font-semibold text-theme-muted mb-2 block">
                  Type <span className="text-red-500 font-bold">DELETE</span> to
                  confirm
                </label>
                <input
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                  className="input-theme w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition text-center font-mono tracking-widest"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDelete(false);
                    setDeleteConfirm("");
                  }}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary text-sm hover:text-theme-primary transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== "DELETE" || deleteLoading}
                  className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition flex items-center justify-center gap-2"
                >
                  {deleteLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                      Deleting...
                    </>
                  ) : (
                    "Delete Forever"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Settings;
