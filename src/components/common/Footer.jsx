import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-theme-secondary border-t border-theme">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FaBriefcase className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-theme-primary">
                Job<span className="text-purple-500">Portal</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-theme-muted">
              Find your dream job or hire the best talent — all in one place.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <FaGithub />, href: "#" },
                { icon: <FaLinkedin />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaEnvelope />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 border border-theme rounded-xl flex items-center justify-center text-theme-muted hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-400 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-theme-primary font-semibold mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Browse Jobs", to: "/jobs" },
                { label: "Create Profile", to: "/register" },
                { label: "My Applications", to: "/seeker/applications" },
                { label: "Dashboard", to: "/seeker/dashboard" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-theme-muted hover:text-purple-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-theme-primary font-semibold mb-4">
              For Employers
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Post a Job", to: "/employer/post-job" },
                { label: "Browse Candidates", to: "/jobs" },
                { label: "Dashboard", to: "/employer/dashboard" },
                { label: "Register as Employer", to: "/register" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-theme-muted hover:text-purple-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-theme-primary font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About Us", to: "#" },
                { label: "Contact", to: "#" },
                { label: "Privacy Policy", to: "#" },
                { label: "Terms of Service", to: "#" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-theme-muted hover:text-purple-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-theme-muted">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <p className="text-theme-muted">
            Built with ❤️ using{" "}
            <span className="text-purple-500">MERN Stack</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
