import React from "react";
import Type from "./Type";
import pdf from "../../Assets/Resume.pdf";

const NAME = "Andrew Ho";

const MARQUEE = [
  "React", "Python", "FastAPI", "TypeScript",
  "PostgreSQL", "OpenAI", "Node", "MongoDB",
];

const PROJECTS = [
  {
    num: "01",
    title: "NeuroFlow",
    desc:
      "Calculates stress level from blood flow — a scalable way to gather biological data and correlate it to a quantitative stress metric derived from Heart Rate Variability.",
    tags: ["React", "FastAPI", "OpenAI", "PostgreSQL", "Neurokit2"],
    href: "https://github.com/andrewzho/NeuroFlow",
  },
  {
    num: "02",
    title: "BucketList",
    desc:
      "Flight finder based on personal preference. Build bucketlists and get automatic notifications about the most affordable flights for your dream trips.",
    tags: ["React", "Fetch.AI", "OpenAI", "MongoDB"],
    href: "https://github.com/andrewzho/BucketList-AI",
  },
];

const NOW = [
  { k: "Playing", b: "Super Mario Galaxy 2", s: "Going for 100%" },
  { k: "Watching", b: "One Piece", s: "Catching up on the saga" },
  { k: "Training", b: "UL PPL", s: "Upper / Lower · Push / Pull / Legs" },
  { k: "Working from", b: "A café in Seattle", s: "Cold brew, any seat" },
];

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Subtle magnetic pull toward the cursor (hero CTAs)
function onMagnet(e) {
  if (reduced) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const mx = e.clientX - (r.left + r.width / 2);
  const my = e.clientY - (r.top + r.height / 2);
  el.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
}
function onMagnetLeave(e) {
  e.currentTarget.style.transform = "";
}

function ProjectCard({ num, title, desc, tags, href }) {
  const onMove = (e) => {
    if (reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateY(${(px - 0.5) * 6}deg) rotateX(${(0.5 - py) * 6}deg)`;
    el.style.setProperty("--mx", px * 100 + "%");
    el.style.setProperty("--my", py * 100 + "%");
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = "";
  };
  return (
    <a
      className="card reveal"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="ptop">
        <span className="pnum">{num}</span>
        <span className="arrow">↗</span>
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="stack">
        {tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

function Home() {
  return (
    <main>
      {/* hero */}
      <header className="hero">
        <div className="wrap">
          <div className="eyebrow">
            <span className="ln" />
            Software Engineer · Seattle, WA
          </div>
          <h1 className="display">
            {[...NAME].map((c, i) => (
              <span key={i}>{c === " " ? " " : c}</span>
            ))}
          </h1>
          <div className="role">
            <span className="pre">I&rsquo;m a</span> <Type />
          </div>
          <p className="lead">
            UC Irvine CS grad specializing in Intelligent Systems. I build
            full-stack products, work with data, and keep up with whatever&rsquo;s
            new in AI — currently a Software Engineer in Seattle.
          </p>
          <div className="btn-row">
            <a
              className="btn"
              href="#work"
              onPointerMove={onMagnet}
              onPointerLeave={onMagnetLeave}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View work
            </a>
            <a
              className="btn ghost"
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              download="Andrew_Ho_Resume.pdf"
              onPointerMove={onMagnet}
              onPointerLeave={onMagnetLeave}
            >
              Download CV
            </a>
          </div>
        </div>
      </header>

      {/* marquee */}
      <div className="marquee">
        <div className="track">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <React.Fragment key={i}>
              <span>
                <b>{s}</b>
              </span>
              <span>·</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* work */}
      <section className="sec" id="work">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Selected Work</h2>
            <div className="idx">01 — Projects</div>
          </div>
          <div className="projects">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* currently */}
      <section className="sec" id="now">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Currently</h2>
            <div className="idx">02 — Now</div>
          </div>
          <div className="now">
            {NOW.map((item) => (
              <div className="item reveal" key={item.k}>
                <div className="k">
                  <span className="live" />
                  {item.k}
                </div>
                <b>{item.b}</b>
                <small>{item.s}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* off the clock */}
      <section className="sec" id="life">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Off the clock</h2>
            <div className="idx">03 — Life</div>
          </div>
          <div className="life">
            <div className="tile reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 12h4M8 10v4" />
                <circle cx="16" cy="11" r="1" />
                <circle cx="18" cy="13" r="1" />
                <rect x="2" y="6" width="20" height="12" rx="4" />
              </svg>
              <div>
                <b>Gaming with friends</b>
                <br />
                <small>Co-op &amp; couch sessions</small>
              </div>
            </div>
            <div className="tile reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6.5 6.5l11 11M3 9l3-3M21 15l-3 3M4 13l7-7 7 7-7 7z" />
                <path d="M2 12l4 4M18 6l4 4" />
              </svg>
              <div>
                <b>The gym</b>
                <br />
                <small>Lifting most days</small>
              </div>
            </div>
            <div className="tile reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a9 9 0 0 1 0 18M3 12c4 0 7-3 9-9M21 12c-4 0-7 3-9 9" />
              </svg>
              <div>
                <b>Volleyball</b>
                <br />
                <small>Weekend pickup</small>
              </div>
            </div>
            <div className="tile reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="4" width="20" height="14" rx="2" />
                <path d="M10 9l4 2.5-4 2.5z" fill="currentColor" stroke="none" />
                <path d="M8 21h8" />
              </svg>
              <div>
                <b>Watching shows</b>
                <br />
                <small>One Piece &amp; beyond</small>
              </div>
            </div>
            <div className="tile reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <div>
                <b>Side projects</b>
                <br />
                <small>Always building something</small>
              </div>
            </div>
            <div className="tile reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 3l1.7 4.8L18.5 9l-4.8 1.2L12 15l-1.7-4.8L5.5 9l4.8-1.2z" />
                <path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
              </svg>
              <div>
                <b>Exploring AI</b>
                <br />
                <small>Whatever&rsquo;s new this week</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
