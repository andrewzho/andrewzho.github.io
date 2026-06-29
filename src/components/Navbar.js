import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// A nav item that scrolls to a section on the home page. If we're on another
// route, it navigates home first, then scrolls once the section has mounted.
function SectionLink({ id, label }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handle = (e) => {
    e.preventDefault();
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 90);
    } else {
      scroll();
    }
  };

  return (
    <a href={`/#${id}`} onClick={handle}>
      {label}
    </a>
  );
}

function NavBar() {
  return (
    <nav>
      <div className="wrap nav-inner">
        <Link to="/" className="brand">
          <span className="dot" />
          Andrew Ho
        </Link>
        <div className="nav-links">
          <SectionLink id="exp" label="Experience" />
          <SectionLink id="work" label="Work" />
          <SectionLink id="life" label="Life" />
          <Link to="/resume">Résumé</Link>
          <SectionLink id="contact" label="Contact" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
