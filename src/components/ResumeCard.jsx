import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import toast from "react-hot-toast";


export default function ResumeCard({ resume, onDeleted }) {
  const navigate = useNavigate();
  const { deleteResume, duplicateResume } = useResume();
  const [busy, setBusy] = useState(false);

  const handleOpen = () => navigate(`/builder/${resume._id}`);

  const handleDuplicate = async (e) => {
    e.stopPropagation();
    setBusy(true);
    try {
      await duplicateResume(resume._id);
      toast.success("Resume duplicated");
    } catch {
      toast.error("Could not duplicate resume");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${resume.title}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await deleteResume(resume._id);
      toast.success("Resume deleted");
      if (onDeleted) onDeleted(resume._id);
    } catch {
      toast.error("Could not delete resume");
    } finally {
      setBusy(false);
    }
  };

  const updatedAt = resume.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="resume-card" onClick={handleOpen} style={{ userSelect: "none" }}>
      {/* Thumbnail */}
      <div className="resume-thumb-placeholder">
        <i className="bi bi-file-earmark-person" style={{ fontSize: "3rem" }} />
        <span className="small mt-1 fw-semibold" style={{ color: "#4f46e5" }}>
          {resume.title}
        </span>
      </div>

      {/* Body */}
      <div className="p-3">
        <h6 className="mb-0 fw-semibold text-truncate" title={resume.title}>
          {resume.title}
        </h6>
        <p className="mb-0 small" style={{ color: "#94a3b8" }}>
          Updated {updatedAt}
        </p>
      </div>

      {/* Actions */}
      <div
        className="d-flex border-top"
        style={{ borderColor: "#334155" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleOpen}
          className="btn btn-sm flex-fill py-2"
          style={{ color: "#94a3b8", borderRight: "1px solid #334155", borderRadius: 0 }}
          title="Open builder"
        >
          <i className="bi bi-pencil-square me-1" /> Edit
        </button>
        <button
          onClick={handleDuplicate}
          disabled={busy}
          className="btn btn-sm flex-fill py-2"
          style={{ color: "#94a3b8", borderRight: "1px solid #334155", borderRadius: 0 }}
          title="Duplicate"
        >
          <i className="bi bi-copy me-1" /> Copy
        </button>
        <button
          onClick={handleDelete}
          disabled={busy}
          className="btn btn-sm flex-fill py-2"
          style={{ color: "#ef4444", borderRadius: 0 }}
          title="Delete"
        >
          <i className="bi bi-trash me-1" /> Del
        </button>
      </div>
    </div>
  );
}
