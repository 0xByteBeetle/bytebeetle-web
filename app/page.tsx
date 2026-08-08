const courses = [
  {
    label: "Foundation",
    title: "EVM Engineering Bootcamp",
    status: "Core curriculum complete",
    audience:
      "For developers who know basic Solidity and want a reliable understanding of the system beneath it.",
    description:
      "A structured path through EVM execution, calldata, transactions, signing, observability, token engineering, testing, and protocol development.",
    details: [
      ["Depth", "20 focused modules"],
      ["Practice", "Runnable Foundry labs"],
      ["Outcome", "Reason about contracts as systems"],
    ],
  },
  {
    label: "Advanced",
    title: "Advanced EVM Bootcamp",
    status: "Currently in development",
    audience:
      "For Solidity engineers ready to study standards, integrations, and failure modes at implementation depth.",
    description:
      "Deep modules on token internals, typed signatures, permit flows, storage, gas behavior, integration assumptions, and adversarial testing.",
    details: [
      ["Depth", "30+ pages per module"],
      ["Practice", "Verified reference projects"],
      ["Outcome", "Design and review production systems"],
    ],
  },
];

const principles = [
  {
    title: "Explain the mechanism",
    text: "We begin with the exact problem a mechanism solves, then build the mental model needed to reason about it.",
  },
  {
    title: "Inspect the implementation",
    text: "Storage, calldata, signatures, control flow, events, and protocol rules are placed directly in front of the student.",
  },
  {
    title: "Verify the claim",
    text: "The contract, test, trace, storage read, or RPC call is executed before it becomes part of the lesson.",
  },
];

const formats = [
  {
    title: "Independent study",
    text: "Complete lessons, runnable exercises, technical questions, hands-on questions, and reference solutions.",
    action: "Join course updates",
    href: "https://substack.com/@andreyobruchkov",
  },
  {
    title: "One-to-one mentoring",
    text: "The complete curriculum with direct sessions, code review, debugging support, and a path adjusted to your level.",
    action: "Discuss mentoring",
    href: "https://www.linkedin.com/in/andrey-obruchkov/",
  },
  {
    title: "Team training",
    text: "Focused education for engineering teams, adapted to your protocol, codebase, integration risks, and technical goals.",
    action: "Plan team training",
    href: "https://www.linkedin.com/in/andrey-obruchkov/",
  },
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ByteBeetle home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>ByteBeetle</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#courses">Courses</a>
          <a href="#approach">Approach</a>
          <a href="#formats">Formats</a>
          <a href="#about">About</a>
        </nav>
        <a className="quiet-link" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
          Course updates <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">EVM education for working engineers</p>
          <h1>Understand Ethereum at the level where it actually runs.</h1>
          <p className="hero-lede">
            Rigorous bootcamps for developers who want to understand execution,
            storage, signatures, gas, token standards, and production failure
            modes—not simply learn another framework.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#courses">View the courses</a>
            <a className="button button-light" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
              Join the course list
            </a>
          </div>
          <p className="byline">Created and taught by Andrey Obruchkov, blockchain engineer and protocol builder.</p>
        </div>

        <aside className="hero-summary" aria-label="What the courses cover">
          <p className="summary-title">What you learn to do</p>
          <ul>
            <li>Read contract behavior beyond the public interface</li>
            <li>Connect Solidity code to EVM execution and storage</li>
            <li>Build and verify signatures, tokens, and integrations</li>
            <li>Use tests and traces to prove technical claims</li>
            <li>Recognize assumptions that fail in production</li>
          </ul>
          <p className="summary-note">
            Every code example shown in a lesson is maintained as runnable course code.
          </p>
        </aside>
      </section>

      <section className="section courses-section" id="courses">
        <div className="section-intro">
          <p className="eyebrow">The courses</p>
          <h2>One foundation.<br />Two levels of depth.</h2>
          <p>
            The core bootcamp develops the mental model. The advanced bootcamp
            uses that model to examine standards, implementation details, and
            integration risk.
          </p>
        </div>

        <div className="course-list">
          {courses.map((course) => (
            <article className="course" key={course.title}>
              <div className="course-heading">
                <p className="course-label">{course.label}</p>
                <p className="course-status">{course.status}</p>
              </div>
              <div className="course-main">
                <h3>{course.title}</h3>
                <p className="course-audience">{course.audience}</p>
                <p className="course-description">{course.description}</p>
              </div>
              <dl>
                {course.details.map(([term, description]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>
              <a className="text-link" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
                Receive enrollment information <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section approach-section" id="approach">
        <div className="section-intro narrow-intro">
          <p className="eyebrow">The approach</p>
          <h2>Understanding must be supported by evidence.</h2>
          <p>
            A technical explanation is useful only when the student can connect
            it to implementation and reproduce the behavior independently.
          </p>
        </div>

        <div className="principle-list">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>

        <blockquote className="course-rule">
          <p>“If code appears in a lesson, it exists on our side, it runs, and its output has been inspected.”</p>
          <cite>The ByteBeetle course rule</cite>
        </blockquote>
      </section>

      <section className="section formats-section" id="formats">
        <div className="section-intro">
          <p className="eyebrow">Ways to learn</p>
          <h2>Choose the level of support you need.</h2>
          <p>
            Study independently, work directly with Andrey, or bring the material
            into your engineering organization.
          </p>
        </div>

        <div className="format-list">
          {formats.map((format) => (
            <article key={format.title}>
              <h3>{format.title}</h3>
              <p>{format.text}</p>
              <a className="text-link" href={format.href} target="_blank" rel="noreferrer">
                {format.action} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div>
          <p className="eyebrow">About the instructor</p>
          <h2>Built from engineering work, not course templates.</h2>
        </div>
        <div className="about-copy">
          <p>
            Andrey Obruchkov is a blockchain engineer and protocol builder working
            across smart contracts, multi-chain systems, infrastructure, Go, and
            Rust. ByteBeetle turns that experience into careful, evidence-driven
            EVM education.
          </p>
          <div className="profile-links">
            <a href="https://andreyobruchkov.com" target="_blank" rel="noreferrer">Personal site ↗</a>
            <a href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">Medium ↗</a>
            <a href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Substack ↗</a>
            <a href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Course updates</p>
        <h2>Learn the system,<br />not only the syntax.</h2>
        <p>Receive enrollment information, new lessons, public labs, and long-form technical writing.</p>
        <a className="button button-inverse" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
          Join the ByteBeetle list
        </a>
      </section>

      <footer>
        <a className="brand" href="#top" aria-label="ByteBeetle home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>ByteBeetle</span>
        </a>
        <p>EVM engineering education by Andrey Obruchkov.</p>
        <p>© 2026 ByteBeetle</p>
      </footer>
    </main>
  );
}
