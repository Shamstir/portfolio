import { useState, useEffect, useRef } from "react";
import "./App.css";

const PROJECTS = [
  {
    name: "Proximity",
    repo: "proximity",
    desc: "A modern location-based mobile application built with Flutter and Dart.",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    name: "Ember Grants",
    repo: "Ember-Grants",
    desc: "A grant management platform built for streamlined application workflows and fund distribution tracking.",
    tags: ["JavaScript", "Web App"],
  },
  {
    name: "Paryatak",
    repo: "paryatak",
    desc: "A travel and tourism web application for discovering destinations and planning itineraries.",
    tags: ["JavaScript", "Travel"],
  },
  {
    name: "Insta",
    repo: "insta",
    desc: "A full-featured Instagram clone built with Flutter — feed, stories, profiles, and real-time interactions.",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    name: "Educat",
    repo: "Educat",
    desc: "An education platform app facilitating learning through interactive content and course management.",
    tags: ["Flutter", "Dart", "EdTech"],
  },
  {
    name: "FleetIQ",
    repo: "fleetIQ",
    desc: "Fleet management application for tracking vehicles, optimizing routes, and managing logistics.",
    tags: ["Flutter", "Dart", "IoT"],
  },
  {
    name: "Let's Talk",
    repo: "Let-s_Talk",
    desc: "Real-time chat application with modern UI, media sharing, and secure messaging features.",
    tags: ["Flutter", "Dart", "Chat"],
  },
];

const SKILLS = [
  { icon: "📱", name: "Flutter" },
  { icon: "🎯", name: "Dart" },
  { icon: "⚛️", name: "React" },
  { icon: "✨", name: "JavaScript" },
  { icon: "🔥", name: "Firebase" },
  { icon: "🎮", name: "Unity / C#" },
  { icon: "🐙", name: "Git" },
  { icon: "💻", name: "C++" },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({ className = "", stagger = false, children }) {
  const ref = useScrollReveal();
  const cls = stagger ? `reveal-stagger ${className}` : `reveal ${className}`;
  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ===== Navbar ===== */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo">
            vinit<span>.</span>
          </a>

          <div className="navbar-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
      </div>

      {/* ===== Hero ===== */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-bg-orb hero-bg-orb--1" />
          <div className="hero-bg-orb hero-bg-orb--2" />
        </div>
        <div className="hero-content">
          <span className="hero-label">App Developer</span>
          <h1 className="hero-title">
            Hi, I'm <span className="accent">Vinit Yadav</span>
          </h1>
          <p className="hero-subtitle">
            I craft polished mobile apps, immersive games, and thoughtful web
            experiences — turning ideas into products people love.
          </p>
          <div className="hero-actions">
            <a
              href="#projects"
              className="btn btn-primary"
            >
              View Projects ↓
            </a>
            <a
              href="https://github.com/shamstir"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="section" id="about">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">About</span>
              <h2 className="section-title">A bit about me</h2>
              <div className="section-divider" />
            </div>
          </Reveal>

          <Reveal>
            <div className="about-content">
              <p className="about-text">
                I'm a <strong>highly driven developer</strong> passionate about
                building apps that solve real problems. From{" "}
                <strong>Flutter mobile apps</strong> and{" "}
                <strong>game development with Unity</strong> to full-stack web
                projects — I love shipping products that feel great to use. Currently
                exploring <strong>backend engineering</strong> and{" "}
                <strong>cybersecurity</strong>, and always sharpening my skills
                through competitive programming.
              </p>

              <div className="about-stats">
                <div className="about-stat">
                  <div className="about-stat-number">7+</div>
                  <div className="about-stat-label">Projects</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-number">4+</div>
                  <div className="about-stat-label">Flutter Apps</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-number">3+</div>
                  <div className="about-stat-label">Web Platforms</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section className="section" id="skills">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">Skills</span>
              <h2 className="section-title">Tech I work with</h2>
              <div className="section-divider" />
            </div>
          </Reveal>

          <Reveal stagger>
            <div className="skills-grid">
              {SKILLS.map((s) => (
                <div key={s.name} className="skill-card reveal-child">
                  <span className="skill-icon">{s.icon}</span>
                  <span className="skill-name">{s.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Projects ===== */}
      <section className="section" id="projects">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">Projects</span>
              <h2 className="section-title">What I've built</h2>
              <div className="section-divider" />
            </div>
          </Reveal>

          <Reveal stagger>
            <div className="projects-grid">
              {PROJECTS.map((p) => (
                <a
                  key={p.repo}
                  href={`https://github.com/Shamstir/${p.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card reveal-child"
                  style={{ textDecoration: "none" }}
                >
                  <div className="project-card-header">
                    <span className="project-card-icon">📂</span>
                    <span className="project-card-link">↗</span>
                  </div>
                  <h3 className="project-card-title">{p.name}</h3>
                  <p className="project-card-desc">{p.desc}</p>
                  <div className="project-card-footer">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className={`project-tag${
                          t === p.tags[0] ? "" : " project-tag--secondary"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">Contact</span>
              <h2 className="section-title">Let's connect</h2>
              <div className="section-divider" />
            </div>
          </Reveal>

          <Reveal>
            <div className="contact-content">
              <p className="contact-text">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of something amazing.
              </p>
              <div className="contact-links">
                <a
                  href="mailto:vyadav1267354@gmail.com"
                  className="contact-link"
                >
                  <span className="contact-link-icon">📧</span>
                  Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/vinit-yadav-1bb36728b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span className="contact-link-icon">🔗</span>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/shamstir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span className="contact-link-icon">🐙</span>
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p className="footer-text">
          © {new Date().getFullYear()} Vinit Yadav<span>.</span> Crafted with
          care.
        </p>
      </footer>
    </>
  );
}

export default App;