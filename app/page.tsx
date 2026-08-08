const programs = [
  {
    label: "EVM foundation",
    title: "EVM Engineering Bootcamp",
    summary:
      "Build the foundation that most Solidity courses skip. Understand how transactions become execution, how data moves through the EVM, and how to investigate contract behavior with confidence.",
    bestFor: "Developers with basic Solidity knowledge who want a complete mental model.",
    topics: "Execution, calldata, transactions, signing, observability, tokens, testing, and protocol development.",
    result: "You can explain and debug contract behavior instead of relying on framework assumptions.",
    note: "20 focused modules with runnable Foundry labs",
  },
  {
    label: "EVM advanced",
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
  "Reason from chain architecture to application behavior",
  "Investigate transactions, state, signatures, and messages",
  "Evaluate integration and cross-chain assumptions before they fail",
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
          <p className="eyebrow">Multichain engineering education</p>
          <h1>Learn to reason across chains, not just deploy to one.</h1>
          <p className="hero-lede">
            ByteBeetle helps you understand how blockchain systems really work.
            We are starting with the EVM and teaching it through clear explanations,
            runnable code, and results you can reproduce yourself.
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
          <p className="outcome-heading">What you will learn to do</p>
          <ul>
            {outcomes.map((outcome) => (
              <li key={outcome}><span aria-hidden="true">✓</span>{outcome}</li>
            ))}
          </ul>
          <p className="outcome-note">The goal is to help you make good technical decisions across ecosystems. You will not be memorizing answers for one stack.</p>
        </aside>
      </section>

      <section className="programs" id="programs">
        <div className="section-heading">
          <p className="eyebrow">First learning track · EVM Engineering</p>
          <h2>We are starting with EVM engineering.</h2>
          <p>The first track has two levels. In both of them, you will learn to understand the mechanism, inspect the implementation, and check the result yourself.</p>
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
        <p className="track-note">
          EVM is the first track, but it is not the whole ByteBeetle vision. As the
          platform grows, it will expand into more chain-specific and cross-chain engineering topics.
        </p>
      </section>

      <section className="learning" id="learning">
        <div className="learning-copy">
          <p className="eyebrow">How ByteBeetle teaches</p>
          <h2>You will not just watch videos and copy code.</h2>
          <p>
            Each module helps you build a clear mental model, shows you the relevant
            implementation, and gives you runnable examples so you can check the behavior
            yourself. Technical questions make sure the explanation is clear. Hands-on
            questions make sure you can actually use what you learned. This gives you a
            foundation for comparing how different chains solve similar problems.
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
          <p className="eyebrow">About ByteBeetle</p>
          <h2>Built from engineering work, not course templates.</h2>
          <p>
            Andrey Obruchkov works across smart contracts, multi-chain systems,
            infrastructure, Go, and Rust. ByteBeetle turns that experience into
            careful, evidence-driven multichain engineering education.
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
          <h2>Build knowledge you can use across chains.</h2>
          <p>Join the list for EVM course availability, future learning tracks, public labs, and technical writing.</p>
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
        <p>Multichain engineering education by Andrey Obruchkov.</p>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
