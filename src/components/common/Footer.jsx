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
    <footer className="bg-[#0d0d1f] border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FaBriefcase className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white">
                Job<span className="text-purple-400">Portal</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Find your dream job or hire the best talent — all in one place.
            </p>
            {/* Social */}
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
                  className="w-9 h-9 bg-white/5 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-400 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
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
                    className="hover:text-purple-400 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Employers</h4>
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
                    className="hover:text-purple-400 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
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
                    className="hover:text-purple-400 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-gray-600">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <p className="text-gray-600">
            Built with ❤️ using{" "}
            <span className="text-purple-400">MERN Stack</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
