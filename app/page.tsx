import ContactForm from "./contact-form";

const bootcamps = [
  {
    label: "EVM foundation",
    title: "EVM Engineering Bootcamp",
    description:
      "A complete foundation in execution, calldata, transactions, signing, observability, tokens, testing, and protocol development.",
    forWhom:
      "For developers who know basic Solidity and want to understand what happens beneath the public interface.",
    note: "20 focused modules with runnable Foundry labs",
  },
  {
    label: "EVM advanced",
    title: "Advanced EVM Bootcamp",
    description:
      "A deeper study of token internals, typed signatures, permit flows, storage, gas behavior, integration risk, and adversarial testing.",
    forWhom:
      "For working Solidity engineers who want to review standards and production systems with stronger technical judgment.",
    note: "Long-form modules with verified reference projects",
  },
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="0xByteBeetle home">
          <span className="brand-mark" aria-hidden="true">0x</span>
          <span>0xByteBeetle</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#writing">Writing</a>
          <a href="#bootcamps">Bootcamps</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-action" href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">By Andrey Obruchkov</p>
          <h1>Notes, bootcamps, and practical experiments in multichain engineering.</h1>
          <p className="hero-lede">
            I use 0xByteBeetle to take blockchain systems apart and explain how they
            behave. The first learning track is focused on the EVM. Over time, the
            work will expand into more chains and cross-chain engineering.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#writing">Read the writing</a>
            <a className="button button-secondary" href="#bootcamps">Explore the bootcamps</a>
          </div>
        </div>

        <aside className="focus-card" aria-label="Topics covered by 0xByteBeetle">
          <p className="focus-heading">What I am exploring</p>
          <ul>
            <li>EVM execution, storage, and transaction behavior</li>
            <li>Token standards, signatures, and protocol design</li>
            <li>Cross-chain systems and integration assumptions</li>
            <li>Infrastructure, Go, Rust, and engineering practice</li>
          </ul>
        </aside>
      </section>

      <section className="writing-section" id="writing">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Writing</p>
          <h2>Ideas I am working through in public.</h2>
          <p>I write about the technical details I find useful while building, teaching, and investigating blockchain systems.</p>
        </div>

        <div className="writing-grid">
          <a className="writing-card" href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">
            <p className="platform-label">Substack</p>
            <h3>Long-form notes and new work</h3>
            <p>Follow new articles, course updates, public labs, and ideas that are still developing.</p>
            <span>Read on Substack ↗</span>
          </a>
          <a className="writing-card" href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">
            <p className="platform-label">Medium</p>
            <h3>Technical articles and earlier writing</h3>
            <p>Browse published explanations and practical pieces from my previous work.</p>
            <span>Read on Medium ↗</span>
          </a>
        </div>
      </section>

      <section className="bootcamps-section" id="bootcamps">
        <div className="section-heading">
          <p className="eyebrow">Bootcamps</p>
          <h2>The EVM is the first learning track.</h2>
          <p>These are not short video collections. Each module combines a careful explanation, code you can run, and questions that make you check whether you really understand the mechanism.</p>
        </div>

        <div className="bootcamp-grid">
          {bootcamps.map((bootcamp) => (
            <article className="bootcamp-card" key={bootcamp.title}>
              <p className="platform-label">{bootcamp.label}</p>
              <h3>{bootcamp.title}</h3>
              <p>{bootcamp.description}</p>
              <p className="for-whom"><strong>Who it is for:</strong> {bootcamp.forWhom}</p>
              <p className="bootcamp-note">{bootcamp.note}</p>
            </article>
          ))}
        </div>

        <div className="teaching-note">
          <p className="eyebrow">The course rule</p>
          <blockquote>“If code appears in a lesson, it exists on our side, it runs, and its output has been inspected.”</blockquote>
          <p>Technical questions test the explanation. Hands-on questions test whether you can use it. Solutions and reference projects stay separate from the student material.</p>
          <a href="https://substack.com/@andreyobruchkov" target="_blank" rel="noreferrer">Follow the bootcamp work ↗</a>
        </div>
      </section>

      <section className="about-contact" id="about">
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h2>I build systems and teach what I learn from them.</h2>
          <p>
            I am Andrey Obruchkov, a blockchain engineer and protocol builder working
            across smart contracts, multichain systems, infrastructure, Go, and Rust.
            0xByteBeetle is where I collect the explanations, examples, and learning
            material that come out of that work.
          </p>
          <div className="profile-links">
            <a href="https://andreyobruchkov.com" target="_blank" rel="noreferrer">Personal site ↗</a>
            <a href="https://www.linkedin.com/in/andrey-obruchkov/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>

        <div className="contact-panel" id="contact">
          <p className="eyebrow">Contact</p>
          <h2>Send me a note.</h2>
          <p className="contact-intro">Bootcamps, mentoring, team training, writing, protocol work, or simply an interesting technical question are all welcome.</p>
          <ContactForm />
        </div>
      </section>

      <footer>
        <a className="brand" href="#top" aria-label="0xByteBeetle home">
          <span className="brand-mark" aria-hidden="true">0x</span>
          <span>0xByteBeetle</span>
        </a>
        <p>Multichain engineering notes and education.</p>
        <a className="owner-link" href="/inbox">Owner inbox</a>
      </footer>
    </main>
  );
}
