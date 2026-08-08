const courses = [
  {
    eyebrow: "Core program",
    title: "EVM Engineering Bootcamp",
    description:
      "Build the foundation most Solidity courses skip: execution, calldata, transactions, signing, observability, token engineering, and a complete final project.",
    details: ["20 modules", "Runnable labs", "Foundry-first workflow"],
    status: "Enrollment updates",
  },
  {
    eyebrow: "Advanced program",
    title: "Advanced EVM Bootcamp",
    description:
      "Go below default implementations into token internals, typed signatures, storage, gas behavior, integration assumptions, and adversarial testing.",
    details: ["30+ pages per module", "146 verified Week 1 tests", "Production failure modes"],
    status: "In production",
  },
];

const method = [
  {
    number: "01",
    title: "Build the mental model",
    text: "Start with a simple model of the mechanism and the exact question it must answer.",
  },
  {
    number: "02",
    title: "Open the abstraction",
    text: "Inspect storage, calldata, signatures, control flow, events, and the protocol rules underneath it.",
  },
  {
    number: "03",
    title: "Execute the evidence",
    text: "Run the contract, test, trace, storage read, or RPC call that proves the technical claim.",
  },
  {
    number: "04",
    title: "Break the assumption",
    text: "Reproduce the failure and connect it to wallets, routers, bridges, indexers, and production risk.",
  },
];

const signals = [
  ["20", "modules in the core bootcamp"],
  ["146", "passing tests in Advanced Week 1"],
  ["30+", "meaningful pages per advanced module"],
  ["1:1", "executable evidence for public code"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ByteBeetle home">
          <span className="brand-mark" aria-hidden="true">BB</span>
          <span>ByteBeetle</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#courses">Courses</a>
          <a href="#method">Method</a>
          <a href="#work-with-me">Mentoring</a>
          <a href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">Writing</a>
        </nav>
        <a className="header-cta" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
          Get updates <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker"><span className="status-dot" /> EVM engineering, taught from evidence</p>
          <h1>Learn what happens <em>under the abstraction.</em></h1>
          <p className="hero-lede">
            Deep Ethereum bootcamps for developers who want to reason about execution,
            storage, signatures, gas, failure modes, and real integration behavior—not
            memorize another framework tutorial.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#courses">Explore the courses <span aria-hidden="true">→</span></a>
            <a className="button button-secondary" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Join the launch list</a>
          </div>
          <p className="hero-note">Created by Andrey Obruchkov · Blockchain engineer and protocol builder</p>
        </div>

        <div className="terminal-card" aria-label="Advanced Week 1 verification summary">
          <div className="terminal-bar">
            <span />
            <span />
            <span />
            <p>advanced-week-01 / verification</p>
          </div>
          <div className="terminal-body">
            <p><span className="prompt">$</span> ./scripts/verify-week-01.sh</p>
            <p className="muted">running instructor projects...</p>
            <p><span className="pass">PASS</span> module1 · ERC-20 internals</p>
            <p><span className="pass">PASS</span> module3 · EIP-712 + permit</p>
            <p><span className="pass">PASS</span> module7 · ERC-1155 engineering</p>
            <p className="muted">...5 more modules verified</p>
            <div className="terminal-result">
              <span>146 tests passed</span>
              <span>0 failed</span>
            </div>
          </div>
          <div className="evidence-chain">
            <span>Lesson claim</span><b>→</b><span>Runnable source</span><b>→</b><span>Observed proof</span>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Course facts">
        {signals.map(([value, label]) => (
          <div className="signal" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section courses-section" id="courses">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / COURSES</p>
            <h2>Choose your depth.</h2>
          </div>
          <p>Two connected programs. Start with the EVM as a system, then move into advanced standards and production behavior.</p>
        </div>

        <div className="course-grid">
          {courses.map((course, index) => (
            <article className={`course-card course-${index + 1}`} key={course.title}>
              <div className="course-topline">
                <p>{course.eyebrow}</p>
                <span>{course.status}</span>
              </div>
              <h3>{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <ul>
                {course.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
              <a href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
                Get course updates <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="section-heading light-heading">
          <div>
            <p className="section-index">02 / METHOD</p>
            <h2>Understanding is a chain of proof.</h2>
          </div>
          <p>The lesson is only finished when you can explain the mechanism, reproduce the behavior, and identify what would falsify your conclusion.</p>
        </div>

        <div className="method-grid">
          {method.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="code-policy">
          <p className="code-policy-label">THE BYTEBEETLE RULE</p>
          <blockquote>“If code appears in a lesson, it exists on our side, it runs, and its output has been inspected.”</blockquote>
          <div>
            <span>Runnable contracts</span>
            <span>Focused tests</span>
            <span>Trace evidence</span>
            <span>Failure reproduction</span>
          </div>
        </div>
      </section>

      <section className="section paths-section" id="work-with-me">
        <div className="section-heading">
          <div>
            <p className="section-index">03 / WORK WITH ME</p>
            <h2>Learn alone, with guidance, or as a team.</h2>
          </div>
          <p>The same technical depth can be delivered as a structured program, direct mentoring, or focused training for an engineering organization.</p>
        </div>

        <div className="path-grid">
          <article>
            <span className="path-number">01</span>
            <h3>Self-paced</h3>
            <p>Long-form lessons, runnable labs, separated technical and hands-on questions, and solution guidance.</p>
            <a href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Join launch updates ↗</a>
          </article>
          <article className="featured-path">
            <span className="path-number">02</span>
            <p className="small-label">MOST DIRECT</p>
            <h3>Mentored</h3>
            <p>Add one-on-one sessions, code review, debugging support, and a learning path adjusted to your current level.</p>
            <a href="https://www.linkedin.com/in/andrey-obruchkov/" target="_blank" rel="noreferrer">Discuss mentoring ↗</a>
          </article>
          <article>
            <span className="path-number">03</span>
            <h3>Team training</h3>
            <p>Private workshops and programs adapted to your protocol, stack, integration risks, and engineering goals.</p>
            <a href="https://www.linkedin.com/in/andrey-obruchkov/" target="_blank" rel="noreferrer">Plan team training ↗</a>
          </article>
        </div>
      </section>

      <section className="founder-section" id="about">
        <div className="founder-monogram" aria-hidden="true">AO</div>
        <div>
          <p className="section-index">ABOUT THE INSTRUCTOR</p>
          <h2>Built from protocol work, not course templates.</h2>
          <p>Andrey Obruchkov is a blockchain engineer and protocol builder working across smart contracts, multi-chain systems, infrastructure, Go, and Rust. ByteBeetle turns that engineering experience into rigorous EVM education.</p>
          <div className="founder-links">
            <a href="https://andreyobruchkov.com" target="_blank" rel="noreferrer">Personal site ↗</a>
            <a href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">Medium ↗</a>
            <a href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Substack ↗</a>
            <a href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <p className="section-index">START BELOW THE SURFACE</p>
        <h2>Stop memorizing the interface.<br />Learn the system.</h2>
        <p>Join the list for enrollment dates, new modules, free technical writing, and public labs.</p>
        <a className="button button-primary" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Get ByteBeetle updates <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <a className="brand" href="#top" aria-label="ByteBeetle home">
          <span className="brand-mark" aria-hidden="true">BB</span>
          <span>ByteBeetle</span>
        </a>
        <p>Deep EVM engineering education by Andrey Obruchkov.</p>
        <p>© 2026 ByteBeetle</p>
      </footer>
    </main>
  );
}
