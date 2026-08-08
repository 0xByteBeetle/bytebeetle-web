const programs = [
  {
    label: "Core program",
    title: "EVM Engineering Bootcamp",
    summary:
      "Build the foundation that most Solidity courses skip. Understand how transactions become execution, how data moves through the EVM, and how to investigate contract behavior with confidence.",
    bestFor: "Developers with basic Solidity knowledge who want a complete mental model.",
    topics: "Execution, calldata, transactions, signing, observability, tokens, testing, and protocol development.",
    result: "You can explain and debug contract behavior instead of relying on framework assumptions.",
    note: "20 focused modules with runnable Foundry labs",
  },
  {
    label: "Advanced program",
    title: "Advanced EVM Bootcamp",
    summary:
      "Study standards and integrations at implementation depth. Move from using established patterns to reviewing their assumptions, tradeoffs, and production failure modes.",
    bestFor: "Working Solidity engineers who already understand the fundamentals.",
    topics: "Token internals, typed signatures, permit flows, storage, gas behavior, integration risk, and adversarial testing.",
    result: "You can design and review production systems with stronger technical judgment.",
    note: "Deep modules with verified reference projects",
  },
];

const outcomes = [
  "Debug a transaction from calldata to state change",
  "Review signatures, token standards, and integration assumptions",
  "Prove conclusions with tests, traces, and storage reads",
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
          <a href="#programs">Programs</a>
          <a href="#learning">How it works</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-action" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
          Join the course list
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">EVM engineering education</p>
          <h1>Go beyond writing Solidity. Learn to reason about what the EVM will do.</h1>
          <p className="hero-lede">
            ByteBeetle is a set of rigorous Ethereum bootcamps built around clear
            explanations, runnable code, and evidence you can reproduce yourself.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#programs">Find your program</a>
            <a className="button button-secondary" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
              Receive enrollment updates
            </a>
          </div>
          <p className="byline">Created and taught by Andrey Obruchkov, blockchain engineer and protocol builder.</p>
        </div>

        <aside className="outcome-card" aria-label="Course outcomes">
          <p className="outcome-heading">After the course, you will be able to</p>
          <ul>
            {outcomes.map((outcome) => (
              <li key={outcome}><span aria-hidden="true">✓</span>{outcome}</li>
            ))}
          </ul>
          <p className="outcome-note">The goal is technical independence—not memorized answers.</p>
        </aside>
      </section>

      <section className="programs" id="programs">
        <div className="section-heading">
          <p className="eyebrow">The programs</p>
          <h2>Start at the level that matches your work.</h2>
          <p>Both programs teach the same habit: understand the mechanism, inspect the implementation, and verify the claim.</p>
        </div>

        <div className="program-grid">
          {programs.map((program) => (
            <article className="program-card" key={program.title}>
              <p className="program-label">{program.label}</p>
              <h3>{program.title}</h3>
              <p className="program-summary">{program.summary}</p>
              <div className="program-detail">
                <h4>Best for</h4>
                <p>{program.bestFor}</p>
              </div>
              <div className="program-detail">
                <h4>What you study</h4>
                <p>{program.topics}</p>
              </div>
              <div className="program-detail">
                <h4>What changes</h4>
                <p>{program.result}</p>
              </div>
              <p className="program-note">{program.note}</p>
              <a className="text-link" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
                Get program information <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="learning" id="learning">
        <div className="learning-copy">
          <p className="eyebrow">How ByteBeetle works</p>
          <h2>This is not a collection of videos to watch.</h2>
          <p>
            Each module develops a mental model, puts the relevant implementation
            in front of you, and gives you a runnable way to verify what you learned.
            Technical questions test the explanation. Hands-on questions test whether
            you can use it.
          </p>
          <blockquote>
            “If code appears in a lesson, it exists on our side, it runs, and its output has been inspected.”
          </blockquote>
        </div>

        <div className="learning-options">
          <article>
            <p className="option-label">Independent</p>
            <h3>Follow the complete program at your own pace.</h3>
            <p>Long-form lessons, runnable exercises, technical questions, hands-on questions, and reference solutions.</p>
            <a href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Join course updates ↗</a>
          </article>
          <article>
            <p className="option-label">With guidance</p>
            <h3>Add direct mentoring or bring the program to your team.</h3>
            <p>One-to-one sessions, code review, debugging support, or private training adapted to an engineering organization.</p>
            <a href="https://www.linkedin.com/in/andrey-obruchkov/" target="_blank" rel="noreferrer">Discuss the right format ↗</a>
          </article>
        </div>
      </section>

      <section className="closing" id="about">
        <div className="about">
          <p className="eyebrow">About</p>
          <h2>Built from engineering work, not course templates.</h2>
          <p>
            Andrey Obruchkov works across smart contracts, multi-chain systems,
            infrastructure, Go, and Rust. ByteBeetle turns that experience into
            careful, evidence-driven EVM education.
          </p>
          <div className="profile-links">
            <a href="https://andreyobruchkov.com" target="_blank" rel="noreferrer">Personal site ↗</a>
            <a href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">Medium ↗</a>
            <a href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Substack ↗</a>
            <a href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>

        <div className="enrollment-card">
          <p className="eyebrow">Enrollment</p>
          <h2>Learn the system, not only the syntax.</h2>
          <p>Join the list for course availability, new modules, public labs, and technical writing.</p>
          <a className="button button-light" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
            Join the ByteBeetle list
          </a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top" aria-label="ByteBeetle home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>ByteBeetle</span>
        </a>
        <p>EVM engineering education by Andrey Obruchkov.</p>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
