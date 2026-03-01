import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/ResumePreview';

function MiniPreview({ resume }) {
  const wrapRef = useRef();
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    if (!wrapRef.current) return;
    const update = () => {
      if (wrapRef.current) setScale(wrapRef.current.offsetWidth / 794);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#fff' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 794,
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <ResumePreview
          data={resume.data || {}}
          template={resume.template || 'classic'}
          color={resume.color || '#4f46e5'}
          font={resume.font || 'Inter'}
        />
      </div>
    </div>
  );
}

function ResumeCard({ resume, onDelete, onDuplicate, onRename }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(resume.title);
  const menuRef = useRef();
  
  const updated = resume.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '–';

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const submitRename = (e) => {
    e?.preventDefault?.();
    if (!newTitle.trim()) return;
    onRename(resume._id, newTitle.trim());
    setRenaming(false);
    toast.success('Renamed');
  };

  return (
    <div className="rcard">
      <div
        className="rcard-thumb"
        onClick={() => navigate(`/builder/${resume._id}`)}
      >
        <MiniPreview resume={resume} />
        <div className="rcard-hover-overlay">
          <i className="bi bi-pencil-square" />
          <span>Edit</span>
        </div>
      </div>
      <div className="rcard-foot">
        {renaming ? (
          <form onSubmit={submitRename} style={{ flex: 1 }}>
            <input
              className="rcard-rename-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={submitRename}
              autoFocus
            />
          </form>
        ) : (
          <div className="rcard-meta">
            <div
              className="rcard-title"
              title={resume.title}
              onDoubleClick={() => {
                setRenaming(true);
                setNewTitle(resume.title);
              }}
            >
              {resume.title}
            </div>
            <div className="rcard-date">{updated}</div>
          </div>
        )}
        <div className="rcard-actions" ref={menuRef}>
          <button
            className="rcard-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
          >
            <i className="bi bi-three-dots" />
          </button>
          {menuOpen && (
            <div className="rcard-dropdown">
              <button
                onClick={() => {
                  navigate(`/builder/${resume._id}`);
                  setMenuOpen(false);
                }}
              >
                <i className="bi bi-pencil" /> Edit
              </button>
              <button
                onClick={() => {
                  setRenaming(true);
                  setNewTitle(resume.title);
                  setMenuOpen(false);
                }}
              >
                <i className="bi bi-cursor-text" /> Rename
              </button>
              <button
                onClick={() => {
                  onDuplicate(resume._id);
                  setMenuOpen(false);
                  toast.success('Duplicated!');
                }}
              >
                <i className="bi bi-files" /> Duplicate
              </button>
              <div className="rcard-dropdown-divider" />
              <button
                className="danger"
                onClick={() => {
                  onDelete(resume._id);
                  setMenuOpen(false);
                }}
              >
                <i className="bi bi-trash" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Resumes() {
  const { resumes, createResume, deleteResume, duplicateResume, renameResume, loading } =
    useResume();
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return toast.error('Enter a title');
    const resume = createResume(newTitle.trim());
    setNewTitle('');
    document.getElementById('createResModal')?.querySelector('[data-bs-dismiss="modal"]')?.click();
    toast.success('Resume created!');
    navigate(`/builder/${resume._id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this resume? This cannot be undone.')) return;
    deleteResume(id);
    toast.success('Deleted');
  };

  const filtered = resumes
    .filter((r) => r.title?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return new Date(b[sortBy] ?? b.updatedAt ?? 0) - new Date(a[sortBy] ?? a.updatedAt ?? 0);
    });

  return (
    <>
      <div className="db-topbar">
        <div className="d-flex align-items-center gap-3">
          <h5 className="db-topbar-title">Resumes</h5>
        </div>
        <button
          className="db-btn-primary d-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#createResModal"
        >
          <i className="bi bi-plus-lg" /> New Resume
        </button>
      </div>
      <div className="db-content">
        <div className="db-toolbar">
          <div className="db-search-wrap">
            <i className="bi bi-search db-search-icon" />
            <input
              className="db-search"
              placeholder="Search resumes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="db-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="updatedAt">Last updated</option>
            <option value="createdAt">Date created</option>
            <option value="name">Name</option>
          </select>
          <div className="ms-auto d-flex gap-1">
            <button
              className={`db-view-btn${view === 'grid' ? ' active' : ''}`}
              onClick={() => setView('grid')}
              title="Grid"
            >
              <i className="bi bi-grid-3x3-gap" />
            </button>
            <button
              className={`db-view-btn${view === 'list' ? ' active' : ''}`}
              onClick={() => setView('list')}
              title="List"
            >
              <i className="bi bi-list-ul" />
            </button>
          </div>
        </div>
        {loading && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" style={{ color: 'var(--db-accent)' }} />
          </div>
        )}
        {!loading && resumes.length === 0 && (
          <div className="db-empty">
            <i className="bi bi-file-earmark-plus db-empty-icon" />
            <h5 className="db-empty-title">No resumes yet</h5>
            <p className="db-empty-desc">Create your first resume and land your dream job.</p>
            <button
              className="db-btn-primary px-4"
              data-bs-toggle="modal"
              data-bs-target="#createResModal"
            >
              <i className="bi bi-plus-lg me-2" />
              Create resume
            </button>
          </div>
        )}
        {!loading && view === 'grid' && resumes.length > 0 && (
          <div className="db-grid">
            <div className="rcard rcard-new" data-bs-toggle="modal" data-bs-target="#createResModal">
              <div className="rcard-new-inner">
                <i className="bi bi-plus-lg rcard-new-icon" />
                <span className="rcard-new-label">New Resume</span>
              </div>
            </div>
            {filtered.map((r) => (
              <ResumeCard
                key={r._id}
                resume={r}
                onDelete={handleDelete}
                onDuplicate={(id) => {
                  duplicateResume(id);
                  toast.success('Duplicated!');
                }}
                onRename={renameResume}
              />
            ))}
          </div>
        )}
        {!loading && view === 'list' && resumes.length > 0 && (
          <div className="db-list">
            {filtered.map((r) => (
              <div
                key={r._id}
                className="db-list-row"
                onClick={() => navigate(`/builder/${r._id}`)}
              >
                <div className="db-list-thumb" style={{ position: 'relative', overflow: 'hidden' }}>
                  <MiniPreview resume={r} />
                </div>
                <div className="db-list-info">
                  <span className="db-list-title">{r.title}</span>
                  <span className="db-list-date">
                    Updated {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : '–'}
                  </span>
                </div>
                <div className="db-list-btns" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="db-list-btn"
                    onClick={() => navigate(`/builder/${r._id}`)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil" />
                  </button>
                  <button
                    className="db-list-btn"
                    onClick={() => {
                      duplicateResume(r._id);
                      toast.success('Duplicated!');
                    }}
                    title="Duplicate"
                  >
                    <i className="bi bi-files" />
                  </button>
                  <button
                    className="db-list-btn danger"
                    onClick={() => handleDelete(r._id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="modal fade" id="createResModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="db-modal">
            <div className="db-modal-head">
              <h5>Create a new resume</h5>
              <button type="button" className="db-modal-close" data-bs-dismiss="modal">
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="db-modal-body">
                <label className="db-label">Resume Title</label>
                <input
                  className="db-input"
                  placeholder="e.g. Software Engineer at Google"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                />
                <p className="db-hint">Give your resume a name to identify it later.</p>
              </div>
              <div className="db-modal-foot">
                <button type="button" className="db-btn-ghost" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="db-btn-primary">
                  <i className="bi bi-plus-lg me-2" />
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
