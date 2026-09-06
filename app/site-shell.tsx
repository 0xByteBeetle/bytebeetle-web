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
        <span>0xByteBeetle</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <a href="/" aria-current={active === "home" ? "page" : undefined}>Home</a>
        <a href="/blogs" aria-current={active?.startsWith("blogs") ? "page" : undefined}>
            Blogs
        </a>
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

      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="/" aria-current={active === "home" ? "page" : undefined}>Home</a>
          <a href="/blogs" aria-current={active?.startsWith("blogs") ? "page" : undefined}>
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
    <footer className="site-footer">
      <Link href="/">0xByteBeetle · Andrey Obruchkov</Link>
      <div className="footer-links">
        <a href="https://andreyobruchkov1996.substack.com" target="_blank" rel="noreferrer">Substack ↗</a>
        <a href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="/contact">Contact</a>
        <a href="/inbox">Owner inbox</a>
      </div>
    </footer>
  );
}
