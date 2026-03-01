import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useResume } from "../context/ResumeContext";

const DEMO_USER = { name: "Shubham Sethia", email: "shubham@rx.com", initials: "S" };

const APP_NAV = [
  { icon: "bi-file-earmark-text", label: "Resumes", path: "/dashboard" },
];
const SETTINGS_NAV = [
  { icon: "bi-person-circle",        label: "Profile",        path: "/dashboard/settings/profile"        },
  { icon: "bi-sliders",              label: "Preferences",    path: "/dashboard/settings/preferences"    },
  { icon: "bi-shield-lock",          label: "Authentication", path: "/dashboard/settings/authentication" },
  { icon: "bi-key",                  label: "API Keys",       path: "/dashboard/settings/api-keys"       },
  { icon: "bi-robot",                label: "AI",             path: "/dashboard/settings/ai"             },
  { icon: "bi-exclamation-triangle", label: "Danger Zone",    path: "/dashboard/settings/danger-zone"    },
];

const GRADIENTS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
  "linear-gradient(135deg,#43e97b,#38f9d7)",
  "linear-gradient(135deg,#fa709a,#fee140)",
  "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  "linear-gradient(135deg,#fda085,#f6d365)",
  "linear-gradient(135deg,#89f7fe,#66a6ff)",
];
function gradientFor(id) {
  let n = 0;
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
  return GRADIENTS[n % GRADIENTS.length];
}

function Sidebar({ collapsed, setCollapsed, mobileOpen, onClose }) {
  const { pathname } = useLocation();
  const w = collapsed ? 64 : 240;
  return (
    <>
      {mobileOpen && <div className="db-overlay" onClick={onClose} />}
      <aside className={`db-sidebar${mobileOpen ? " open" : ""}`} style={{ width: w }} data-collapsed={collapsed ? "true" : "false"}>
        <div className="db-sidebar-head">
          <Link to="/" className="db-brand" onClick={onClose}>
            <img src="/logo/dark.svg" alt="RR" className="db-brand-logo" />
            {!collapsed && <span className="db-brand-name">ResumeRX</span>}
          </Link>
          <button className="db-collapse-btn" onClick={() => setCollapsed((c) => !c)} title={collapsed ? "Expand" : "Collapse"}>
            <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`} />
          </button>
        </div>
        <div className="db-sidebar-divider" />
        <div className="db-sidebar-body">
          <div className="db-nav-group">
            {!collapsed && <p className="db-nav-label">App</p>}
            {APP_NAV.map((item) => (
              <Link key={item.path} to={item.path} className={`db-nav-link${pathname === item.path ? " active" : ""}`} onClick={onClose} title={collapsed ? item.label : undefined}>
                <i className={`bi ${item.icon}`} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
          <div className="db-nav-group">
            {!collapsed && <p className="db-nav-label">Settings</p>}
            {SETTINGS_NAV.map((item) => (
              <Link key={item.path} to={item.path} className={`db-nav-link${pathname.startsWith(item.path) ? " active" : ""}`} onClick={onClose} title={collapsed ? item.label : undefined}>
                <i className={`bi ${item.icon}`} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
        <div className="db-sidebar-divider" />
        <div className="db-sidebar-foot">
          <div className="db-user-row" title={collapsed ? "DEMO_USER.name" : undefined}>
            <div className="db-avatar">{DEMO_USER.initials}</div>
            {!collapsed && (
              <div className="db-user-info">
                <span className="db-user-name">"{DEMO_USER.name}"</span>
                <span className="db-user-email">{DEMO_USER.email}</span>
              </div>
            )}
          </div>
          {!collapsed && <p className="db-copyright">© {new Date().getFullYear()} ResumeRX</p>}
        </div>
      </aside>
    </>
  );
}

function ResumeCard({ resume, onDelete, onDuplicate, onRename }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(resume.title);
  const menuRef = useRef();
  const updated = resume.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "–";
  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const submitRename = (e) => {
    e?.preventDefault?.();
    if (!newTitle.trim()) return;
    onRename(resume._id, newTitle.trim());
    setRenaming(false);
    toast.success("Renamed");
  };
  return (
    <div className="rcard">
      <div className="rcard-thumb" style={{ background: gradientFor(resume._id) }} onClick={() => navigate(`/builder/${resume._id}`)}>
        <div className="rcard-thumb-lines">
          <div className="rline rline-title" />
          <div className="rline rline-sub" />
          {[90, 75, 82, 60, 70, 85].map((w, i) => <div key={i} className="rline" style={{ width: `${w}%` }} />)}
        </div>
        <div className="rcard-hover-overlay"><i className="bi bi-pencil-square" /><span>Edit</span></div>
      </div>
      <div className="rcard-foot">
        {renaming ? (
          <form onSubmit={submitRename} style={{ flex: 1 }}>
            <input className="rcard-rename-input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onBlur={submitRename} autoFocus />
          </form>
        ) : (
          <div className="rcard-meta">
            <div className="rcard-title" title={resume.title} onDoubleClick={() => { setRenaming(true); setNewTitle(resume.title); }}>{resume.title}</div>
            <div className="rcard-date">{updated}</div>
          </div>
        )}
        <div className="rcard-actions" ref={menuRef}>
          <button className="rcard-menu-btn" onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}><i className="bi bi-three-dots" /></button>
          {menuOpen && (
            <div className="rcard-dropdown">
              <button onClick={() => { navigate(`/builder/${resume._id}`); setMenuOpen(false); }}><i className="bi bi-pencil" /> Edit</button>
              <button onClick={() => { setRenaming(true); setNewTitle(resume.title); setMenuOpen(false); }}><i className="bi bi-cursor-text" /> Rename</button>
              <button onClick={() => { onDuplicate(resume._id); setMenuOpen(false); toast.success("Duplicated!"); }}><i className="bi bi-files" /> Duplicate</button>
              <div className="rcard-dropdown-divider" />
              <button className="danger" onClick={() => { onDelete(resume._id); setMenuOpen(false); }}><i className="bi bi-trash" /> Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { resumes, createResume, deleteResume, duplicateResume, renameResume, loading } = useResume();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();
  const sideW = collapsed ? 64 : 240;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return toast.error("Enter a title");
    const resume = createResume(newTitle.trim());
    setNewTitle("");
    document.getElementById("createResModal")?.querySelector('[data-bs-dismiss="modal"]')?.click();
    toast.success("Resume created!");
    navigate(`/builder/${resume._id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this resume? This cannot be undone.")) return;
    deleteResume(id);
    toast.success("Deleted");
  };

  const filtered = resumes
    .filter((r) => r.title?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return new Date(b[sortBy] ?? b.updatedAt ?? 0) - new Date(a[sortBy] ?? a.updatedAt ?? 0);
    });

  return (
    <div className="db-root">
      <div className="d-none d-md-block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={false} onClose={() => {}} />
      </div>
      <div className="d-md-none">
        <Sidebar collapsed={false} setCollapsed={() => {}} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
      <main className="db-main" style={{ marginLeft: sideW }}>
        <style>{`@media(max-width:767px){.db-main{margin-left:0!important}}`}</style>
        <div className="db-topbar">
          <div className="d-flex align-items-center gap-3">
            <button className="db-hamburger d-md-none" onClick={() => setMobileOpen(true)}><i className="bi bi-list" /></button>
            <h5 className="db-topbar-title">Resumes</h5>
          </div>
          <button className="db-btn-primary d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#createResModal">
            <i className="bi bi-plus-lg" /> New Resume
          </button>
        </div>
        <div className="db-content">
          <div className="db-toolbar">
            <div className="db-search-wrap">
              <i className="bi bi-search db-search-icon" />
              <input className="db-search" placeholder="Search resumes…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="db-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="updatedAt">Last updated</option>
              <option value="createdAt">Date created</option>
              <option value="name">Name</option>
            </select>
            <div className="ms-auto d-flex gap-1">
              <button className={`db-view-btn${view === "grid" ? " active" : ""}`} onClick={() => setView("grid")} title="Grid"><i className="bi bi-grid-3x3-gap" /></button>
              <button className={`db-view-btn${view === "list" ? " active" : ""}`} onClick={() => setView("list")} title="List"><i className="bi bi-list-ul" /></button>
            </div>
          </div>
          {loading && <div className="d-flex justify-content-center py-5"><div className="spinner-border" style={{ color: "var(--db-accent)" }} /></div>}
          {!loading && resumes.length === 0 && (
            <div className="db-empty">
              <i className="bi bi-file-earmark-plus db-empty-icon" />
              <h5 className="db-empty-title">No resumes yet</h5>
              <p className="db-empty-desc">Create your first resume and land your dream job.</p>
              <button className="db-btn-primary px-4" data-bs-toggle="modal" data-bs-target="#createResModal">
                <i className="bi bi-plus-lg me-2" />Create resume
              </button>
            </div>
          )}
          {!loading && view === "grid" && resumes.length > 0 && (
            <div className="db-grid">
              <div className="rcard rcard-new" data-bs-toggle="modal" data-bs-target="#createResModal">
                <div className="rcard-new-inner">
                  <i className="bi bi-plus-lg rcard-new-icon" />
                  <span className="rcard-new-label">New Resume</span>
                </div>
              </div>
              {filtered.map((r) => (
                <ResumeCard key={r._id} resume={r} onDelete={handleDelete} onDuplicate={(id) => { duplicateResume(id); toast.success("Duplicated!"); }} onRename={renameResume} />
              ))}
            </div>
          )}
          {!loading && view === "list" && resumes.length > 0 && (
            <div className="db-list">
              {filtered.map((r) => (
                <div key={r._id} className="db-list-row" onClick={() => navigate(`/builder/${r._id}`)}>
                  <div className="db-list-thumb" style={{ background: gradientFor(r._id) }} />
                  <div className="db-list-info">
                    <span className="db-list-title">{r.title}</span>
                    <span className="db-list-date">Updated {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : "–"}</span>
                  </div>
                  <div className="db-list-btns" onClick={(e) => e.stopPropagation()}>
                    <button className="db-list-btn" onClick={() => navigate(`/builder/${r._id}`)} title="Edit"><i className="bi bi-pencil" /></button>
                    <button className="db-list-btn" onClick={() => { duplicateResume(r._id); toast.success("Duplicated!"); }} title="Duplicate"><i className="bi bi-files" /></button>
                    <button className="db-list-btn danger" onClick={() => handleDelete(r._id)} title="Delete"><i className="bi bi-trash" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="modal fade" id="createResModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="db-modal">
            <div className="db-modal-head">
              <h5>Create a new resume</h5>
              <button type="button" className="db-modal-close" data-bs-dismiss="modal"><i className="bi bi-x-lg" /></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="db-modal-body">
                <label className="db-label">Resume Title</label>
                <input className="db-input" placeholder="e.g. Software Engineer at Google" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} autoFocus />
                <p className="db-hint">Give your resume a name to identify it later.</p>
              </div>
              <div className="db-modal-foot">
                <button type="button" className="db-btn-ghost" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="db-btn-primary"><i className="bi bi-plus-lg me-2" />Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
