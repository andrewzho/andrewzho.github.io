import React, { useState } from "react";
import ScrollText from "../ScrollText";

const ROLES = [
  {
    tab: "Capital Group",
    title: "Software Development Engineer",
    org: "Capital Group",
    when: "JUN 2025 — PRESENT · SEATTLE",
    bullets: [
      "Owned an opt-in Daily Digest end-to-end — DynamoDB schema, a scheduled AWS Lambda aggregator, API, and Vue UI — collapsing 50+ daily investor alerts into one market-close email.",
      "Re-platformed the notification client to a v2 REST API with cursor pagination + infinite scroll, keeping latency flat as histories grew.",
      "Hardened a concurrent send pipeline with typed exceptions, HTTP 409 on duplicate sends, and Datadog monitors.",
      "Shipped ~100 PRs across 7 repos (TypeScript backend, Vue micro-frontends, Terraform) and drove 3 epics end-to-end.",
    ],
  },
  {
    tab: "NY Proton Center",
    title: "Software Engineer",
    org: "New York Proton Center",
    when: "JUN 2024 — MAR 2026 · REMOTE / NYC",
    bullets: [
      "Built a proton-therapy WET calculator + Python/Tkinter visualizer on the RayStation DICOM API, cutting manual planning time 25%.",
      "Architected a Snowflake star-schema data warehouse, accelerating month-end close 30%.",
      "Built SQL ETL pipelines that cut the data-freshness SLA from 24h to 4h.",
      "Shipped 10+ Power BI dashboards that enabled 20% faster budget approvals.",
    ],
  },
  {
    tab: "Convo",
    title: "Software Engineer",
    org: "Convo",
    when: "JAN 2025 — JUL 2025 · REMOTE",
    bullets: [
      "Designed 25+ RESTful Flask endpoints with validation + error handling, cutting bug tickets 30%.",
      "Built a Socket.IO/WebSocket service for real-time transcription, lifting engagement 20%.",
      "Engineered JWT auth (token rotation, rate limiting, self-service reset), cutting unauthorized access 40%.",
    ],
  },
];

function Experience() {
  const [active, setActive] = useState(0);
  const role = ROLES[active];

  return (
    <section className="sec" id="exp">
      <div className="wrap">
        <div className="sec-head reveal">
          <ScrollText as="h2">Experience</ScrollText>
          <div className="idx">01 — Where I&rsquo;ve built</div>
        </div>
        <div className="exp parallax">
          <div className="tabs" role="tablist">
            {ROLES.map((r, i) => (
              <button
                key={r.tab}
                className={"tab" + (i === active ? " active" : "")}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
              >
                {r.tab}
              </button>
            ))}
          </div>
          <div className="panel" key={active}>
            <h3>
              {role.title}{" "}
              <span className="at">· {role.org}</span>
            </h3>
            <div className="when mono">{role.when}</div>
            <ul>
              {role.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
