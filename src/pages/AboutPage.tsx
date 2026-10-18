import EditorialChrome from "../components/EditorialChrome";

export default function AboutPage() {
  return (
    <EditorialChrome page="about">
      <section className="about-hero">
        <p className="story-eyebrow">About</p>
        <h1 className="about-hero-title">
          Hi. I&apos;m Marlu.
          <span>I got tired of waiting.</span>
        </h1>
        <p className="about-hero-lead">
          Elsewhere started with a pretty ordinary frustration: I was tired of
          spending my hard-earned money on everyday essentials, only to wonder
          which enormous corporation was getting it next.
        </p>
        <p className="about-hero-support">
          Consumers deserve a real choice — not a scavenger hunt through
          parent companies every time they need toilet paper.
        </p>
      </section>

      <section className="about-problem">
        <div className="story-narrow">
          <h2 className="story-display">
            I was just trying to buy toilet paper.
          </h2>
          <p>
            Somewhere between rising grocery bills, corporate promises, and
            discovering that seemingly different brands often belong to the
            same parent companies, I started wondering why finding a better
            place to spend my money was so difficult.
          </p>
          <p>
            I didn&apos;t want to become a full-time investigator every time I
            needed shampoo. I just wanted to know whether there was another
            business selling something similar, at a price I could actually
            afford.
          </p>
          <p>
            And I was getting tired of waiting for the companies with billions
            of dollars to decide that people, animals, and the planet were
            worth prioritizing.
          </p>
        </div>
      </section>

      <section className="about-founder">
        <figure className="about-founder-photo">
          <img
            src="/images/founder.jpg"
            alt="Marlu smiling beside a cardboard engineering project"
            width={1024}
            height={768}
          />
        </figure>
        <div className="about-founder-copy">
          <h2 className="story-display">
            Hi, I&apos;m Marlu.
            <span>I like making things.</span>
          </h2>
          <p>
            I was born in Shanghai and grew up in the mountains of Idaho,
            surrounded by animals and usually taking apart something I probably
            wasn&apos;t supposed to.
          </p>
          <p>
            That curiosity eventually took me into neuroscience, engineering,
            and product design. I&apos;ve worked on children&apos;s engineering
            tools, contributed to NASA-funded research involving animal studies
            in microgravity, and explored how technology can help people in
            everyday life.
          </p>
          <p>I&apos;m also preparing to start medical school.</p>
          <p>
            Outside of work, I spend a somewhat unreasonable amount of time
            building things for my cats. My latest project is a homemade GPS
            tracker, because apparently buying one wasn&apos;t complicated
            enough.
          </p>
          <p>
            I&apos;ve always cared about wildlife conservation and finding
            practical ways to make the world a little better.
          </p>
          <p>
            But working in engineering taught me something particularly useful:
            meaningful changes don&apos;t always require people to completely
            reinvent their lives.
          </p>
          <p>
            Sometimes, the best solutions are the ones that make a better
            choice easier.
          </p>
          <p className="about-founder-close">
            Elsewhere is my attempt to build one of those solutions.
          </p>
        </div>
      </section>

      <section className="about-exists">
        <div className="story-narrow">
          <h2 className="story-display">
            I couldn&apos;t change the whole system.
            <span>But I could build something.</span>
          </h2>
          <p>
            Elsewhere is a free place to discover businesses that support
            causes worth caring about.
          </p>
          <ul className="about-cause-words">
            <li>Animal rescue</li>
            <li>Wildlife conservation</li>
            <li>Clean water</li>
            <li>Healthcare</li>
            <li>Education</li>
            <li>Communities that need support</li>
          </ul>
          <p>
            The idea is simple: instead of asking people to buy more, help them
            find better places to buy what they already need.
          </p>
          <p>
            Because not everyone can afford to donate.
          </p>
          <p className="about-exists-emphasis">
            And doing something good shouldn&apos;t require having money left
            over at the end of the month.
          </p>
        </div>
      </section>

      <section className="about-funding">
        <div className="story-narrow">
          <h2 className="about-funding-title">
            I&apos;m not trying to get rich.
            <span>I&apos;m trying to pay the server bill.</span>
          </h2>
          <p>
            Elsewhere isn&apos;t a store, and I don&apos;t earn a commission
            when you buy something.
          </p>
          <p>
            There will never be ads, sponsored rankings, paid placements, brand
            sponsorships, or affiliate commissions.
          </p>
          <p>I&apos;m building Elsewhere because I think it should exist.</p>
          <p>
            Eventually, I might accept voluntary tips or sell a few stickers,
            mugs, or other little things to help cover hosting, maintenance,
            and getting the word out.
          </p>
          <p>
            And if the project ever brings in more than it needs to operate,
            I&apos;d like that extra money to support charitable causes.
          </p>
          <p className="about-funding-close">
            The goal isn&apos;t to build another company that takes. It&apos;s
            to build something useful that gives.
          </p>
          <p className="about-funding-note">
            Tips, merchandise, and any surplus-giving policy are intended
            future practices — not current programs. Elsewhere is not a
            registered nonprofit, and nothing here is a donation ask or a
            tax-deductible contribution. If those practices launch, the
            financial reporting and policy will be published transparently on
            this site.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <h2 className="story-display">You were going to buy it anyway.</h2>
        <p className="about-cta-line">Buy it elsewhere.</p>
        <div className="story-cta-row">
          <a className="story-cta" href="/explore">
            Explore better places
          </a>
          <a className="story-cta-secondary" href="/mission">
            Our mission
          </a>
        </div>
      </section>
    </EditorialChrome>
  );
}
