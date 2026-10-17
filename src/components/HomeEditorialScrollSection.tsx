import { useEffect, useRef, useState } from "react";
import {
  FINANCIAL_STORIES,
  FINANCIAL_STORY_CLOSING,
} from "../data/editorialResearch";
import { FinancialVisual } from "./FinancialStoryVisuals";

function StoryBody({
  story,
}: {
  story: (typeof FINANCIAL_STORIES)[number];
}) {
  return (
    <>
      <p className="money-story-step">{story.step}</p>
      {story.statistic ? (
        <p className="money-story-stat">{story.statistic}</p>
      ) : null}
      <h3>{story.headline}</h3>
      {story.paragraphs.map((paragraph) => (
        <p key={paragraph} className="money-story-copy">
          {paragraph}
        </p>
      ))}
      <p className="money-story-source">
        <span>{story.reportingPeriod}</span>
        {" · "}
        <a href={story.sourceUrl} target="_blank" rel="noreferrer">
          {story.sourceName} — {story.sourceTitle}
        </a>
      </p>
    </>
  );
}

export default function HomeEditorialScrollSection() {
  const storyRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const choose = () => {
      frame = 0;
      const line = window.innerHeight * 0.42;
      let best = 0;
      let bestScore = Infinity;
      for (const node of storyRefs.current) {
        if (!node) continue;
        const index = Number(node.dataset.storyIndex);
        if (Number.isNaN(index)) continue;
        const rect = node.getBoundingClientRect();
        const contains = rect.top <= line && rect.bottom >= line;
        const distance = Math.abs(rect.top + rect.height / 2 - line);
        const score = contains ? distance : distance + 10000;
        if (score < bestScore) {
          bestScore = score;
          best = index;
        }
      }
      setActiveIndex((current) => (current === best ? current : best));
    };

    const onScroll = () => {
      if (frame) return;
      choose();
      frame = window.requestAnimationFrame(() => {
        frame = 0;
      });
      window.setTimeout(() => {
        if (!frame) return;
        window.cancelAnimationFrame(frame);
        frame = 0;
      }, 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="money-story" aria-labelledby="money-story-heading">
      <div className="money-story-intro">
        <h2 id="money-story-heading">
          Your money goes further than the checkout.
        </h2>
        <p>
          Every purchase supports a business. And every business makes
          decisions about what happens next.
        </p>
      </div>

      <div className="money-story-stage">
        <div className="money-story-texts">
          {FINANCIAL_STORIES.map((story, index) => (
            <article
              key={story.id}
              className="money-story-article"
              data-story-index={index}
              ref={(el) => {
                storyRefs.current[index] = el;
              }}
            >
              <div className="money-story-narrative">
                <StoryBody story={story} />
              </div>
              <div className="money-story-inline-visual">
                <FinancialVisual kind={story.visual} />
              </div>
            </article>
          ))}
        </div>

        <div className="money-story-visual-col">
          <div className="money-story-visual-sticky">
            {FINANCIAL_STORIES.map((story, index) => (
              <div
                key={story.id}
                className={`money-story-visual-slide${index === activeIndex ? " is-active" : ""}`}
                aria-hidden={index !== activeIndex}
              >
                <FinancialVisual kind={story.visual} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="money-story-close">
        <p className="money-story-close-statement">
          {FINANCIAL_STORY_CLOSING.copy}
        </p>
        <a href={FINANCIAL_STORY_CLOSING.ctaHref}>
          {FINANCIAL_STORY_CLOSING.ctaLabel} <span aria-hidden="true">→</span>
        </a>
        <p className="money-story-aside">{FINANCIAL_STORY_CLOSING.aside}</p>
      </div>
    </section>
  );
}
