import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import MainLayouts from "../layouts/mainLayouts";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from ".././layouts/DashboardLayout";
import SeekerDashboard from "../pages/seeker/SeekerDashboard";
import Profile from "../pages/seeker/Profile";
import Applications from "../pages/seeker/Applications";
import SavedJobs from "../pages/seeker/SavedJobs";
import RecommendedJobs from "../pages/seeker/RecommendedJobs";
import CvManager from "../pages/seeker/CvManager";
import ProfileViews from "../pages/seeker/ProfileViews";
import EmployerDashboard from "../pages/employer/EmployerDashboard";
import EmployerProfile from "../pages/employer/Profile";
import PostJob from "../pages/employer/PostJob";
import MyJobs from "../pages/employer/MyJobs";
import Applicants from "../pages/employer/Applicants";
import Messages from "../pages/shared/Message";
import Notifications from "../pages/shared/Notifications";
import Settings from "../pages/shared/Setting";
import Jobs from "../pages/Job/Jobs";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageJobs from "../pages/admin/ManageJobs";
import AdminApplications from "../pages/admin/AdminApplications";
import { AiFillSecurityScan } from "react-icons/ai";
import Security from "../pages/admin/Security";
import AdminProfile from "../pages/admin/AdminProfile";
import JobDetails from "../pages/Job/JobsDetails";
import About from "../components/common/About";
import InterviewQuestions from "../components/common/InterviewQuestions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/jobs/:id", element: <JobDetails /> },
      { path: "/about", element: <About /> },
      { path: "interview-questions", element: <InterviewQuestions /> },
    ],
  },
  // auth
  {
    path: "/",
    element: <AuthLayouts />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Seeker
  {
    path: "/seeker",
    element: (
      <PrivateRoute role="seeker">
        <DashboardLayout role="seeker"></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <SeekerDashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "saved",
        element: <SavedJobs />,
      },
      {
        path: "recommended",
        element: <RecommendedJobs />,
      },
      {
        path: "cv",
        element: <CvManager />,
      },
      {
        path: "views",
        element: <ProfileViews />,
      },

      // shared
      { path: "messages", element: <Messages /> },
      { path: "notifications", element: <Notifications /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // Employer
  {
    path: "/employer",
    element: (
      <PrivateRoute role="employer">
        <DashboardLayout role="employer" />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <EmployerDashboard /> },
      { path: "profile", element: <EmployerProfile /> },
      { path: "post-job", element: <PostJob /> },
      { path: "jobs", element: <MyJobs /> },
      { path: "applicants", element: <Applicants /> },
      // Shared
      { path: "messages", element: <Messages /> },
      { path: "notifications", element: <Notifications /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // Admin
  {
    path: "/admin",
    element: (
      <PrivateRoute role="admin">
        <DashboardLayout role="admin" />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "profile", element: <AdminProfile /> },

      { path: "users", element: <ManageUsers /> },
      { path: "jobs", element: <ManageJobs /> },
      { path: "applications", element: <AdminApplications /> },
      { path: "security", element: <Security /> },
      // Shared
      { path: "messages", element: <Messages /> },
      { path: "notifications", element: <Notifications /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
