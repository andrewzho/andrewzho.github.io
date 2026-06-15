import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Renders the fixed ambient layers (drifting grid, cursor spotlight, film grain)
// and drives the cursor-following spotlight + scroll-reveal animations.
function Ambient() {
  const spotRef = useRef(null);
  const { pathname } = useLocation();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cursor spotlight (mount once)
  useEffect(() => {
    if (reduced || !spotRef.current) return;
    const spot = spotRef.current;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.25;
    let cx = tx;
    let cy = ty;
    let raf;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      spot.style.left = cx + "px";
      spot.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    loop();
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Scroll reveal — re-scan on every route change
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (reduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname, reduced]);

  return (
    <>
      <div className="grid-bg" />
      <div className="spot" ref={spotRef} />
      <div className="grain" />
    </>
  );
}

export default Ambient;
