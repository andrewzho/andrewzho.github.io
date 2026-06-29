import React, { useEffect, useRef } from "react";

const STATS = [
  { n: 100, suffix: "+", label: "PRs merged" },
  { n: 3, suffix: "", label: "epics led" },
  { n: 7, suffix: "", label: "repositories" },
  { n: 130, suffix: "+", label: "tickets shipped" },
];

function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nums = Array.from(root.querySelectorAll("[data-to]"));

    if (reduced) {
      nums.forEach((el) => (el.textContent = el.dataset.to + (el.dataset.suf || "")));
      return;
    }

    const countUp = (el) => {
      const to = +el.dataset.to;
      const suf = el.dataset.suf || "";
      const dur = 1100;
      let start;
      const step = (t) => {
        if (!start) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.4 }
    );
    nums.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec stats-sec" ref={ref}>
      <div className="wrap">
        <div className="stats">
          {STATS.map((s, i) => (
            <div className="stat parallax" key={i}>
              <div className="num">
                <span data-to={s.n} data-suf={s.suffix}>0{s.suffix}</span>
              </div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
