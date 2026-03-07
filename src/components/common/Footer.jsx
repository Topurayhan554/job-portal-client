import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    seekers: [
      { label: "Browse Jobs", to: "/jobs" },
      { label: "Create Profile", to: "/register" },
      { label: "My Applications", to: "/seeker/applications" },
      { label: "CV Manager", to: "/seeker/dashboard" },
      { label: "AI CV Analyzer", to: "/seeker/dashboard" },
    ],
    employers: [
      { label: "Post a Job", to: "/employer/post-job" },
      { label: "Browse Candidates", to: "/jobs" },
      { label: "Employer Dashboard", to: "/employer/dashboard" },
      { label: "Register as Employer", to: "/register" },
    ],
    company: [
      { label: "About Us", to: "#" },
      { label: "Contact", to: "#" },
      { label: "Privacy Policy", to: "#" },
      { label: "Terms of Service", to: "#" },
    ],
  };

  const socials = [
    { icon: <FaGithub className="w-4 h-4" />, href: "#", label: "GitHub" },
    { icon: <FaLinkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
    { icon: <FaTwitter className="w-4 h-4" />, href: "#", label: "Twitter" },
    { icon: <FaEnvelope className="w-4 h-4" />, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-theme-secondary border-t border-theme">
      {/*  Top CTA Banner  */}
      <div className="border-b border-theme">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-theme-primary font-bold text-lg">
              Ready to find your next opportunity?
            </p>
            <p className="text-theme-muted text-sm mt-0.5">
              Join thousands of professionals already on KaajKhojo.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              to="/jobs"
              className="text-sm font-semibold text-theme-secondary border border-theme px-5 py-2.5 rounded-xl hover:border-purple-500/40 hover:text-theme-primary transition"
            >
              Browse Jobs
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-lg shadow-purple-900/20 flex items-center gap-2"
            >
              Get Started <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/*  Main Footer  */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20 group-hover:scale-105 transition-transform duration-300">
                <FaBriefcase className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-theme-primary tracking-tight">
                Kaaj<span className="text-purple-500">Khojo</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-theme-muted mb-6 max-w-xs">
              Bangladesh's #1 job platform connecting talented professionals
              with top companies. Find your dream job or hire the best talent.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-theme-muted">
                <FaMapMarkerAlt className="w-3 h-3 text-purple-400 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-theme-muted">
                <FaEnvelope className="w-3 h-3 text-purple-400 flex-shrink-0" />
                <span>hello@kaajkhojo.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-theme-muted">
                <FaPhone className="w-3 h-3 text-purple-400 flex-shrink-0" />
                <span>+880 1700-000000</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 border border-theme rounded-xl flex items-center justify-center text-theme-muted hover:bg-purple-500/10 hover:border-purple-500/40 hover:text-purple-400 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-theme-primary font-bold text-sm mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-violet-500 to-blue-500 rounded-full inline-block" />
                For Job Seekers
              </h4>
              <ul className="space-y-3">
                {links.seekers.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.to}
                      className="text-sm text-theme-muted hover:text-purple-400 transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-purple-400 transition-all duration-300 rounded-full" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-theme-primary font-bold text-sm mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-violet-500 to-blue-500 rounded-full inline-block" />
                For Employers
              </h4>
              <ul className="space-y-3">
                {links.employers.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.to}
                      className="text-sm text-theme-muted hover:text-purple-400 transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-purple-400 transition-all duration-300 rounded-full" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-theme-primary font-bold text-sm mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-violet-500 to-blue-500 rounded-full inline-block" />
                Company
              </h4>
              <ul className="space-y-3">
                {links.company.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.to}
                      className="text-sm text-theme-muted hover:text-purple-400 transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-purple-400 transition-all duration-300 rounded-full" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="mt-8 space-y-2">
                {[
                  "Verified Employers Only",
                  "Free for Job Seekers",
                  "Bangladesh-based Team",
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-theme-muted"
                  >
                    <span className="w-4 h-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400 text-[9px]">✓</span>
                    </span>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Bottom Bar  */}
      <div className="border-t border-theme">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-theme-muted text-xs">
            © {year}{" "}
            <span className="text-theme-secondary font-medium">KaajKhojo</span>.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-theme-muted">
            <Link to="#" className="hover:text-purple-400 transition">
              Privacy
            </Link>
            <span className="w-px h-3 bg-theme-muted/30" />
            <Link to="#" className="hover:text-purple-400 transition">
              Terms
            </Link>
            <span className="w-px h-3 bg-theme-muted/30" />
            <span>
              Built with ❤️ using{" "}
              <span className="text-purple-400 font-medium">MERN Stack</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
