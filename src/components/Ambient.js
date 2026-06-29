import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Fixed ambient layers (static aurora glow + drifting grid), a scroll-progress
// bar, and scroll-triggered reveals: section headings fade up, while the section
// "pieces" fly in from scattered/rotated positions and lock into place.
function Ambient() {
  const barRef = useRef(null);
  const { pathname } = useLocation();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // One-shot reveal for section headings / footer
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (reduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.15 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname, reduced]);

  // Scatter → settle: pieces start far off / rotated / shrunk, then fly in and
  // lock into their real grid position as the section scrolls into view (and
  // hold there). One-shot CSS transition per piece = dramatic but smooth.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".parallax"));
    if (reduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    if (!els.length) return;
    els.forEach((el, i) => {
      el.style.setProperty("--sx", (Math.random() * 400 - 200).toFixed(0) + "px");
      el.style.setProperty("--sy", (Math.random() * 220 - 110).toFixed(0) + "px");
      el.style.setProperty("--rot", (Math.random() * 44 - 22).toFixed(1) + "deg");
      el.style.setProperty("--scl", (0.55 + Math.random() * 0.25).toFixed(2));
      el.style.transitionDelay = (i % 6) * 70 + "ms";
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, reduced]);

  return (
    <>
      <div className="progress" ref={barRef} />
      <div className="aurora" />
      <div className="grid-bg" />
    </>
  );
}

export default Ambient;
