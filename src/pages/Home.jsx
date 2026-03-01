import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function useCountUp(target, duration = 2000) {
  const [current, setCurrent] = useState(0);
  const nodeRef = useRef(null);
  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startTime = performance.now();
        const tick = (now) => {
          const elapsed = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 4);
          setCurrent(Math.floor(eased * target));
          if (elapsed < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return [current, nodeRef];
}

const features = [
  { icon: "bi-currency-dollar",  title: "Free",                           desc: "Completely free, forever, no hidden costs." },
  { icon: "bi-github",           title: "Open Source",                    desc: "By the community, for the community." },
  { icon: "bi-slash-circle",     title: "No Advertising, No Tracking",    desc: "For a secure and distraction-free experience." },
  { icon: "bi-database-check",   title: "Data Security",                  desc: "Your data is secure, and never shared or sold to anyone." },
  { icon: "bi-robot",            title: "AI Resume Review",              desc: "Get AI-powered analysis and tailored suggestions to optimize your resume for any job." },
  { icon: "bi-translate",        title: "Multilingual",                   desc: "Available in multiple languages. Contribute on Crowdin." },
  { icon: "bi-magic",            title: "AI Writing Assistant",           desc: "Let AI help you craft compelling summaries, bullet points, and achievements." },
  { icon: "bi-shield-check",     title: "Passkeys & 2FA",                 desc: "Enhance security with additional layers of protection." },
  { icon: "bi-files",            title: "Unlimited Resumes",              desc: "Create as many resumes as you want, without limits." },
  { icon: "bi-palette",          title: "Flexibility",                    desc: "Personalize with any colors, fonts or designs." },
  { icon: "bi-filetype-css",     title: "Custom CSS",                     desc: "Write your own CSS (or use AI) to fully customize your resume." },
  { icon: "bi-layout-wtf",       title: "12+ Templates",                  desc: "Beautiful templates to choose from, with more on the way." },
  { icon: "bi-globe",            title: "Shareable Links",                desc: "Share your resume with a public URL." },
  { icon: "bi-lock",             title: "Password Protection",            desc: "Protect your resume with a password." },
  { icon: "bi-code-slash",       title: "API Access",                     desc: "Access your resumes and data programmatically using the API." },
  { icon: "bi-spell-check",      title: "AI Grammar & Style",            desc: "Automatic grammar, tone, and style suggestions to polish your resume." },
];

const ALL_TEMPLATES = [
  "azure","amber","sage","compact","slate",
  "midnight","crystal","ivory","pacific","emerald",
  "obsidian","saffron","granite",
];
const row1Templates = ALL_TEMPLATES.slice(0, 7);   // 7 items
const row2Templates = ALL_TEMPLATES.slice(7);       // 6 items

const testimonials = [
  "Great site. Love the interactive interface. You can tell it's designed by someone who wants to use it.",
  "Truly everything about the UX is so intuitive, fluid and lets you customize your CV how you want and so rapidly. I thank you so much for putting the work to release something like this.",
  "I want to appreciate you for making your projects #openSource, most especially your ResumeRX, which is the handiest truly-free resume maker I've come across.",
  "I'd like to appreciate the great work you've done with rxresu.me. The website's design, smooth functionality, and ease of use are really impressive.",
  "I just wanted to reach you out and thank you personally for your wonderful project rxresu.me. It is very valuable, and the fact that it is open source makes it all the more meaningful.",
  "I appreciate your effort in open-sourcing and making it free for everyone to use. By using this platform, I got a job secured in the government sector of Oman. â¤ï¸",
  "Your CV generator just saved my day! Thank you so much, great work!",
  "I want to express my heartfelt gratitude for your incredible work. Your projects, especially the Resume Builder, have been immensely helpful to me.",
  "Hey! Thank you so much for making this fantastic tool! It helped me get a new job as a Research Software Engineer at Arizona State University.",
  "Wow, what an impressive profile! This could easily be a paid product. Very clean and useful.",
  "Thank you for creating ResumeRX. It is an amazing product. I've been trying to create a good resume for a decade and your tool has been incredibly helpful.",
];
const tRow1 = testimonials.slice(0, 6);
const tRow2 = testimonials.slice(6);

const faqs = [
  {
    q: "Is ResumeRX really free?",
    a: "Yes! ResumeRX is completely free to use, with no hidden costs, premium tiers, or subscription fees. It's open-source and will always remain free.",
  },
  {
    q: "How is my data protected?",
    a: "Your data is stored securely and is never shared with third parties. You can also self-host ResumeRX on your own servers for complete control over your data.",
  },
  {
    q: "Can I export my resume to PDF?",
    a: "Absolutely! You can export your resume to PDF with a single click. The exported PDF maintains all your formatting and styling perfectly.",
  },
  {
    q: "Is ResumeRX available in multiple languages?",
    a: "Yes, ResumeRX is available in multiple languages. You can choose your preferred language in the settings page, or using the language switcher in the header.",
  },
  {
    q: "What makes ResumeRX different from other resume builders?",
    a: "ResumeRX is open-source, privacy-focused, and completely free. Unlike other resume builders, it doesn't show ads, track your data, or limit features behind a paywall.",
  },
  {
    q: "Can I customize the templates?",
    a: "Yes! Every template is fully customizable. You can change colors, fonts, spacing, and even write custom CSS for complete control over your resume's appearance.",
  },
  {
    q: "How do I share my resume?",
    a: "You can share your resume via a unique public URL, protect it with a password, or download it as a PDF to share directly. The choice is yours!",
  },
];

export default function Home() {
  const [userCount, usersRef] = useCountUp(100000);
  const [resumeCount, resumesRef] = useCountUp(500000);

  return (
    <div className="rr-page">
      <Navbar />

      
      <section className="rr-hero">
        
        <div className="rr-hero-video-wrap">
          <video
            loop muted autoPlay playsInline
            src="/videos/timelapse.mp4"
            aria-label="Timelapse demonstration of building a resume with ResumeRX"
            className="rr-hero-video"
          />
          
          <div className="rr-hero-video-fade" aria-hidden="true" />
        </div>

        
        <div className="rr-hero-content">
          
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="rr-hero-badge"
          >
            <i className="bi bi-stars me-1" />
            What's new in the latest version?
          </a>

          
          <div className="rr-hero-headline">
            <p className="rr-hero-finally">Finally,</p>
            <h1 className="rr-hero-title">
              A free and open-source<br />resume builder
            </h1>
          </div>

          
          <p className="rr-hero-desc">
            ResumeRX is a free and open-source resume builder that simplifies the
            process of creating, updating, and sharing your resume.
          </p>

          
          <div className="rr-hero-actions">
            <Link to="/dashboard" className="btn btn-brand btn-lg rr-cta-btn">
              Get Started
              <i className="bi bi-arrow-right ms-2" />
            </Link>
            <a
              href=""
              rel="noopener noreferrer"
              className="btn btn-outline-secondary btn-lg rr-cta-btn"
            >
              <i className="bi bi-book me-2" />
              Learn More
            </a>
          </div>
        </div>

        
        <div className="rr-scroll-indicator" aria-hidden="true">
          <div className="rr-scroll-dot" />
        </div>
      </section>

      
      <div className="w-100">
        <div className="rr-inner-sections">

          
          <section id="statistics" className="rr-section">
            <div className="row g-0">
              <div className="col-6 rr-stat-col">
                <div className="rr-stat-card" ref={usersRef}>
                  <div className="rr-stat-icon-bg">
                    <i className="bi bi-people rr-stat-icon" />
                  </div>
                  <div className="rr-stat-number">
                    {userCount.toLocaleString()}+
                  </div>
                  <p className="rr-stat-label">Users</p>
                </div>
              </div>
              <div className="col-6 rr-stat-col">
                <div className="rr-stat-card" ref={resumesRef}>
                  <div className="rr-stat-icon-bg">
                    <i className="bi bi-file-earmark-text rr-stat-icon" />
                  </div>
                  <div className="rr-stat-number">
                    {resumeCount.toLocaleString()}+
                  </div>
                  <p className="rr-stat-label">Resumes</p>
                </div>
              </div>
            </div>
          </section>

          
          <section id="features" className="rr-section">
            <div className="rr-section-header">
              <h2 className="rr-section-title">Features</h2>
              <p className="rr-section-desc">
                Everything you need to create, customize, and share professional resumes.
                Built with privacy in mind, powered by open source, and completely free forever.
              </p>
            </div>
            <div className="rr-features-grid">
              {features.map((f) => (
                <div key={f.title} className="rr-feature-card">
                  <div className="rr-feature-icon-wrap">
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h3 className="rr-feature-title">{f.title}</h3>
                  <p className="rr-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          
          <section id="templates" className="rr-section rr-section-overflow">
            <div className="rr-section-header">
              <h2 className="rr-section-title">Templates</h2>
              <p className="rr-section-desc">
                Explore our diverse selection of templates, each designed to fit different
                styles, professions, and personalities. ResumeRX currently offers
                12&nbsp;templates, with more on the way.
              </p>
            </div>
            <div className="rr-templates-marquee-wrap">
              
              <div className="rr-marquee-row rr-marquee-left">
                <div className="rr-marquee-track">
                  {[...row1Templates, ...row1Templates].map((name, i) => (
                    <div key={`r1-${name}-${i}`} className="rr-template-thumb">
                      <img
                        src={`/templates/jpg/${name}.jpg`}
                        alt={name}
                        className="rr-template-img"
                        loading="lazy"
                      />
                      <div className="rr-template-overlay">
                        <p className="rr-template-name">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="rr-marquee-row rr-marquee-right">
                <div className="rr-marquee-track">
                  {[...row2Templates, ...row2Templates].map((name, i) => (
                    <div key={`r2-${name}-${i}`} className="rr-template-thumb">
                      <img
                        src={`/templates/jpg/${name}.jpg`}
                        alt={name}
                        className="rr-template-img"
                        loading="lazy"
                      />
                      <div className="rr-template-overlay">
                        <p className="rr-template-name">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          
          <section id="testimonials" className="rr-section rr-section-overflow">
            <div className="rr-section-header text-center mx-auto" style={{ maxWidth: 720 }}>
              <h2 className="rr-section-title">Testimonials</h2>
              <p className="rr-section-desc">
                A lot of people have written over the years to share their experiences with
                ResumeRX and how it helped them land their dream job.
              </p>
            </div>
            <div className="rr-testimonials-marquee-wrap">
              
              <div className="rr-marquee-row rr-marquee-left">
                <div className="rr-marquee-track">
                  {[...tRow1, ...tRow1].map((text, i) => (
                    <div key={`t1-${i}`} className="rr-testimonial-card">
                      <p className="rr-testimonial-text">"{text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="rr-marquee-row rr-marquee-right">
                <div className="rr-marquee-track">
                  {[...tRow2, ...tRow2].map((text, i) => (
                    <div key={`t2-${i}`} className="rr-testimonial-card">
                      <p className="rr-testimonial-text">"{text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          
          <section id="frequently-asked-questions" className="rr-section">
            <div className="row g-5 align-items-start">
              <div className="col-lg-4">
                <h2 className="rr-section-title">
                  Frequently<br />Asked<br />Questions
                </h2>
              </div>
              <div className="col-lg-8">
                <div className="accordion" id="faqAccordion">
                  {faqs.map((faq, i) => (
                    <div key={i} className="rr-faq-item">
                      <h3 className="rr-faq-header">
                        <button
                          className="rr-faq-btn collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-${i}`}
                          aria-expanded="false"
                          aria-controls={`faq-${i}`}
                        >
                          {faq.q}
                          <i className="bi bi-caret-right-fill rr-faq-caret" />
                        </button>
                      </h3>
                      <div
                        id={`faq-${i}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="rr-faq-body">{faq.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          
          <section className="rr-section rr-prefooter">
            <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
              <h2 className="rr-section-title">By the community, for the community.</h2>
              <p className="rr-section-desc mx-auto">
                ResumeRX continues to grow thanks to its vibrant community. This project
                owes its progress to numerous individuals who've dedicated their time and skills
                to make it better â€” coders on GitHub, linguists on Crowdin, and people who've
                donated to support its continued development.
              </p>
              <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/dashboard" className="btn btn-brand btn-lg px-5">
                  Get Started
                </Link>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary btn-lg px-5"
                >
                  <i className="bi bi-github me-2" />
                  View on GitHub
                </a>
              </div>
            </div>
          </section>

          
          <Footer />

        </div>
      </div>
    </div>
  );
}
