import React, { useEffect, useRef } from "react";

// Character-by-character scroll-linked reveal. As the element scrolls up
// through the viewport, letters brighten from dim to full, left to right —
// the Skiper31 "text scroll" effect, hand-rolled with rAF + scroll (no
// framer-motion / lenis). Respects prefers-reduced-motion.
function ScrollText({ children, as: Tag = "span", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll("[data-ch]"));
    if (!chars.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((c) => (c.style.opacity = "1"));
      return;
    }

    const n = chars.length;
    const feather = 3; // how many chars sit mid-transition at once (soft sweep)
    let ticking = false;

    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when the heading's top sits at 85% of the viewport, 1 at 35%.
      let p = (vh * 0.85 - r.top) / (vh * 0.5);
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      const lead = p * (n + feather);
      for (let i = 0; i < n; i++) {
        let cp = (lead - i) / feather;
        cp = cp < 0 ? 0 : cp > 1 ? 1 : cp;
        chars[i].style.opacity = (0.18 + 0.82 * cp).toFixed(3);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [children]);

  const words = String(children).split(" ");
  return (
    <Tag ref={ref} className={("scrolltext " + className).trim()}>
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          {wi > 0 ? " " : null}
          <span className="w">
            {[...word].map((ch, ci) => (
              <span key={ci} data-ch>
                {ch}
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </Tag>
  );
}

export default ScrollText;
