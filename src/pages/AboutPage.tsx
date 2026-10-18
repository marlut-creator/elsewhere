import EditorialChrome from "../components/EditorialChrome";
import { products } from "../data/products";

const PREVIEW_IDS = [
  "cat-rescue-house-blend",
  "who-gives-a-crap-100-recycled-toilet-paper",
  "tentree-ten-t-shirt",
];

function previewProducts() {
  return PREVIEW_IDS.map((id) => {
    const product = products.find((entry) => entry.id === id);
    if (!product) {
      throw new Error(`About page is missing catalog product ${id}`);
    }
    return product;
  });
}

function AisleVisual() {
  return (
    <figure className="ab-aisle">
      <svg viewBox="0 0 520 420" role="img" aria-label="A crowded shelf of everyday household products with overlapping labels">
        <rect width="520" height="420" rx="16" fill="#f1eee7" />
        <rect x="24" y="36" width="472" height="28" rx="4" fill="#d3ccd1" />
        <rect x="40" y="84" width="92" height="150" rx="8" fill="#fff" stroke="#321b36" />
        <rect x="52" y="98" width="68" height="48" rx="4" fill="#eeedf8" />
        <text x="56" y="128" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">soap</text>
        <rect x="148" y="72" width="100" height="162" rx="8" fill="#fff" stroke="#321b36" />
        <rect x="162" y="88" width="72" height="56" rx="4" fill="#6679cc" />
        <text x="170" y="122" fill="#f7f3e8" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">paper</text>
        <rect x="264" y="90" width="88" height="144" rx="8" fill="#fff" stroke="#321b36" />
        <circle cx="308" cy="132" r="22" fill="#eeedf8" stroke="#321b36" />
        <text x="278" y="206" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="12" fontWeight="600">paste</text>
        <rect x="368" y="78" width="108" height="156" rx="8" fill="#fff" stroke="#321b36" />
        <rect x="384" y="96" width="76" height="40" rx="4" fill="#321b36" />
        <text x="392" y="122" fill="#eeedf8" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">shampoo</text>
        <rect x="72" y="252" width="120" height="112" rx="8" fill="#fff" stroke="#321b36" />
        <text x="88" y="312" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="14" fontWeight="600">detergent</text>
        <rect x="208" y="240" width="132" height="124" rx="8" fill="#fff" stroke="#321b36" />
        <text x="228" y="300" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="14" fontWeight="600">another</text>
        <text x="236" y="322" fill="#6679cc" fontFamily="Dosis, sans-serif" fontSize="14" fontWeight="600">label</text>
        <rect x="356" y="256" width="116" height="108" rx="8" fill="#fff" stroke="#321b36" />
        <text x="376" y="316" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">still more</text>
        <path d="M40 84v-16h92M148 72v-20h100" stroke="#9b8e97" strokeWidth="1.4" />
        <text x="36" y="400" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="13">Same aisle. Fewer owners than it looks.</text>
      </svg>
    </figure>
  );
}

function DeskVisual() {
  return (
    <figure className="ab-desk">
      <svg viewBox="0 0 360 240" role="img" aria-label="A laptop on a desk next to a small home server">
        <rect width="360" height="240" rx="14" fill="#4a2a50" />
        <rect x="36" y="48" width="176" height="112" rx="10" fill="#eeedf8" stroke="#321b36" />
        <rect x="48" y="60" width="152" height="80" rx="4" fill="#321b36" />
        <rect x="28" y="160" width="192" height="10" rx="3" fill="#9faee8" />
        <rect x="236" y="72" width="72" height="96" rx="8" fill="#eeedf8" stroke="#321b36" />
        <rect x="248" y="86" width="48" height="8" rx="2" fill="#6679cc" />
        <rect x="248" y="102" width="48" height="8" rx="2" fill="#6679cc" />
        <rect x="248" y="118" width="48" height="8" rx="2" fill="#9faee8" />
        <text x="44" y="210" fill="#eeedf8" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">One person. One laptop.</text>
      </svg>
    </figure>
  );
}

export default function AboutPage() {
  const previews = previewProducts();

  return (
    <EditorialChrome page="about">
      <section className="ab-intro">
        <figure className="ab-photo">
          <img
            src="/images/founder.jpg"
            alt="Marlu smiling beside a cardboard engineering project"
            width={1024}
            height={768}
          />
        </figure>
        <div className="ab-intro-copy">
          <p className="story-eyebrow">About</p>
          <h1>
            Hi, I&apos;m Marlu.
            <span>I like making things.</span>
          </h1>
          <p>
            I was born in Shanghai and grew up in the mountains of Idaho,
            surrounded by animals and usually taking apart something I probably
            wasn&apos;t supposed to. That habit never really went away. It
            eventually turned into neuroscience, engineering, and product
            design, including work on engineering tools for children and a
            NASA-funded project that studied animals in microgravity.
          </p>
          <p>
            I&apos;m preparing to start medical school, which is a sentence I
            still say out loud as if it might become less surprising. Wildlife
            and animal welfare have been in the picture the whole time, which
            probably explains why a lot of my free hours go to slightly
            overbuilt projects for my cats. The current one is a homemade GPS
            tracker, because buying one would have been too easy.
          </p>
          <p>
            Engineering taught me that useful change often looks unglamorous:
            make the better option easier to find, then get out of the way.
            Elsewhere is my attempt to do that for ordinary shopping.
          </p>
        </div>
      </section>

      <section className="ab-story">
        <div className="ab-story-copy">
          <h2>
            I was just trying to buy toilet paper.
          </h2>
          <p>
            It started as the kind of errand nobody puts on a vision board.
            Standing in a drugstore aisle, staring at a wall of nearly identical
            packages, I realized I had no idea which company I was actually
            handing money to, or whether any of them did something useful with
            it. The labels looked independent. A little digging suggested
            otherwise, and the digging was exactly as fun as it sounds.
          </p>
          <p>
            I did not want a new personality, a new budget, or a second job as
            an amateur corporate researcher. I wanted to keep buying toothpaste
            and paper goods without feeling like I needed a spreadsheet. If
            there were businesses making the same ordinary things while
            publishing a real giving commitment, finding them should not require
            a scavenger hunt. That irritation is what turned into Elsewhere.
          </p>
        </div>
        <AisleVisual />
      </section>

      <section className="ab-built">
        <div className="ab-built-copy">
          <h2>So I built a map for the purchases we already make.</h2>
          <p>
            Elsewhere is a free website for finding businesses that sell
            everyday products and publish what they do with the money, whether
            that is animal welfare, clean water, education, or environmental
            restoration. You search for something you already buy. The site
            shows documented alternatives, links to the seller&apos;s own
            claim, and sends you straight to their checkout.
          </p>
          <p>
            It is not a store, and it does not donate on your behalf. Some
            swaps cost less, some cost more, and the point is to make those
            differences visible so you can decide.
          </p>
        </div>
        <ul className="ab-previews">
          {previews.map((product) => (
            <li key={product.id}>
              <a href={`/explore?q=${encodeURIComponent(product.brand)}`}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.productName}`}
                  />
                ) : (
                  <span>{product.brand}</span>
                )}
                <strong>{product.brand}</strong>
                <em>{product.productName}</em>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="ab-server">
        <div className="ab-server-copy">
          <h2>
            I&apos;m not trying to get rich.
            <span>I&apos;m trying to pay the server bill.</span>
          </h2>
          <p>
            Elsewhere is an independent project I build and maintain myself. It
            does not take ads, sponsorships, affiliate commissions, or paid
            rankings, and I do not earn a cut when you buy something. I made it
            because I wanted it to exist, which is a terrible business plan and
            a pretty good reason to keep the lights on carefully.
          </p>
          <p>
            One day I might accept voluntary tips or sell a few stickers to
            cover hosting. Those are not programs yet, and nothing here is a
            donation ask. If that ever changes, I will say so plainly on this
            site. Elsewhere is not a registered nonprofit.
          </p>
        </div>
        <DeskVisual />
      </section>

      <section className="ab-end">
        <h2>If you were going to buy it anyway, you might as well know where the money goes.</h2>
        <p>
          You can start with something ordinary. Coffee, soap, toilet paper. The
          less glamorous the errand, the more useful the map.
        </p>
        <div className="story-cta-row">
          <a className="story-cta" href="/explore">
            Explore better places
          </a>
          <a className="story-cta-secondary" href="/contact">
            Contact
          </a>
        </div>
      </section>
    </EditorialChrome>
  );
}
