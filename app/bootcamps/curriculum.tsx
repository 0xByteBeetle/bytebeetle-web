"use client";

import { useRef } from "react";
import type { CurriculumWeek } from "./curriculum-data";

export function Curriculum({ weeks, planned = false }: { weeks: CurriculumWeek[]; planned?: boolean }) {
  const container = useRef<HTMLDivElement>(null);

  function setAll(open: boolean) {
    container.current?.querySelectorAll("details").forEach((week) => { week.open = open; });
  }

  return (
    <div className="course-curriculum" ref={container}>
      <div className="curriculum-toolbar">
        <p>{planned ? "Working curriculum · subject to refinement" : "Six weeks, from foundations to a full-stack project"}</p>
        <div>
          <button type="button" onClick={() => setAll(true)} aria-controls="curriculum-weeks">Expand all weeks</button>
          <button type="button" onClick={() => setAll(false)} aria-controls="curriculum-weeks">Collapse all</button>
        </div>
      </div>
      <div id="curriculum-weeks" className="curriculum-weeks">
        {weeks.map((week, index) => (
          <details className="curriculum-week" key={week.label} open={index === 0}>
            <summary>
              <span className="curriculum-week-label">{week.label}</span>
              <span className="curriculum-week-overview">
                <strong>{week.title}</strong>
                <span>{week.goal}</span>
              </span>
              <span className="curriculum-toggle" aria-hidden="true" />
            </summary>
            <div className="curriculum-week-content">
              {week.modules && (
                <section className="curriculum-modules" aria-label={`${week.label} modules`}>
                  <h3>Modules in this week</h3>
                  <ol>
                    {week.modules.map((module) => <li key={module}>{module}</li>)}
                  </ol>
                </section>
              )}
              <div className="curriculum-detail-columns">
                <section className="curriculum-topics" aria-label={`${week.label} topics`}>
                  <h3>What you’ll explore</h3>
                  {week.topics.map((topic) => (
                    <div className="curriculum-topic" key={topic.title}>
                      <h4>{topic.title}</h4>
                      <ul>{topic.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  ))}
                </section>
                <section className="curriculum-practice" aria-label={`${week.label} hands-on work`}>
                  <h3>Hands-on work</h3>
                  <ul>{week.handsOn.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>
              <section className="curriculum-outcomes" aria-label={`${week.label} outcomes`}>
                <h3>What you’ll take away</h3>
                <ul>{week.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
