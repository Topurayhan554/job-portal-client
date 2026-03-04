import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import axios from "axios";

// Employer Profile
export const useEmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get("/users/me");
      setProfile(res.data.user);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (data) => {
    try {
      const res = await api.put("/users/me", data);
      setProfile(res.data.user);
      toast.success("Profile updated!");
      return true;
    } catch {
      toast.error("Update failed");
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  return { profile, loading, updateProfile, refetch: fetchProfile };
};

// My Jobs
export const useMyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchJobs = useCallback(async (status = "All") => {
    setLoading(true);
    try {
      const params = status !== "All" ? `?status=${status}` : "";
      const res = await api.get(`/jobs/employer/my-jobs${params}`);
      setJobs(res.data.jobs || []);
      setTotal(res.data.total || 0);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJob = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setTotal((t) => t - 1);
      toast.success("Job deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const updateJobStatus = async (id, status) => {
    try {
      const res = await api.put(`/jobs/${id}`, { status });
      setJobs((prev) => prev.map((j) => (j._id === id ? res.data.job : j)));
      toast.success(`Job ${status.toLowerCase()}`);
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return { jobs, loading, total, fetchJobs, deleteJob, updateJobStatus };
};

// Post Job
export const usePostJob = () => {
  const [loading, setLoading] = useState(false);

  const postJob = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/jobs", data);
      toast.success("Job posted successfully! 🎉");
      return res.data.job;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, data) => {
    setLoading(true);
    try {
      const res = await api.put(`/jobs/${id}`, data);
      toast.success("Job updated!");
      return res.data.job;
    } catch {
      toast.error("Update failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postJob, updateJob, loading };
};

// Applicants
export const useApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchApplicants = useCallback(async (jobId = "") => {
    setLoading(true);
    try {
      const params = jobId ? `?jobId=${jobId}` : "";
      const res = await api.get(`/applications/employer${params}`);
      setApplicants(res.data.applications || []);
      setTotal(res.data.total || 0);
    } catch {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/applications/${id}/status`, { status });
      setApplicants((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: res.data.application.status } : a,
        ),
      );
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Update failed");
    }
  };

  // Employer Dashboard Stats
  const fetchStats = useCallback(async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        api.get("/jobs/employer/my-jobs"),
        api.get("/applications/employer"),
      ]);
      const jobs = jobsRes.data.jobs || [];
      const apps = appsRes.data.applications || [];
      return {
        totalJobs: jobsRes.data.total || 0,
        activeJobs: jobs.filter((j) => j.status === "Active").length,
        totalApplicants: appsRes.data.total || 0,
        shortlisted: apps.filter((a) => a.status === "Shortlisted").length,
        interviewed: apps.filter((a) => a.status === "Interview").length,
        hired: apps.filter((a) => a.status === "Hired").length,
        recentApps: apps.slice(0, 5),
        recentJobs: jobs.slice(0, 3),
      };
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);
  return {
    applicants,
    loading,
    total,
    fetchApplicants,
    updateStatus,
    fetchStats,
  };
};

// Image Upload
export const uploadImage = async (file) => {
  const fd = new FormData();
  fd.append("image", file);
  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    fd,
  );
  return res.data.data.url;
};
