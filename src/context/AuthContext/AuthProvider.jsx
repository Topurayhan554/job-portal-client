import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import api from "../../services/api";
import { auth } from "../../firebase/firebase.config";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== Merge Firebase + MongoDB user =====
  const syncUserWithDatabase = async (firebaseUser) => {
    try {
      const res = await api.post("/users/login", {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      });

      const dbUser = res.data.user;

      // Firebase user + MongoDB user merge
      const mergedUser = {
        // Firebase fields
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        // MongoDB fields override
        name: dbUser.name || firebaseUser.displayName,
        role: dbUser.role,
        photoURL:
          dbUser.profilePhoto || dbUser.photoURL || firebaseUser.photoURL || "",
        profilePhoto:
          dbUser.profilePhoto || dbUser.photoURL || firebaseUser.photoURL || "",
        coverPhoto: dbUser.coverPhoto || "",
        phone: dbUser.phone || "",
        bio: dbUser.bio || "",
        skills: dbUser.skills || [],
        experience: dbUser.experience || [],
        education: dbUser.education || [],
        cvUrl: dbUser.cvUrl || "",
        savedJobs: dbUser.savedJobs || [],
        // Employer fields
        companyName: dbUser.companyName || "",
        companyWebsite: dbUser.companyWebsite || "",
        companySize: dbUser.companySize || "",
        companyBio: dbUser.companyBio || "",
        benefits: dbUser.benefits || [],
        // Meta
        status: dbUser.status,
        _id: dbUser._id,
        createdAt: dbUser.createdAt,
      };

      setUser(mergedUser);
      return mergedUser;
    } catch (error) {
      console.error("Sync error:", error);
      return null;
    }
  };
  const refreshUser = async () => {
    try {
      const res = await api.get("/users/me");
      const dbUser = res.data.user;
      const firebaseUser = auth.currentUser;

      const mergedUser = {
        uid: firebaseUser?.uid,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        // always latest profilePhoto
        photoURL:
          dbUser.profilePhoto ||
          dbUser.photoURL ||
          firebaseUser?.photoURL ||
          "",
        profilePhoto: dbUser.profilePhoto || dbUser.photoURL || "",
        coverPhoto: dbUser.coverPhoto || "",
        phone: dbUser.phone || "",
        bio: dbUser.bio || "",
        skills: dbUser.skills || [],
        experience: dbUser.experience || [],
        education: dbUser.education || [],
        cvUrl: dbUser.cvUrl || "",
        savedJobs: dbUser.savedJobs || [],
        companyName: dbUser.companyName || "",
        companyWebsite: dbUser.companyWebsite || "",
        companySize: dbUser.companySize || "",
        companyBio: dbUser.companyBio || "",
        benefits: dbUser.benefits || [],
        status: dbUser.status,
        _id: dbUser._id,
        createdAt: dbUser.createdAt,
      };

      setUser(mergedUser);
      return mergedUser;
    } catch (error) {
      console.error("Refresh error:", error);
    }
  };

  // ===== Auth state listener =====
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await syncUserWithDatabase(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ===== Auth functions =====
  const signUpFunc = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInFunc = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInGoogle = () => signInWithPopup(auth, googleProvider);

  const logOut = () => signOut(auth);

  const updateUserProfile = (data) => updateProfile(auth.currentUser, data);

  const saveUserToDB = async (firebaseUser, extra = {}) => {
    const res = await api.post("/users", {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      ...extra,
    });
    return res.data.user;
  };

  const value = {
    user,
    loading,
    setUser,
    signUpFunc,
    signInFunc,
    signInGoogle,
    logOut,
    updateUserProfile,
    saveUserToDB,
    syncUserWithDatabase,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
