import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const LS_KEY = "rr-resumes";

function genId() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

function readLS() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
}

function writeLS(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function blankData() {
  return {
    basics: { name: "", headline: "", email: "", phone: "", location: "", url: "", linkedin: "", github: "", photo: "" },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteer: [],
    interests: [],
    custom: [],
  };
}

const SAMPLE_ID = "rr-sample-001";

function buildSampleResume() {
  return {
    _id: SAMPLE_ID,
    title: "Shubham Sethia — Software Engineer",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    template: "classic",
    color: "#4f46e5",
    font: "Inter",
    data: {
      basics: {
        name: "Shubham Sethia",
        headline: "Senior Software Engineer",
        email: "shubham.sethia@example.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA",
        url: "shubhamsethia.dev",
        linkedin: "linkedin.com/in/shubhamsethia",
        github: "github.com/shubhamsethia",
      },
      summary:
        "Passionate software engineer with 6+ years of experience designing and shipping scalable web applications. Specialised in React, Node.js and cloud-native architecture. Proven track record of leading cross-functional teams to deliver products used by millions of users worldwide.",
      experience: [
        {
          id: 1,
          company: "Acme Corp",
          position: "Senior Software Engineer",
          location: "San Francisco, CA",
          startDate: "Jan 2023",
          endDate: "",
          description:
            "Led a team of 5 engineers to re-architect the monolith into micro-services, reducing deployment time by 60%. Built real-time dashboards with React & WebSockets handling 50 k concurrent users.",
        },
        {
          id: 2,
          company: "TechStart Inc.",
          position: "Software Engineer",
          location: "Remote",
          startDate: "Mar 2020",
          endDate: "Dec 2022",
          description:
            "Developed a multi-tenant SaaS platform from scratch using Next.js and PostgreSQL. Improved API response times by 40 % through query optimisation and Redis caching.",
        },
        {
          id: 3,
          company: "WebWorks Agency",
          position: "Junior Developer",
          location: "Austin, TX",
          startDate: "Jun 2018",
          endDate: "Feb 2020",
          description:
            "Built and maintained 20+ client websites. Introduced automated testing pipeline that cut regression bugs by 35 %.",
        },
      ],
      education: [
        {
          id: 1,
          institution: "University of California, Berkeley",
          degree: "B.Sc.",
          field: "Computer Science",
          startDate: "2014",
          endDate: "2018",
          gpa: "3.8",
          description: "Graduated Summa Cum Laude. Member of ACM student chapter.",
        },
      ],
      skills: [
        { id: 1, name: "React / Next.js", level: 5, keywords: "hooks, context, SSR" },
        { id: 2, name: "Node.js / Express", level: 5, keywords: "REST, GraphQL" },
        { id: 3, name: "TypeScript", level: 4, keywords: "generics, utility types" },
        { id: 4, name: "PostgreSQL", level: 4, keywords: "query optimisation, indexes" },
        { id: 5, name: "Docker / Kubernetes", level: 3, keywords: "CI/CD, Helm" },
        { id: 6, name: "AWS", level: 3, keywords: "EC2, S3, Lambda, RDS" },
      ],
      projects: [
        {
          id: 1,
          name: "OpenResume",
          technologies: "React, TypeScript, Tailwind CSS",
          url: "github.com/shubhamsethia/openresume",
          startDate: "2025",
          endDate: "",
          description:
            "Open-source resume builder with live preview, PDF export and 4 templates. 2 k+ GitHub stars.",
        },
        {
          id: 2,
          name: "DevMetrics Dashboard",
          technologies: "Next.js, Recharts, PostgreSQL",
          url: "devmetrics.io",
          startDate: "2024",
          endDate: "2024",
          description:
            "Real-time engineering metrics dashboard aggregating data from GitHub, Jira and PagerDuty.",
        },
      ],
      certifications: [
        { id: 1, name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "Mar 2024", url: "" },
        { id: 2, name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", date: "Sep 2023", url: "" },
      ],
      languages: [
        { id: 1, language: "English", fluency: "Native" },
        { id: 2, language: "Spanish", fluency: "Professional" },
        { id: 3, language: "French", fluency: "Intermediate" },
      ],
      awards: [
        { id: 1, title: "Best Engineer of the Year", awarder: "Acme Corp", date: "2024", summary: "Awarded for leading the micro-services migration project." },
        { id: 2, title: "Hackathon 1st Place", awarder: "TechCrunch Disrupt", date: "2022", summary: "Built an AI-powered accessibility tool in 24 hours." },
      ],
      volunteer: [
        {
          id: 1,
          organization: "Code.org",
          role: "Mentor",
          startDate: "2021",
          endDate: "",
          description: "Mentoring underprivileged high-school students in web development every Saturday.",
        },
      ],
      interests: [
        { id: 1, name: "Open Source", keywords: "contribution, OSS, GitHub" },
        { id: 2, name: "Rock Climbing", keywords: "bouldering, top-rope" },
        { id: 3, name: "Photography", keywords: "street, landscape" },
      ],
      custom: [],
    },
  };
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumes, setResumes] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResumes = useCallback(() => {
    setLoading(true);
    let list = readLS();
    // Seed sample resume on first ever load
    if (list.length === 0) {
      const sample = buildSampleResume();
      list = [sample];
      writeLS(list);
    }
    setResumes(list);
    setLoading(false);
  }, []);

  useEffect(() => { fetchResumes(); }, [fetchResumes]);

  const createResume = useCallback((title) => {
    const now = new Date().toISOString();
    const resume = {
      _id: genId(),
      title,
      createdAt: now,
      updatedAt: now,
      template: "classic",
      color: "#4f46e5",
      font: "Inter",
      data: blankData(),
    };
    const next = [resume, ...readLS()];
    writeLS(next);
    setResumes(next);
    return resume;
  }, []);

  const updateResume = useCallback((id, patch) => {
    const list = readLS();
    const updated = list.map((r) => {
      if (r._id !== id) return r;
      return { ...r, ...patch, updatedAt: new Date().toISOString() };
    });
    writeLS(updated);
    setResumes(updated);
    const found = updated.find((r) => r._id === id);
    if (activeResume?._id === id) setActiveResume(found);
    return found;
  }, [activeResume]);

  const deleteResume = useCallback((id) => {
    const next = readLS().filter((r) => r._id !== id);
    writeLS(next);
    setResumes(next);
    if (activeResume?._id === id) setActiveResume(null);
  }, [activeResume]);

  const loadResume = useCallback((id) => {
    const found = readLS().find((r) => r._id === id) ?? null;
    setActiveResume(found);
    return found;
  }, []);

  const duplicateResume = useCallback((id) => {
    const src = readLS().find((r) => r._id === id);
    if (!src) return null;
    const now = new Date().toISOString();
    const copy = { ...src, _id: genId(), title: `${src.title} (copy)`, createdAt: now, updatedAt: now };
    const next = [copy, ...readLS()];
    writeLS(next);
    setResumes(next);
    return copy;
  }, []);

  const renameResume = useCallback((id, title) => {
    return updateResume(id, { title });
  }, [updateResume]);

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        activeResume,
        setActiveResume,
        loading,
        fetchResumes,
        createResume,
        updateResume,
        deleteResume,
        loadResume,
        duplicateResume,
        renameResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
}
