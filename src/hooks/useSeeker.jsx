import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

// Profile
export const useSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { refreshUser } = useAuth();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get("/users/me");
      setProfile(res.data.user);
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (data) => {
    try {
      const res = await api.put("/users/me", data);
      setProfile(res.data.user);
      await refreshUser();

      toast.success("Profile updated!");
      return true;
    } catch (err) {
      toast.error("Update failed");
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, updateProfile, refetch: fetchProfile };
};

// Applications
export const useSeekerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchApplications = useCallback(async (status = "All") => {
    setLoading(true);
    try {
      const params = status !== "All" ? `?status=${status}` : "";
      const res = await api.get(`/applications/my${params}`);
      setApplications(res.data.applications);
      setTotal(res.data.total);
    } catch (err) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteApplication = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      toast.success("Application removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, loading, total, fetchApplications, deleteApplication };
};

// Saved Jobs
export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = useCallback(async () => {
    try {
      const res = await api.get("/users/me");
      const ids = res.data.user.savedJobs || [];
      if (ids.length === 0) {
        setSavedJobs([]);
        setLoading(false);
        return;
      }
      const jobRes = await api.get(`/jobs?ids=${ids.join(",")}&limit=50`);
      setSavedJobs(jobRes.data.jobs);
    } catch (err) {
      toast.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const unsaveJob = async (jobId) => {
    try {
      const res = await api.get("/users/me");
      const current = res.data.user.savedJobs || [];
      const updated = current.filter(
        (id) => id.toString() !== jobId.toString(),
      );
      await api.put("/users/me", { savedJobs: updated });
      setSavedJobs((prev) => prev.filter((j) => j._id !== jobId));
      toast.success("Job removed from saved");
    } catch {
      toast.error("Failed to unsave job");
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  return { savedJobs, loading, unsaveJob, refetch: fetchSavedJobs };
};

// Recommended Jobs
export const useRecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const profileRes = await api.get("/users/me");
        const skills = profileRes.data.user.skills || [];
        const search = skills[0] || "";
        const res = await api.get(`/jobs?search=${search}&limit=6`);
        setJobs(res.data.jobs);
      } catch {
        toast.error("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { jobs, loading };
};

// Dashboard Stats
export const useSeekerStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [profileRes, appRes] = await Promise.all([
          api.get("/users/me"),
          api.get("/applications/my"),
        ]);

        const apps = appRes.data.applications;
        const user = profileRes.data.user;

        const counts = {
          applied: apps.length,
          underReview: apps.filter((a) => a.status === "Under Review").length,
          interview: apps.filter((a) => a.status === "Interview").length,
          rejected: apps.filter((a) => a.status === "Rejected").length,
          shortlisted: apps.filter((a) => a.status === "Shortlisted").length,
          savedJobs: (user.savedJobs || []).length,
        };

        setStats({ counts, user, recentApps: apps.slice(0, 4) });
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { stats, loading };
};
