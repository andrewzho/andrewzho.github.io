import React from "react";
import Type from "./Type";
import Stats from "./Stats";
import Experience from "./Experience";
import pdf from "../../Assets/Resume.pdf";
import neuroflow from "../../Assets/Projects/neuroflow.jpg";
import bucketlist from "../../Assets/Projects/bucketlist.jpg";

const NAME = "Andrew Ho";

const MARQUEE = [
  "React", "Python", "FastAPI", "TypeScript",
  "PostgreSQL", "OpenAI", "Node", "MongoDB",
];

const PROJECTS = [
  {
    title: "NeuroFlow",
    desc:
      "Calculates stress level from blood flow — gathering biological data and correlating it to a quantitative stress metric derived from Heart Rate Variability.",
    tags: ["React", "FastAPI", "OpenAI", "PostgreSQL"],
    img: neuroflow,
    code: "https://github.com/andrewzho/NeuroFlow",
    demo: "https://devpost.com/software/neuroflow",
  },
  {
    title: "BucketList",
    desc:
      "Flight finder based on personal preference. Build bucketlists and get automatic alerts about the most affordable flights for your dream trips.",
    tags: ["React", "Fetch.AI", "OpenAI", "MongoDB"],
    img: bucketlist,
    code: "https://github.com/andrewzho/BucketList-AI",
    demo: "https://devpost.com/software/bucketlist-ai",
  },
];

const NOW = [
  { k: "Playing", b: "Dave the Diver", s: "Dives by day, sushi bar by night" },
  { k: "Watching", b: "One Piece", s: "Catching up on the saga" },
  { k: "Training", b: "UL PPL", s: "Upper / Lower · Push / Pull / Legs" },
  { k: "Working from", b: "A café in Seattle", s: "Cold brew, any seat" },
];

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function onMagnet(e) {
  if (reduced) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${
    (e.clientY - (r.top + r.height / 2)) * 0.35
  }px)`;
}
function onMagnetLeave(e) {
  e.currentTarget.style.transform = "";
}

function onTilt(e) {
  if (reduced) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.transform = `rotateY(${(px - 0.5) * 12}deg) rotateX(${(0.5 - py) * 12}deg)`;
}
function onTiltLeave(e) {
  e.currentTarget.style.transform = "";
}

function Project({ title, desc, tags, img, code, demo, flip }) {
  return (
    <div className={"proj parallax" + (flip ? " flip" : "")}>
      <div className="pmeta">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="stack">
          {tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <div className="plinks">
          <a href={code} target="_blank" rel="noopener noreferrer">Code ↗</a>
          <a href={demo} target="_blank" rel="noopener noreferrer">Devpost ↗</a>
        </div>
      </div>
      <div className="frame">
        <div className="window tilt" onPointerMove={onTilt} onPointerLeave={onTiltLeave}>
          <div className="bar"><i /><i /><i /></div>
          <img src={img} alt={`${title} screenshot`} loading="lazy" />
        </div>
      </div>
    </div>
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
            UC Irvine CS grad shipping production systems at Capital Group. I care
            about how the pieces fit together, why they break, and getting them
            reliably to people — big picture over busywork.
          </p>
          <div className="btn-row">
            <a
              className="btn"
              href="#work"
              onPointerMove={onMagnet}
              onPointerLeave={onMagnetLeave}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See the work
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
              <span><b>{s}</b></span>
              <span>·</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* stats */}
      <Stats />

      {/* experience */}
      <Experience />

      {/* work */}
      <section className="sec" id="work">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Selected Work</h2>
            <div className="idx">02 — Projects</div>
          </div>
          {PROJECTS.map((p, i) => (
            <Project key={p.title} {...p} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* currently */}
      <section className="sec" id="now">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Currently</h2>
            <div className="idx">03 — Now</div>
          </div>
          <div className="now">
            {NOW.map((item) => (
              <div className="item parallax" key={item.k}>
                <div className="k"><span className="live" />{item.k}</div>
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
            <div className="idx">04 — Life</div>
          </div>
          <div className="life">
            <div className="tile parallax">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M10 9l4 2.5-4 2.5z" fill="currentColor" stroke="none"/><path d="M8 21h8"/></svg>
              <div><b>Anime</b><br /><small>always one series deep</small></div>
            </div>
            <div className="tile parallax">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5.5 5.5c3 3 3 10 0 13M18.5 5.5c-3 3-3 10 0 13"/></svg>
              <div><b>Knicks basketball</b><br /><small>orange &amp; blue forever</small></div>
            </div>
            <div className="tile parallax">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9z"/><path d="M9.5 14a2.5 2.5 0 0 0 5 0"/></svg>
              <div><b>Victini</b><br /><small>the victory pokémon</small></div>
            </div>
            <div className="tile parallax">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 12h4M8 10v4"/><circle cx="16" cy="11" r="1"/><circle cx="18" cy="13" r="1"/><rect x="2" y="6" width="20" height="12" rx="4"/></svg>
              <div><b>Gaming with friends</b><br /><small>co-op &amp; couch sessions</small></div>
            </div>
            <div className="tile parallax">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6.5 6.5l11 11M3 9l3-3M21 15l-3 3M4 13l7-7 7 7-7 7z"/><path d="M2 12l4 4M18 6l4 4"/></svg>
              <div><b>The gym</b><br /><small>lifting most days</small></div>
            </div>
            <div className="tile parallax">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2"/><path d="M8 2v2M12 2v2"/></svg>
              <div><b>Cafés</b><br /><small>cold brew, any seat</small></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
