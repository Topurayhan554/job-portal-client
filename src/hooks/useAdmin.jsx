import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

// ===== Dashboard Stats =====
export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [usersRes, jobsRes, appsRes] = await Promise.all([
          api.get("/users"), // ✅ /api/users
          api.get("/jobs/admin/all"), // ✅ /api/jobs/admin/all
          api.get("/applications"), // ✅ /api/applications
        ]);

        setStats({
          totalUsers: usersRes.data.total || 0,
          activeJobs: jobsRes.data.total || 0,
          totalApplications: appsRes.data.total || 0,
          recentUsers: usersRes.data.users?.slice(0, 5) || [],
          recentJobs: jobsRes.data.jobs?.slice(0, 4) || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { stats, loading };
};

// ===== Manage Users =====
export const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchUsers = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      // empty/all values skip করো
      Object.entries(params).forEach(([k, v]) => {
        if (v && v !== "all" && v !== "") query.append(k, v);
      });

      const res = await api.get(`/users?${query.toString()}`);
      console.log("Users response:", res.data);
      setUsers(res.data.users || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  const banUser = async (id) => {
    try {
      const res = await api.put(`/users/${id}/ban`);
      setUsers((prev) => prev.map((u) => (u._id === id ? res.data.user : u)));
      toast.success(res.data.message);
    } catch {
      toast.error("Action failed");
    }
  };

  const changeRole = async (id, role) => {
    try {
      const res = await api.put(`/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u._id === id ? res.data.user : u)));
      toast.success("Role updated!");
    } catch {
      toast.error("Action failed");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setTotal((t) => t - 1);
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, total, fetchUsers, banUser, changeRole, deleteUser };
};

// ===== Manage Jobs =====
export const useAdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchJobs = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v && v !== "All" && v !== "") query.append(k, v);
      });

      const res = await api.get(`/jobs/admin/all?${query.toString()}`); // ✅
      setJobs(res.data.jobs || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const approveJob = async (id) => {
    try {
      const res = await api.put(`/jobs/${id}`, {
        status: "Active",
        reported: false,
      });
      setJobs((prev) => prev.map((j) => (j._id === id ? res.data.job : j)));
      toast.success("Job approved!");
    } catch {
      toast.error("Action failed");
    }
  };

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

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, total, fetchJobs, approveJob, deleteJob };
};

// ===== Admin Applications =====
export const useAdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchApplications = useCallback(async (status = "All") => {
    setLoading(true);
    try {
      const params = status !== "All" ? `?status=${status}` : "";
      const res = await api.get(`/applications${params}`); // ✅
      setApplications(res.data.applications || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteApplication = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      setTotal((t) => t - 1);
      toast.success("Application deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, loading, total, fetchApplications, deleteApplication };
};
