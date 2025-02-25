import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".splash").classList.add("fade-out");
      setTimeout(() => setShowSplash(false), 600);
    }, 1500);

    // Reveal sections on scroll
    const revealOnScroll = () => {
      document.querySelectorAll("section").forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
          section.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* Splash Screen */}
      {showSplash && (
        <div className="splash">
          <div className="splash-text">Welcome</div>
        </div>
      )}

      {/* Navigation */}
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="https://github.com/shamstir" target="_blank" rel="noopener noreferrer">Projects</a></li>
          <li><a href="https://leetcode.com/shamstir" target="_blank" rel="noopener noreferrer">LeetCode</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>
            Hi, I'm <span className="name">Vinit Yadav</span>
          </h1>
          <p>🚀 App Developer | Game Developer</p>
          <a href="https://github.com/shamstir" target="_blank" rel="noopener noreferrer" className="button">
            View GitHub
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <h2>About Me</h2>
        <p>I'm a highly driven and enthusiastic developer, passionate about app development, game development, and backend engineering.</p>
        <p>🚀 Constantly evolving by learning Flutter backend development</p>
        <p>🎮 Revolutionizing game development with JavaScript (LÖVE 2D, Scribbler Pad, Unreal Engine)</p>
        <p>📱 Crafting seamless mobile experiences with Flutter and Firebase</p>
        <p>💡 Diving deep into cybersecurity with Tor-based chat applications</p>
        <p>👨‍💻 Mastering the art of problem-solving in competitive programming</p>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Connect with Me</h2>
        <p><a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a></p>
        <p><a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">🐦 Twitter</a></p>
        <p><a href="mailto:your-email@example.com">💌 Email Me</a></p>
      </section>
    </div>
  );
}

export default App;
