const navigation = [
  { href: "/blogs", label: "Blogs", key: "blogs" },
  { href: "/bootcamps", label: "Bootcamps", key: "bootcamps" },
  { href: "/resources", label: "Resources", key: "resources" },
  { href: "/about", label: "About", key: "about" },
  { href: "/contact", label: "Contact", key: "contact" },
];

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="0xByteBeetle home">
        <span className="brand-mark" aria-hidden="true">0x</span>
        <span>0xByteBeetle</span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
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
      <a className="brand" href="/" aria-label="0xByteBeetle home">
        <span className="brand-mark" aria-hidden="true">0x</span>
        <span>0xByteBeetle</span>
      </a>
      <p>Multichain engineering notes and education.</p>
      <a className="owner-link" href="/inbox">Owner inbox</a>
    </footer>
  );
}
