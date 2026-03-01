import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import { useResume } from "../context/ResumeContext";
import ResumePreview from "../components/ResumePreview";

const SECTIONS = [
  { id: "basics",         label: "Basics",         icon: "bi-person"           },
  { id: "summary",        label: "Summary",         icon: "bi-chat-left-text"   },
  { id: "experience",     label: "Experience",      icon: "bi-briefcase"        },
  { id: "education",      label: "Education",       icon: "bi-mortarboard"      },
  { id: "skills",         label: "Skills",          icon: "bi-tools"            },
  { id: "projects",       label: "Projects",        icon: "bi-kanban"           },
  { id: "certifications", label: "Certifications",  icon: "bi-award"            },
  { id: "languages",      label: "Languages",       icon: "bi-translate"        },
  { id: "volunteer",      label: "Volunteer",       icon: "bi-heart"            },
  { id: "awards",         label: "Awards",          icon: "bi-trophy"           },
  { id: "interests",      label: "Interests",       icon: "bi-star"             },
];
const TEMPLATES = [
  { id: "classic", label: "Classic", accent: "#4f46e5" },
  { id: "modern",  label: "Modern",  accent: "#0ea5e9" },
  { id: "minimal", label: "Minimal", accent: "#10b981" },
  { id: "bold",    label: "Bold",    accent: "#ef4444" },
];
const COLORS = ["#4f46e5","#0ea5e9","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#14b8a6","#f97316","#64748b"];
const FONTS  = ["Inter","Roboto","Merriweather","Lato","Montserrat","Open Sans"];

const F = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="bl-field">
    <label>{label}</label>
    <input type={type} value={value ?? ""} placeholder={placeholder ?? label} onChange={(e) => onChange(e.target.value)} />
  </div>
);
const TA = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div className="bl-field">
    <label>{label}</label>
    <textarea rows={rows} value={value ?? ""} placeholder={placeholder ?? label} onChange={(e) => onChange(e.target.value)} />
  </div>
);

function EntryCard({ title, onRemove, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bl-entry-card">
      <div className={`bl-entry-head${open ? " open" : ""}`} onClick={() => setOpen((o) => !o)}>
        <span style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--db-text)", flex: 1 }}>{title || "Untitled"}</span>
        <button className="bl-entry-toggle" type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }}><i className="bi bi-trash" /></button>
        <i className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"} ms-2`} style={{ fontSize: ".75rem", color: "var(--db-muted)" }} />
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}

function BasicsForm({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  return (
    <>
      <div className="bl-col2"><F label="Full Name" value={data?.name} onChange={set("name")} /><F label="Headline" value={data?.headline} onChange={set("headline")} /></div>
      <div className="bl-col2"><F label="Email" value={data?.email} onChange={set("email")} type="email" /><F label="Phone" value={data?.phone} onChange={set("phone")} /></div>
      <div className="bl-col2"><F label="Location" value={data?.location} onChange={set("location")} /><F label="Website" value={data?.url} onChange={set("url")} /></div>
      <div className="bl-col2">
        <F label="LinkedIn" value={data?.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/you" />
        <F label="GitHub" value={data?.github} onChange={set("github")} placeholder="github.com/you" />
      </div>
    </>
  );
}

function SummaryForm({ data, onChange }) {
  return <TA label="Professional Summary" value={data ?? ""} onChange={onChange} rows={5} placeholder="Write a short summary about yourself…" />;
}

function ExperienceForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), company: "", position: "", startDate: "", endDate: "", current: false, location: "", description: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((e, i) => (
        <EntryCard key={e.id ?? i} title={e.position || e.company || "Entry " + (i + 1)} onRemove={() => remove(i)}>
          <div className="bl-col2"><F label="Company" value={e.company} onChange={(v) => upd(i, "company", v)} /><F label="Position" value={e.position} onChange={(v) => upd(i, "position", v)} /></div>
          <div className="bl-col2"><F label="Start" value={e.startDate} onChange={(v) => upd(i, "startDate", v)} placeholder="Jan 2020" /><F label="End" value={e.endDate} onChange={(v) => upd(i, "endDate", v)} placeholder="Dec 2023 or Present" /></div>
          <F label="Location" value={e.location} onChange={(v) => upd(i, "location", v)} />
          <TA label="Description" value={e.description} onChange={(v) => upd(i, "description", v)} rows={3} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Experience</button>
    </>
  );
}

function EducationForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", description: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((e, i) => (
        <EntryCard key={e.id ?? i} title={e.institution || "Entry " + (i + 1)} onRemove={() => remove(i)}>
          <F label="Institution" value={e.institution} onChange={(v) => upd(i, "institution", v)} />
          <div className="bl-col2"><F label="Degree" value={e.degree} onChange={(v) => upd(i, "degree", v)} /><F label="Field" value={e.field} onChange={(v) => upd(i, "field", v)} /></div>
          <div className="bl-col2"><F label="Start" value={e.startDate} onChange={(v) => upd(i, "startDate", v)} /><F label="End" value={e.endDate} onChange={(v) => upd(i, "endDate", v)} /></div>
          <div className="bl-col2"><F label="GPA" value={e.gpa} onChange={(v) => upd(i, "gpa", v)} /><div /></div>
          <TA label="Description" value={e.description} onChange={(v) => upd(i, "description", v)} rows={2} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Education</button>
    </>
  );
}

function SkillsForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), name: "", level: 3, keywords: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((s, i) => (
        <EntryCard key={s.id ?? i} title={s.name || "Skill " + (i + 1)} onRemove={() => remove(i)}>
          <div className="bl-col2">
            <F label="Skill Name" value={s.name} onChange={(v) => upd(i, "name", v)} />
            <div className="bl-field">
              <label>Level (1-5)</label>
              <input type="range" min={1} max={5} value={s.level ?? 3} onChange={(e) => upd(i, "level", Number(e.target.value))} style={{ width: "100%" }} />
            </div>
          </div>
          <F label="Keywords (comma-sep)" value={s.keywords} onChange={(v) => upd(i, "keywords", v)} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Skill</button>
    </>
  );
}

function ProjectsForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), name: "", description: "", url: "", technologies: "", startDate: "", endDate: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((p, i) => (
        <EntryCard key={p.id ?? i} title={p.name || "Project " + (i + 1)} onRemove={() => remove(i)}>
          <F label="Project Name" value={p.name} onChange={(v) => upd(i, "name", v)} />
          <div className="bl-col2"><F label="Start" value={p.startDate} onChange={(v) => upd(i, "startDate", v)} /><F label="End" value={p.endDate} onChange={(v) => upd(i, "endDate", v)} /></div>
          <F label="URL" value={p.url} onChange={(v) => upd(i, "url", v)} />
          <F label="Technologies" value={p.technologies} onChange={(v) => upd(i, "technologies", v)} />
          <TA label="Description" value={p.description} onChange={(v) => upd(i, "description", v)} rows={3} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Project</button>
    </>
  );
}

function CertificationsForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), name: "", issuer: "", date: "", url: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((c, i) => (
        <EntryCard key={c.id ?? i} title={c.name || "Cert " + (i + 1)} onRemove={() => remove(i)}>
          <F label="Name" value={c.name} onChange={(v) => upd(i, "name", v)} />
          <div className="bl-col2"><F label="Issuer" value={c.issuer} onChange={(v) => upd(i, "issuer", v)} /><F label="Date" value={c.date} onChange={(v) => upd(i, "date", v)} /></div>
          <F label="URL" value={c.url} onChange={(v) => upd(i, "url", v)} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Certification</button>
    </>
  );
}

function LanguagesForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), language: "", fluency: "Fluent" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((l, i) => (
        <EntryCard key={l.id ?? i} title={l.language || "Language " + (i + 1)} onRemove={() => remove(i)}>
          <div className="bl-col2">
            <F label="Language" value={l.language} onChange={(v) => upd(i, "language", v)} />
            <div className="bl-field">
              <label>Fluency</label>
              <select value={l.fluency ?? "Fluent"} onChange={(e) => upd(i, "fluency", e.target.value)}>
                {["Native","Professional","Fluent","Intermediate","Beginner"].map((fl) => <option key={fl}>{fl}</option>)}
              </select>
            </div>
          </div>
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Language</button>
    </>
  );
}

function VolunteerForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), organization: "", role: "", startDate: "", endDate: "", description: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((v, i) => (
        <EntryCard key={v.id ?? i} title={v.organization || "Entry " + (i + 1)} onRemove={() => remove(i)}>
          <div className="bl-col2"><F label="Organization" value={v.organization} onChange={(val) => upd(i, "organization", val)} /><F label="Role" value={v.role} onChange={(val) => upd(i, "role", val)} /></div>
          <div className="bl-col2"><F label="Start" value={v.startDate} onChange={(val) => upd(i, "startDate", val)} /><F label="End" value={v.endDate} onChange={(val) => upd(i, "endDate", val)} /></div>
          <TA label="Description" value={v.description} onChange={(val) => upd(i, "description", val)} rows={2} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Volunteer</button>
    </>
  );
}

function AwardsForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), title: "", awarder: "", date: "", summary: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((a, i) => (
        <EntryCard key={a.id ?? i} title={a.title || "Award " + (i + 1)} onRemove={() => remove(i)}>
          <div className="bl-col2"><F label="Title" value={a.title} onChange={(v) => upd(i, "title", v)} /><F label="Awarder" value={a.awarder} onChange={(v) => upd(i, "awarder", v)} /></div>
          <F label="Date" value={a.date} onChange={(v) => upd(i, "date", v)} />
          <TA label="Summary" value={a.summary} onChange={(v) => upd(i, "summary", v)} rows={2} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Award</button>
    </>
  );
}

function InterestsForm({ data = [], onChange }) {
  const add = () => onChange([...data, { id: Date.now(), name: "", keywords: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remove = (i) => onChange(data.filter((_, j) => j !== i));
  return (
    <>
      {data.map((item, i) => (
        <EntryCard key={item.id ?? i} title={item.name || "Interest " + (i + 1)} onRemove={() => remove(i)}>
          <F label="Name" value={item.name} onChange={(v) => upd(i, "name", v)} />
          <F label="Keywords (comma-sep)" value={item.keywords} onChange={(v) => upd(i, "keywords", v)} />
        </EntryCard>
      ))}
      <button className="bl-add-btn" type="button" onClick={add}><i className="bi bi-plus-lg" /> Add Interest</button>
    </>
  );
}

export default function Builder() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { loadResume, updateResume } = useResume();

  const [resume, setResume] = useState(null);
  const [activeSection, setActiveSection] = useState("basics");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [canvasScale, setCanvasScale] = useState(1);
  const canvasRef = useRef();
  const canvasWrapRef = useRef();
  const autoTimer = useRef();

  useEffect(() => {
    const r = loadResume(resumeId);
    if (!r) { toast.error("Resume not found"); navigate("/dashboard"); return; }
    setResume(r);
    setEditTitle(r.title || "Untitled Resume");
    if (canvasWrapRef.current) canvasWrapRef.current.scrollTop = 0;
  }, [resumeId]);

  useEffect(() => {
    if (!resume) return;
    clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => {
      updateResume(resume._id, { ...resume, updatedAt: new Date().toISOString() });
      setLastSaved(new Date());
    }, 1500);
    return () => clearTimeout(autoTimer.current);
  }, [resume]);

  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;
    const compute = () => {
      const avail = el.clientWidth - 48;
      const scale = Math.min(1, avail / 794);
      setCanvasScale(scale);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [resume]);

  const save = () => {
    if (!resume) return;
    updateResume(resume._id, { ...resume, updatedAt: new Date().toISOString() });
    setLastSaved(new Date());
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
    toast.success("Saved!");
  };

  const titleBlur = () => {
    if (!resume) return;
    setResume((r) => ({ ...r, title: editTitle }));
  };

  const set = useCallback((path, val) => {
    setResume((r) => {
      const next = { ...r };
      if (path === "template") return { ...next, template: val };
      if (path === "color") return { ...next, color: val };
      if (path === "font") return { ...next, font: val };
      if (path === "data") return { ...next, data: val };
      const d = { ...next.data };
      d[path] = val;
      return { ...next, data: d };
    });
  }, []);

  const handlePrint = useReactToPrint({ content: () => canvasRef.current });

  if (!resume) return null;
  const d = resume.data ?? {};

  return (
    <div className="bl-root">
      <header className="bl-header">
        <Link to="/dashboard" className="bl-back-btn"><i className="bi bi-arrow-left" /> Dashboard</Link>
        <div className="bl-title-wrap">
          <input
            className="bl-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={titleBlur}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="bl-save-status">
            {saving ? "Saving…" : lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Auto-saves"}
          </span>
          <button className="bl-save-btn" onClick={save}><i className="bi bi-cloud-check me-1" />Save</button>
        </div>
      </header>

      <div className="bl-body">
        <div className="bl-left">
          <nav className="bl-tabs">
            {SECTIONS.map((s) => (
              <button key={s.id} className={`bl-tab${activeSection === s.id ? " active" : ""}`} onClick={() => setActiveSection(s.id)} title={s.label}>
                <i className={`bi ${s.icon}`} />
                <span className="bl-tab-tip">{s.label}</span>
              </button>
            ))}
          </nav>
          <div className="bl-form-panel">
            <p className="bl-section-title">{SECTIONS.find((s) => s.id === activeSection)?.label}</p>
            {activeSection === "basics"         && <BasicsForm         data={d.basics}         onChange={(v) => set("basics", v)} />}
            {activeSection === "summary"        && <SummaryForm         data={d.summary}        onChange={(v) => set("summary", v)} />}
            {activeSection === "experience"     && <ExperienceForm      data={d.experience}     onChange={(v) => set("experience", v)} />}
            {activeSection === "education"      && <EducationForm       data={d.education}      onChange={(v) => set("education", v)} />}
            {activeSection === "skills"         && <SkillsForm          data={d.skills}         onChange={(v) => set("skills", v)} />}
            {activeSection === "projects"       && <ProjectsForm        data={d.projects}       onChange={(v) => set("projects", v)} />}
            {activeSection === "certifications" && <CertificationsForm  data={d.certifications} onChange={(v) => set("certifications", v)} />}
            {activeSection === "languages"      && <LanguagesForm       data={d.languages}      onChange={(v) => set("languages", v)} />}
            {activeSection === "volunteer"      && <VolunteerForm       data={d.volunteer}      onChange={(v) => set("volunteer", v)} />}
            {activeSection === "awards"         && <AwardsForm          data={d.awards}         onChange={(v) => set("awards", v)} />}
            {activeSection === "interests"      && <InterestsForm       data={d.interests}      onChange={(v) => set("interests", v)} />}
          </div>
        </div>

        <div className="bl-canvas" ref={canvasWrapRef}>
          <div
            className="bl-a4-scaler"
            style={{
              transform: `scale(${canvasScale})`,
              transformOrigin: "top center",
              marginBottom: `${(canvasScale - 1) * 1123}px`,
            }}
          >
            <div className="bl-a4" ref={canvasRef}>
              <ResumePreview
                data={d}
                template={resume.template || "classic"}
                color={resume.color || "#4f46e5"}
                font={resume.font || "Inter"}
              />
            </div>
          </div>
          <p className="bl-canvas-hint">A4 · 794 × 1123 px · edits auto-save every 1.5s</p>
        </div>

        <div className="bl-right">
          <div>
            <p className="bl-panel-title">Template</p>
            <div className="bl-tpl-grid">
              {TEMPLATES.map((t) => (
                <div key={t.id} className={`bl-tpl-card${resume.template === t.id ? " active" : ""}`} onClick={() => set("template", t.id)}>
                  <div className="bl-tpl-thumb" style={{ background: `linear-gradient(135deg, ${t.accent}22, ${t.accent}44)` }}>
                    <div className="bl-tpl-line t" />
                    <div className="bl-tpl-line" />
                    <div className="bl-tpl-line" style={{ width: "65%" }} />
                  </div>
                  <div className="bl-tpl-label">{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="bl-panel-title">Accent Color</p>
            <div className="bl-colors">
              {COLORS.map((c) => (
                <div key={c} className={`bl-color-dot${resume.color === c ? " active" : ""}`}
                  style={{ background: c, borderColor: resume.color === c ? c : "transparent" }}
                  onClick={() => set("color", c)} title={c} />
              ))}
            </div>
          </div>

          <div>
            <p className="bl-panel-title">Font</p>
            <div className="bl-fonts">
              {FONTS.map((f) => (
                <div key={f} className={`bl-font-opt${resume.font === f ? " active" : ""}`} style={{ fontFamily: f }} onClick={() => set("font", f)}>{f}</div>
              ))}
            </div>
          </div>

          <div>
            <p className="bl-panel-title">Export</p>
            <button className="bl-export-btn primary" onClick={handlePrint}><i className="bi bi-printer" /> Print / PDF</button>
            <button className="bl-export-btn ghost" onClick={save}><i className="bi bi-cloud-arrow-up" /> Save Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
