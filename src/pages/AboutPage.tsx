import EditorialChrome from "../components/EditorialChrome";
import EditorialIllustration from "../components/EditorialIllustration";
import { SITE_IMAGES } from "../data/siteImages";

export default function AboutPage() {
  const photo = SITE_IMAGES.founder;
  const rainforest = SITE_IMAGES.amazonRainforest;

  return (
    <EditorialChrome page="about">
      <section className="ab-intro">
        <figure className="ab-photo">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        </figure>
        <div className="ab-intro-copy">
          <p className="story-eyebrow">About</p>
          <h1>Hi, I&apos;m Marlu.</h1>
          <p>
            I was born in Shanghai and grew up in the mountains of Idaho,
            surrounded by animals and usually taking apart something I probably
            wasn&apos;t supposed to. That habit never really went away. It
            eventually led me into neuroscience, engineering, and product
            design, including work on engineering tools for children and a
            NASA-funded project studying animals in microgravity. I&apos;m also
            preparing to start medical school.
          </p>
          <p>
            Wildlife conservation and animal welfare have always been important
            to me, which probably explains why I spend an unreasonable amount
            of my free time building things for my cats. My current project is
            a homemade GPS tracker, mostly because I couldn&apos;t justify how
            much the existing ones cost.
          </p>
          <p>
            Working in engineering has made me appreciate how much people are
            capable of building, but it&apos;s also made me think about the
            systems we&apos;ve created and who they actually benefit. We&apos;ve
            become remarkably good at making everyday life convenient, yet
            somehow that convenience often comes at the expense of the
            environment, smaller businesses, and the people doing the actual
            work.
          </p>
          <p>
            I&apos;ve found that particularly frustrating as a consumer. I can
            care about wildlife conservation, worry about deforestation, and
            want to support businesses that do something worthwhile, but I
            still need to buy toilet paper, coffee, and toothpaste. And when I
            look at the companies selling those things, it sometimes feels as
            though every option leads back to the same handful of enormous
            corporations.
          </p>
          <p>
            For a while, I wasn&apos;t sure what I could realistically do about
            that. I couldn&apos;t change how those companies operated, and I
            certainly couldn&apos;t afford to donate to every cause I cared
            about. But I started wondering why it was so difficult to find
            businesses that were already putting some of their money toward
            something good.
          </p>
          <p>
            That question eventually became Elsewhere. The idea isn&apos;t to
            convince people to spend more money or completely change how they
            live. It&apos;s to make it easier to find a different place to buy
            something they were already going to purchase.
          </p>
        </div>
      </section>

      <section className="ab-story">
        <div className="ab-story-copy">
          <h2>I was just trying to buy toilet paper.</h2>
          <p>
            Standing in a drugstore aisle, staring at a wall of nearly identical
            packages, I started wondering how many of these brands were actually
            different companies.
          </p>
          <p>
            Pick up five random products in your house and turn them around.
            There&apos;s a pretty good chance you&apos;ll find a familiar name
            in tiny print somewhere on the back: Unilever, Procter &amp; Gamble,
            Nestlé, or another enormous parent company. Sometimes you don&apos;t
            even have to look that hard. That little U on the back of your
            shampoo bottle? That&apos;s Unilever.
          </p>
          <p>
            I started looking into who owned the brands I was buying, and it was
            genuinely surprising how often I kept ending up at the same
            companies.
          </p>
          <p>
            The frustrating part was that I wasn&apos;t trying to become an
            expert in corporate ownership. I just wanted to buy ordinary things
            without feeling like every purchase was making another billionaire
            richer while the environment paid the price.
          </p>
          <p>
            And I knew there were businesses doing things differently. Companies
            that donated profits, supported conservation, or built their entire
            business around a cause. But finding them meant spending an
            unreasonable amount of time researching something as mundane as
            toilet paper.
          </p>
          <p>So I started building Elsewhere.</p>
        </div>
        <figure className="ab-ownership-collage">
          <ul>
            <li>
              <EditorialIllustration name="soap" />
              <p>
                Everyday shampoo
                <span>Unilever</span>
              </p>
            </li>
            <li>
              <EditorialIllustration name="detergent" />
              <p>
                Everyday detergent
                <span>Procter &amp; Gamble</span>
              </p>
            </li>
            <li>
              <EditorialIllustration name="coffee" />
              <p>
                Everyday coffee
                <span>Nestlé</span>
              </p>
            </li>
          </ul>
          <figcaption>
            Turn the bottle over and the parent is often a familiar giant.
            These are category examples, not pictures of specific packaged
            labels.
          </figcaption>
        </figure>
      </section>

      <section className="ab-editorial ab-why">
        <figure className="ab-editorial-photo">
          <img
            src={rainforest.src}
            alt={rainforest.alt}
            width={rainforest.width}
            height={rainforest.height}
          />
          <figcaption>
            {rainforest.credit}. {rainforest.license}. Amazon rainforest near
            Manaus, Brazil.
          </figcaption>
        </figure>
        <div className="ab-editorial-copy">
          <h2>Why I started Elsewhere</h2>
          <p>
            I&apos;ve always cared about animals and wildlife conservation.
            Growing up around animals probably had something to do with that,
            and it hasn&apos;t exactly become a smaller part of my life as
            I&apos;ve gotten older.
          </p>
          <p>
            But caring about the environment and actually knowing what to do
            about it are two very different things.
          </p>
          <p>
            It&apos;s frustrating to read about deforestation, pollution, or
            another species losing its habitat, and then walk into a grocery
            store where so many of the products seem to lead back to the same
            enormous companies.
          </p>
          <p>
            I don&apos;t think most people want to spend their evenings
            investigating the ownership structure of their shampoo.
          </p>
          <p>I certainly don&apos;t.</p>
          <p>
            I wanted a way to find businesses that were already doing something
            useful with the money I was going to spend anyway.
          </p>
          <p>That&apos;s really where Elsewhere came from.</p>
        </div>
      </section>

      <section className="ab-editorial ab-hope">
        <div className="ab-editorial-copy">
          <h2>What I hope Elsewhere can do</h2>
          <p>
            Working in engineering has made me appreciate how much the things we
            design can change people&apos;s habits.
          </p>
          <p>
            At ChompShop, I saw how making things more accessible and easier to
            use could change what people were willing to try. That stuck with
            me.
          </p>
          <p>
            I think shopping has a similar problem. There are businesses making
            genuinely interesting products and supporting worthwhile causes, but
            most people will never hear about them.
          </p>
          <p>Meanwhile, the familiar brands are already on every shelf.</p>
          <p>
            Elsewhere isn&apos;t supposed to make shopping another full-time
            job. It&apos;s supposed to make the alternatives easier to find.
          </p>
          <p>
            If you&apos;re buying coffee, soap, or toilet paper anyway, why not
            see whether there&apos;s somewhere better to buy it?
          </p>
          <p>You don&apos;t have to buy more. You can just buy elsewhere.</p>
        </div>
        <figure className="ab-hope-collage">
          <EditorialIllustration name="coffee" />
          <EditorialIllustration name="soap" />
          <EditorialIllustration name="toilet-paper" />
          <figcaption>
            Coffee, soap, and toilet paper — the ordinary errands Elsewhere is
            built around.
          </figcaption>
        </figure>
      </section>

      <section className="ab-server">
        <div className="ab-server-copy">
          <h2>Elsewhere is independent, and I pay the server bill.</h2>
          <p>
            This is a project I build and maintain myself. It does not take ads,
            sponsorships, affiliate commissions, or paid rankings, and I do not
            earn a cut when you buy something. I made it because I wanted it to
            exist, which is a terrible business plan.
          </p>
          <p>
            One day I might accept voluntary tips or sell a few stickers to
            cover hosting. Those are not programs yet, and nothing here is a
            donation ask. If that ever changes, I will say so plainly on this
            site. Elsewhere is not a registered nonprofit.
          </p>
        </div>
        <figure className="ab-money">
          <EditorialIllustration name="money" />
        </figure>
      </section>
    </EditorialChrome>
  );
}
