import React from "react";

/* ─────────────────────────────────────────────────────────────
   Shared micro-components
   All sizes target a 794 x 1123 px A4 canvas.
───────────────────────────────────────────────────────────── */

function ContactRow({ icon, value, light = false }) {
  if (!value) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      gap: 5, fontSize: 12, color: light ? "rgba(255,255,255,.88)" : "#374151",
    }}>
      <i className={`bi ${icon}`} style={{ fontSize: 11, opacity: .8 }} />
      {value}
    </span>
  );
}

function SectionHeading({ title, color, mt = 14 }) {
  return (
    <div style={{ marginTop: mt, marginBottom: 7, borderBottom: `2px solid ${color}`, paddingBottom: 3 }}>
      <p style={{
        margin: 0, fontSize: 10.5, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: ".08em", color,
      }}>{title}</p>
    </div>
  );
}

function DateRange({ s, e }) {
  if (!s && !e) return null;
  const label = `${s || ""}${s && (e || !e) ? " – " : ""}${e || (s ? "Present" : "")}`;
  return (
    <span style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap", flexShrink: 0, marginLeft: 8 }}>
      {label}
    </span>
  );
}

function SkillPip({ name, level, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
      <span style={{ flex: 1, fontSize: 12 }}>{name}</span>
      <span style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} style={{
            width: 9, height: 9, borderRadius: 2,
            background: n <= (level ?? 3) ? color : "#e2e8f0",
          }} />
        ))}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLASSIC template  —  clean single-column
───────────────────────────────────────────────────────────── */
function Classic({ data, color, font }) {
  const {
    basics = {}, summary = "",
    experience = [], education = [], skills = [], projects = [],
    certifications = [], languages = [], volunteer = [], awards = [], interests = [],
  } = data;

  return (
    <div style={{ fontFamily: font || "Inter", padding: "44px 52px", minHeight: 1123, color: "#111", background: "#fff" }}>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: "0 0 3px", fontSize: 30, fontWeight: 800, color: "#0f172a", letterSpacing: "-.02em" }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p style={{ margin: "0 0 8px", fontSize: 15, color, fontWeight: 600 }}>{basics.headline}</p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>
          <ContactRow icon="bi-envelope"  value={basics.email} />
          <ContactRow icon="bi-telephone" value={basics.phone} />
          <ContactRow icon="bi-geo-alt"   value={basics.location} />
          <ContactRow icon="bi-globe"     value={basics.url || basics.website} />
          <ContactRow icon="bi-linkedin"  value={basics.linkedin} />
          <ContactRow icon="bi-github"    value={basics.github} />
        </div>
      </div>

      {summary && (
        <>
          <SectionHeading title="Summary" color={color} mt={0} />
          <p style={{ margin: "0 0 4px", fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <SectionHeading title="Experience" color={color} />
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{e.position}</p>
                  <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>
                    {e.company}{e.location ? ` · ${e.location}` : ""}
                  </p>
                </div>
                <DateRange s={e.startDate} e={e.endDate} />
              </div>
              {e.description && (
                <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{e.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <SectionHeading title="Education" color={color} />
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                    {e.degree}{e.field ? `, ${e.field}` : ""}
                  </p>
                  <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>
                    {e.institution}{e.gpa ? ` · GPA ${e.gpa}` : ""}
                  </p>
                </div>
                <DateRange s={e.startDate} e={e.endDate} />
              </div>
              {e.description && (
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#555", lineHeight: 1.5 }}>{e.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionHeading title="Skills" color={color} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px", marginBottom: 6 }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                fontSize: 12, background: `${color}18`, color,
                padding: "2px 10px", borderRadius: 12, fontWeight: 600,
              }}>{typeof s === "string" ? s : s.name}</span>
            ))}
          </div>
        </>
      )}

      {projects.length > 0 && (
        <>
          <SectionHeading title="Projects" color={color} />
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{p.name}</p>
                  {p.technologies && (
                    <p style={{ margin: "1px 0 0", fontSize: 11.5, color }}>{p.technologies}</p>
                  )}
                  {p.url && (
                    <p style={{ margin: "1px 0 0", fontSize: 11.5, color: "#6b7280" }}>{p.url}</p>
                  )}
                </div>
                <DateRange s={p.startDate} e={p.endDate} />
              </div>
              {p.description && (
                <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{p.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {certifications.length > 0 && (
        <>
          <SectionHeading title="Certifications" color={color} />
          {certifications.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{c.name}</p>
                <p style={{ margin: "1px 0 0", fontSize: 12, color: "#666" }}>{c.issuer}</p>
              </div>
              <DateRange s={c.date} e="" />
            </div>
          ))}
        </>
      )}

      {languages.length > 0 && (
        <>
          <SectionHeading title="Languages" color={color} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", marginBottom: 6 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 12.5 }}>
                <b>{l.language}</b>{l.fluency ? ` · ${l.fluency}` : ""}
              </span>
            ))}
          </div>
        </>
      )}

      {volunteer.length > 0 && (
        <>
          <SectionHeading title="Volunteer" color={color} />
          {volunteer.map((v, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{v.role}</p>
                  <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>{v.organization}</p>
                </div>
                <DateRange s={v.startDate} e={v.endDate} />
              </div>
              {v.description && (
                <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{v.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {awards.length > 0 && (
        <>
          <SectionHeading title="Awards" color={color} />
          {awards.map((a, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>
                  {a.title}{a.awarder ? ` · ${a.awarder}` : ""}
                </p>
                <DateRange s={a.date} e="" />
              </div>
              {a.summary && (
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#555" }}>{a.summary}</p>
              )}
            </div>
          ))}
        </>
      )}

      {interests.length > 0 && (
        <>
          <SectionHeading title="Interests" color={color} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
            {interests.map((it, i) => (
              <span key={i} style={{ fontSize: 12, color: "#555" }}>
                {it.name}{it.keywords ? ` (${it.keywords})` : ""}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODERN template  —  colored left sidebar
───────────────────────────────────────────────────────────── */
function Modern({ data, color, font }) {
  const {
    basics = {}, summary = "",
    experience = [], education = [], skills = [], projects = [],
    certifications = [], languages = [], volunteer = [], awards = [], interests = [],
  } = data;

  return (
    <div style={{ fontFamily: font || "Inter", display: "flex", minHeight: 1123, background: "#fff" }}>
      {/* Sidebar */}
      <div style={{ background: color, color: "#fff", width: 230, minHeight: 1123, padding: "40px 18px", flexShrink: 0 }}>
        <h2 style={{ margin: "0 0 3px", fontSize: 20, fontWeight: 800, color: "#fff", wordBreak: "break-word", lineHeight: 1.2 }}>
          {basics.name || "Your Name"}
        </h2>
        {basics.headline && (
          <p style={{ fontSize: 12, margin: "0 0 18px", opacity: .85, lineHeight: 1.4 }}>{basics.headline}</p>
        )}

        <div style={{ marginBottom: 18 }}>
          {[
            ["bi-envelope",  basics.email],
            ["bi-telephone", basics.phone],
            ["bi-geo-alt",   basics.location],
            ["bi-globe",     basics.url || basics.website],
            ["bi-linkedin",  basics.linkedin],
            ["bi-github",    basics.github],
          ].filter(([, v]) => v).map(([ic, val], i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
              <i className={`bi ${ic}`} style={{ fontSize: 11, marginTop: 2, opacity: .75 }} />
              <span style={{ fontSize: 11.5, wordBreak: "break-all", opacity: .92, lineHeight: 1.4 }}>{val}</span>
            </div>
          ))}
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", opacity: .65, margin: "0 0 8px" }}>Skills</p>
            {skills.map((s, i) => (
              <SkillPip key={i} name={typeof s === "string" ? s : s.name} level={s.level} color="#fff" />
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", opacity: .65, margin: "0 0 8px" }}>Languages</p>
            {languages.map((l, i) => (
              <div key={i} style={{ fontSize: 12, marginBottom: 4 }}>
                <b>{l.language}</b>{l.fluency ? ` · ${l.fluency}` : ""}
              </div>
            ))}
          </div>
        )}

        {interests.length > 0 && (
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", opacity: .65, margin: "0 0 8px" }}>Interests</p>
            {interests.map((it, i) => (
              <div key={i} style={{ fontSize: 12, marginBottom: 3, opacity: .9 }}>{it.name}</div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "40px 26px", color: "#111" }}>
        {summary && (
          <>
            <SectionHeading title="Profile" color={color} mt={0} />
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionHeading title="Experience" color={color} />
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{e.position}</p>
                    <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>
                      {e.company}{e.location ? ` · ${e.location}` : ""}
                    </p>
                  </div>
                  <DateRange s={e.startDate} e={e.endDate} />
                </div>
                {e.description && (
                  <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{e.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionHeading title="Education" color={color} />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                      {e.degree}{e.field ? `, ${e.field}` : ""}
                    </p>
                    <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>
                      {e.institution}{e.gpa ? ` · GPA ${e.gpa}` : ""}
                    </p>
                  </div>
                  <DateRange s={e.startDate} e={e.endDate} />
                </div>
                {e.description && (
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#555", lineHeight: 1.5 }}>{e.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionHeading title="Projects" color={color} />
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                  {p.name}
                  {p.technologies && (
                    <span style={{ fontWeight: 400, color: "#6b7280", fontSize: 12 }}> — {p.technologies}</span>
                  )}
                </p>
                {p.url && <p style={{ margin: 0, fontSize: 12, color }}>{p.url}</p>}
                {p.description && (
                  <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{p.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {certifications.length > 0 && (
          <>
            <SectionHeading title="Certifications" color={color} />
            {certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{c.name}</p>
                <p style={{ margin: "1px 0 0", fontSize: 12, color: "#666" }}>
                  {c.issuer}{c.date ? ` · ${c.date}` : ""}
                </p>
              </div>
            ))}
          </>
        )}

        {volunteer.length > 0 && (
          <>
            <SectionHeading title="Volunteer" color={color} />
            {volunteer.map((v, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{v.role}</p>
                    <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>{v.organization}</p>
                  </div>
                  <DateRange s={v.startDate} e={v.endDate} />
                </div>
                {v.description && (
                  <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{v.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {awards.length > 0 && (
          <>
            <SectionHeading title="Awards" color={color} />
            {awards.map((a, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>
                    {a.title}{a.awarder ? ` · ${a.awarder}` : ""}
                  </p>
                  <DateRange s={a.date} e="" />
                </div>
                {a.summary && (
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#555" }}>{a.summary}</p>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}


function Minimal({ data, color, font }) {
  const {
    basics = {}, summary = "",
    experience = [], education = [], skills = [], projects = [],
    certifications = [], languages = [], volunteer = [], awards = [], interests = [],
  } = data;

  return (
    <div style={{ fontFamily: font || "Inter", padding: "48px 56px", minHeight: 1123, color: "#1a1a1a", background: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: 22, borderBottom: `2px solid ${color}`, paddingBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: "-.025em" }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p style={{ margin: "5px 0 10px", fontSize: 14, color: "#555" }}>{basics.headline}</p>
        )}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "5px 14px", marginTop: 8 }}>
          <ContactRow icon="bi-envelope"  value={basics.email} />
          <ContactRow icon="bi-telephone" value={basics.phone} />
          <ContactRow icon="bi-geo-alt"   value={basics.location} />
          <ContactRow icon="bi-globe"     value={basics.url || basics.website} />
          <ContactRow icon="bi-linkedin"  value={basics.linkedin} />
          <ContactRow icon="bi-github"    value={basics.github} />
        </div>
      </div>

      {summary && (
        <p style={{ fontSize: 13, color: "#444", marginBottom: 18, textAlign: "center", fontStyle: "italic", lineHeight: 1.6 }}>
          {summary}
        </p>
      )}

      {experience.length > 0 && (
        <>
          <SectionHeading title="Experience" color={color} mt={0} />
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                  {e.position} — <span style={{ fontWeight: 400 }}>{e.company}</span>
                  {e.location ? <span style={{ color: "#888", fontWeight: 400 }}> · {e.location}</span> : ""}
                </p>
                <DateRange s={e.startDate} e={e.endDate} />
              </div>
              {e.description && (
                <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#555", lineHeight: 1.5 }}>{e.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <SectionHeading title="Education" color={color} />
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ margin: 0, fontSize: 14 }}>
                  <b>{e.institution}</b> — {e.degree}{e.field ? `, ${e.field}` : ""}
                  {e.gpa ? ` · GPA ${e.gpa}` : ""}
                </p>
                <DateRange s={e.startDate} e={e.endDate} />
              </div>
              {e.description && (
                <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#555", lineHeight: 1.5 }}>{e.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionHeading title="Skills" color={color} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px", marginBottom: 8 }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                fontSize: 12, background: `${color}15`, color,
                padding: "2px 10px", borderRadius: 12, fontWeight: 600,
              }}>{typeof s === "string" ? s : s.name}</span>
            ))}
          </div>
        </>
      )}

      {projects.length > 0 && (
        <>
          <SectionHeading title="Projects" color={color} />
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ margin: 0, fontSize: 14 }}>
                  <b>{p.name}</b>{p.technologies ? ` — ${p.technologies}` : ""}
                </p>
                <DateRange s={p.startDate} e={p.endDate} />
              </div>
              {p.url && <p style={{ margin: 0, fontSize: 12, color }}>{p.url}</p>}
              {p.description && (
                <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#555", lineHeight: 1.5 }}>{p.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {certifications.length > 0 && (
        <>
          <SectionHeading title="Certifications" color={color} />
          {certifications.map((c, i) => (
            <p key={i} style={{ margin: "0 0 5px", fontSize: 12.5 }}>
              <b>{c.name}</b> — {c.issuer}{c.date ? ` (${c.date})` : ""}
            </p>
          ))}
        </>
      )}

      {volunteer.length > 0 && (
        <>
          <SectionHeading title="Volunteer" color={color} />
          {volunteer.map((v, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ margin: 0, fontSize: 14 }}>
                  <b>{v.role}</b> — {v.organization}
                </p>
                <DateRange s={v.startDate} e={v.endDate} />
              </div>
              {v.description && (
                <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#555", lineHeight: 1.5 }}>{v.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {awards.length > 0 && (
        <>
          <SectionHeading title="Awards" color={color} />
          {awards.map((a, i) => (
            <p key={i} style={{ margin: "0 0 5px", fontSize: 12.5 }}>
              <b>{a.title}</b>{a.awarder ? ` — ${a.awarder}` : ""}
              {a.date ? ` (${a.date})` : ""}
              {a.summary ? ` · ${a.summary}` : ""}
            </p>
          ))}
        </>
      )}

      {languages.length > 0 && (
        <>
          <SectionHeading title="Languages" color={color} />
          <p style={{ fontSize: 12.5, color: "#444" }}>
            {languages.map((l) => `${l.language}${l.fluency ? ` (${l.fluency})` : ""}`).join(" · ")}
          </p>
        </>
      )}

      {interests.length > 0 && (
        <>
          <SectionHeading title="Interests" color={color} />
          <p style={{ fontSize: 12.5, color: "#555" }}>{interests.map((it) => it.name).join(" · ")}</p>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOLD template  —  full-width color header banner
───────────────────────────────────────────────────────────── */
function Bold({ data, color, font }) {
  const {
    basics = {}, summary = "",
    experience = [], education = [], skills = [], projects = [],
    certifications = [], languages = [], volunteer = [], awards = [], interests = [],
  } = data;

  return (
    <div style={{ fontFamily: font || "Inter", minHeight: 1123, background: "#fff" }}>
      {/* Banner header */}
      <div style={{ background: color, padding: "36px 52px 28px", color: "#fff" }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, letterSpacing: "-.025em" }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p style={{ margin: "5px 0 0", fontSize: 15, opacity: .87, fontWeight: 500 }}>{basics.headline}</p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 14px", marginTop: 12 }}>
          <ContactRow icon="bi-envelope"  value={basics.email}               light />
          <ContactRow icon="bi-telephone" value={basics.phone}               light />
          <ContactRow icon="bi-geo-alt"   value={basics.location}            light />
          <ContactRow icon="bi-globe"     value={basics.url || basics.website} light />
          <ContactRow icon="bi-linkedin"  value={basics.linkedin}            light />
          <ContactRow icon="bi-github"    value={basics.github}              light />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "26px 52px" }}>
        {summary && (
          <p style={{
            fontSize: 13, color: "#374151", marginBottom: 16,
            borderLeft: `4px solid ${color}`, paddingLeft: 12, lineHeight: 1.55,
          }}>{summary}</p>
        )}

        {experience.length > 0 && (
          <>
            <SectionHeading title="Experience" color={color} mt={0} />
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14.5, color }}>{e.position}</p>
                    <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>
                      {e.company}{e.location ? ` · ${e.location}` : ""}
                    </p>
                  </div>
                  <DateRange s={e.startDate} e={e.endDate} />
                </div>
                {e.description && (
                  <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{e.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionHeading title="Education" color={color} />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                      {e.degree}{e.field ? `, ${e.field}` : ""}
                    </p>
                    <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>
                      {e.institution}{e.gpa ? ` · GPA ${e.gpa}` : ""}
                    </p>
                  </div>
                  <DateRange s={e.startDate} e={e.endDate} />
                </div>
                {e.description && (
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#444", lineHeight: 1.5 }}>{e.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionHeading title="Skills" color={color} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 6px", marginBottom: 10 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: 12, background: color, color: "#fff",
                  padding: "3px 11px", borderRadius: 12, fontWeight: 600,
                }}>{typeof s === "string" ? s : s.name}</span>
              ))}
            </div>
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionHeading title="Projects" color={color} />
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color }}>
                    {p.name}
                    {p.technologies && (
                      <span style={{ fontWeight: 400, color: "#6b7280", fontSize: 12 }}> — {p.technologies}</span>
                    )}
                  </p>
                  <DateRange s={p.startDate} e={p.endDate} />
                </div>
                {p.url && <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{p.url}</p>}
                {p.description && (
                  <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{p.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {certifications.length > 0 && (
          <>
            <SectionHeading title="Certifications" color={color} />
            {certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{c.name}</p>
                <p style={{ margin: "1px 0 0", fontSize: 12, color: "#666" }}>
                  {c.issuer}{c.date ? ` · ${c.date}` : ""}
                </p>
              </div>
            ))}
          </>
        )}

        {volunteer.length > 0 && (
          <>
            <SectionHeading title="Volunteer" color={color} />
            {volunteer.map((v, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color }}>{v.role}</p>
                    <p style={{ margin: "1px 0 0", fontSize: 12.5, color: "#555" }}>{v.organization}</p>
                  </div>
                  <DateRange s={v.startDate} e={v.endDate} />
                </div>
                {v.description && (
                  <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{v.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {awards.length > 0 && (
          <>
            <SectionHeading title="Awards" color={color} />
            {awards.map((a, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>
                    {a.title}{a.awarder ? ` · ${a.awarder}` : ""}
                  </p>
                  <DateRange s={a.date} e="" />
                </div>
                {a.summary && (
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#555" }}>{a.summary}</p>
                )}
              </div>
            ))}
          </>
        )}

        {languages.length > 0 && (
          <>
            <SectionHeading title="Languages" color={color} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", marginBottom: 10 }}>
              {languages.map((l, i) => (
                <span key={i} style={{ fontSize: 12.5 }}>
                  <b>{l.language}</b>{l.fluency ? ` (${l.fluency})` : ""}
                </span>
              ))}
            </div>
          </>
        )}

        {interests.length > 0 && (
          <>
            <SectionHeading title="Interests" color={color} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
              {interests.map((it, i) => (
                <span key={i} style={{
                  fontSize: 12, background: `${color}18`, color,
                  padding: "2px 10px", borderRadius: 12,
                }}>{it.name}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export default function ResumePreview({ data = {}, template = "classic", color = "#4f46e5", font = "Inter" }) {
  const props = { data, color, font };
  if (template === "modern")  return <Modern  {...props} />;
  if (template === "minimal") return <Minimal {...props} />;
  if (template === "bold")    return <Bold    {...props} />;
  return <Classic {...props} />;
}
