import elsewhereLogo from "../assets/elsewhere-logo.png";

export function SiteHeader() {
  return (
    <header>
      <a className="logo" href="/" aria-label="Elsewhere home">
        <img src={elsewhereLogo} alt="Elsewhere"/>
      </a>
      <nav>
        <a href="/explore?q=toilet%20paper">See the swaps</a>
        <a href="/#how-it-works">How it works</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <a className="logo" href="/" aria-label="Elsewhere home">
        <img src={elsewhereLogo} alt="Elsewhere"/>
      </a>
      <p>Don’t buy more. Buy differently.</p>
      <p>Independent and human-made.</p>
    </footer>
  );
}
