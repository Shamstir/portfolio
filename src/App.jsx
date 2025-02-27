import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".splash").classList.add("fade-out");
      setTimeout(() => setShowSplash(false), 800);
    }, 2000);

    const revealOnScroll = () => {
      document.querySelectorAll("section").forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
          section.classList.add("show");
        }
      });
    };

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("mousemove", handleMouseMove);
    revealOnScroll();

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div 
        className="custom-cursor" 
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }}
      />

      {showSplash && (
        <div className="splash">
          <div className="splash-text">
            <span>W</span><span>e</span><span>l</span><span>c</span>
            <span>o</span><span>m</span><span>e</span>
          </div>
        </div>
      )}

      <nav className="horizontal-nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="https://github.com/shamstir" target="_blank" rel="noopener noreferrer">Projects</a></li>
          <li><a href="https://leetcode.com/shamstir" target="_blank" rel="noopener noreferrer">LeetCode</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-card">
          <h1>
            Hi, I'm <span className="name">Vinit Yadav</span>
          </h1>
          <p className="typing-effect">App Developer | Game Developer</p>
          <div className="button-container">
            <a 
              href="https://github.com/shamstir" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="button"
            >
              View GitHub
            </a>
          </div>
        </div>
        <div className="background-particles"></div>
      </section>

      <section className="about" id="about">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>I'm a highly driven and enthusiastic developer, passionate about app development, game development, and backend engineering.</p>
          <div className="skills-grid">
            <p className="skill-item">🚀 Learning Flutter backend development</p>
            <p className="skill-item">🎮 Revolutionizing game development</p>
            <p className="skill-item">📱 Crafting mobile experiences</p>
            <p className="skill-item">💡 Exploring cybersecurity</p>
            <p className="skill-item">👨‍💻 Competitive programming</p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="section-title">Connect with Me</h2>
        <div className="contact-links">
          <p><a href="https://www.linkedin.com/in/vinit-yadav-1bb36728b/" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a></p>
          <p><a href="mailto:vyadav1267354@gmail.com">📧 Email Me</a></p>
        </div>
      </section>
    </div>
  );
}

export default App;