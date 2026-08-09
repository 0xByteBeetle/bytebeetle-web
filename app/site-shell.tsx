import Link from "next/link";

const navigation = [
  { href: "/bootcamps", label: "Bootcamps", key: "bootcamps" },
  { href: "/resources", label: "Resources", key: "resources" },
  { href: "/about", label: "About", key: "about" },
  { href: "/contact", label: "Contact", key: "contact" },
];

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="0xByteBeetle home">
        <span className="brand-mark" aria-hidden="true">0x</span>
        <span>0xByteBeetle</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <details className="nav-cluster">
          <summary aria-current={active?.startsWith("blogs") ? "page" : undefined}>
            Blogs
          </summary>
          <div className="nav-cluster-menu">
            <a href="/blogs" aria-current={active === "blogs" ? "page" : undefined}>
              All writing
            </a>
            <a href="/blogs/evm" aria-current={active === "blogs-evm" ? "page" : undefined}>
              EVM
            </a>
            <a href="/blogs/solana" aria-current={active === "blogs-solana" ? "page" : undefined}>
              Solana
            </a>
          </div>
        </details>
        {navigation.map((item) => (
          <a
            href={item.href}
            key={item.key}
            aria-current={active === item.key ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-action" href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">
        GitHub ↗
      </a>

      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="/blogs" aria-current={active === "blogs" ? "page" : undefined}>
            Blogs
          </a>
          <a className="mobile-subitem" href="/blogs/evm" aria-current={active === "blogs-evm" ? "page" : undefined}>
            EVM writing
          </a>
          <a className="mobile-subitem" href="/blogs/solana" aria-current={active === "blogs-solana" ? "page" : undefined}>
            Solana writing
          </a>
          {navigation.map((item) => (
            <a href={item.href} key={item.key} aria-current={active === item.key ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Link className="brand" href="/" aria-label="0xByteBeetle home">
        <span className="brand-mark" aria-hidden="true">0x</span>
        <span>0xByteBeetle</span>
      </Link>
      <p>Multichain engineering notes and education.</p>
      <a className="owner-link" href="/inbox">Owner inbox</a>
    </footer>
  );
}
