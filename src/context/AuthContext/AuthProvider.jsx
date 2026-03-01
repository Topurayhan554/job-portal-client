import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import api from "../../services/api";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const syncUserWithDatabase = async (firebaseUser) => {
    if (!firebaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/users/login", {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
      });

      if (res.data.success) {
        const dbUser = res.data.user;
        setUser({
          // Firebase data
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || dbUser.name,
          photoURL: firebaseUser.photoURL || dbUser.profilePhoto,
          emailVerified: firebaseUser.emailVerified,
          // DB data
          _id: dbUser._id,
          name: dbUser.name,
          phone: dbUser.phone || "",
          role: dbUser.role,
          isBanned: dbUser.isBanned,
          createdAt: dbUser.createdAt,
        });
      }
    } catch (error) {
      console.error("DB sync error:", error);
      setUser({ ...firebaseUser, role: "seeker" });
    } finally {
      setLoading(false);
    }
  };

  // User data refresh
  const refreshUser = async () => {
    if (!user?.email) return;
    try {
      const res = await api.get(`/users/email/${user.email}`);
      if (res.data.success) {
        const dbUser = res.data.user;
        setUser((prev) => ({
          ...prev,
          _id: dbUser._id,
          name: dbUser.name,
          phone: dbUser.phone || "",
          role: dbUser.role,
          isBanned: dbUser.isBanned,
          photoURL: dbUser.profilePhoto || prev.photoURL,
        }));
      }
    } catch (error) {
      console.error("Refresh user error:", error);
    }
  };

  const signUpFunc = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInFunc = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (profile) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, profile);
      if (user?._id) await refreshUser();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await syncUserWithDatabase(currentUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    signUpFunc,
    signInFunc,
    signInGoogle,
    logOut,
    updateUserProfile,
    refreshUser,
    syncUserWithDatabase,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
