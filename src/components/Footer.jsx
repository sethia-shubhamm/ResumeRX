import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="rr-footer">
      <div className="row g-4 g-lg-5">
        {/* Brand column */}
        <div className="col-12 col-sm-6 col-lg-3">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3">
            <img src="/logo/dark.svg" alt="ResumeRX" style={{ width: 32, height: 32, borderRadius: 7, objectFit: "contain" }} />
            <span className="fw-bold text-white" style={{ fontSize: 15 }}>ResumeRX</span>
          </Link>
          <div className="mb-2">
            <h2 className="fw-bold text-white mb-1" style={{ fontSize: 16 }}>ResumeRX</h2>
            <p className="small" style={{ color: "#94a3b8", maxWidth: 240, lineHeight: 1.6 }}>
              A free and open-source resume builder that simplifies the process of creating,
              updating, and sharing your resume.
            </p>
          </div>
          {/* Social links */}
          <div className="d-flex gap-2 mt-3">
            <a href="" target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-ghost-icon" aria-label="GitHub">
              <i className="bi bi-github" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-ghost-icon" aria-label="LinkedIn">
              <i className="bi bi-linkedin" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-ghost-icon" aria-label="X (Twitter)">
              <i className="bi bi-twitter-x" />
            </a>
          </div>
        </div>

        {/* Resources */}
        <div className="col-6 col-sm-3 col-lg-2 offset-lg-1">
          <h6 className="text-white fw-semibold mb-3" style={{ fontSize: 13 }}>Resources</h6>
          <ul className="list-unstyled">
            {[
              { href: "",                                label: "Documentation" },
              { href: "",            label: "Sponsorships" },
              { href: "",       label: "Source Code" },
              { href: "", label: "Changelog" },
            ].map((l) => (
              <li key={l.label} className="mb-2">
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="rr-footer-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div className="col-6 col-sm-3 col-lg-2">
          <h6 className="text-white fw-semibold mb-3" style={{ fontSize: 13 }}>Community</h6>
          <ul className="list-unstyled">
            {[
              { href: "", label: "Report an issue" },
              { href: "",            label: "Translations" },
              { href: "",                    label: "Subreddit" },
              { href: "",                         label: "Discord" },
            ].map((l) => (
              <li key={l.label} className="mb-2">
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="rr-footer-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
