import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  // ── Theme toggle ──────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("rr-theme") || "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rr-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ── Scroll-hide ───────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      setHidden(curr > 64 && curr > lastScroll.current);
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="rr-header"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <nav className="w-100 d-flex align-items-center gap-3 px-3 px-lg-5 py-2">
        {/* Brand – logo + name */}
        <Link
          to="/"
          className="text-decoration-none d-flex align-items-center gap-2"
          aria-label="ResumeRX – go to homepage"
        >
          <img
            src={theme === "dark" ? "/logo/dark.svg" : "/logo/light.svg"}
            alt="ResumeRX"
            className="brand-logo-img"
          />
          <span className="brand-name">ResumeRX</span>
        </Link>

        {/* Right side */}
        <div className="ms-auto d-flex align-items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost-icon"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <i className="bi bi-sun" />
            ) : (
              <i className="bi bi-moon" />
            )}
          </button>

          {/* Arrow to dashboard */}
          <Link
            to="/dashboard"
            className="btn btn-sm btn-brand-icon d-flex align-items-center justify-content-center"
            aria-label="Go to dashboard"
          >
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </nav>
    </header>
  );
}


