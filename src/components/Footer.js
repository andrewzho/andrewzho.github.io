import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="foot-grid reveal">
          <h2>Let&rsquo;s talk.</h2>
          <div className="foot-links">
            <a href="mailto:andrewzho2003@gmail.com">Email</a>
            <a href="https://github.com/andrewzho" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/andrewzho"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <Link to="/resume">Résumé</Link>
          </div>
        </div>
        <div className="copy">© 2026 Andrew Ho · Built in the dark</div>
      </div>
    </footer>
  );
}

export default Footer;
